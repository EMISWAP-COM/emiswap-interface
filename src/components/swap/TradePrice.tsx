import React, { useContext } from 'react';
import { Price, Token } from '@uniswap/sdk';
import { Repeat } from 'react-feather';
import { Text } from 'rebass';
import { ThemeContext } from 'styled-components';
import { StyledBalanceMaxMini } from './styleds';
import { tokenAmountToString } from '../../utils/formats';

interface TradePriceProps {
  price?: Price;
  inputCurrency?: Token;
  outputCurrency?: Token;
  showInverted: boolean;
  setShowInverted: (showInverted: boolean) => void;
}

export default function TradePrice({
  price,
  inputCurrency,
  outputCurrency,
  showInverted,
  setShowInverted,
}: TradePriceProps) {
  const theme = useContext(ThemeContext);

  const formattedPrice = showInverted
    ? tokenAmountToString(price)
    : tokenAmountToString(price?.invert());

  const show = Boolean(inputCurrency && outputCurrency);
  const label = showInverted
    ? `${outputCurrency?.symbol} per ${inputCurrency?.symbol}`
    : `${inputCurrency?.symbol} per ${outputCurrency?.symbol}`;

  return (
    <Text
      fontWeight={500}
      fontSize={14}
      color={theme.text2}
      style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}
    >
      {show ? (
        <>
          {formattedPrice ?? '-'} {label}
          <StyledBalanceMaxMini onClick={() => setShowInverted(!showInverted)}>
            <Repeat size={14} />
          </StyledBalanceMaxMini>
        </>
      ) : (
        '-'
      )}
    </Text>
  );
}
