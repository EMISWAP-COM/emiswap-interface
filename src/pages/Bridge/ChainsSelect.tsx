import React, { useContext } from 'react';
import BridgeSearchModal from './BridgeSearchModal';
import { ArrowDown, ArrowUp } from 'react-feather';
import { AutoRow, RowBetween } from '../../components/Row';
import { ArrowWrapper, Wrapper } from '../../components/swap/styleds';
import { CursorPointer, StyledButtonNavigation, TextWrapper } from '../../theme';
import { AutoColumn } from '../../components/Column';
import { ThemeContext } from 'styled-components';
import { useTranslation } from 'react-i18next';

import * as Styled from '../../components/CurrencyInputPanel/styled';

const ChainsSelect = ({ allChains, fromChain, toChain, setFromChain, setToChain, setToken, onSwitchChains }) => {
  const { t } = useTranslation();
  const theme = useContext(ThemeContext);

  const [modalOpened, setModalOpened] = React.useState<'from' | 'to' | null>(null);

  return (
    <>
      {/* FROM CHAIN INPUT */}
      <Styled.InputPanel id="from-chain">
        <Styled.Container hideInput={false} isError={false}>
          <Styled.InputRow
            selected={false}
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <span>FROM </span>
            <Styled.CurrencySelect
              selected={!!fromChain}
              className="open-currency-select-button"
              onClick={() => setModalOpened('from')}
            >
              <Styled.Aligner>
                <Styled.StyledTokenName
                  className="token-symbol-container"
                  active={Boolean(fromChain && fromChain.name)}
                >
                  {fromChain ? fromChain.name : t('selectToken')}
                </Styled.StyledTokenName>
                <Styled.StyledDropDown selected={true} />
              </Styled.Aligner>
            </Styled.CurrencySelect>
          </Styled.InputRow>
        </Styled.Container>
      </Styled.InputPanel>
      <BridgeSearchModal
        items={allChains}
        isOpen={modalOpened === 'from'}
        onDismiss={() => setModalOpened(null)}
        onSelect={chain => {
          setFromChain(chain);
          setToken(null);
          setModalOpened(null);
        }}
      />
      {/* END FROM CHAIN INPUT */}

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

      {/* TO CHAIN INPUT */}
      <Styled.InputPanel id="from-chain">
        <Styled.Container hideInput={false} isError={false}>
          <Styled.InputRow
            selected={false}
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <span>TO </span>
            <Styled.CurrencySelect
              selected={!!fromChain}
              className="open-currency-select-button"
              onClick={() => setModalOpened('to')}
            >
              <Styled.Aligner>
                <Styled.StyledTokenName
                  className="token-symbol-container"
                  active={Boolean(toChain && toChain.name)}
                >
                  {toChain ? toChain.name : t('selectToken')}
                </Styled.StyledTokenName>
                <Styled.StyledDropDown selected={true} />
              </Styled.Aligner>
            </Styled.CurrencySelect>
          </Styled.InputRow>
        </Styled.Container>
      </Styled.InputPanel>
      <BridgeSearchModal
        items={allChains}
        isOpen={modalOpened === 'to'}
        onDismiss={() => setModalOpened(null)}
        onSelect={chain => {
          setToChain(chain);
          setToken(null);
          setModalOpened(null);
        }}
      />
      {/* END TO CHAIN INPUT */}
    </>
  )
}

export default ChainsSelect;
