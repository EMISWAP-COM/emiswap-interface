import React from 'react';
import styled from 'styled-components/macro';
import { Header } from '../styleds';
import { useSelector } from 'react-redux';
import { AppState } from '../../../state';
import { convertBigDecimal } from '../uitls';
import { useIsEthActive, useNetworkData } from '../../../hooks/Coins';

// export const Calculating = styled.div`
//   position: relative;
//
//   &:after {
//     position: absolute;
//     content: 'Calculating...';
//     background: ${({ theme }) => theme.red3};
//
//     border-radius: 12px;
//     padding: 0 8px;
//     top: -12px;
//     right: -5px;
//     text-transform: lowercase;
//     color: white;
//     font-weight: 500;
//     font-size: 12px;
//     z-index: 10;
//   }
// `;

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

const RewardsWrapperPolygon = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.darkText};

  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 12px;

  @media screen and (max-width: 1200px) {
    margin-top: 16px;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 8px;
  }
`;

const RewardsItem = styled.div`
  padding: 14px;
  background: ${({ theme }) => theme.darkGrey};
`;
const RewardsValue = styled(DarkText)`
  font-size: 16px;
  font-weight: 600;
`;

const Item = ({ text, count }: { text: string; count: string }) => (
  <RewardsItem>
    <span>{text}</span>
    <div>
      <RewardsValue>{count}</RewardsValue>
      &nbsp;ESW
    </div>
  </RewardsItem>
);
export const ESWRewards = () => {
  const isEthActive = useIsEthActive();
  const { value: network } = useNetworkData();

  const balance = useSelector((state: AppState) => {
    if (network === 'polygon' || network === 'mumbai') {
      return state.polygonCabinet.balance;
    } else if (network === 'shiden') {
      return state.shidenCabinet.balance;
    } else return state.cabinets.balance;
  });
  const grouped = balance?.total?.grouped;

  const sumRewardsESW = (): string => {
    const referralBonus = grouped.referral_bonus?.ESW || 0;
    const poolRefferalBonus = grouped.pool_referral_bonus?.ESW || 0;

    const reward = Number(referralBonus) + Number(poolRefferalBonus);
    return convertBigDecimal(reward.toString());
  };

  const sumSwapBonuses = (): string => {
    const swapBonus = grouped.swap_bonus?.ESW ?? 0;
    const swapBonus10x = grouped.swap_bonus_10x?.ESW ?? 0;
    const sum = Number(swapBonus) + Number(swapBonus10x);
    return convertBigDecimal(sum.toString());
  };

  const sumPoolBonuses = (): string => {
    const poolBonus = grouped.pool_bonus?.ESW ?? 0;
    const poolBonus10x = grouped.pool_bonus_10x?.ESW ?? 0;
    const poolBlockBonus = grouped.pool_block_bonus?.ESW ?? 0;
    const sum = Number(poolBonus) + Number(poolBonus10x) + Number(poolBlockBonus);
    return convertBigDecimal(sum.toString());
  };

  const referalRevards =
    parseFloat((grouped as any).referral_bonus_180?.ESW ?? '0') +
    parseFloat((grouped as any).referral_bonus_365?.ESW ?? '0');

  return (
    <div>
      <Header>My ESW Rewards</Header>
      {isEthActive && (
        <RewardsWrapper>
          <Item text="Providing Liquidity" count={sumPoolBonuses()} />
          <Item text="Swapping" count={sumSwapBonuses()} />
          <Item text="Referral Reward" count={sumRewardsESW()} />
          <Item text="Fee Compensation" count={balance?.total.grouped.compensation?.ESW!} />
        </RewardsWrapper>
      )}
      {(network === 'polygon' || network === 'mumbai' || network === 'shiden') && (
        <RewardsWrapperPolygon>
          <Item
            text="180% APR campain"
            count={convertBigDecimal((grouped as any).bonus_180?.ESW ?? '0')}
          />
          <Item
            text="365+% APR campain"
            count={convertBigDecimal((grouped as any).bonus_365?.ESW ?? '0')}
          />
          <Item text="Referral Reward" count={convertBigDecimal(referalRevards.toString())} />
        </RewardsWrapperPolygon>
      )}
    </div>
  );
};
