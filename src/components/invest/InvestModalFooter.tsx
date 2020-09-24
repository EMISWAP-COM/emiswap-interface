import { TokenAmount, Percent, Trade, Token } from '@uniswap/sdk';
import React, { useContext } from 'react';
import { Repeat } from 'react-feather';
import { Text } from 'rebass';
import { ThemeContext } from 'styled-components';
import { Field } from '../../state/invest/actions';
import { TYPE } from '../../theme';
import { formatExecutionPrice } from '../../utils/prices';
import { ButtonError } from '../Button';
import { AutoColumn } from '../Column';
import QuestionHelper from '../QuestionHelper';
import { AutoRow, RowBetween, RowFixed } from '../Row';
import FormattedPriceImpact from './FormattedPriceImpact';
import { StyledBalanceMaxMini } from './styleds';

export default function InvestModalFooter({
  showInverted,
  setShowInverted,
  onInvest,
  rate,
  confirmText,
  currencies,
}: {
  showInverted: boolean;
  setShowInverted: (inverted: boolean) => void;
  onInvest: () => any;
  rate?: number;
  confirmText: string;
  currencies: { [field in Field]?: Token };
}) {
  const theme = useContext(ThemeContext);

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
            {showInverted
              ? `${1 / rate} ${currencies[Field.OUTPUT]?.symbol} / ${
                  currencies[Field.INPUT]?.symbol
                }`
              : `${rate} ${currencies[Field.INPUT]?.symbol} / ${currencies[Field.OUTPUT]?.symbol}`}
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
