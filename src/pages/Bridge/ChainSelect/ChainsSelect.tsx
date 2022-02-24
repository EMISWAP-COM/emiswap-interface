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

const ChainsSelect = () => {
  const [modalOpened, setModalOpened] = React.useState<'from' | 'to' | null>(null);
  const dispatch = useDispatch();
  const { fromChain, toChain } = useAppSelector(selectFromToChains);
  const setFromChain = value => dispatch(setFromChainAction(value));
  const setToChain = value => dispatch(setToChainAction(value));
  const { data: chainList, isSuccess } = useSupportChain();
  const { chainId } = useActiveWeb3React();
  const networkData = getNetworkData(chainId);

  const onSwitchChains = () => {
    setToChain(fromChain);
    setFromChain(toChain);
  };

  const filteredChainList = () => {
    return chainList.result.filter(
      c => c.chainId !== fromChain.chainId && c.chainId !== toChain.chainId,
    );
  };

  useEffect(() => {
    console.log(11, networkData);
  }, [networkData]);

  useEffect(() => {
    if (isSuccess) {
      setFromChain(chainList.result[0]);
      setToChain(chainList.result[1]);
    }
  }, [chainList]);

  return (
    <>
      <ChainInput
        chainList={isSuccess ? filteredChainList() : 'loading'}
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
        chainList={isSuccess ? filteredChainList() : 'loading'}
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
