import { FarmingTimeType } from './constants';
import ExtendableRow from './ExtendableRow';
import React from 'react';
import dayjs from 'dayjs';
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
      contractAddress={contract.address}
      stakeToken={farming.stakeToken}
      rewardToken={farming.rewardToken}
      projectedReward={farming.reward}
      apr={'---'}
      blockReward={farming.blockReward}
      liquidity={'---'}
      endTime={dayjs(farming.endTime).format('DD.MM.YYYY HH:MM:ss')}
      deposit={farming.balance}
      type={FarmingTimeType.variable}
      onStake={farming.stake}
      onCollect={farming.collect}
    />
  );
};

export default FarmComponent;
