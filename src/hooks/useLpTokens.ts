import { useEffect, useMemo, useState } from 'react';
import { Token } from '@uniswap/sdk';
import { useMultipleTokenInfo } from './useMultipleTokenInfo';
import { useVampContract } from './useContract';
import { useDispatch } from 'react-redux';

export function useLpTokens(): {
  tokenList: { addresses: string[]; base: string }[];
  lpTokensInfo: string[];
  tokens: (Token | undefined)[];
  balances: number[];
  isLoading: boolean;
} {
  const contract = useVampContract();
  const [lpTokensInfo, setLpTokensInfo] = useState<any[]>([]);
  const [tokenList, setTokenList] = useState<{ addresses: string[]; base: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const formattedAddresses = tokenList
    .map(el => el.addresses)
    .flat()
    .filter((el, idx, arr) => arr.findIndex(address => address === el) === idx);
  const { tokens, balances } = useMultipleTokenInfo(formattedAddresses, lpTokensInfo);
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        setIsLoading(true);
        const length = await contract?.lpTokensInfoLength();
        let promiseArr = [];
        for (let i = 0; i < length; i++) {
          promiseArr.push(contract?.lpTokensInfo(i));
        }
        const lpTokensInfo = await Promise.all(promiseArr);
        setLpTokensInfo(lpTokensInfo.map(el => el.lpToken));
        promiseArr = lpTokensInfo.map((_, idx) => contract?.lpTokenDetailedInfo(idx));
        const listPair = await Promise.all(promiseArr);
        setTokenList(
          listPair.map((el, idx) => ({ addresses: el, base: lpTokensInfo[idx].lpToken })),
        );
        setIsLoading(false);
      } catch (e) {
        throw new Error('Failed to migrate ');
      }
    };
    fetchInfo();
  }, [contract, dispatch]);
  return useMemo(() => {
    return { tokenList, lpTokensInfo, balances, tokens, isLoading };
  }, [balances, isLoading, lpTokensInfo, tokenList, tokens]);
}
