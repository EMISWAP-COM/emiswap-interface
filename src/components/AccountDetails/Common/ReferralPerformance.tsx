import React from 'react';
import styled from 'styled-components/macro';
import { Level, WalletAction, Header } from '../styleds';
import { useSelector } from 'react-redux';
import { AppState } from '../../../state';
import { convertBigDecimal, normalizeNumber } from '../uitls';
import { ComingSoon } from '../../../base/ui/ComingSoon';

const DarkText = styled.span`
  color: ${({ theme }) => theme.grey3};
`;

const RewardsWrapper = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.grey6};

  margin-top: 12px;
  margin-bottom: 16px;
  display: grid;
  grid-template-columns: 3fr 4fr;
  grid-gap: 12px;

  @media screen and (max-width: 1200px) {
    margin-top: 16px;
    margin-bottom: 12px;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 8px;
  }
`;

const RewardsItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 14px;
  background: #f7f8fa;
`;
const RewardsValue = styled(DarkText)`
  font-size: 16px;
  font-weight: 600;
`;

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
  border-top: ${({ theme }) => `1px solid ${theme.grey1}`};

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
  color: ${({ theme }) => theme.grey3};
  border-bottom: ${({ theme }) => `1px solid ${theme.grey1}`};

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
  color: ${({ theme }) => theme.grey6};

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

const Referrals = styled(Table)``;

const ReferralPurchases = styled(Table)``;

const CollectBtn = styled(WalletAction)`
  max-width: 160px;
`;

export const ReferralPerformance = () => {
  const { reward, total_amount, total_count, first_level, second_level, third_level } = useSelector(
    (state: AppState) => state.cabinets.performance,
  );

  return (
    <div>
      <Header>Total Referral Performance</Header>
      <RewardsWrapper>
        <RewardsItem>
          <div>
            <span>Referral Reward, ESW</span>
            <div>
              <RewardsValue>{convertBigDecimal(reward?.esw?.total)}</RewardsValue>&nbsp;ESW
            </div>
          </div>
        </RewardsItem>
        <RewardsItem>
          <div>
            <span>Referral Reward, DAI</span>
            <div>
              <RewardsValue>{convertBigDecimal(reward?.dai?.total)}</RewardsValue>&nbsp;DAI
            </div>
          </div>
          <ComingSoon>
            <CollectBtn onClick={() => console.log('no collect handler')}>
              Collect to my wallet 
            </CollectBtn>
          </ComingSoon>
        </RewardsItem>
      </RewardsWrapper>

      <Wrapper>
        <Referrals>
          <Title>Total Referrals</Title>
          <Cell>{normalizeNumber(total_count)}</Cell>
          <Cell>
            {normalizeNumber(first_level?.total_count)}
            <Level>1lvl</Level>
          </Cell>
          <Cell>
            {normalizeNumber(second_level?.total_count)}
            <Level>2lvl</Level>
          </Cell>
          <Cell>
            {normalizeNumber(third_level?.total_count)}
            <Level>3lvl</Level>
          </Cell>
        </Referrals>

        <ReferralPurchases>
          <Title>Total Ref. Purchases, ESW</Title>
          <Cell>{convertBigDecimal(total_amount)}</Cell>
          <Cell>
            {convertBigDecimal(first_level?.amount)}
            <Level>1lvl</Level>
          </Cell>
          <Cell>
            {convertBigDecimal(second_level?.amount)}
            <Level>2lvl</Level>
          </Cell>
          <Cell>
            {convertBigDecimal(third_level?.amount)}
            <Level>3lvl</Level>
          </Cell>
        </ReferralPurchases>
        <ReferralPurchases>
          <Title>Total Ref. Purchases, DAI</Title>
          <Cell>{convertBigDecimal(total_amount)}</Cell>
          <Cell>
            {convertBigDecimal(first_level?.amount)}
            <Level>1lvl</Level>
          </Cell>
          <Cell>
            {convertBigDecimal(second_level?.amount)}
            <Level>2lvl</Level>
          </Cell>
          <Cell>
            {convertBigDecimal(third_level?.amount)}
            <Level>3lvl</Level>
          </Cell>
        </ReferralPurchases>
      </Wrapper>
    </div>
  );
};
