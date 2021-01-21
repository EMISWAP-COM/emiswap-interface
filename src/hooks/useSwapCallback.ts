import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { JSBI, TokenAmount, Trade, ZERO_ADDRESS } from '@uniswap/sdk';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { INITIAL_ALLOWED_SLIPPAGE } from '../constants';
import { getTradeVersion } from '../data/V1';
import { useTransactionAdder } from '../state/transactions/hooks';
import {
  calculateGasMargin,
  getMooniswapContract,
  getOneSplit,
} from '../utils';
import { useActiveWeb3React } from './index';
import { Version } from './useToggledVersion';
import {
  FLAG_DISABLE_ALL_SPLIT_SOURCES,
  FLAG_DISABLE_ALL_WRAP_SOURCES,
  FLAG_DISABLE_MOONISWAP_ALL,
  FLAG_ENABLE_CHI_BURN,
  FLAG_ENABLE_CHI_BURN_BY_ORIGIN,
} from '../constants/one-split';
import { MIN_CHI_BALANCE, useHasChi, useIsChiApproved } from './useChi';
import { ApprovalState } from './useApproveCallback';
import { tokenAmountToString } from '../utils/formats';
import { useSwapEmiRouter } from './useContract';
import defaultCoins from '../constants/defaultCoins';
import { Web3Provider } from '@ethersproject/providers';
import { AppState } from '../state';
import { Field } from '../state/swap/actions';
// function isZero(hexNumber: string) {
//   return /^0x0*$/.test(hexNumber)
// }

const bitwiseOrOnJSBI = (...items: JSBI[]): JSBI => {
  return items.reduce((acc, val) => {
    return JSBI.bitwiseOr(acc, val);
  }, JSBI.BigInt(0x0));
};

export type SwapCallback = null | (() => Promise<string>);
export type EstimateCallback = null | (() => Promise<Array<number | undefined> | undefined>);

export type useSwapResult = [boolean, SwapCallback, EstimateCallback];

export function useSwap(
  chainId: number | undefined,
  fromAmount: TokenAmount | undefined,
  trade: Trade | undefined, // trade to execute, required
  distribution: BigNumber[] | undefined,
  allowedSlippage: number = INITIAL_ALLOWED_SLIPPAGE, // in bips
  formattedAmounts: { [p: string]: string },
): useSwapResult {
  const isOneSplit = false;
  const [isChiApproved] = useIsChiApproved(chainId || 0);
  const hasEnoughChi = useHasChi(MIN_CHI_BALANCE);

  // TODO: Get from storage as well
  const applyChi = !!(isOneSplit && isChiApproved === ApprovalState.APPROVED && hasEnoughChi);

  const estimate = useEstimateCallback(
    fromAmount,
    trade,
    distribution,
    allowedSlippage,
    isOneSplit,
  );
  const swapCallback = useSwapCallback(
    fromAmount,
    trade,
    distribution,
    allowedSlippage,
    isOneSplit,
    formattedAmounts,
    //applyChi
  );
  console.log(`==========>swapCallback`, swapCallback);
  return [applyChi, swapCallback, estimate];
}

export function useEstimateCallback(
  fromAmount: TokenAmount | undefined,
  trade: Trade | undefined, // trade to execute, required
  distribution: BigNumber[] | undefined,
  allowedSlippage: number = INITIAL_ALLOWED_SLIPPAGE, // in bips,
  isOneSplit: boolean,
): EstimateCallback {
  const { account, chainId, library } = useActiveWeb3React();
  const recipient = account;

  const tradeVersion = getTradeVersion(trade);

  return useMemo(() => {
    if (
      !trade ||
      !recipient ||
      !library ||
      !account ||
      !tradeVersion ||
      !chainId ||
      !distribution ||
      !fromAmount
    )
      return () => Promise.resolve(undefined);

    const contract: Contract | null = getOneSplit(chainId, library, account);
    if (!isOneSplit) {
      return () => Promise.resolve(undefined);
    }

    let value: BigNumber | undefined;
    if (trade.inputAmount.token.symbol === 'ETH') {
      value = BigNumber.from(fromAmount.raw.toString());
    }

    const estimateWithFlags = (flags: JSBI): Promise<number | undefined> => {
      const args: any[] = [
        trade.inputAmount.token.address,
        trade.outputAmount.token.address,
        fromAmount?.raw.toString(),
        fromAmount
          .multiply(String(10000 - allowedSlippage))
          .divide(String(10000))
          .toFixed(0),
        distribution.map(x => x.toString()),
        //
        flags.toString(),
      ];

      // estimate
      return contract.estimateGas['swap'](
        ...args,
        value && !value.isZero() ? { value, from: account } : { from: account },
      )
        .then(gas => {
          const x = calculateGasMargin(gas);
          return x.toNumber();
        })
        .catch(error => {
          console.error(`estimateGas failed for swap`, error);
          return undefined;
        });
    };

    const flags = [
      FLAG_DISABLE_ALL_WRAP_SOURCES,
      FLAG_DISABLE_ALL_SPLIT_SOURCES,
      FLAG_DISABLE_MOONISWAP_ALL,
    ];

    const regularFlags = bitwiseOrOnJSBI(...flags);

    const chiFlags = bitwiseOrOnJSBI(
      ...flags,
      ...[FLAG_ENABLE_CHI_BURN, FLAG_ENABLE_CHI_BURN_BY_ORIGIN],
    );

    // console.log(`chi=`, chiFlags.toString(16));

    return () => {
      return Promise.all([estimateWithFlags(regularFlags), estimateWithFlags(chiFlags)]);
    };
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
    isOneSplit,
  ]);
}

