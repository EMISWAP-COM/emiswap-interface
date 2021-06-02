import React from 'react';
import styled from 'styled-components/macro';
import { Header, Level } from '../styleds';
import { useSelector } from 'react-redux';
import { AppState } from '../../../state';
import { convertBigDecimal, normalizeNumber } from '../uitls';

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
  border-top: ${({ theme }) => `1px solid ${theme.lightGrey}`};

  @media screen and (max-width: 1200px) {
    display: flex;
    width: auto;
    border: none;
  }
`;

const Cell = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: flex-end;
  width: 16%;
  color: ${({ theme }) => theme.white};
  border-bottom: ${({ theme }) => `1px solid ${theme.lightGrey}`};

  @media screen and (max-width: 1200px) {
    justify-content: flex-start;
    width: auto;
  }
`;

const Title = styled(Cell)`
  justify-content: flex-start;
  width: 150px;
  font-size: 0.8rem;
  font-weight: normal;
  color: ${({ theme }) => theme.white};

  @media screen and (max-width: 1200px) {
    padding-right: 20px;
    min-width: 50px;
    width: auto;
  }
`;

const Table = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 1200px) {
    flex-direction: column;
    flex-grow: 1;
  }
`;

const Amount = styled.span`
  margin-right: 6px;
`;

const Referrals = styled(Table)``;

const ReferralPurchases = styled(Table)``;

// const CollectBtn = styled(WalletAction)`
//   max-width: 160px;
// `;

export const ReferralPerformance = () => {
  const { total, referrals } = useSelector((state: AppState) => state.cabinets.performance);

  const { level1, level2, level3 } = total;

  return (
    <div>
      <Header>Total Referral Performance</Header>

      <Wrapper>
        <Referrals>
          <Title>Total Referrals</Title>
          <Cell>{normalizeNumber(referrals.length)}</Cell>
          <Cell>
            <Amount>{normalizeNumber(level1?.referrals_count)}</Amount>
            <Level>1lvl</Level>
          </Cell>
          <Cell>
            <Amount>{normalizeNumber(level2?.referrals_count)}</Amount>
            <Level>2lvl</Level>
          </Cell>
          <Cell>
            <Amount>{normalizeNumber(level3?.referrals_count)}</Amount>
            <Level>3lvl</Level>
          </Cell>
        </Referrals>

        <ReferralPurchases>
          <Title>Total Ref. Purchases, ESW</Title>
          <Cell>{convertBigDecimal(total.bought.ESW!)}</Cell>
          <Cell>
            <Amount>{convertBigDecimal(level1?.bought.ESW!)}</Amount>
            <Level>1lvl</Level>
          </Cell>
          <Cell>
            <Amount>{convertBigDecimal(level2?.bought.ESW!)}</Amount>
            <Level>2lvl</Level>
          </Cell>
          <Cell>
            <Amount>{convertBigDecimal(level3?.bought.ESW!)}</Amount>
            <Level>3lvl</Level>
          </Cell>
        </ReferralPurchases>
      </Wrapper>
    </div>
  );
};
