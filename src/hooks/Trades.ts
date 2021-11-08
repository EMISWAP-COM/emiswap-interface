import { Pair, Token, TokenAmount, Trade } from '@uniswap/sdk';
import flatMap from 'lodash.flatmap';
import { useMemo } from 'react';

import { BASES_TO_CHECK_TRADES_AGAINST, KOVAN_WETH } from '../constants';
import { PairState } from '../data-mooniswap/Reserves'; // usePairs
import { usePairs } from '../data/Reserves'; // usePairs
import { wrappedCurrency } from '../utils/wrappedCurrency';

import { useActiveWeb3React } from './index';

function useAllCommonPairs(currencyA?: Token, currencyB?: Token): Pair[] {
  const { chainId } = useActiveWeb3React();

  const bases: Token[] = chainId ? BASES_TO_CHECK_TRADES_AGAINST[chainId] : [];
  let [tokenA, tokenB] = chainId
    ? [wrappedCurrency(currencyA, chainId), wrappedCurrency(currencyB, chainId)]
    : [undefined, undefined];
  if (tokenA?.isEther) {
    tokenA = KOVAN_WETH;
  }

  const basePairs: [Token, Token][] = useMemo(
    () =>
      flatMap(bases, (base): [Token, Token][] => bases.map(otherBase => [base, otherBase])).filter(
        ([t0, t1]) => t0.address !== t1.address,
      ),
    [bases],
  );

  const allPairCombinations: [Token, Token][] = useMemo(
    () =>
      tokenA && tokenB
        ? [
            // the direct pair
            [tokenA, tokenB],
            // token A against all bases
            ...bases.map((base): [Token | undefined, Token] => [tokenA, base]),
            // token B against all bases
            ...bases.map((base): [Token | undefined, Token] => [tokenB, base]),
            // each base against all bases
            ...basePairs,
          ]
            .filter((tokens): tokens is [Token, Token] => Boolean(tokens[0] && tokens[1]))
            .filter(([t0, t1]) => t0.address !== t1.address)
        : [],
    [tokenA, tokenB, bases, basePairs],
  );

  // all_exist
  let allPairs = usePairs(allPairCombinations);
  // only pass along valid pairs, non-duplicated pairs
  return useMemo(
    () =>
      Object.values(
        allPairs
          // filter out invalid pairs
          .filter((result): result is [PairState.EXISTS, Pair] => {
            return Boolean(result[0] === PairState.EXISTS && result[1]);
          })
          // filter out duplicated pairs
          .reduce<{ [pairAddress: string]: Pair }>((memo, [, curr]) => {
            memo[curr.liquidityToken.address] = memo[curr.liquidityToken.address] ?? curr;
            return memo;
          }, {}),
      ),
    [allPairs],
  );
}

/**
 * Returns the best trade for the exact amount of tokens in to the given token out
 */
export function useTradeExactIn(currencyAmountIn?: TokenAmount, currencyOut?: Token): Trade | null {
  const allowedPairs = useAllCommonPairs(currencyAmountIn?.token, currencyOut);
  return useMemo(() => {
    if (currencyAmountIn && currencyOut && allowedPairs.length > 0) {
      // console.log(currencyAmountIn, currencyOut);
      // console.log(allowedPairs);

      const bestTrade = Trade.bestTradeExactIn(allowedPairs, currencyAmountIn, currencyOut, {
        maxHops: 3,
        maxNumResults: 1,
      })[0] ?? null;

      // console.log(bestTrade);

      return bestTrade;
    }
    return null;
  }, [allowedPairs, currencyAmountIn, currencyOut]);
}

/**
 * Returns the best trade for the token in to the exact amount of token out
 */
export function useTradeExactOut(
  currencyIn?: Token,
  currencyAmountOut?: TokenAmount,
): Trade | null {
  const allowedPairs = useAllCommonPairs(currencyIn, currencyAmountOut?.token);

  return useMemo(() => {
    if (currencyIn && currencyAmountOut && allowedPairs.length > 0) {
      return (
        Trade.bestTradeExactOut(allowedPairs, currencyIn, currencyAmountOut, {
          maxHops: 3,
          maxNumResults: 1,
        })[0] ?? null
      );
    }
    return null;
  }, [allowedPairs, currencyIn, currencyAmountOut]);
}
