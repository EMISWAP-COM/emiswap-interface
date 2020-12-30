import { Pair, Token, TokenAmount } from '@uniswap/sdk';
import { useMemo } from 'react';

import { useSingleContractMultipleData } from '../state/multicall/hooks';
import { useMooniswapV1HelperContract } from '../hooks/useContract';

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export enum PairState {
  LOADING,
  NOT_EXISTS,
  EXISTS,
  INVALID,
}

const isPairDuplicated = (pairs: Pair[], tokenA: Token, tokenB: Token): boolean => {
  for (const pair of pairs) {
    const pairAddresses: string[] = [pair.token0.address, pair.token1.address];

    if (pairAddresses.includes(tokenA.address) && pairAddresses.includes(tokenB.address)) {
      return true;
    }
  }

  return false;
};

export function usePairs(
  currencies: [Token | undefined, Token | undefined][],
): [PairState, Pair | null][] {
  const tokenAList: string[] = [];
  const tokenBList: string[] = [];
  const allTokenAList: (Token | undefined)[] = [];
  const allTokenBList: (Token | undefined)[] = [];
  for (let i = 0; i < currencies.length; i++) {
    const [tokenA, tokenB] = currencies[i];
    allTokenAList.push(tokenA);
    allTokenBList.push(tokenB);
    if (!tokenA || !tokenB) continue;
    if (tokenA.equals(tokenB)) continue;
    tokenAList.push(tokenA.address);
    tokenBList.push(tokenB.address);
  }
  console.log('@@@ allTokenAList -> ', allTokenAList)
  console.log('@@@ allTokenBList -> ', allTokenBList)

  const pairsPerReq = 50;
  const batches = Math.ceil(tokenAList.length / pairsPerReq);
  const callDataList = [];
  for (let i = 0; i < batches; i++) {
    const inputs = [tokenAList.splice(0, pairsPerReq), tokenBList.splice(0, pairsPerReq)];
    callDataList.push(inputs);
  }

  console.log('@@@ callDataList -> ', callDataList)

  const res = useSingleContractMultipleData(
    useMooniswapV1HelperContract(),
    'getPoolDataList',
    callDataList,
  );

  console.log('@@@ res -> ', res)

  return useMemo(() => {
    // if (res.findIndex((x) => x.loading) !== -1) return [[PairState.LOADING, null]]

    const poolDataList = res.map(x => x.result?.[0])?.flat() || [];
    let counter = 0;
    console.log('@@@ poolDataList -> ', poolDataList)
    const pairStates: [PairState, Pair | null][] = [];
    for (let i = 0; i < poolDataList.length; i++) {
      const tokenA = allTokenAList[i];
      const tokenB = allTokenBList[i];
      if (!tokenA || !tokenB || tokenA.equals(tokenB)) {
        pairStates.push([PairState.INVALID, null]);
        console.log('@@@ allTokenAList -> ', allTokenAList)
        console.log('@@@ allTokenBList -> ', allTokenBList)
        console.log('invaliddddddd')
        continue;
      }

      const poolData = poolDataList?.[counter];
      counter++;
      if (!poolData) {
        pairStates.push([PairState.LOADING, null]);
        continue;
      }

      const poolAddress = poolData.pool;
      if (poolAddress === ZERO_ADDRESS) {
        pairStates.push([PairState.NOT_EXISTS, null]);
        continue;
      }

      // const pairs: Pair[] = pairStates
      //   .filter(pairState => pairState[1] !== null)
      //   .map(pairState => pairState[1]);
      //
      // if (isPairDuplicated(pairs, tokenA, tokenB)) {
      //   pairStates.push([PairState.NOT_EXISTS, null]);
      //   continue;
      // }
      console.log('@@@ tokenA -> ', tokenA)
      console.log('@@@ tokenB -> ', tokenB)
      pairStates.push([
        PairState.EXISTS,
        new Pair(
          new TokenAmount(tokenA, poolData.balanceA.toString()),
          new TokenAmount(tokenB, poolData.balanceB.toString()),
          poolAddress,
        ),
      ]);
    }
    return pairStates.length !== 0 ? pairStates : [[PairState.LOADING, null]];
  }, [res, allTokenAList, allTokenBList]);
}

export function usePair(tokenA?: Token, tokenB?: Token): [PairState, Pair | null] {
  const pairs = usePairs([[tokenA, tokenB]])[0];
  console.log('@@@2 2222pairs -> ', pairs)
  return pairs
}
