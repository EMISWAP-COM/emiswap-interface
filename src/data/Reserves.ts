import { TokenAmount, Pair, Token } from '@uniswap/sdk';
import { useMemo } from 'react';
import { useActiveWeb3React } from '../hooks';

import { useMultipleContractSingleData } from '../state/multicall/hooks';
import { wrappedCurrency } from '../utils/wrappedCurrency';
import { useEmiRouter, useMooniswapV1FactoryContract } from '../hooks/useContract';
import { Contract } from '@ethersproject/contracts';

// const PAIR_INTERFACE = new Interface(IEmiswapABI);

export enum PairState {
  LOADING,
  NOT_EXISTS,
  EXISTS,
  INVALID,
}
let PAIR_ADDRESS_CACHE: { [token0Address: string]: { [token1Address: string]: string } } = {};
const getAddress = (
  tokenA: Token,
  tokenB: Token,
  factoryContract: Contract | null,
  emirouter: Contract | null,
): string => {
  const tokens = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA];
  if (PAIR_ADDRESS_CACHE?.[tokens[0].address]?.[tokens[1].address] === undefined) {
    const token2Address = factoryContract === null ? '' : emirouter?.address;
    PAIR_ADDRESS_CACHE = {
      ...PAIR_ADDRESS_CACHE,
      [tokens[0].address]: {
        ...PAIR_ADDRESS_CACHE?.[tokens[0].address],
        [tokens[1].address]: token2Address,
      },
    };
  }
  return PAIR_ADDRESS_CACHE[tokens[0].address][tokens[1].address];
};

export function usePairs(
  currencies: [Token | undefined, Token | undefined][],
): [PairState, Pair | null][] {
  const { chainId } = useActiveWeb3React();
  const factory = useMooniswapV1FactoryContract();
  const emirouter = useEmiRouter();
  const tokens = useMemo(
    () =>
      currencies.map(([currencyA, currencyB]) => [
        wrappedCurrency(currencyA, chainId),
        wrappedCurrency(currencyB, chainId),
      ]),
    [chainId, currencies],
  );

  const pairAddresses = useMemo(() => {
    return tokens.map(([tokenA, tokenB]) => {
      return tokenA && tokenB && !tokenA.equals(tokenB)
        ? getAddress(tokenA, tokenB, factory, emirouter)
        : undefined;
    });
  }, [tokens, emirouter, factory]);
  const existTokens = tokens.filter(([tokenA, tokenB]) => {
    return tokenB && tokenA && !tokenB.equals(tokenA);
  });

  let [a, b] = existTokens[0];
  // const newtokens = existTokens.map(([a,b]) => [a,b])
  const tokenA = `${a?.address}`;
  const tokenB = `${b?.address}`;
  const results = useMultipleContractSingleData(
    pairAddresses,
    emirouter!.interface,
    'getReserves',
    [a?.address, b?.address],
    undefined,
    tokenA,
    tokenB,
  );
  // 15.01
  return useMemo(() => {
    return results.map((result, i) => {
      const { result: reserves, loading } = result;
      const tokenA = tokens[i][0];
      const tokenB = tokens[i][1];
      if (loading) return [PairState.LOADING, null];
      if (!tokenA || !tokenB || tokenA.equals(tokenB)) return [PairState.INVALID, null];
      if (!reserves) return [PairState.NOT_EXISTS, null];
      const { _reserve0, _reserve1, poolAddresss } = reserves;
      if (_reserve0._hex === '0x00' || _reserve1._hex === '0x00') {
        return [PairState.NOT_EXISTS, null];
      }
      const [token0, token1] = [tokenA, tokenB];
      return [
        PairState.EXISTS,
        new Pair(
          new TokenAmount(token0, _reserve0?.toString()),
          new TokenAmount(token1, _reserve1?.toString()),
          poolAddresss,
        ),
      ];
    });
  }, [results, tokens]);
}

export function usePair(tokenA?: Token, tokenB?: Token): [PairState, Pair | null] {
  return usePairs([[tokenA, tokenB]])[0];
}
