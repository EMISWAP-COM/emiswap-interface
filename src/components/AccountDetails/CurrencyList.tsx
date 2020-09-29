import React, { CSSProperties, memo, useContext, useMemo } from 'react';
import { ThemeContext } from 'styled-components';
import { Token, TokenAmount, ETHER, JSBI } from '@uniswap/sdk';
import { Text } from 'rebass';

import { currencyKey } from '../../utils/currencyId';
import { useActiveWeb3React } from '../../hooks';
import { useETHBalances } from '../../state/wallet/hooks';
import { ButtonSecondary } from '../Button';
import Column, { AutoColumn } from '../Column';
import { RowFixed } from '../Row';
import CurrencyLogo from '../CurrencyLogo';
import Loader from '../Loader';

import { StyledFixedSizeList, StyledMenuItem } from './styleds';

type CurrencyListProps = {
  currencies: Token[];
  selectedCurrencies: Token[];
  allBalances: { [tokenAddress: string]: TokenAmount };
  onCurrencySelect: (currency: Token) => void;
  showSendWithSwap?: boolean;
};

type CurrencyRowProps = {
  index: number;
  style: CSSProperties;
};

const CurrencyList = ({
  currencies,
  allBalances,
  onCurrencySelect,
  selectedCurrencies,
  showSendWithSwap,
}: CurrencyListProps) => {
  const { account } = useActiveWeb3React();
  const theme = useContext(ThemeContext);
  const ETHBalance = useETHBalances([account])[account];

  const CurrencyRow = useMemo(
    () =>
      memo(({ index, style }: CurrencyRowProps) => {
        const currency = index === 0 ? ETHER : currencies[index - 1];
        const key = currencyKey(currency);
        const balance = currency === ETHER ? ETHBalance : allBalances[key];

        const zeroBalance = balance && JSBI.equal(JSBI.BigInt(0), balance.raw);

        const handleCurrencySelect = (): void => onCurrencySelect(currency);

        const isSelected: boolean = selectedCurrencies.some(
          ({ address }) => address === currency.address,
        );

        return (
          <StyledMenuItem
            style={style}
            className={`token-item-${key}`}
            onClick={handleCurrencySelect}
            selected={isSelected}
          >
            <RowFixed>
              <CurrencyLogo currency={currency} size="18px" style={{ marginRight: 16 }} />
              <Column>
                <Text fontWeight={500}>{currency.symbol}</Text>
              </Column>
            </RowFixed>
            <AutoColumn>
              {balance ? (
                <Text>
                  {zeroBalance && showSendWithSwap ? (
                    <ButtonSecondary padding="4px 8px">
                      <Text
                        textAlign="center"
                        fontWeight={500}
                        fontSize={14}
                        color={theme.primary1}
                      >
                        Send With Swap
                      </Text>
                    </ButtonSecondary>
                  ) : balance ? (
                    balance.toSignificant(6)
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
      }),
    [
      ETHBalance,
      account,
      allBalances,
      currencies,
      onCurrencySelect,
      showSendWithSwap,
      selectedCurrencies,
    ],
  );

  const getItemKey = (index: number): string => currencyKey(currencies[index]);

  return (
    <StyledFixedSizeList
      width="auto"
      height={150}
      itemCount={++currencies.length}
      itemSize={50}
      style={{ flex: '1', margin: '0.5rem 0 1rem' }}
      itemKey={getItemKey}
    >
      {CurrencyRow}
    </StyledFixedSizeList>
  );
};

export default CurrencyList;
