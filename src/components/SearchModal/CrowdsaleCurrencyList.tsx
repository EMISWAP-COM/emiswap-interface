import { Token, TokenAmount, currencyEquals, ETHER, JSBI } from '@uniswap/sdk';
import React, { CSSProperties, memo, useContext, useMemo } from 'react';
import { Text } from 'rebass';
import { ThemeContext } from 'styled-components';
import { useActiveWeb3React } from '../../hooks';
import { useETHBalances } from '../../state/wallet/hooks';
import { ButtonSecondary } from '../Button';
import Column, { AutoColumn } from '../Column';
import { RowFixed } from '../Row';
import CurrencyLogo from '../CurrencyLogo';
import { StyledFixedSizeList, StyledMenuItem } from './styleds';
import Loader from '../Loader';
import { tokenAmountToString } from '../../utils/formats';

function currencyKey(currency: Token): string {
  return currency instanceof Token ? currency.address : currency === ETHER ? 'ETHER' : '';
}

export default function CrowdsaleCurrencyList({
  currencies,
  allBalances,
  selectedCurrency,
  onCurrencySelect,
  otherCurrency,
  showSendWithSwap,
}: {
  currencies: Token[];
  selectedCurrency: Token;
  allBalances: { [tokenAddress: string]: TokenAmount };
  onCurrencySelect: (currency: Token) => void;
  otherCurrency: Token;
  showSendWithSwap?: boolean;
}) {
  const { account } = useActiveWeb3React();
  const theme = useContext(ThemeContext);
  const ETHBalance = useETHBalances([account])[account];

  const CurrencyRow = useMemo(() => {
    return memo(function CurrencyRow({ index, style }: { index: number; style: CSSProperties }) {
      const currency = index === 0 ? ETHER : currencies[index - 1];
      const key = currencyKey(currency);
      const balance = currency === ETHER ? ETHBalance : allBalances[key];
      const zeroBalance = balance && JSBI.equal(JSBI.BigInt(0), balance.raw);

      const isSelected = Boolean(selectedCurrency && currencyEquals(currency, selectedCurrency));
      const otherSelected = Boolean(otherCurrency && currencyEquals(otherCurrency, currency));

      return (
        <StyledMenuItem
          style={style}
          className={`token-item-${key}`}
          onClick={() => (isSelected ? null : onCurrencySelect(currency))}
          disabled={isSelected}
          selected={otherSelected}
        >
          <RowFixed>
            <CurrencyLogo currency={currency} size={'18px'} style={{ marginRight: '16px' }} />
            <Column>
              <Text fontWeight={500}>{currency.symbol}</Text>
            </Column>
          </RowFixed>
          <AutoColumn>
            {balance ? (
              <Text>
                {zeroBalance && showSendWithSwap ? (
                  <ButtonSecondary padding={'4px 8px'}>
                    <Text textAlign="center" fontWeight={500} fontSize={14} color={theme.primary1}>
                      Send With Swap
                    </Text>
                  </ButtonSecondary>
                ) : balance ? (
                  tokenAmountToString(balance)
                ) : (
                  '-'
                )}
              </Text>
            ) : account ? (
              <Loader />
            ) : (
              '-'
            )}
          </AutoColumn>
        </StyledMenuItem>
      );
    });
  }, [
    ETHBalance,
    account,
    allBalances,
    currencies,
    onCurrencySelect,
    otherCurrency,
    selectedCurrency,
    showSendWithSwap,
    theme.primary1,
  ]);

  return (
    <StyledFixedSizeList
      width="auto"
      height={500}
      itemCount={currencies.length + 1}
      itemSize={50}
      style={{ flex: '1', margin: '0 30px' }}
      itemKey={index => currencyKey(currencies[index])}
    >
      {CurrencyRow}
    </StyledFixedSizeList>
  );
}
