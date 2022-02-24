import React from 'react';
import { useTranslation } from 'react-i18next';
import { Loader } from 'components';
import * as Styled from 'components/CurrencyInputPanel/styled';

import BridgeSearchModal from '../BridgeSearchModal';

const ChainInput = ({ chain, chainList, onClick, closeModal, setChain, legendText, isOpen }) => {
  const { t } = useTranslation();
  const selectTokenText = t('selectToken');
  let filteredChainList = [];
  if (chain && chainList) {
    filteredChainList = chainList.filter(c => {
      return c.chainId !== chain.chainId;
    });
  }
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
                  {chainList === 'loading' ? <Loader /> : chain ? chain.name : selectTokenText}
                </Styled.StyledTokenName>
                <Styled.StyledDropDown selected={true} />
              </Styled.Aligner>
            </Styled.CurrencySelect>
          </Styled.InputRow>
        </Styled.Container>
      </Styled.InputPanel>
      <BridgeSearchModal
        items={filteredChainList}
        isOpen={isOpen}
        onDismiss={closeModal}
        onSelect={chain => {
          setChain(chain);
          closeModal();
        }}
      />
    </>
  );
};
export default ChainInput;
