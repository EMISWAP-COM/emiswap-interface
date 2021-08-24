import { useTranslation } from 'react-i18next';
import { ThemeContext } from 'styled-components/macro';
import { JSBI, Pair, Token, TokenAmount } from '@uniswap/sdk';
import React, { useCallback, useContext, useState } from 'react';

import { useCurrencyBalance } from '../../state/wallet/hooks';
import CurrencySearchModal from '../SearchModal/CurrencySearchModal';
import CurrencyLogo from '../CurrencyLogo';
import DoubleCurrencyLogo from '../DoubleLogo';
import { RowBetween } from '../Row';
import { CursorPointer, TYPE } from '../../theme';
import { Input as NumericalInput } from '../NumericalInput';

import { useActiveWeb3React } from '../../hooks';
import CrowdsaleCurrencySearchModal from '../SearchModal/CrowdsaleCurrencySearchModal';
import { tokenAmountToString } from '../../utils/formats';
import { MIN_ETH } from '../../constants';

import * as Styled from './styled';

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
  isMatchEth?: boolean;
  disabled?: boolean;
  isDepended?: boolean;
  showMaxError?: boolean;
  currencyBalance?: TokenAmount | undefined;
  balanceDecimals?: number;
}

const CurrencyInputPanel = (props: CurrencyInputPanelProps) => {
  const {
    onUserInput,
    value,
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
    isMatchEth = false,
    disabled = false,
    isDepended = false,
    showMaxError = false,
    currencyBalance,
    balanceDecimals = 6,
  } = props;

  const { t } = useTranslation();

  const [modalOpen, setModalOpen] = useState(false);
  const { account } = useActiveWeb3React();
  const selectedCurrencyBalance = useCurrencyBalance(account, currency);
  const theme = useContext(ThemeContext);

  const handleDismissSearch = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);

  const checkError: () => boolean = () => {
    return (
      currencyBalance &&
      currencyBalance.token.isEther &&
      !isDepended &&
      !JSBI.greaterThan(currencyBalance.raw, MIN_ETH) &&
      showMaxError
    );
  };

  return (
    <>
      <Styled.InputPanel id={id}>
        <Styled.Container hideInput={hideInput} isError={checkError()}>
          {!hideInput && (
            <Styled.LabelRow>
              <RowBetween>
                <TYPE.body color={theme.white} fontWeight={400} fontSize={12}>
                  {label}
                </TYPE.body>
                {account && (
                  <CursorPointer>
                    <TYPE.body
                      onClick={onMax}
                      color={theme.white}
                      fontWeight={500}
                      fontSize={14}
                      style={{ display: 'inline' }}
                    >
                      {!hideBalance && !!currency && selectedCurrencyBalance
                        ? 'Balance: ' +
                          tokenAmountToString(selectedCurrencyBalance, balanceDecimals)
                        : ' '}
                    </TYPE.body>
                  </CursorPointer>
                )}
              </RowBetween>
            </Styled.LabelRow>
          )}
          <Styled.InputRow
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
                  disabled={disabled}
                />
                {account && currency && showMaxButton && label !== 'To' && (
                  <Styled.StyledBalanceMax onClick={onMax}>MAX</Styled.StyledBalanceMax>
                )}
              </>
            )}
            <Styled.CurrencySelect
              selected={!!currency}
              className="open-currency-select-button"
              onClick={() => {
                if (!disableCurrencySelect) {
                  setModalOpen(true);
                }
              }}
            >
              <Styled.Aligner>
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
                  <Styled.StyledTokenName className="pair-name-container">
                    {pair?.token0.symbol}-{pair?.token1.symbol}
                  </Styled.StyledTokenName>
                ) : (
                  <Styled.StyledTokenName
                    className="token-symbol-container"
                    active={Boolean(currency && currency.symbol)}
                  >
                    {(currency && currency.symbol && currency.symbol.length > 20
                      ? currency.symbol.slice(0, 4) +
                        '...' +
                        currency.symbol.slice(currency.symbol.length - 5, currency.symbol.length)
                      : currency?.symbol) || t('selectToken')}
                  </Styled.StyledTokenName>
                )}
                {!disableCurrencySelect && <Styled.StyledDropDown selected={!!currency} />}
              </Styled.Aligner>
            </Styled.CurrencySelect>
          </Styled.InputRow>
        </Styled.Container>
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
              isMatchEth={isMatchEth}
            />
          ))}
      </Styled.InputPanel>
      {checkError() && <Styled.ErrorText>insufficient balance</Styled.ErrorText>}
    </>
  );
};

export default CurrencyInputPanel;
