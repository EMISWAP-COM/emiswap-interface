import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { SwapPoolTabs, TabNames } from '../../components/NavigationTabs';

import AppBody from '../AppBody';
import ExtendableRow from './ExtendableRow';
import { RadioGroup } from '../../base/ui/RadioGroup';
import Tabs from '../../base/ui/Tabs';
import useRewardPool from '../../hooks/useRewardPool';
import { FarmingTimeType } from './constants';

const StyledFarmingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`
const StyledInfoWrapper = styled.div`
  text-align: left;
  width: 50%;
  margin-bottom: 24px;
`
const StyledInfoTitle = styled.div`
  font-size: 16px;
  color: ${({theme}) => theme.white};
  margin-bottom: 16px;
`
const StyledInfo = styled.div`
  font-size: 16px;
  color: ${({theme}) => theme.darkText};
`

const radioList = [
  {
    identifier: 'all',
    value: 'All farms',
  },
  {
    identifier: 'my',
    value: 'My farming',
  },
];

const tabItems = [
  {
    id: 'staking',
    title: 'Staking',
  },
  {
    id: 'farming',
    title: 'Farming',
  },
  {
    id: 'nftfarming',
    title: 'NFT Farming',
  },
  {
    id: 'nftstaking',
    title: 'NFT Staking',
  },
];

export default function Farm() {
  const [radioValue, setRadioValue] = useState<string>('all');
  const [selectedTab, setSelectedTab] = useState<string>('staking');

  const rewardPool = useRewardPool();

  return (
    <>
      <AppBody>
        <SwapPoolTabs active={TabNames.FARM} />
        <StyledFarmingHeader>
          <Tabs items={tabItems} selectedItemId={selectedTab} onChange={setSelectedTab} />
          <RadioGroup buttonsList={radioList} groupName="farms" value={radioValue} onChange={setRadioValue} />
        </StyledFarmingHeader>
        <StyledInfoWrapper>
          <StyledInfoTitle>Variable APR Farms</StyledInfoTitle>
          <StyledInfo>
            Use these farms to increase your profit from different tokens, including ESW.
            No time limits let you stake tokens as long as you wish.
            Farming rewards are allocated to your EmiSwap account for every block.
          </StyledInfo>
        </StyledInfoWrapper>
        <ExtendableRow
          stakeToken={rewardPool.getStakeToken()}
          rewardToken={rewardPool.getRewardToken()}
          projectedReward={rewardPool.getReward()}
          apr={'---'}
          blockReward={rewardPool.getBlockReward()}
          liquidity={'---'}
          deposit={rewardPool.getBalance()}
          type={FarmingTimeType.variable}
          onStake={rewardPool.stake}
          onCollect={rewardPool.collect}
        />
      </AppBody>
    </>
  );
}
