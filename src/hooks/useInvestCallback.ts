import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'
import { JSBI, TokenAmount, Trade } from '@uniswap/sdk'
import { useMemo } from 'react'
import { INITIAL_ALLOWED_SLIPPAGE, REFERRAL_ADDRESS_STORAGE_KEY } from '../constants'
import { getTradeVersion } from '../data/V1'
import { useTransactionAdder } from '../state/transactions/hooks'
import { calculateGasMargin, getMooniswapContract, getOneSplit, isAddress, isUseOneSplitContract } from '../utils'
import { useActiveWeb3React } from './index'
import { Version } from './useToggledVersion'
import {
  FLAG_DISABLE_ALL_SPLIT_SOURCES,
  FLAG_DISABLE_ALL_WRAP_SOURCES,
  FLAG_DISABLE_MOONISWAP_ALL, FLAG_ENABLE_CHI_BURN, FLAG_ENABLE_CHI_BURN_BY_ORIGIN
} from '../constants/one-split'
import { MIN_CHI_BALANCE, useHasChi, useIsChiApproved } from './useChi'
import { ApprovalState } from './useApproveCallback'
import { getAddress } from '@ethersproject/address'

// function isZero(hexNumber: string) {
//   return /^0x0*$/.test(hexNumber)
// }

const bitwiseOrOnJSBI = (...items: JSBI[]): JSBI => {
  return items.reduce((acc, val) => {
    return JSBI.bitwiseOr(acc, val)
  }, JSBI.BigInt(0x0))
}

export type InvestCallback = null | (() => Promise<string>);
export type EstimateCallback = null | (() => Promise<Array<number | undefined> | undefined>);

export type useInvestResult = [
  boolean,
  InvestCallback,
  EstimateCallback
]

export function useInvest(
  chainId: number | undefined,
  fromAmount: TokenAmount | undefined,
  trade: Trade | undefined, // trade to execute, required
  distribution: BigNumber[] | undefined,
  allowedSlippage: number = INITIAL_ALLOWED_SLIPPAGE // in bips
): useInvestResult {


  const isOneSplit = isUseOneSplitContract(distribution)
  const [isChiApproved] = useIsChiApproved(chainId || 0)
  const hasEnoughChi = useHasChi(MIN_CHI_BALANCE)

  // TODO: Get from storage as well
  const applyChi = !!(isOneSplit && (isChiApproved === ApprovalState.APPROVED) && hasEnoughChi)

  const estimate = useEstimateCallback(fromAmount, trade, distribution, allowedSlippage, isOneSplit)
  const InvestCallback = useInvestCallback(fromAmount, trade, distribution, allowedSlippage, isOneSplit,
    //applyChi
  )

  return [applyChi, InvestCallback, estimate]
}


export function useEstimateCallback(
  fromAmount: TokenAmount | undefined,
  trade: Trade | undefined, // trade to execute, required
  distribution: BigNumber[] | undefined,
  allowedSlippage: number = INITIAL_ALLOWED_SLIPPAGE, // in bips,
  isOneSplit: boolean
): EstimateCallback {


  const { account, chainId, library } = useActiveWeb3React()
  const recipient = account

  const tradeVersion = getTradeVersion(trade)

  return useMemo(() => {

    if (!trade || !recipient || !library || !account || !tradeVersion || !chainId || !distribution || !fromAmount)
      return () => Promise.resolve(undefined)

    const contract: Contract | null = getOneSplit(chainId, library, account)
    if (!isOneSplit) {
      return () => Promise.resolve(undefined)
    }

    let value: BigNumber | undefined
    if (trade.inputAmount.token.symbol === 'ETH') {
      value = BigNumber.from(fromAmount.raw.toString())
    }

    const estimateWithFlags = (flags: JSBI): Promise<number | undefined> => {
      const args: any[] = [
        trade.inputAmount.token.address,
        trade.outputAmount.token.address,
        fromAmount?.raw.toString(),
        fromAmount.multiply(String(10000 - allowedSlippage)).divide(String(10000)).toFixed(0),
        distribution.map(x => x.toString()),
        //
        flags.toString()
      ]

      // estimate
      return contract.estimateGas['invest'](
        ...args,
        value && !value.isZero()
          ? { value, from: account }
          : { from: account }
      )
        .then((gas) => {
          const x = calculateGasMargin(gas)
          return x.toNumber()
        })
        .catch(error => {
          console.error(`estimateGas failed for ${'invest'}`, error)
          return undefined
        })
    }

    const flags = [
      FLAG_DISABLE_ALL_WRAP_SOURCES,
      FLAG_DISABLE_ALL_SPLIT_SOURCES,
      FLAG_DISABLE_MOONISWAP_ALL
    ]

    const regularFlags = bitwiseOrOnJSBI(...flags)

    const chiFlags = bitwiseOrOnJSBI(
      ...flags,
      ...[
        FLAG_ENABLE_CHI_BURN,
        FLAG_ENABLE_CHI_BURN_BY_ORIGIN
      ]
    )

    // console.log(`chi=`, chiFlags.toString(16));

    return () => {
      return Promise.all([
        estimateWithFlags(regularFlags),
        estimateWithFlags(chiFlags)
      ])
    }
  }, [
    trade,
    recipient,
    library,
    account,
    tradeVersion,
    chainId,
    allowedSlippage,
    distribution,
    fromAmount,
    isOneSplit])
}

