import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { Token, TokenAmount, Trade } from '@uniswap/sdk';
import { useMemo } from 'react';
import { REFERRAL_ADDRESS_STORAGE_KEY } from '../constants';
import { getTradeVersion } from '../data/V1';
import { useTransactionAdder } from '../state/transactions/hooks';
import { getCrowdsaleContract, isAddress } from '../utils';
import { useActiveWeb3React } from './index';
import { getAddress } from '@ethersproject/address';
import { Field } from '../state/invest/actions';

export type InvestCallback = null | (() => Promise<string>);
export type EstimateCallback = null | (() => Promise<Array<number | undefined> | undefined>);

export type useInvestResult = [InvestCallback, EstimateCallback];

export function useInvest(
  chainId: number | undefined,
  currencies: { [field in Field]?: Token },
  parsedAmounts: { [field in Field]?: TokenAmount },
): any {
  // const estimate = useEstimateCallback(fromAmount);
  const InvestCallback = useInvestCallback(currencies, parsedAmounts);
  // return [InvestCallback, estimate];
  return [InvestCallback, null];
}

export function useEstimateCallback(
  fromAmount: TokenAmount | undefined,
  trade: Trade | undefined, // trade to execute, required
  distribution: BigNumber[] | undefined,
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
  }, [trade, recipient, library, account, tradeVersion, chainId, distribution, fromAmount]);
}

// returns a function that will execute a invest, if the parameters are all valid
export function useInvestCallback(
  currencies?: { [field in Field]?: Token },
  parsedAmounts?: { [field in Field]?: TokenAmount },
): InvestCallback {
  const { account, chainId, library } = useActiveWeb3React();
  const addTransaction = useTransactionAdder();
  const recipient = account;

  return useMemo(() => {
    if (!recipient || !library || !account || !chainId || !parsedAmounts || !currencies) {
      return null;
    }

    return async function onInvest() {
      const contract: Contract | null = getCrowdsaleContract(library, account);

      if (!contract) {
        throw new Error('Failed to get a crowdsale contract');
      }

      const onSuccess = (response: any): string => {
        console.log('--onSuccess--', response);
        const inputSymbol = currencies[Field.INPUT]?.symbol;
        const outputSymbol = currencies[Field.INPUT]?.symbol;
        const inputAmount = parsedAmounts[Field.INPUT]?.toSignificant(3);
        const outputAmount = parsedAmounts[Field.OUTPUT]?.toSignificant(3);

        const withVersion = `Invest ${inputAmount} ${inputSymbol} for ${outputAmount} ${outputSymbol}`;

        addTransaction(response, {
          summary: withVersion,
        });

        return response.hash;
      };

      const onError = (error: any) => {
        console.log('--onError--', error);
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

      const referralAddressStr = localStorage.getItem(REFERRAL_ADDRESS_STORAGE_KEY);
      let referralAddress = '0x0000000000000000000000000000000000000000';
      if (referralAddressStr && isAddress(referralAddressStr)) {
        referralAddress = getAddress(referralAddressStr);
      }

      const amount =
        parseFloat(<string>parsedAmounts[Field.INPUT]?.raw.toString()) *
        Math.pow(10, <number>currencies[Field.INPUT]?.decimals);

      return contract
        .buy(currencies[Field.INPUT]?.address, amount, referralAddress)
        .then(onSuccess)
        .catch(onError);
    };
  }, [recipient, library, account, chainId, addTransaction, parsedAmounts, currencies]);
}
