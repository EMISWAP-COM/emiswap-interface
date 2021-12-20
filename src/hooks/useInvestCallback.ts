import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { ETHER, JSBI, Token, TokenAmount, Trade } from '@uniswap/sdk';
import { useMemo } from 'react';
import { getTradeVersion } from '../data/V1';
import { useTransactionAdder } from '../state/transactions/hooks';
import { getCrowdsaleContract } from '../utils';
import { useActiveWeb3React } from './index';
import { Field } from '../state/invest/actions';
// import { toHex } from '../utils/v1SwapArguments';
import { tokenAmountToString } from '../utils/formats';
import { useReferralAddress } from './useReferralAddress';

export type InvestCallback = null | (() => Promise<string>);
export type EstimateCallback = null | (() => Promise<Array<number | undefined> | undefined>);

export type useInvestResult = [InvestCallback, EstimateCallback];

export function useInvest(
  chainId: number | undefined,
  currencies: { [field in Field]?: Token },
  parsedAmounts: { [field in Field]?: TokenAmount },
  inputField: boolean,
): any {
  const InvestCallback = useInvestCallback(currencies, parsedAmounts, inputField);
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
  inputField?: boolean,
): InvestCallback {
  const { account, chainId, library } = useActiveWeb3React();
  const addTransaction = useTransactionAdder();
  const recipient = account;
  const referralAddress = useReferralAddress();
  return useMemo(() => {
    if (!recipient || !library || !account || !chainId || !parsedAmounts || !currencies) {
      return null;
    }

    const inputCurrency = !inputField ? currencies[Field.INPUT] : currencies[Field.OUTPUT];
    const outputCurrency = inputField ? currencies[Field.INPUT] : currencies[Field.OUTPUT];
    const inputParseAmount = !inputField ? parsedAmounts[Field.INPUT] : parsedAmounts[Field.OUTPUT];

    return async function onInvest() {
      // @ts-ignore
      const contract: Contract | null = getCrowdsaleContract(library, account, chainId);

      if (!contract) {
        throw new Error('Failed to get a crowdsale contract');
      }

      const onSuccess = (response: any): string => {
        const inputSymbol = inputCurrency?.symbol;
        const outputSymbol = currencies[Field.OUTPUT]?.symbol;
        const inputAmount = tokenAmountToString(inputParseAmount, 3);
        const outputAmount = tokenAmountToString(parsedAmounts[Field.OUTPUT], 3);

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

      const amount: string =
        (inputCurrency?.decimals && inputCurrency?.decimals !== 0
          ? inputParseAmount
              ?.multiply(
                JSBI.exponentiate(
                  JSBI.BigInt(10),
                  JSBI.BigInt(Math.floor(inputCurrency?.decimals)),
                ),
              )
              .toFixed(0)
          : inputParseAmount?.toFixed(0)) || '';

      const isETH =
        inputCurrency?.address.toUpperCase() === ETHER.address.toUpperCase() ||
        outputCurrency?.address.toUpperCase() === ETHER.address.toUpperCase();
      if (isETH) {
        // const amountETH = toHex(new TokenAmount(ETHER, JSBI.BigInt(amount)));
        const valueAmount: string =
          (currencies[Field.INPUT]?.decimals && currencies[Field.INPUT]?.decimals !== 0
            ? parsedAmounts[Field.INPUT]
                ?.multiply(
                  JSBI.exponentiate(
                    JSBI.BigInt(10),
                    JSBI.BigInt(Math.floor(currencies[Field.INPUT]?.decimals as number)),
                  ),
                )
                .toFixed(0)
            : parsedAmounts[Field.INPUT]?.toFixed(0)) || '';
        console.log(
          '.....referralAddress, amount, inputField, valueAmount',
          referralAddress,
          amount,
          inputField,
          valueAmount.toString(),
        );
        return contract
          .buyWithETH(referralAddress, amount, inputField, { value: BigNumber.from(valueAmount) })
          .then(onSuccess)
          .catch(onError);
      } else {
        return contract
          .buy(
            inputField ? outputCurrency?.address : inputCurrency?.address,
            BigNumber.from(amount),
            referralAddress,
            inputField,
          )
          .then(onSuccess)
          .catch(onError);
      }
    };
  }, [
    recipient,
    library,
    account,
    chainId,
    addTransaction,
    parsedAmounts,
    currencies,
    inputField,
    referralAddress,
  ]);
}