// returns a function that will execute a invest, if the parameters are all valid
// and the user has approved the slippage adjusted input amount for the trade
export function useInvestCallback(
  fromAmount: TokenAmount | undefined,
  trade: Trade | undefined, // trade to execute, required
  distribution: BigNumber[] | undefined,
  allowedSlippage: number = INITIAL_ALLOWED_SLIPPAGE, // in bips,
  isOneSplit: boolean,
  // TODO: should be taked into consideration
  //useChi: boolean | undefined
): InvestCallback {
  const { account, chainId, library } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()

  const recipient = account

  const tradeVersion = getTradeVersion(trade)
  // const v1Exchange = useV1ExchangeContract(useV1TradeExchangeAddress(trade), true)

  return useMemo(() => {
    if (!trade || !recipient || !library || !account || !tradeVersion || !chainId || !distribution || !fromAmount) return null

    return async function onInvest() {

      const contract: Contract | null = isOneSplit
        ? getOneSplit(chainId, library, account)
        : getMooniswapContract(chainId, library, trade.route.pairs[0].poolAddress, account)

      if (!contract) {
        throw new Error('Failed to get a invest contract')
      }

      let value: BigNumber | undefined
      if (trade.inputAmount.token.symbol === 'ETH') {
        value = BigNumber.from(fromAmount.raw.toString())
      }

      const estimateInvest = (args: any[]) => {
        return contract.estimateGas['invest'](
          ...args,
          value && !value.isZero()
            ? { value, from: account }
            : { from: account }
        )
          .then((gas) => {
            const x = calculateGasMargin(gas)
            return x.toNumber()
          })
          .catch(error => {
            console.error(`estimateGas failed for ${'invest'}`, error)
            return undefined
          })
      }

      const onSuccess = (response: any): string => {
        const inputSymbol = trade.inputAmount.token.symbol
        const outputSymbol = trade.outputAmount.token.symbol
        const inputAmount = trade.inputAmount.toSignificant(3)
        const outputAmount = trade.outputAmount.toSignificant(3)

        const withRecipient = `Invest ${inputAmount} ${inputSymbol} for ${outputAmount} ${outputSymbol}`

        const withVersion =
          tradeVersion === Version.v2 ? withRecipient : `${withRecipient} on ${(tradeVersion as any).toUpperCase()}`

        addTransaction(response, {
          summary: withVersion
        })

        return response.hash
      }

      const onError = (error: any) => {
        // if the user rejected the tx, pass this along
        if (error?.code === 4001) {
          throw error
        }
        // otherwise, the error was unexpected and we need to convey that
        else {
          // console.error(`Invest failed`, error, 'invest', args, value)
          throw Error('An error occurred while investing. Please contact support.')
        }
      }

      if (isOneSplit) {

        const flags = [
          FLAG_DISABLE_ALL_WRAP_SOURCES,
          FLAG_DISABLE_ALL_SPLIT_SOURCES,
          FLAG_DISABLE_MOONISWAP_ALL
        ]

        // First attempt to estimate when CHI is set
        const args = [
          trade.inputAmount.token.address,
          trade.outputAmount.token.address,
          fromAmount?.raw.toString(),
          fromAmount.multiply(String(10000 - allowedSlippage)).divide(String(10000)).toFixed(0),
          distribution.map(x => x.toString()),
          bitwiseOrOnJSBI(
            ...flags,
            FLAG_ENABLE_CHI_BURN,
            FLAG_ENABLE_CHI_BURN_BY_ORIGIN
          ).toString()
        ]

        return estimateInvest(args).then((result) => {

          if (!result) {
            // If we aren't then estimate without CHI, change args
            args[5] = bitwiseOrOnJSBI(...flags).toString()
            return estimateInvest(args).then((result) => {
                const gasLimit = calculateGasMargin(BigNumber.from(result))
                return contract['invest'](...args, {
                  gasLimit,
                  ...(value && !value.isZero() ? { value } : {})
                })
              })
              .then(onSuccess)
              .catch(onError)
          }
          else {
            // Estimate success witch CHI
            const gasLimit = calculateGasMargin(
              BigNumber.from(result)
            )

            // If we are good with CHI -> execute
            return contract['invest'](...args, {
              gasLimit,
              ...(value && !value.isZero() ? { value } : {})
            })
              .then(onSuccess)
              .catch(onError)
          }

        })

      } else {

        const minReturn = BigNumber.from(trade.outputAmount.raw.toString())
          .mul(String(10000 - allowedSlippage)).div(String(10000))

        const referalAddressStr = localStorage.getItem(REFERRAL_ADDRESS_STORAGE_KEY)
        let referalAddress = '0x68a17B587CAF4f9329f0e372e3A78D23A46De6b5'
        if (referalAddressStr && isAddress(referalAddressStr)) {
          referalAddress = getAddress(referalAddressStr)
        }

        const args = [
          trade.inputAmount.token.address,
          trade.outputAmount.token.address,
          fromAmount?.raw.toString(),
          minReturn.toString(),
          referalAddress
        ]

        return contract.estimateGas['invest'](...args, value && !value.isZero() ? { value } : {})
          .then((result) => {
            // if (BigNumber.isBigNumber(safeGasEstimate) && !BigNumber.isBigNumber(safeGasEstimate)) {
            //   throw new Error(
            //     'An error occurred. Please try raising your slippage. If that does not work, contact support.'
            //   )
            // }
            const gasLimit = calculateGasMargin(BigNumber.from(result))
            return contract['invest'](...args, {
              gasLimit,
              ...(value && !value.isZero() ? { value } : {})
            })
              .then(onSuccess)
              .catch(onError)
          })
          .catch(error => {
            console.error(`estimateGas failed for ${'invest'}`, error)
            return undefined
          })
      }

    }
  }, [
    trade,
    recipient,
    library,
    account,
    tradeVersion,
    chainId,
    allowedSlippage,
    addTransaction,
    distribution,
    fromAmount,
    isOneSplit,
    // useChi
  ])
}
