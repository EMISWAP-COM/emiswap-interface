import { useEmiFactoryContract } from './useContract';
import { useEffect, useMemo, useState } from 'react';
import { getContract } from '../utils';
import { abi as EMI_SWAP_ABI } from '../constants/abis/Emiswap.json';
import { useActiveWeb3React } from './index';
import { useMultipleTokenInfo } from './useMultipleTokenInfo';
import { Token } from '@uniswap/sdk';

export const useTokens = (): Token[] => {
  const factoryContract = useEmiFactoryContract();
  const { library, account } = useActiveWeb3React();
  const [tokenAddresses, setTokenAddresses] = useState<string[]>([]);
  const { tokens } = useMultipleTokenInfo(tokenAddresses);
  useEffect(() => {
    if (factoryContract) {
      factoryContract
        .getAllPools()
        .then((data: string[]) => {
          const promiseMap = data.map(el => {
            try {
              const contract = getContract(
                el,
                EMI_SWAP_ABI,
                library!,
                account ? account : undefined,
              );
              return contract.getTokens();
            } catch (error) {
              console.error('Failed to get contract', error);
              return Promise.reject(undefined);
            }
          });
          return Promise.all(promiseMap);
        })
        .then((data: [string, string][]) => {
          setTokenAddresses(
            data
              .flat()
              .filter((address, idx, arr) => arr.findIndex(adr => adr === address) === idx),
          );
        });
    }
  }, [account, factoryContract, library]);
  return useMemo(() => {
    return tokens.filter(token => token);
  }, [tokens]) as Token[];
};
