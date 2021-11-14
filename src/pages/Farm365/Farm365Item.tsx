import { FarmingTimeType } from '../Farm/constants';
import ExtendableRow from '../Farm/ExtendableRow';
import React from 'react';
import { Contract } from '@ethersproject/contracts';
import useFarming2 from '../../hooks/useFarming2';

type FarmComponentProps = {
  contract: Contract;
  eswPriceInDai: string;
};

export default function Farm365Item({ contract }: FarmComponentProps) {
  const farming2 = useFarming2(contract);

  return (
    <ExtendableRow
      contractAddress={contract.address}
      stakeToken={farming2.stakeToken}
      rewardToken={farming2.rewardToken}
      projectedReward={farming2.reward}
      apr={Number(farming2.apr)}
      lockPeriod={farming2.lockPeriod}
      liquidity={farming2.liquidity}
      endDate={farming2.endDate}
      deposit={farming2.deposit}
      availableToCollect={farming2.availableToCollect}
      type={FarmingTimeType.fixed}
      onStake={farming2.stake}
      onCollect={farming2.collect}
      tokenMode={farming2.tokenMode}
    />
  );
};
