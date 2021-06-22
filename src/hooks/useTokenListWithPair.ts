import { abi as EMI_SWAP_ABI } from '../constants/abis/Emiswap.json';
import { useEmiFactoryContract, useEmiSwapContract } from './useContract';
import { useEffect, useState } from 'react';
import { getContract } from '../utils';
import { useActiveWeb3React } from './index';
import { addPopup } from '../state/application/actions';
import { useDispatch } from 'react-redux';

export function useTokenListWithPair() {
  const { library, account } = useActiveWeb3React();
  const [list, setList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const factoryContract = useEmiFactoryContract();
  const emiSwapContract = useEmiSwapContract();
  const dispatch = useDispatch();

  // todo: Testing for task https://emi.myjetbrains.com/youtrack/issue/ES-1088
  const DEBUG = true;

  useEffect(() => {
    if (factoryContract && emiSwapContract) {
      setIsLoading(true);
      DEBUG && console.log('Before getAllPools()', { factoryContract });
      factoryContract
        .getAllPools()
        .then((data: string[]) => {
          const promiseMap = data.map(el => {
            const contract = getContract(el, EMI_SWAP_ABI, library!, account ? account : undefined);

            const result = contract.getTokens();
            DEBUG &&
              console.log('Then promiseMap', {
                data,
                contract,
                el,
                EMI_SWAP_ABI,
                library,
                account,
                result,
              });

            return result;
          });
          Promise.all(promiseMap).then((data: string[][]) => {
            DEBUG && console.log('Then Promise.all', { data });

            setIsLoading(false);
            const formattedData = data
              .flat()
              .filter((ads, idx, arr) => arr.findIndex(el => el === ads) === idx);
            setList(formattedData);
          });
        })
        .catch((e: Error) => {
          DEBUG && console.log('Catch', { e, EMI_SWAP_ABI, library, account });
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
  }, [factoryContract, emiSwapContract, account, library, dispatch, DEBUG]);
  return [list, isLoading] as [string[], boolean];
}
