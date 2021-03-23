import React from 'react';
import styled from 'styled-components/macro';
import { Header } from '../styleds';

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
  return (
    <div>
      <Header>My ESW Rewards</Header>
      <RewardsWrapper>
        <RewardsItem>
          <span>Providing Liquidity</span>
          <div>
            <RewardsValue>--.-</RewardsValue>&nbsp;ESW
          </div>
        </RewardsItem>
        <RewardsItem>
          <span>Swapping</span>
          <div>
            <RewardsValue>--.-</RewardsValue>&nbsp;ESW
          </div>
        </RewardsItem>
        <RewardsItem>
          <span>Referral Reward</span>
          <div>
            <RewardsValue>--.-</RewardsValue>&nbsp;ESW
          </div>{' '}
        </RewardsItem>
        <RewardsItem>
          <span>Fee Compensation</span>
          <div>
            <RewardsValue>--.-</RewardsValue>&nbsp;ESW
          </div>{' '}
        </RewardsItem>
      </RewardsWrapper>
    </div>
  );
};
