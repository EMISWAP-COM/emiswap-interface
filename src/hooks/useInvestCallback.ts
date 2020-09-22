import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { TokenAmount, Trade } from '@uniswap/sdk';
import { useMemo } from 'react';
import { INITIAL_ALLOWED_SLIPPAGE, REFERRAL_ADDRESS_STORAGE_KEY } from '../constants';
import { getTradeVersion } from '../data/V1';
import { useTransactionAdder } from '../state/transactions/hooks';
import { calculateGasMargin, getMooniswapContract, isAddress } from '../utils';
import { useActiveWeb3React } from './index';
import { Version } from './useToggledVersion';
import { getAddress } from '@ethersproject/address';

export type InvestCallback = null | (() => Promise<string>);
export type EstimateCallback = null | (() => Promise<Array<number | undefined> | undefined>);

export type useInvestResult = [InvestCallback, EstimateCallback];

export function useInvest(
  chainId: number | undefined,
  fromAmount: TokenAmount | undefined,
  trade: Trade | undefined, // trade to execute, required
  distribution: BigNumber[] | undefined,
  allowedSlippage: number = INITIAL_ALLOWED_SLIPPAGE, // in bips
): useInvestResult {
  const estimate = useEstimateCallback(fromAmount, trade, distribution, allowedSlippage);
  const InvestCallback = useInvestCallback(fromAmount, trade, distribution, allowedSlippage);
  return [InvestCallback, estimate];
}

export function useEstimateCallback(
  fromAmount: TokenAmount | undefined,
  trade: Trade | undefined, // trade to execute, required
  distribution: BigNumber[] | undefined,
  allowedSlippage: number = INITIAL_ALLOWED_SLIPPAGE, // in bips,
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

    return () => Promise.resolve(undefined);
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
  ]);
}

// returns a function that will execute a invest, if the parameters are all valid
// and the user has approved the slippage adjusted input amount for the trade
export function useInvestCallback(
  fromAmount: TokenAmount | undefined,
  trade: Trade | undefined, // trade to execute, required
  distribution: BigNumber[] | undefined,
  allowedSlippage: number = INITIAL_ALLOWED_SLIPPAGE, // in bips,
  // TODO: should be taked into consideration
  //useChi: boolean | undefined
): InvestCallback {
  const { account, chainId, library } = useActiveWeb3React();
  const addTransaction = useTransactionAdder();

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
      return null;

    return async function onInvest() {
      const contract: Contract | null = getMooniswapContract(
        chainId,
        library,
        trade.route.pairs[0].poolAddress,
        account,
      );

      if (!contract) {
        throw new Error('Failed to get a crowdsale contract');
      }

      let value: BigNumber | undefined;
      if (trade.inputAmount.token.symbol === 'ETH') {
        value = BigNumber.from(fromAmount.raw.toString());
      }

      const onSuccess = (response: any): string => {
        const inputSymbol = trade.inputAmount.token.symbol;
        const outputSymbol = trade.outputAmount.token.symbol;
        const inputAmount = trade.inputAmount.toSignificant(3);
        const outputAmount = trade.outputAmount.toSignificant(3);

        const withRecipient = `Invest ${inputAmount} ${inputSymbol} for ${outputAmount} ${outputSymbol}`;

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
          // console.error(`Invest failed`, error, 'invest', args, value)
          throw Error('An error occurred while investing. Please contact support.');
        }
      };

      const minReturn = BigNumber.from(trade.outputAmount.raw.toString())
        .mul(String(10000 - allowedSlippage))
        .div(String(10000));

      const referalAddressStr = localStorage.getItem(REFERRAL_ADDRESS_STORAGE_KEY);
      let referalAddress = '0x68a17B587CAF4f9329f0e372e3A78D23A46De6b5';
      if (referalAddressStr && isAddress(referalAddressStr)) {
        referalAddress = getAddress(referalAddressStr);
      }

      const args = [
        trade.inputAmount.token.address,
        trade.outputAmount.token.address,
        fromAmount?.raw.toString(),
        minReturn.toString(),
        referalAddress,
      ];

      return contract.estimateGas['invest'](...args, value && !value.isZero() ? { value } : {})
        .then(result => {
          const gasLimit = calculateGasMargin(BigNumber.from(result));
          return contract['invest'](...args, {
            gasLimit,
            ...(value && !value.isZero() ? { value } : {}),
          })
            .then(onSuccess)
            .catch(onError);
        })
        .catch(error => {
          console.error(`estimateGas failed for ${'invest'}`, error);
          return undefined;
        });
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
    // useChi
  ]);
}
