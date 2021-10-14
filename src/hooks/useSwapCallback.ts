import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { JSBI, TokenAmount, Trade, ZERO_ADDRESS } from '@uniswap/sdk';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { INITIAL_ALLOWED_SLIPPAGE } from '../constants';
import { getTradeVersion } from '../data/V1';
import { useTransactionAdder } from '../state/transactions/hooks';
import { calculateGasMargin, getMooniswapContract } from '../utils';
import { useActiveWeb3React } from './index';
import { Version } from './useToggledVersion';
import { expNumberToStr, tokenAmountToString } from '../utils/formats';
import { useSwapEmiRouter } from './useContract';
import defaultCoins from '../constants/defaultCoins';
import { Web3Provider } from '@ethersproject/providers';
import { AppState } from '../state';
import { Field } from '../state/swap/actions';
import { useReferralAddress } from './useReferralAddress';
import { useNetworkData } from './Coins';
// function isZero(hexNumber: string) {
//   return /^0x0*$/.test(hexNumber)
// }

export type SwapCallback = null | (() => Promise<string>);

export type useSwapResult = [SwapCallback];

export function useSwap(
  chainId: number | undefined,
  fromAmount: TokenAmount | undefined,
  trade: Trade | undefined, // trade to execute, required
  distribution: BigNumber[] | undefined,
  allowedSlippage: number = INITIAL_ALLOWED_SLIPPAGE, // in bips
  formattedAmounts: { [p: string]: string },
  onReject?: () => void,
): useSwapResult {
  const swapCallback = useSwapCallback(
    fromAmount,
    trade,
    distribution,
    allowedSlippage,
    formattedAmounts,
    onReject,
  );
  return [swapCallback];
}

// returns a function that will execute a swap, if the parameters are all valid
// and the user has approved the slippage adjusted input amount for the trade
export function useSwapCallback(
  fromAmount: TokenAmount | undefined,
  trade: Trade | undefined, // trade to execute, required
  distribution: BigNumber[] | undefined,
  allowedSlippage: number = INITIAL_ALLOWED_SLIPPAGE, // in bips,
  formattedAmounts: { [p: string]: string },
  onReject?: () => void,
  // TODO: should be taked into consideration
  //useChi: boolean | undefined
): SwapCallback {
  const { account, chainId, library } = useActiveWeb3React();
  const networkData = useNetworkData();

  const addTransaction = useTransactionAdder();
  const swapState = useSelector<AppState, AppState['swap']>(state => state.swap);
  const recipient = account;
  const tradeVersion = getTradeVersion(trade);
  // const v1Exchange = useV1ExchangeContract(useV1TradeExchangeAddress(trade), true)
  const emiRouterContract = useSwapEmiRouter(
    library as Web3Provider,
    account as string | undefined,
  );

  const referralAddress = useReferralAddress();

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
      return null;
    }
    return async function onSwap() {
      const contract: Contract | null =
        trade.route.path.length <= 2 &&
        swapState[Field.INPUT].currencyId !== ZERO_ADDRESS &&
        swapState[Field.OUTPUT].currencyId !== ZERO_ADDRESS
          ? getMooniswapContract(chainId, library, trade.route.pairs[0].poolAddress, account)
          : emiRouterContract;
      getMooniswapContract(chainId, library, trade.route.pairs[0].poolAddress, account);
      if (!contract) {
        throw new Error('Failed to get a swap contract');
      }

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
        if (onReject) {
          onReject();
        }
        if (error?.code === 4001) {
          throw error;
        }
        // otherwise, the error was unexpected and we need to convey that
        else {
          // console.error(`Swap failed`, error, 'swap', args, value)
          throw Error('An error occurred while swapping. Please contact support.');
        }
      };

      const minReturn = BigNumber.from(trade.outputAmount.raw.toString())
        .mul(String(10000 - allowedSlippage))
        .div(String(10000));

      const WETH = defaultCoins.tokens.find(
        token =>
          token.symbol === networkData.currencySymbolWeth &&
          token.chainId === chainId,
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
          expNumberToStr(+formattedAmounts.INPUT * 10 ** trade?.inputAmount?.token?.decimals),
          minReturn.toString(),
          account,
          referralAddress,
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
            referralAddress,
          ];
          obj = {
            value: `0x${JSBI.BigInt(
              Math.floor(
                +formattedAmounts.INPUT *
                  // @ts-ignore
                  10 ** WETH!.decimals,
              ),
            ).toString(16)}`,
          };
        } else {
          method = 'swapExactTokensForETH';
          args = [
            expNumberToStr(+formattedAmounts.INPUT * 10 ** trade?.inputAmount?.token?.decimals),
            // t3,
            addresses,
            account,
            referralAddress,
          ];
        }
      } else {
        method = 'swapExactTokensForTokens';
        args = [
          expNumberToStr(+formattedAmounts.INPUT * 10 ** trade?.inputAmount?.token?.decimals),
          minReturn.toString(),
          addresses,
          account,
          referralAddress,
        ];
        obj = {};
      }

        return contract.estimateGas[method](...args, obj)
          .then(result => {
            // if (BigNumber.isBigNumber(safeGasEstimate) && !BigNumber.isBigNumber(safeGasEstimate)) {
            //   throw new Error(
            //     'An error occurred. Please try raising your slippage. If that does not work, contact support.'
            //   )
            // }
            const gasLimit = calculateGasMargin(BigNumber.from(result));
            return contract[method](...args, {
              gasLimit,
              ...obj,
            })
              .then(onSuccess)
              .catch(onError);
          })
          .catch(onError);
          // .catch(error => {
          //   console.error(`estimateGas failed for ${'swap'}`, error);
          //   return undefined;
          // });
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
    emiRouterContract,
    formattedAmounts.INPUT,
    swapState,
    onReject,
    referralAddress,
    // useChi,
    networkData.currencySymbolWeth,
  ]);
}
