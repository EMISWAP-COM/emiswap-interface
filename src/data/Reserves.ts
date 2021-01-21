import { TokenAmount, Pair, Token } from '@uniswap/sdk';
import { useMemo } from 'react';
import { useActiveWeb3React } from '../hooks';

import { useMultipleContractSingleData } from '../state/multicall/hooks';
import { wrappedCurrency } from '../utils/wrappedCurrency';
import { useEmiRouter } from '../hooks/useContract';

export enum PairState {
  LOADING,
  NOT_EXISTS,
  EXISTS,
  INVALID,
}
// let PAIR_ADDRESS_CACHE: { [token0Address: string]: { [token1Address: string]: string } } = {};
// const getAddress = (
//   tokenA: Token,
//   tokenB: Token,
//   factoryContract: Contract | null,
//   emirouter: Contract | null,
// ): string => {
//   const tokens = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]; // does safety checks
//
//   if (PAIR_ADDRESS_CACHE?.[tokens[0].address]?.[tokens[1].address] === undefined) {
//     PAIR_ADDRESS_CACHE = {
//       ...PAIR_ADDRESS_CACHE,
//       [tokens[0].address]: {
//         ...PAIR_ADDRESS_CACHE?.[tokens[0].address],
//         [tokens[1].address]: getCreate2Address(
//           FACTORY_ADDRESS,
//           keccak256(
//             ['bytes'],
//             [pack(['address', 'address'], [tokens[0].address, tokens[1].address])],
//           ),
//           INIT_CODE_HASH,
//         ),
//       },
//     };
//   }
//   return PAIR_ADDRESS_CACHE[tokens[0].address][tokens[1].address];
// };

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

  // const pairAddresses = useMemo(() => {
  //   return tokens.map(([tokenA, tokenB]) => {
  //     return tokenA && tokenB && !tokenA.equals(tokenB)
  //       ? getAddress(tokenA, tokenB, factory, emirouter)
  //       : undefined;
  //   });
  // }, [tokens]);

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
  return useMemo(() => {
    return results.map((result, i) => {
      const { result: reserves, loading } = result;
      const tokenA = tokens[i][0];
      const tokenB = tokens[i][1];
      if (loading) return [PairState.LOADING, null];
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
