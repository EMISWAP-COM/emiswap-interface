import {
  useUniswapV2FactoryContract,
  useUniswapV2HelperContract,
  useUniswapV2PairContract,
} from '../hooks/useContract';
import { useMemo } from 'react';
import {
  NEVER_RELOAD,
  useSingleCallResult,
  useSingleContractMultipleData,
} from '../state/multicall/hooks';
import { BigNumber } from '@ethersproject/bignumber';

export interface UniswapV2Pair {
  pair: string;
  token0: string;
  token1: string;
  balance: BigNumber;
}

// returns all Uniswapv2 exchange addresses in the user's token list
export function useAllUniswapV2Pairs(account: string): [UniswapV2Pair[], boolean] {
  const helper = useUniswapV2HelperContract();
  const uniswapV2Factory = useUniswapV2FactoryContract();

  const factoriesCount = useSingleCallResult(uniswapV2Factory, 'allPairsLength', [], NEVER_RELOAD);

  const callData: any[][] = [];
  if (factoriesCount?.result?.[0]) {
    let chunkSize = 200;
    for (let i = 0; i < factoriesCount?.result?.[0].toNumber(); i += chunkSize) {
      callData.push([account, i, i + chunkSize]);
    }
  } else {
    callData.push([account, 0, 0]);
  }

  const res = useSingleContractMultipleData(
    helper,
    'getAllPairsWithBalances',
    callData,
    NEVER_RELOAD,
  );

  return useMemo(() => {
    const data = res.reduce((acc, val) => {
      if (val?.loading || !val?.result) {
        return acc;
      }

      const r = val?.result?.pairsWithBalances?.reduce((acc0: any, pair: any) => {
        const p = {
          pair: pair.id,
          token0: pair.token0,
          token1: pair.token1,
          balance: pair.walletBalance,
        };
        acc0.push(p);
        return acc0;
      }, [] as UniswapV2Pair[]);

      return acc.concat(r);
    }, []);

    return [data || [], res?.[0]?.loading || factoriesCount?.loading];
  }, [res, factoriesCount]);
}

export function usePairTokens(pairAddress: string | undefined): string[] {
  const contract = useUniswapV2PairContract(pairAddress);

  const res0 = useSingleCallResult(contract, 'token0', [], NEVER_RELOAD);
  const res1 = useSingleCallResult(contract, 'token1', [], NEVER_RELOAD);

  return useMemo(() => {
    if (res0?.result?.[0] && res1?.result?.[0]) {
      return [res0.result[0], res1.result[0]];
    }
    return [];
  }, [res0, res1]);
}
