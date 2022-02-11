import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  selectChainList,
  selectFromToChains,
  setFromChain as setFromChainAction,
  setToChain as setToChainAction,
} from '../slice';
import { useAppSelector } from 'state/hooks';
import ChainInput from './ChainInput';
import ChainSwitcher from './ChainSwitcher';

const ChainsSelect = () => {
  const [modalOpened, setModalOpened] = React.useState<'from' | 'to' | null>(null);
  const dispatch = useDispatch();
  const chainList = useAppSelector(selectChainList);
  const { fromChain, toChain } = useAppSelector(selectFromToChains);
  const setFromChain = value => dispatch(setFromChainAction(value));
  const setToChain = value => dispatch(setToChainAction(value));

  const onSwitchChains = () => {
    setToChain(fromChain);
    setFromChain(toChain);
  };

  return (
    <>
      <ChainInput
        chainList={chainList}
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
        chainList={chainList}
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
