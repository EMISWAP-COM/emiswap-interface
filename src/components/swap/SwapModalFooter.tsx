import { TokenAmount, Percent, Trade } from '@uniswap/sdk';
import React, { useContext } from 'react';
import { Repeat } from 'react-feather';
import { Text } from 'rebass';
import { ThemeContext } from 'styled-components';
import { Field } from '../../state/swap/actions';
import { TYPE } from '../../theme';
import { formatExecutionPrice } from '../../utils/prices';
import { ButtonError } from '../Button';
import { AutoColumn } from '../Column';
import QuestionHelper from '../QuestionHelper';
import { AutoRow, RowBetween, RowFixed } from '../Row';
import FormattedPriceImpact from './FormattedPriceImpact';
import { StyledBalanceMaxMini } from './styleds';
import { tokenAmountToString } from '../../utils/formats';

export default function SwapModalFooter({
  trade,
  showInverted,
  setShowInverted,
  severity,
  slippageAdjustedAmounts,
  onSwap,
  parsedAmounts,
  priceImpactWithoutFee,
  confirmText,
}: {
  trade?: Trade;
  showInverted: boolean;
  setShowInverted: (inverted: boolean) => void;
  severity: number;
  slippageAdjustedAmounts?: { [field in Field]?: TokenAmount };
  onSwap: () => any;
  parsedAmounts?: { [field in Field]?: TokenAmount };
  realizedLPFee?: TokenAmount;
  priceImpactWithoutFee?: Percent;
  confirmText: string;
}) {
  const theme = useContext(ThemeContext);
  if (!trade) {
    return null;
  }
  return (
    <>
      <AutoColumn gap="0px">
        <RowBetween align="center">
          <Text fontWeight={400} fontSize={14} color={theme.darkWhite}>
            Price
          </Text>
          <Text
            fontWeight={500}
            fontSize={14}
            color={theme.darkWhite}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              textAlign: 'right',
              paddingLeft: '10px',
            }}
          >
            {formatExecutionPrice(trade, showInverted)}
            <StyledBalanceMaxMini onClick={() => setShowInverted(!showInverted)}>
              <Repeat size={14} />
            </StyledBalanceMaxMini>
          </Text>
        </RowBetween>

        <RowBetween>
          <RowFixed>
            <TYPE.black fontSize={14} fontWeight={400} color={theme.darkWhite}>
              Minimum received
            </TYPE.black>
            <QuestionHelper text="Your transaction will revert if there is a large, unfavorable price movement before it is confirmed." />
          </RowFixed>
          <RowFixed>
            <TYPE.black color={theme.darkWhite} fontSize={14}>
              {tokenAmountToString(
                slippageAdjustedAmounts && slippageAdjustedAmounts[Field.OUTPUT],
                4,
              ) ?? '-'}
            </TYPE.black>
            {parsedAmounts && parsedAmounts[Field.OUTPUT] && parsedAmounts[Field.INPUT] && (
              <TYPE.black color={theme.darkWhite} fontSize={14} marginLeft={'4px'}>
                {parsedAmounts[Field.OUTPUT]?.token?.symbol}
              </TYPE.black>
            )}
          </RowFixed>
        </RowBetween>
        <RowBetween>
          <RowFixed>
            <TYPE.black color={theme.darkWhite} fontSize={14} fontWeight={400}>
              Price Impact
            </TYPE.black>
            <QuestionHelper text="The difference between the market price and your price due to trade size." />
          </RowFixed>
          <FormattedPriceImpact priceImpact={priceImpactWithoutFee} />
        </RowBetween>
      </AutoColumn>

      <AutoRow>
        <ButtonError
          onClick={onSwap}
          error={severity > 2}
          style={{ margin: '10px 0 0 0' }}
          id="confirm-swap-or-send"
        >
          <Text fontSize={20} fontWeight={500}>
            {confirmText}
          </Text>
        </ButtonError>
      </AutoRow>
    </>
  );
}
