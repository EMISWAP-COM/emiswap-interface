import React, { useContext } from 'react';
import { Token, TokenAmount } from '@uniswap/sdk';
import { Repeat } from 'react-feather';
import { Text } from 'rebass';
import { ThemeContext } from 'styled-components';
import { StyledBalanceMaxMini } from './styleds';
import { Field } from '../../state/invest/actions';
import { tokenAmountToString } from '../../utils/formats';

interface TradePriceProps {
  parsedAmounts?: { [field in Field]?: TokenAmount };
  inputCurrency?: Token;
  outputCurrency?: Token;
  showInverted: boolean;
  setShowInverted: (showInverted: boolean) => void;
}

export default function TradePrice({
  parsedAmounts,
  inputCurrency,
  outputCurrency,
  showInverted,
  setShowInverted,
}: TradePriceProps) {
  const theme = useContext(ThemeContext);
  let formattedPrice;
  if (!showInverted) {
    formattedPrice = parsedAmounts[Field.OUTPUT]
      ? tokenAmountToString(parsedAmounts[Field.INPUT]?.divide(parsedAmounts[Field.OUTPUT]))
      : null;
  } else {
    formattedPrice = parsedAmounts[Field.INPUT]
      ? tokenAmountToString(parsedAmounts[Field.OUTPUT]?.divide(parsedAmounts[Field.INPUT]))
      : null;
  }

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
