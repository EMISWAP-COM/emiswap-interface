import { useEffect, useState } from 'react';
import { Token } from '@uniswap/sdk';
import { Contract } from '@ethersproject/contracts';
import { useMultipleTokenInfo } from './useMultipleTokenInfo';

export function useLpTokens(
  contract: Contract,
): {
  tokenList: string[][];
  lpTokensInfo: string[];
  tokens: (Token | undefined)[];
  balances: number[];
} {
  const [lpTokensInfo, setLpTokensInfo] = useState<any[]>([]);
  const [tokenList, setTokenList] = useState<string[][]>([]);

  const formattedAdresses = tokenList
    .flat()
    .filter((el, idx, arr) => arr.findIndex(address => address === el) === idx);
  const { tokens, balances } = useMultipleTokenInfo(formattedAdresses, lpTokensInfo);

  useEffect(() => {
    const fetchInfo = async () => {
      const length = await contract.lpTokensInfoLength();
      let promiseArr = [];
      for (let i = 0; i < length; i++) {
        promiseArr.push(contract.lpTokensInfo(i));
      }
      const lpTokensInfo = await Promise.all(promiseArr);
      setLpTokensInfo(lpTokensInfo.map(el => el.lpToken));
      promiseArr = lpTokensInfo.map((_, idx) => contract.lpTokenDetailedInfo(idx));
      const listPair = await Promise.all(promiseArr);
      setTokenList(listPair);
    };
    fetchInfo();
  }, [contract]);
  return { tokenList, lpTokensInfo, balances, tokens };
}
