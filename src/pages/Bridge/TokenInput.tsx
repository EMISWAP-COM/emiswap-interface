import React, { useState } from 'react';
import { RowBetween } from '../../components/Row';
import { CursorPointer, TextWrapper } from '../../theme';
import { tokenAmountToString } from '../../utils/formats';
import { Input as NumericalInput } from '../../components/NumericalInput';
import TokensSearchModal from './TokenSearchModal';
import { useActiveWeb3React } from '../../hooks';
import { useTokenBalances } from '../../state/wallet/hooks';
import CurrencyLogo from '../../components/CurrencyLogo';
import { useTranslation } from 'react-i18next';

import * as Styled from '../../components/CurrencyInputPanel/styled';

const TokenInput = ({ tokens, token, amount, onAmountInput, setToken, chainId, disableFilter }) => {
  const { t } = useTranslation();
  const { account } = useActiveWeb3React();
  const balances = useTokenBalances(account, [token]); // TODO: use for single token!
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <>
      <Styled.InputPanel id="token">
        <Styled.Container hideInput={false} isError={false}>
          <Styled.LabelRow>
            <RowBetween>
              {account && (
                <CursorPointer>
                  <TextWrapper
                    color="white"
                    fontWeight={500}
                    fontSize={14}
                    style={{ display: 'inline' }}
                  >
                    {token
                      ? 'Balance: ' + tokenAmountToString(balances[token.address], token.decimals)
                      : ''}
                  </TextWrapper>
                </CursorPointer>
              )}
            </RowBetween>
          </Styled.LabelRow>
          <Styled.InputRow selected={false}>
            {token ? (
              <NumericalInput
                disabled={!onAmountInput}
                className="token-amount-input"
                value={amount || ''}
                onUserInput={val => {
                  if (onAmountInput) {
                    onAmountInput(val);
                  }
                }}
              />
            ) : (
              <div />
            )}
            <Styled.CurrencySelect
              selected={!!token}
              className="open-currency-select-button"
              onClick={() => setModalOpened(true)}
            >
              <Styled.Aligner>
                <CurrencyLogo currency={token} size={'24px'} />
                <Styled.StyledTokenName
                  className="token-symbol-container"
                  active={Boolean(token && token.symbol)}
                >
                  {(token && token.symbol && token.symbol.length > 20
                    ? token.symbol.slice(0, 4) +
                      '...' +
                      token.symbol.slice(token.symbol.length - 5, token.symbol.length)
                    : token?.symbol) || t('selectToken')}
                </Styled.StyledTokenName>
                <Styled.StyledDropDown selected={Boolean(token)} />
              </Styled.Aligner>
            </Styled.CurrencySelect>
          </Styled.InputRow>
        </Styled.Container>
      </Styled.InputPanel>

      <TokensSearchModal
        disableFilter={disableFilter}
        tokens={Array.isArray(tokens) ? tokens : []}
        isOpen={modalOpened}
        onDismiss={() => setModalOpened(false)}
        onCurrencySelect={token => {
          setToken(token);
          setModalOpened(false);
        }}
        isLpTokens={false}
        chainId={chainId}
      />
    </>
  );
};

export default TokenInput;
