import { FarmingTimeType } from './constants';
import ExtendableRow from './ExtendableRow';
import React from 'react';
import useFarming from '../../hooks/useFarming';
import { Contract } from '@ethersproject/contracts';
import isLpToken from './isLpToken';
import { isStakingTab } from '.';

type FarmComponentProps = {
  contract: Contract;
  selectedTab: string;
};

const FarmComponent: React.FC<FarmComponentProps> = ({ contract, selectedTab }) => {
  const farming = useFarming(contract);

  const shouldShow =
    (isStakingTab(selectedTab) && !isLpToken(farming.stakeToken)) ||
    (!isStakingTab(selectedTab) && isLpToken(farming.stakeToken));
  return shouldShow ? (
    <ExtendableRow
      contractAddress={contract.address}
      stakeToken={farming.stakeToken}
      rewardToken={farming.rewardToken}
      projectedReward={farming.reward}
      apr={'---'}
      blockReward={farming.blockReward}
      liquidity={farming.liquidity}
      endDate={farming.endDate}
      deposit={farming.balance}
      type={FarmingTimeType.variable}
      onStake={farming.stake}
      onCollect={farming.collect}
    />
  ) : (
    <div></div>
  );
};

export default FarmComponent;
