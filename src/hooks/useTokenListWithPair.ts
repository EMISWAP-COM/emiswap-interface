import { abi as EMI_SWAP_ABI } from '../constants/abis/Emiswap.json';
import { useEmiFactoryContract, useEmiSwapContract } from './useContract';
import { useEffect, useState } from 'react';
import { getContract } from '../utils';
import { useActiveWeb3React } from './index';
import { addPopup } from '../state/application/actions';
import { useDispatch } from 'react-redux'


export function useTokenListWithPair() {
  const { library, account } = useActiveWeb3React();
  const [list, setList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const factoryContract = useEmiFactoryContract();
  const emiSwapContract = useEmiSwapContract();
  const dispatch = useDispatch()

  useEffect(() => {
    if (factoryContract && emiSwapContract) {
      setIsLoading(true);
      factoryContract.getAllPools().then((data: string[]) => {
        const nonEmptyData = data.filter(item => !!item);
        const promiseMap = nonEmptyData.map(el => {
          const contract = getContract(el, EMI_SWAP_ABI, library!, account ? account : undefined);
          return contract.getTokens();
        });
        Promise.all(promiseMap).then((data: string[][]) => {
          setIsLoading(false);
          const formattedData = data
            .flat()
            .filter((ads, idx, arr) => arr.findIndex(el => el === ads) === idx);
          setList(formattedData);
        });
      })
        .catch(e => {
          dispatch(
            addPopup({
              key: 'useEmiFactoryContract',
              content: {
                status: {
                  name: `Contract methods fails - ${e}`,
                  isError: true,
                },
              },
            }),
          );
        });
    }
  }, [factoryContract, emiSwapContract, account, library, dispatch]);
  return [list, isLoading] as [string[], boolean];
}
