import { FarmingTimeType } from './constants';
import ExtendableRow from './ExtendableRow';
import React from 'react';
import useFarming from '../../hooks/useFarming';
import { Contract } from '@ethersproject/contracts';

type FarmComponentProps = {
  contract: Contract
}

const FarmComponent: React.FC<FarmComponentProps> = (
  {
    contract,
  },
) => {
  const farming = useFarming(contract);

  return (
    <ExtendableRow
      stakeToken={farming.getStakeToken()}
      rewardToken={farming.getRewardToken()}
      projectedReward={farming.getReward()}
      apr={'---'}
      blockReward={farming.getBlockReward()}
      liquidity={'---'}
      deposit={farming.getBalance()}
      type={FarmingTimeType.variable}
      onStake={farming.stake}
      onCollect={farming.collect}
    />
  );
};

export default FarmComponent;
