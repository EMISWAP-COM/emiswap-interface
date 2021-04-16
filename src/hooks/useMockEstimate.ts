import { useSelector } from 'react-redux';
import { AppState } from '../state';
import { useCurrency } from './Tokens';
import { JSBI, ZERO_ADDRESS } from '@uniswap/sdk';
import { useCurrencyBalances } from '../state/wallet/hooks';
import { useActiveWeb3React } from './index';

export const useMockEstimate = (type: string) => {
  const gasPrice = useSelector((state: AppState) => state.stats.gasPrice.safe_gas_price);
  const { account } = useActiveWeb3React();
  const eth = useCurrency(ZERO_ADDRESS);
  const relevantTokenBalances = useCurrencyBalances(account ?? undefined, [eth ?? undefined]);
  let isEnough = true;
  if (relevantTokenBalances[0] && gasPrice) {
    const ethAmount = relevantTokenBalances[0];
    switch (type) {
      case 'swap':
        isEnough = JSBI.greaterThan(
          JSBI.BigInt(Math.floor((ethAmount?.toExact() as any) * 10 ** 18)),
          JSBI.BigInt(Math.floor(gasPrice * 10 ** 9 * window['env'].REACT_APP_MIN_GAS_FOR_SWAP))
        );
        break;
      case 'pool':
        isEnough = JSBI.greaterThan(
          JSBI.BigInt(Math.floor((ethAmount?.toExact() as any) * 10 ** 18)),
          JSBI.BigInt(Math.floor(gasPrice * 10 ** 9 * window['env'].REACT_APP_MIN_GAS_FOR_POOL))
        );
        break;
      case 'invest':
        isEnough = JSBI.greaterThan(
          JSBI.BigInt(Math.floor((ethAmount?.toExact() as any) * 10 ** 18)),
          JSBI.BigInt(Math.floor(gasPrice * 10 ** 9 * window['env'].REACT_APP_MIN_GAS_FOR_INVEST))
        );
        break;
    }
  }

  return [isEnough];
};