// returns a function that will execute a swap, if the parameters are all valid
// and the user has approved the slippage adjusted input amount for the trade
export function useSwapCallback(
  fromAmount: TokenAmount | undefined,
  trade: Trade | undefined, // trade to execute, required
  distribution: BigNumber[] | undefined,
  allowedSlippage: number = INITIAL_ALLOWED_SLIPPAGE, // in bips,
  isOneSplit: boolean,
  formattedAmounts: { [p: string]: string },
  // TODO: should be taked into consideration
  //useChi: boolean | undefined
): SwapCallback {
  const { account, chainId, library } = useActiveWeb3React();
  const addTransaction = useTransactionAdder();
  const swapState = useSelector<AppState, AppState['swap']>(state => state.swap);
  const recipient = account;
  const tradeVersion = getTradeVersion(trade);
  // const v1Exchange = useV1ExchangeContract(useV1TradeExchangeAddress(trade), true)
  const emiRouterContract = useSwapEmiRouter(
    library as Web3Provider,
    account as string | undefined,
  );
console.log(`==========>emiRouterContract`, emiRouterContract)
  return useMemo(() => {
    if (
      !trade ||
      !recipient ||
      !library ||
      !account ||
      !tradeVersion ||
      !chainId ||
      !distribution ||
      !fromAmount
    ) {
      console.log(`==========>trade`, trade)
      console.log(`==========>recipient`, recipient)
      console.log(`==========>library`, library)
      console.log(`==========>account`, account)
      console.log(`==========>tradeVersion`, tradeVersion)
      console.log(`==========>chainId`, chainId)
      console.log(`==========>distribution`, distribution)
      console.log(`==========>fromAmount`, fromAmount)
      console.log(`==========>1231231212`, 1231231212)
      return null;
    }
    return async function onSwap() {
      const contract: Contract | null = isOneSplit
        ? getOneSplit(chainId, library, account)
        : trade.route.path.length <= 2 &&
          swapState[Field.INPUT].currencyId !== ZERO_ADDRESS &&
          swapState[Field.OUTPUT].currencyId !== ZERO_ADDRESS
        ? getMooniswapContract(chainId, library, trade.route.pairs[0].poolAddress, account)
        : emiRouterContract;
      getMooniswapContract(chainId, library, trade.route.pairs[0].poolAddress, account);
      if (!contract) {
        throw new Error('Failed to get a swap contract');
      }
      let value: BigNumber | undefined;
      if (trade.inputAmount.token.symbol === 'ETH') {
        value = BigNumber.from(fromAmount.raw.toString());
      }
      const estimateSwap = (args: any[]) => {
        console.log(`==========>contract`, contract)
        console.log(`==========>args`, args)
        return contract.estimateGas['swapTokensForExactETH'](
          ...args,
          value && !value.isZero() ? { value, from: account } : { from: account },
        )
          .then(gas => {
            const x = calculateGasMargin(gas);
            return x.toNumber();
          })
          .catch(error => {
            console.error(`estimateGas failed for swap`, error);
            return undefined;
          });
      };

      const onSuccess = (response: any): string => {
        const inputSymbol = trade.inputAmount.token.symbol;
        const outputSymbol = trade.outputAmount.token.symbol;
        const inputAmount = tokenAmountToString(trade.inputAmount, 3);
        const outputAmount = tokenAmountToString(trade.outputAmount, 3);

        const withRecipient = `Swap ${inputAmount} ${inputSymbol} for ${outputAmount} ${outputSymbol}`;

        const withVersion =
          tradeVersion === Version.v2
            ? withRecipient
            : `${withRecipient} on ${(tradeVersion as any).toUpperCase()}`;

        addTransaction(response, {
          summary: withVersion,
        });

        return response.hash;
      };

      const onError = (error: any) => {
        // if the user rejected the tx, pass this along
        if (error?.code === 4001) {
          throw error;
        }
        // otherwise, the error was unexpected and we need to convey that
        else {
          // console.error(`Swap failed`, error, 'swap', args, value)
          throw Error('An error occurred while swapping. Please contact support.');
        }
      };

      if (isOneSplit) {
        const flags = [
          FLAG_DISABLE_ALL_WRAP_SOURCES,
          FLAG_DISABLE_ALL_SPLIT_SOURCES,
          FLAG_DISABLE_MOONISWAP_ALL,
        ];
        // First attempt to estimate when CHI is set
        const args = [
          trade.inputAmount.token.address,
          trade.outputAmount.token.address,
          fromAmount?.raw.toString(),
          fromAmount
            .multiply(String(10000 - allowedSlippage))
            .divide(String(10000))
            .toFixed(0),
          distribution.map(x => x.toString()),
          bitwiseOrOnJSBI(
            ...flags,
            FLAG_ENABLE_CHI_BURN,
            FLAG_ENABLE_CHI_BURN_BY_ORIGIN,
          ).toString(),
        ];
        return estimateSwap(args).then(result => {
          if (!result) {
            // If we aren't then estimate without CHI, change args
            args[5] = bitwiseOrOnJSBI(...flags).toString();
            return estimateSwap(args)
              .then(result => {
                const gasLimit = calculateGasMargin(BigNumber.from(result));
                return contract['swapTokensForExactETH'](...args, {
                  gasLimit,
                  ...(value && !value.isZero() ? { value } : {}),
                });
              })
              .then(onSuccess)
              .catch(onError);
          } else {
            // Estimate success witch CHI
            const gasLimit = calculateGasMargin(BigNumber.from(result));

            // If we are good with CHI -> execute
            return contract['swapTokensForExactETH'](...args, {
              gasLimit,
              ...(value && !value.isZero() ? { value } : {}),
            })
              .then(onSuccess)
              .catch(onError);
          }
        });
      } else {
        console.log(`==========>contract`, contract)
        const minReturn = BigNumber.from(trade.outputAmount.raw.toString())
          .mul(String(10000 - allowedSlippage))
          .div(String(10000));

        const WETH = defaultCoins.tokens.find(
          token => token.symbol === 'WETH' && token.chainId === chainId,
        );

        let args: any[] = [];
        let method = 'swap';
        let obj = {};

        const addresses = trade.route.path.map(el => el.address);
        if (
          trade.route.path.length <= 2 &&
          swapState[Field.INPUT].currencyId !== ZERO_ADDRESS &&
          swapState[Field.OUTPUT].currencyId !== ZERO_ADDRESS
        ) {
          method = 'swap';
          args = [
            ...addresses,
            (+formattedAmounts.INPUT * 10 ** trade?.inputAmount?.token?.decimals).toString(),
            minReturn.toString(),
            account,
            ZERO_ADDRESS,
          ];
          obj = {};
        } else if (
          trade?.inputAmount?.token?.isEther ||
          trade?.outputAmount?.token?.isEther ||
          swapState[Field.INPUT].currencyId === ZERO_ADDRESS ||
          swapState[Field.OUTPUT].currencyId === ZERO_ADDRESS
        ) {
          if (
            trade?.inputAmount?.token?.isEther ||
            swapState[Field.INPUT].currencyId === ZERO_ADDRESS
          ) {
            method = 'swapExactETHForTokens';
            args = [
              minReturn.toString(), //t3,
              addresses,
              account,
              ZERO_ADDRESS,
            ];
            obj = {
              value: `0x${BigInt(+formattedAmounts.INPUT * 10 ** WETH!.decimals).toString(16)}`,
            };
          } else {
            method = 'swapExactTokensForETH';
            args = [
              (+formattedAmounts.INPUT * 10 ** trade?.inputAmount?.token?.decimals).toString(),
              // t3,
              addresses,
              account,
              ZERO_ADDRESS,
            ];
          }
        } else {
          method = 'swapExactTokensForTokens';
          args = [
            (+formattedAmounts.INPUT * 10 ** trade?.inputAmount?.token?.decimals).toString(),
            minReturn.toString(),
            addresses,
            account,
            ZERO_ADDRESS,
          ];
          obj = {};
        }
        console.log(`==========>entereed`);
console.log(`==========>args`, args)
        console.log(`==========>method`, method)
        console.log(`==========>obj`, obj)
        return contract.estimateGas[method](...args, obj)
          .then(result => {
            // if (BigNumber.isBigNumber(safeGasEstimate) && !BigNumber.isBigNumber(safeGasEstimate)) {
            //   throw new Error(
            //     'An error occurred. Please try raising your slippage. If that does not work, contact support.'
            //   )
            // }
            console.log(`==========>result`, result)
            const gasLimit = calculateGasMargin(BigNumber.from(result));
            contract[method](...args, {
              gasLimit,
              ...obj,
            })
              .then(onSuccess)
              .catch(onError);
          })
          .catch(error => {
            console.error(`estimateGas failed for ${'swap'}`, error);
            return undefined;
          });
      }
    };
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
    emiRouterContract,
    formattedAmounts.INPUT,
    swapState,
    // useChi
  ]);
}
