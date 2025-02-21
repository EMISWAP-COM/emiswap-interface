import { Token, Pair } from '@uniswap/sdk';
import React, { useState, useContext, useCallback } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { darken } from 'polished';
import { useCurrencyBalance } from '../../state/wallet/hooks';
import CurrencySearchModal from '../SearchModal/CurrencySearchModal';
import CurrencyLogo from '../CurrencyLogo';
import DoubleCurrencyLogo from '../DoubleLogo';
import { RowBetween } from '../Row';
import { TYPE, CursorPointer } from '../../theme';
import { Input as NumericalInput } from '../NumericalInput';
import { ReactComponent as DropDown } from '../../assets/images/dropdown.svg';

import { useActiveWeb3React } from '../../hooks';
import { useTranslation } from 'react-i18next';
import CrowdsaleCurrencySearchModal from '../SearchModal/CrowdsaleCurrencySearchModal';
import { tokenAmountToString } from '../../utils/formats';

const InputRow = styled.div<{ selected: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: ${({ selected }) =>
    selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.3125rem 0.75rem 0.75rem 1rem'};
`;

const CurrencySelect = styled.button<{ selected: boolean }>`
  align-items: center;
  height: 2rem;
  font-size: 20px;
  font-weight: 500;
  background-color: ${({ selected, theme }) => (selected ? theme.grey5 : theme.primary1)};
  color: ${({ selected, theme }) => (selected ? theme.text1 : theme.grey2)};
  border-radius: 12px;
  box-shadow: ${({ selected }) => (selected ? 'none' : '0px 6px 10px rgba(0, 0, 0, 0.075)')};
  outline: none;
  cursor: pointer;
  user-select: none;
  border: none;
  padding: 0 0.5rem;
  transition: all 0.3s ease-in-out;

  :focus,
  :hover {
    background-color: ${({ selected, theme }) =>
      selected ? darken(0.05, theme.grey5) : darken(0.05, theme.primary1)};
  }
`;

const LabelRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  color: ${({ theme }) => theme.text1};
  font-size: 0.75rem;
  line-height: 14px;
  letter-spacing: 0.02em;
  padding: 0.875rem 1rem 0 1rem;
  span:hover {
    cursor: pointer;
    color: ${({ theme }) => darken(0.2, theme.text2)};
  }
`;

const Aligner = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledDropDown = styled(DropDown)<{ selected: boolean }>`
  margin: 0 0.25rem 0 0.5rem;
  height: 35%;

  path {
    stroke: ${({ selected, theme }) => (selected ? theme.text1 : theme.grey2)};
    stroke-width: 1.5px;
  }
`;

const InputPanel = styled.div<{ hideInput?: boolean }>`
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  background-color: ${({ theme }) => theme.bg2};
  z-index: 1;
`;

const Container = styled.div<{ hideInput: boolean }>`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.grey1};
  background-color: ${({ theme }) => theme.bg1};
`;

const StyledTokenName = styled.span<{ active?: boolean }>`
  ${({ active }) =>
    active ? '  margin: 0 0.25rem 0 0.5rem;' : '  margin: 0.125rem 0.25rem 0 0.25rem;'}
  font-size:  ${({ active }) => (active ? '18px' : '16px')};
  font-weight: 450;
  line-height: 27px;
`;

const StyledBalanceMax = styled.button`
  height: 2rem;
  background-color: ${({ theme }) => theme.primary5};
  border: 1px solid transparent;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.3s ease-in-out;

  font-weight: 500;
  cursor: pointer;
  margin-right: 0.5rem;
  color: ${({ theme }) => theme.red3};
  :hover {
    border: 1px solid ${({ theme }) => theme.red3};
  }
  :focus {
    border: 1px solid ${({ theme }) => theme.red3};
    outline: none;
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    margin-right: 0.5rem;
  `};
`;

interface CurrencyInputPanelProps {
  value: string;
  onUserInput: (value: string) => void;
  onMax?: () => void;
  showMaxButton: boolean;
  label?: string;
  onCurrencySelect?: (currency: Token) => void;
  currency?: Token | null;
  disableCurrencySelect?: boolean;
  hideBalance?: boolean;
  pair?: Pair | null;
  hideInput?: boolean;
  showSendWithSwap?: boolean;
  otherCurrency?: Token | null;
  id: string;
  showCommonBases?: boolean;
  isCrowdsale?: boolean;
}

export default function CurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label = 'Input',
  onCurrencySelect = null,
  currency = null,
  disableCurrencySelect = false,
  hideBalance = false,
  pair = null, // used for double token logo
  hideInput = false,
  showSendWithSwap = false,
  otherCurrency = null,
  id,
  showCommonBases,
  isCrowdsale = false,
}: CurrencyInputPanelProps) {
  const { t } = useTranslation();

  const [modalOpen, setModalOpen] = useState(false);
  const { account } = useActiveWeb3React();
  const selectedCurrencyBalance = useCurrencyBalance(account, currency);
  const theme = useContext(ThemeContext);

  const handleDismissSearch = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);
  return (
    <InputPanel id={id}>
      <Container hideInput={hideInput}>
        {!hideInput && (
          <LabelRow>
            <RowBetween>
              <TYPE.body color={theme.grey4} fontWeight={400} fontSize={12}>
                {label}
              </TYPE.body>
              {account && (
                <CursorPointer>
                  <TYPE.body
                    onClick={onMax}
                    color={theme.text2}
                    fontWeight={500}
                    fontSize={14}
                    style={{ display: 'inline' }}
                  >
                    {!hideBalance && !!currency && selectedCurrencyBalance
                      ? 'Balance: ' + tokenAmountToString(selectedCurrencyBalance)
                      : ' '}
                  </TYPE.body>
                </CursorPointer>
              )}
            </RowBetween>
          </LabelRow>
        )}
        <InputRow
          style={hideInput ? { padding: '0', borderRadius: '8px' } : {}}
          selected={disableCurrencySelect}
        >
          {!hideInput && (
            <>
              <NumericalInput
                className="token-amount-input"
                value={value}
                onUserInput={val => {
                  onUserInput(val);
                }}
              />
              {account && currency && showMaxButton && label !== 'To' && (
                <StyledBalanceMax onClick={onMax}>MAX</StyledBalanceMax>
              )}
            </>
          )}
          <CurrencySelect
            selected={!!currency}
            className="open-currency-select-button"
            onClick={() => {
              if (!disableCurrencySelect) {
                setModalOpen(true);
              }
            }}
          >
            <Aligner>
              {pair ? (
                <DoubleCurrencyLogo
                  currency0={pair.token0}
                  currency1={pair.token1}
                  size={24}
                  margin={true}
                />
              ) : currency ? (
                <CurrencyLogo currency={currency} size={'24px'} />
              ) : null}
              {pair ? (
                <StyledTokenName className="pair-name-container">
                  {pair?.token0.symbol}:{pair?.token1.symbol}
                </StyledTokenName>
              ) : (
                <StyledTokenName
                  className="token-symbol-container"
                  active={Boolean(currency && currency.symbol)}
                >
                  {(currency && currency.symbol && currency.symbol.length > 20
                    ? currency.symbol.slice(0, 4) +
                      '...' +
                      currency.symbol.slice(currency.symbol.length - 5, currency.symbol.length)
                    : currency?.symbol) || t('selectToken')}
                </StyledTokenName>
              )}
              {!disableCurrencySelect && <StyledDropDown selected={!!currency} />}
            </Aligner>
          </CurrencySelect>
        </InputRow>
      </Container>
      {!disableCurrencySelect &&
        (isCrowdsale ? (
          <CrowdsaleCurrencySearchModal
            isOpen={modalOpen}
            onDismiss={handleDismissSearch}
            onCurrencySelect={onCurrencySelect}
            showSendWithSwap={showSendWithSwap}
            hiddenCurrency={currency}
            otherSelectedCurrency={otherCurrency}
            showCommonBases={showCommonBases}
          />
        ) : (
          <CurrencySearchModal
            isOpen={modalOpen}
            onDismiss={handleDismissSearch}
            onCurrencySelect={onCurrencySelect}
            showSendWithSwap={showSendWithSwap}
            hiddenCurrency={currency}
            otherSelectedCurrency={otherCurrency}
            showCommonBases={showCommonBases}
          />
        ))}
    </InputPanel>
  );
}
