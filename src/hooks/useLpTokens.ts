import { useEffect, useMemo, useState } from 'react'
import { Token } from '@uniswap/sdk';
import { Contract } from '@ethersproject/contracts';
import { useMultipleTokenInfo } from './useMultipleTokenInfo';

export function useLpTokens(
  contract: Contract,
): {
  tokenList: { addresses: string[]; base: string }[];
  lpTokensInfo: string[];
  tokens: (Token | undefined)[];
  balances: number[];
  isLoading: boolean;
} {
  const [lpTokensInfo, setLpTokensInfo] = useState<any[]>([]);
  const [tokenList, setTokenList] = useState<{ addresses: string[]; base: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const formattedAdresses = tokenList
    .map(el => el.addresses)
    .flat()
    .filter((el, idx, arr) => arr.findIndex(address => address === el) === idx);
  const { tokens, balances } = useMultipleTokenInfo(formattedAdresses, lpTokensInfo);
  useEffect(() => {
    const fetchInfo = async () => {
      setIsLoading(true);
      const length = await contract.lpTokensInfoLength();
      let promiseArr = [];
      for (let i = 0; i < length; i++) {
        promiseArr.push(contract.lpTokensInfo(i));
      }
      const lpTokensInfo = await Promise.all(promiseArr);
      setLpTokensInfo(lpTokensInfo.map(el => el.lpToken));
      promiseArr = lpTokensInfo.map((_, idx) => contract.lpTokenDetailedInfo(idx));
      const listPair = await Promise.all(promiseArr);
      setTokenList(listPair.map((el, idx) => ({ addresses: el, base: lpTokensInfo[idx].lpToken })));
      setIsLoading(false);
    };
    fetchInfo();
  }, []);
  return useMemo(() => {
    return { tokenList, lpTokensInfo, balances, tokens, isLoading };
  }, [balances, isLoading, lpTokensInfo, tokenList, tokens]);
}
