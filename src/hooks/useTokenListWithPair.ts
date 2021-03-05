import { abi as EMI_SWAP_ABI } from '../constants/abis/Emiswap.json';
import { useEmiFactoryContract, useEmiSwapContract } from './useContract';
import { useEffect, useState } from 'react';
import { getContract } from '../utils';
import { useActiveWeb3React } from './index';

export function useTokenListWithPair() {
  const { library, account } = useActiveWeb3React();
  const [list, setList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const factoryContract = useEmiFactoryContract();
  const emiSwapContract = useEmiSwapContract();

  useEffect(() => {
    if (factoryContract && emiSwapContract) {
      setIsLoading(true);
      factoryContract.getAllPools().then((data: string[]) => {
        const promiseMap = data.map(el => {
          try {
            const contract = getContract(el, EMI_SWAP_ABI, library!, account ? account : undefined);
            return contract.getTokens();
          } catch (error) {
            console.error('Failed to get contract', error);
            return Promise.reject(undefined);
          }
        });
        Promise.all(promiseMap).then((data: string[][]) => {
          setIsLoading(false);
          const formattedData = data
            .flat()
            .filter((ads, idx, arr) => arr.findIndex(el => el === ads) === idx);
          setList(formattedData);
        });
      });
    }
  }, [factoryContract, emiSwapContract, account, library]);
  return [list, isLoading] as [string[], boolean];
}