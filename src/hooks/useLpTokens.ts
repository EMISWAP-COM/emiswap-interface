import { useEffect, useMemo, useState } from 'react';
import { Token } from '@uniswap/sdk';
import { useMultipleTokenInfo } from './useMultipleTokenInfo';
import { useVampContract } from './useContract';
import { useDispatch } from 'react-redux';
import { useActiveWeb3React } from './index';

export function useLpTokens(): {
  lpTokensDetailedInfo: { addresses: string[]; base: string }[];
  lpTokensInfo: string[];
  tokens: (Token | undefined)[];
  balances: number[];
  isLoading: boolean;
} {
  const { chainId } = useActiveWeb3React();
  const contract = useVampContract(chainId);
  const [lpTokensInfo, setLpTokensInfo] = useState<any[]>([]);
  const [lpTokensDetailedInfo, setLpTokensDetailedInfot] = useState<
    { addresses: string[]; base: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const formattedAddresses = lpTokensDetailedInfo
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
        setLpTokensDetailedInfot(
          listPair.map((el, idx) => ({ addresses: el, base: lpTokensInfo[idx].lpToken })),
        );
        setIsLoading(false);
      } catch (e) {
        console.log(contract);
        console.log(e);
        throw new Error('Failed to migrate ');
      }
    };
    fetchInfo();
    //eslint-disable-next-line
  }, [contract, dispatch]);

  return useMemo(() => {
    return { lpTokensDetailedInfo, lpTokensInfo, balances, tokens, isLoading };
  }, [balances, isLoading, lpTokensInfo, lpTokensDetailedInfo, tokens]);
}
