import { Trade } from '@uniswap/sdk';
import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Field } from '../../state/swap/actions';
import { useUserSlippageTolerance } from '../../state/user/hooks';
import { TYPE } from '../../theme';
import { computeSlippageAdjustedAmounts, computeTradePriceBreakdown } from '../../utils/prices';
import { AutoColumn } from '../Column';
import QuestionHelper from '../QuestionHelper';
import { RowBetween, RowFixed } from '../Row';
import FormattedPriceImpact from './FormattedPriceImpact';
import { SectionBreak } from './styleds';
import SwapRoute from './SwapRoute';
import { tokenAmountToString } from '../../utils/formats';

function TradeSummary({ trade, allowedSlippage }: { trade: Trade; allowedSlippage: number }) {
  const theme = useContext(ThemeContext);
  const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade);
  const slippageAdjustedAmounts = computeSlippageAdjustedAmounts(trade, allowedSlippage);

  return (
    <>
      <AutoColumn style={{ padding: '0 20px' }}>
        <RowBetween>
          <RowFixed>
            <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
              Minimum received
            </TYPE.black>
            <QuestionHelper text="Your transaction will revert if there is a large, unfavorable price movement before it is confirmed." />
          </RowFixed>
          <RowFixed>
            <TYPE.black color={theme.text1} fontSize={14}>
              {`${tokenAmountToString(slippageAdjustedAmounts[Field.OUTPUT], 4)} ${
                trade.outputAmount.token.symbol
              }` ?? '-'}
            </TYPE.black>
          </RowFixed>
        </RowBetween>
        <RowBetween>
          <RowFixed>
            <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
              Price Impact
            </TYPE.black>
            <QuestionHelper text="The difference between the market price and estimated price due to trade size." />
          </RowFixed>
          <FormattedPriceImpact priceImpact={priceImpactWithoutFee} />
        </RowBetween>
      </AutoColumn>
    </>
  );
}

export interface AdvancedSwapDetailsProps {
  trade?: Trade;
}

export function AdvancedSwapDetails({ trade }: AdvancedSwapDetailsProps) {
  const theme = useContext(ThemeContext);

  const [allowedSlippage] = useUserSlippageTolerance();

  const showRoute = trade?.route?.path?.length! > 2;

  return (
    <AutoColumn gap="md">
      {trade && <TradeSummary trade={trade} allowedSlippage={allowedSlippage} />}
      {showRoute && (
        <>
          <SectionBreak />
          <AutoColumn style={{ padding: '0 24px' }}>
            <RowFixed>
              <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
                Route
              </TYPE.black>
              <QuestionHelper text="Routing through these tokens resulted in the best price for your trade." />
            </RowFixed>
            <SwapRoute trade={trade!} />
          </AutoColumn>
        </>
      )}
    </AutoColumn>
  );
}
