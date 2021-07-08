import React from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../../../../state';
import { Header, Level } from '../../styleds';
import { convertBigDecimal, normalizeNumber } from '../../uitls';

import * as Styled from './styled';

export const ReferralPerformance = () => {
  const { total, referrals } = useSelector((state: AppState) => state.cabinets.performance);

  const { level1, level2, level3 } = total;

  return (
    <div>
      <Header>Total Referral Performance</Header>

      <Styled.Wrapper>
        <Styled.Referrals>
          <Styled.Title>Total Referrals</Styled.Title>
          <Styled.Cell>{normalizeNumber(referrals.length)}</Styled.Cell>
          <Styled.Cell>
            <Styled.Amount>{normalizeNumber(level1?.referrals_count)}</Styled.Amount>
            <Level>1lvl</Level>
          </Styled.Cell>
          <Styled.Cell>
            <Styled.Amount>{normalizeNumber(level2?.referrals_count)}</Styled.Amount>
            <Level>2lvl</Level>
          </Styled.Cell>
          <Styled.Cell>
            <Styled.Amount>{normalizeNumber(level3?.referrals_count)}</Styled.Amount>
            <Level>3lvl</Level>
          </Styled.Cell>
        </Styled.Referrals>

        <Styled.ReferralPurchases>
          <Styled.Title>Total Ref. Purchases, ESW</Styled.Title>
          <Styled.Cell>{convertBigDecimal(total.bought.ESW)}</Styled.Cell>
          <Styled.Cell>
            <Styled.Amount>{convertBigDecimal(level1?.bought.ESW)}</Styled.Amount>
            <Level>1lvl</Level>
          </Styled.Cell>
          <Styled.Cell>
            <Styled.Amount>{convertBigDecimal(level2?.bought.ESW)}</Styled.Amount>
            <Level>2lvl</Level>
          </Styled.Cell>
          <Styled.Cell>
            <Styled.Amount>{convertBigDecimal(level3?.bought.ESW)}</Styled.Amount>
            <Level>3lvl</Level>
          </Styled.Cell>
        </Styled.ReferralPurchases>
      </Styled.Wrapper>
    </div>
  );
};
