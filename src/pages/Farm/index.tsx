import React  from 'react';
import { SwapPoolTabs, TabNames } from '../../components/NavigationTabs';

import AppBody from '../AppBody';
import { FarmingTimeType } from './types';
import ExtendableRow from './ExtendableRow';

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
]

export default function Farm() {
  return (
    <>
      <AppBody>
        <SwapPoolTabs active={TabNames.FARM} />
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
