import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import { Header } from '../styleds';
import { AppState } from '../../../state';
import { convertBigDecimal } from '../uitls';

const DarkText = styled.span`
  color: ${({ theme }) => theme.white};
`;

const RewardsWrapper = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.darkText};

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
  border-radius: 4px;
  background: ${({ theme }) => theme.darkGrey};
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

  const sumSwapBonuses = () => {
    const swapBonus = grouped.swap_bonus?.ESW ?? 0;
    const swapBonus10x = grouped.swap_bonus_10x?.ESW ?? 0;
    const sum = Number(swapBonus) + Number(swapBonus10x);
    return convertBigDecimal(sum.toString());
  };

  const sumPoolBonuses = () => {
    const poolBonus = grouped.pool_bonus?.ESW ?? 0;
    const poolBonus10x = grouped.pool_bonus_10x?.ESW ?? 0;
    const poolBlockBonus = grouped.pool_block_bonus?.ESW ?? 0;
    const sum = Number(poolBonus) + Number(poolBonus10x) + Number(poolBlockBonus);
    return convertBigDecimal(sum.toString());
  };

  return (
    <div>
      <Header>My ESW Rewards</Header>
      <RewardsWrapper>
        <RewardsItem>
          <span>Providing Liquidity</span>
          <div>
            <RewardsValue>{sumPoolBonuses()}</RewardsValue>
            &nbsp;ESW
          </div>
        </RewardsItem>
        <RewardsItem>
          <span>Swapping</span>
          <div>
            <RewardsValue>{sumSwapBonuses()}</RewardsValue>
            &nbsp;ESW
          </div>
        </RewardsItem>
        <RewardsItem>
          <span>Referral Reward</span>
          <div>
            <RewardsValue>{sumRewardsESW()}</RewardsValue>
            &nbsp;ESW
          </div>
        </RewardsItem>
        <RewardsItem>
          <span>Fee Compensation</span>
          <div>
            <RewardsValue>
              {convertBigDecimal(balance?.total.grouped.compensation?.ESW)}
            </RewardsValue>
            &nbsp;ESW
          </div>
        </RewardsItem>
      </RewardsWrapper>
    </div>
  );
};
