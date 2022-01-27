import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import BridgeSearchModal from './BridgeSearchModal';
import { ArrowDown, ArrowUp } from 'react-feather';
import { AutoRow } from '../../components/Row';
import { ArrowWrapper } from '../../components/swap/styleds';
import { CursorPointer, StyledButtonNavigation } from '../../theme';
import { AutoColumn } from '../../components/Column';
import { ThemeContext } from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  fetchSupportedChains,
  selectChainList,
  selectFromToChains,
  setFromChain as setFromChainAction,
  setToChain as setToChainAction,
} from './bridgeSlice';
import { useAppSelector } from 'state/hooks';

import * as Styled from '../../components/CurrencyInputPanel/styled';

const ChainInput = ({
  chain,
  chainList,
  onClick,
  closeModal,
  setChain,
  setToken,
  legendText,
  isOpen,
}) => {
  const { t } = useTranslation();
  const selectTokenText = t('selectToken');
  return (
    <>
      <Styled.InputPanel id="from-chain">
        <Styled.Container hideInput={false} isError={false}>
          <Styled.InputRow
            selected={false}
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <span>{legendText}</span>
            <Styled.CurrencySelect
              selected={!!chain}
              className="open-currency-select-button"
              onClick={onClick}
            >
              <Styled.Aligner>
                <Styled.StyledTokenName
                  className="token-symbol-container"
                  active={Boolean(chain && chain.name)}
                >
                  {chain ? chain.name : selectTokenText}
                </Styled.StyledTokenName>
                <Styled.StyledDropDown selected={true} />
              </Styled.Aligner>
            </Styled.CurrencySelect>
          </Styled.InputRow>
        </Styled.Container>
      </Styled.InputPanel>
      <BridgeSearchModal
        items={chainList}
        isOpen={isOpen}
        onDismiss={closeModal}
        onSelect={chain => {
          setChain(chain);
          setToken(null);
          closeModal();
        }}
      />
    </>
  );
};

const ChainSwitcher = ({ onSwitchChains }) => {
  const theme = useContext(ThemeContext);
  return (
    <CursorPointer>
      <StyledButtonNavigation onClick={onSwitchChains}>
        <AutoColumn justify="space-between">
          <AutoRow justify="space-between" style={{ padding: '0 1rem' }}>
            <ArrowWrapper clickable>
              <ArrowDown size="16" color={theme.green} />
              <span style={{ marginLeft: '-3px' }}>
                <ArrowUp size="16" color={theme.red} />
              </span>
            </ArrowWrapper>
          </AutoRow>
        </AutoColumn>
      </StyledButtonNavigation>
    </CursorPointer>
  );
};

const ChainsSelect = ({ setToken }) => {
  const [modalOpened, setModalOpened] = React.useState<'from' | 'to' | null>(null);
  const dispatch = useDispatch();
  const chainList = useAppSelector(selectChainList);
  const { fromChain, toChain } = useAppSelector(selectFromToChains);
  const setFromChain = value => dispatch(setFromChainAction(value));
  const setToChain = value => dispatch(setToChainAction(value));

  useEffect(() => {
    dispatch(fetchSupportedChains());
  }, [dispatch]);

  const onSwitchChains = () => {
    setToChain(fromChain);
    setFromChain(toChain);
    setToken(null);
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
        setToken={setToken}
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
        setToken={setToken}
        legendText={'TO'}
        closeModal={() => setModalOpened(null)}
      />
    </>
  );
};

export default ChainsSelect;
