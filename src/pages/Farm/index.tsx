import React, { useState } from 'react';
import { SwapPoolTabs, TabNames } from '../../components/NavigationTabs';

import AppBody from '../AppBody';
import ExtendableRow from './ExtendableRow';
import { RadioGroup } from '../../base/ui/RadioGroup';
import Tabs from '../../base/ui/Tabs';
import useRewardPool from '../../hooks/useRewardPool';
import { FarmingTimeType } from './constants';

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
        <Tabs items={tabItems} selectedItemId={selectedTab} onChange={setSelectedTab} />
        <RadioGroup buttonsList={radioList} groupName="farms" value={radioValue} onChange={setRadioValue} />
          <ExtendableRow
            key={rewardPool.getStakeToken()?.address}
            coinName={rewardPool.getStakeToken()?.symbol}
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
