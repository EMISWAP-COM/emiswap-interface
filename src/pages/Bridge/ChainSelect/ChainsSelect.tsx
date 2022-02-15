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
import { useGetSupportChainQuery } from '../api';

const ChainsSelect = () => {
  const [modalOpened, setModalOpened] = React.useState<'from' | 'to' | null>(null);
  const dispatch = useDispatch();
  const { fromChain, toChain } = useAppSelector(selectFromToChains);
  const setFromChain = value => dispatch(setFromChainAction(value));
  const setToChain = value => dispatch(setToChainAction(value));
  const { data: chainList, isSuccess } = useGetSupportChainQuery();

  const onSwitchChains = () => {
    setToChain(fromChain);
    setFromChain(toChain);
  };

  useEffect(() => {
    if (isSuccess) {
      setFromChain(chainList.result[4]);
      setToChain(chainList.result[2]);
    }
  }, [chainList]);

  return (
    <>
      <ChainInput
        chainList={isSuccess ? chainList.result : 'loading'}
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
        chainList={isSuccess ? chainList.result : 'loading'}
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
