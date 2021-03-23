import React from 'react';
import styled from 'styled-components/macro';
import { Header } from '../styleds';
import { useSelector } from 'react-redux';
import { AppState } from '../../../state';
import { convertBigDecimal } from '../uitls';
import { ComingSoon } from '../../../base/ui/ComingSoon';

const DarkText = styled.span`
  color: #24272c;
`;
const RewardsWrapper = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.grey6};

  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 12px;

  @media screen and (max-width: 1200px) {
    margin-top: 16px;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 8px;
  }
`;

const RewardsItem = styled.div`
  padding: 14px;
  background: ${({ theme }) => theme.bg2};
`;
const RewardsValue = styled(DarkText)`
  font-size: 16px;
  font-weight: 600;
`;

export const ESWRewards = () => {
  const { reward } = useSelector((state: AppState) => state.cabinets.performance);

  const balance = useSelector((state: AppState) => state.cabinets.balance);

  return (
    <div>
      <Header>My ESW Rewards</Header>
      <RewardsWrapper>
        <ComingSoon>
          <RewardsItem>
            <span>Providing Liquidity</span>
            <div>
              <RewardsValue />
              ESW
            </div>
          </RewardsItem>
        </ComingSoon>
        <ComingSoon>
          <RewardsItem>
            <span>Swapping</span>
            <div>
              <RewardsValue />
              ESW
            </div>
          </RewardsItem>
        </ComingSoon>
        <RewardsItem>
          <span>Referral Reward</span>
          <div>
            <RewardsValue>{convertBigDecimal(reward?.esw?.total)}</RewardsValue>&nbsp;ESW
          </div>{' '}
        </RewardsItem>
        <RewardsItem>
          <span>Fee Compensation</span>
          <div>
            <RewardsValue>{convertBigDecimal(balance?.total_fee_compensation)}</RewardsValue>
            &nbsp;ESW
          </div>{' '}
        </RewardsItem>
      </RewardsWrapper>
    </div>
  );
};
