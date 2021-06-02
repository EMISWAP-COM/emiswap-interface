import { Token, TokenAmount } from '@uniswap/sdk';
import React, { useContext } from 'react';
import { Repeat } from 'react-feather';
import { Text } from 'rebass';
import { ThemeContext } from 'styled-components';
import { Field } from '../../state/invest/actions';
import { ButtonError } from '../Button';
import { AutoColumn } from '../Column';
import { AutoRow, RowBetween } from '../Row';
import { StyledBalanceMaxMini } from './styleds';
import { tokenAmountToString } from '../../utils/formats';

export default function InvestModalFooter({
  showInverted,
  setShowInverted,
  onInvest,
  parsedAmounts,
  confirmText,
  currencies,
}: {
  showInverted: boolean;
  setShowInverted: (inverted: boolean) => void;
  onInvest: () => any;
  parsedAmounts?: { [field in Field]?: TokenAmount };
  confirmText: string;
  currencies: { [field in Field]?: Token };
}) {
  const theme = useContext(ThemeContext);

  let rate;
  let price;

  if (parsedAmounts) {
    if (!showInverted) {
      rate = parsedAmounts[Field.OUTPUT]
        ? tokenAmountToString(parsedAmounts[Field.INPUT]?.divide(parsedAmounts[Field.OUTPUT]!))
        : null;
      price = `${rate} ${currencies[Field.INPUT]?.symbol} / ${currencies[Field.OUTPUT]?.symbol}`;
    } else {
      rate = parsedAmounts[Field.INPUT]
        ? tokenAmountToString(parsedAmounts[Field.OUTPUT]?.divide(parsedAmounts[Field.INPUT]!))
        : null;
      price = `${rate} ${currencies[Field.OUTPUT]?.symbol} / ${currencies[Field.INPUT]?.symbol}`;
    }
  }

  return (
    <>
      <AutoColumn gap="0px">
        <RowBetween align="center">
          <Text fontWeight={400} fontSize={14} color={theme.text2}>
            Price
          </Text>
          <Text
            fontWeight={500}
            fontSize={14}
            color={theme.text1}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              textAlign: 'right',
              paddingLeft: '10px',
            }}
          >
            {price}
            <StyledBalanceMaxMini onClick={() => setShowInverted(!showInverted)}>
              <Repeat size={14} />
            </StyledBalanceMaxMini>
          </Text>
        </RowBetween>
      </AutoColumn>

      <AutoRow>
        <ButtonError
          onClick={onInvest}
          style={{ margin: '10px 0 0 0' }}
          id="confirm-invest-or-send"
        >
          <Text fontSize={20} fontWeight={500}>
            {confirmText}
          </Text>
        </ButtonError>
      </AutoRow>
    </>
  );
}
