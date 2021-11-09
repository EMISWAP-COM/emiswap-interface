import { Pair, Token, TokenAmount } from '@uniswap/sdk';
import { useCallback, useMemo } from 'react';
import { useActiveWeb3React } from '../hooks';

import { useMultipleContractSingleData } from '../state/multicall/hooks';
import { wrappedCurrency } from '../utils/wrappedCurrency';
import { useEmiRouter } from '../hooks/useContract';
import { useIsPolygonActive } from '../hooks/Coins';

export enum PairState {
  LOADING,
  NOT_EXISTS,
  EXISTS,
  INVALID,
}

export function usePairs(
  currencies: [Token | undefined, Token | undefined][],
): [PairState, Pair | null][] {
  const { chainId } = useActiveWeb3React();
  const emirouter = useEmiRouter();
  const tokens = useMemo(
    () =>
      currencies.map(([currencyA, currencyB]) => {
        return [wrappedCurrency(currencyA, chainId), wrappedCurrency(currencyB, chainId)];
      }),
    [chainId, currencies],
  );

  const calcReserve = useCalcReserve();

  const newtokens = tokens.map(([a, b]) => [a, b]).map(([a, b]) => [a?.address, b?.address]);
  const results = useMultipleContractSingleData(
    [emirouter?.address],
    emirouter!.interface,
    'getReserves',
    undefined,
    undefined,
    undefined,
    undefined,
    true,
    newtokens,
  );
  // console.log(results);
  return useMemo(() => {
    return results.map((result, i) => {
      const { result: reserves, loading } = result;
      const tokenA = tokens[i][0];
      const tokenB = tokens[i][1];
      if (loading) {
        return [PairState.LOADING, null];
      }
      if (!tokenA || !tokenB || tokenA.equals(tokenB)) {
        return [PairState.INVALID, null];
      }
      if (!reserves) {
        return [PairState.NOT_EXISTS, null];
      }
      const { _reserve0, _reserve1, poolAddresss } = reserves;
      if (_reserve0._hex === '0x00' || _reserve1._hex === '0x00') {
        return [PairState.NOT_EXISTS, null];
      }
      const [token0, token1] = [tokenA, tokenB];
      return [
        PairState.EXISTS,
        new Pair(
          new TokenAmount(token0, calcReserve(token0, _reserve0)),
          new TokenAmount(token1, calcReserve(token1, _reserve1)),
          poolAddresss,
        ),
      ];
    });
  }, [results, tokens, calcReserve]);
}

export function usePair(tokenA?: Token, tokenB?: Token): [PairState, Pair | null] {
  return usePairs([[tokenA, tokenB]])[0];
}

export function useCalcReserve() {
  const isPolygonActive = useIsPolygonActive();

  return useCallback(
    (token: Token, reserve: any) => {
      if (isPolygonActive && token.symbol === 'USDT' && reserve) {
        return +reserve.toString() * 1000000000000;
      }
      return reserve?.toString();
    },
    [isPolygonActive],
  );
}
