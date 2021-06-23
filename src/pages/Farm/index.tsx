import React, { useState } from 'react';
import { SwapPoolTabs, TabNames } from '../../components/NavigationTabs';

import AppBody from '../AppBody';
import { FarmingTimeType } from './types';
import ExtendableRow from './ExtendableRow';
import { RadioGroup } from '../../base/ui/RadioGroup';
import Tabs from '../../base/ui/Tabs';

const mockData = [
  {
    coinName: 'ESW',
    projectedReward: 5000,
    apr: 23.89,
    lockPeriodDays: 30,
    blockReward: 250,
    liquidity: 675222177,
    type: FarmingTimeType.Unlimited,
  },
  {
    coinName: 'ESW–USDT',
    projectedReward: 5000,
    apr: 100,
    lockPeriodDays: 30,
    blockReward: 250,
    liquidity: 675222177,
    type: FarmingTimeType.Fixed,
  },
  {
    coinName: 'ESW–USDT',
    projectedReward: 5000,
    apr: 100,
    lockPeriodDays: 30,
    blockReward: 250,
    liquidity: 675222177,
    type: FarmingTimeType.Fixed,
  },
  {
    coinName: 'ESW–USDT',
    projectedReward: 5000,
    apr: 100,
    lockPeriodDays: 30,
    blockReward: 250,
    liquidity: 675222177,
    type: FarmingTimeType.Fixed,
  },
  {
    coinName: 'ESW–USDT',
    projectedReward: 5000,
    apr: 100,
    lockPeriodDays: 30,
    blockReward: 250,
    liquidity: 675222177,
    type: FarmingTimeType.Fixed,
  }
];

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

  return (
    <>
      <AppBody>
        <SwapPoolTabs active={TabNames.FARM} />
        <Tabs items={tabItems} selectedItemId={selectedTab} onChange={setSelectedTab} />
        <RadioGroup buttonsList={radioList} groupName="farms" value={radioValue} onChange={setRadioValue} />
        {mockData.map((data) =>
          <ExtendableRow
            coinName={data.coinName}
            projectedReward={data.projectedReward}
            apr={data.apr}
            blockReward={data.blockReward}
            liquidity={data.liquidity}
            lockPeriodDays={data.lockPeriodDays}
            type={data.type}
          />)
        }
      </AppBody>
    </>
  );
}
