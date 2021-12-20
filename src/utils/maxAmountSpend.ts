import { ETHER, JSBI, TokenAmount } from '@uniswap/sdk';
import { MIN_ETH, MIN_ETH_INVEST } from '../constants';

/**
 * Given some token amount, return the max that can be spent of it
 * @param currencyAmount to return max of
 */
export function maxAmountSpend(currencyAmount?: TokenAmount): TokenAmount | undefined {
  if (!currencyAmount) return;
  if (currencyAmount.token.equals(ETHER)) {
    if (JSBI.greaterThan(currencyAmount.raw, MIN_ETH)) {
      return new TokenAmount(ETHER, JSBI.subtract(currencyAmount.raw, MIN_ETH));
    } else {
      return new TokenAmount(ETHER, JSBI.BigInt(0));
    }
  }
  return currencyAmount;
}

/**
 * Given some token amount, return the max that can be spent of it
 * @param currencyAmount to return max of
 */
export function maxAmountSpendInvest(currencyAmount?: TokenAmount): TokenAmount | undefined {
  if (!currencyAmount) return;
  if (currencyAmount.token.equals(ETHER)) {
    if (JSBI.greaterThan(currencyAmount.raw, MIN_ETH_INVEST)) {
      return new TokenAmount(ETHER, JSBI.subtract(currencyAmount.raw, MIN_ETH_INVEST));
    } else {
      return new TokenAmount(ETHER, JSBI.BigInt(0));
    }
  }
  return currencyAmount;
}
