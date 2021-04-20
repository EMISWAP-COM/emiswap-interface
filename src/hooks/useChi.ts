import { ChainId, JSBI, TokenAmount } from '@uniswap/sdk';
import { useMemo } from 'react';
import { NEVER_RELOAD, useSingleCallResult } from '../state/multicall/hooks';
import { useActiveWeb3React } from './index';
import { useChiController } from './useContract';
import { ApprovalState, useApproveCallback } from './useApproveCallback';
import { CHI } from '../constants';
import { MaxUint256 } from '@ethersproject/constants';
import { ONE_SPLIT_ADDRESSES } from '../constants/one-split';

export const MIN_CHI_BALANCE = 5;

export default function useChiBalance(): JSBI | undefined {
  const { account } = useActiveWeb3React();
  const chiContract = useChiController();

  const { result } = useSingleCallResult(
    chiContract,
    'balanceOf',
    [account ?? undefined],
    NEVER_RELOAD,
  );
  const data = result?.[0];
  return data ? JSBI.BigInt(data.toString()) : undefined;
}

export function useHasChi(minAmount: number): boolean | undefined {
  const balance = useChiBalance();
  return useMemo(() => balance && JSBI.greaterThan(balance, JSBI.BigInt(Math.floor(minAmount))), [
    balance,
    minAmount,
  ]);
}

export function useIsChiApproved(chainId: ChainId): [ApprovalState, () => Promise<void>] {
  const [approvalState] = useApproveCallback(
    new TokenAmount(CHI, JSBI.BigInt(MIN_CHI_BALANCE)),
    ONE_SPLIT_ADDRESSES[chainId],
  );

  const [, approve] = useApproveCallback(
    new TokenAmount(CHI, JSBI.BigInt(MaxUint256)),
    ONE_SPLIT_ADDRESSES[chainId],
  );

  return [approvalState, approve];
}
