import React from 'react';
import styled from 'styled-components/macro';
import { Header } from '../styleds';
import { useSelector } from 'react-redux';
import { AppState } from '../../../state';
import { convertBigDecimal } from '../uitls';

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
  const balance = useSelector((state: AppState) => state.cabinets.balance);
  const grouped = balance?.total?.grouped;

  const sumRewardsESW = () => {
    const referralBonus = grouped.referral_bonus?.ESW || 0;
    const poolRefferalBonus = grouped.pool_referral_bonus?.ESW || 0;

    const reward = Number(referralBonus) + Number(poolRefferalBonus);
    return convertBigDecimal(reward.toString());
  };

  const evalPoolBonuses = () => {
    const poolBonus = balance.total.grouped.pool_bonus?.ESW;
    const poolBonus10x =  balance.total.grouped.pool_bonus_10x?.ESW;
    const sum = (!isNaN(Number(poolBonus))? Number(poolBonus) : 0) + (!isNaN(Number(poolBonus)) ? Number(poolBonus10x) : 0);
    return sum.toFixed(2);
  }

  return (
    <div>
      <Header>My ESW Rewards</Header>
      <RewardsWrapper>
        <RewardsItem>
          <span>Providing Liquidity</span>
          <div>
            <RewardsValue>{evalPoolBonuses()}</RewardsValue>
            &nbsp;ESW
          </div>
        </RewardsItem>
        <RewardsItem>
          <span>Swapping</span>
          <div>
            <RewardsValue>
              {convertBigDecimal(balance.total.grouped.pool_swap_bonus?.ESW)}
            </RewardsValue>
            &nbsp;ESW
          </div>
        </RewardsItem>
        <RewardsItem>
          <span>Referral Reward</span>
          <div>
            <RewardsValue>{sumRewardsESW()}</RewardsValue>
            &nbsp;ESW
          </div>{' '}
        </RewardsItem>
        <RewardsItem>
          <span>Fee Compensation</span>
          <div>
            <RewardsValue>
              {convertBigDecimal(balance?.total.grouped.compensation?.ESW)}
            </RewardsValue>
            &nbsp;ESW
          </div>{' '}
        </RewardsItem>
      </RewardsWrapper>
    </div>
  );
};
