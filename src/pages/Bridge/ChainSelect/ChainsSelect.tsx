import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  selectFromToChains,
  setFromChain as setFromChainAction,
  setToChain as setToChainAction,
} from '../slice';
import { useAppSelector } from 'state/hooks';
import ChainInput from './ChainInput';
import ChainSwitcher from './ChainSwitcher';
import useSupportChain from '../hooks/useSupportChain';
import { getNetworkData } from 'utils';
import { useActiveWeb3React } from 'hooks';

const usePopulateChainSelectors = () => {
  const { chainId } = useActiveWeb3React();
  const networkData = getNetworkData(chainId);

  const dispatch = useDispatch();
  const { data: chainList, isSuccess } = useSupportChain();
  const setFromChain = value => dispatch(setFromChainAction(value));
  const setToChain = value => dispatch(setToChainAction(value));
  const { toChain } = useAppSelector(selectFromToChains);

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    const nextFromChain =
      chainList.result.find(({ chainId }) => chainId === networkData.chainId) ||
      chainList.result[0];

    setFromChain(nextFromChain);
    setToChain(filteredChainList(chainList, nextFromChain, toChain)[0]);
  }, [chainList, networkData]);
};

const filteredChainList = (chainList, fromChain, toChain) =>
  chainList.result.filter(c => c.chainId !== fromChain?.chainId && c.chainId !== toChain?.chainId);

const ChainsSelect = () => {
  const [modalOpened, setModalOpened] = React.useState<'from' | 'to' | null>(null);
  const dispatch = useDispatch();
  const { fromChain, toChain } = useAppSelector(selectFromToChains);
  const setFromChain = value => dispatch(setFromChainAction(value));
  const setToChain = value => dispatch(setToChainAction(value));
  const { data: chainList, isSuccess } = useSupportChain();

  usePopulateChainSelectors();

  const onSwitchChains = () => {
    setToChain(fromChain);
    setFromChain(toChain);
  };

  return (
    <>
      <ChainInput
        chainList={isSuccess ? filteredChainList(chainList, fromChain, toChain) : 'loading'}
        chain={fromChain}
        onClick={() => {
          setModalOpened('from');
        }}
        isOpen={modalOpened === 'from'}
        setChain={setFromChain}
        legendText={'FROM'}
        closeModal={() => setModalOpened(null)}
      />

      <ChainSwitcher onSwitchChains={onSwitchChains} />

      <ChainInput
        chainList={isSuccess ? filteredChainList(chainList, fromChain, toChain) : 'loading'}
        chain={toChain}
        onClick={() => {
          setModalOpened('to');
        }}
        isOpen={modalOpened === 'to'}
        setChain={setToChain}
        legendText={'TO'}
        closeModal={() => setModalOpened(null)}
      />
    </>
  );
};

export default ChainsSelect;
