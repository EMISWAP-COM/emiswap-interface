import { FarmingTimeType } from './constants';
import ExtendableRow from './ExtendableRow';
import React from 'react';
import { Contract } from '@ethersproject/contracts';
import useFarming2 from '../../hooks/useFarming2';
import { isStakingTab } from './index';
import isLpToken from './isLpToken';

type FarmComponentProps = {
  contract: Contract;
  selectedTab: string;
  eswPriceInDai: string;
};

const Farm2Component: React.FC<FarmComponentProps> = ({ contract, selectedTab, eswPriceInDai }) => {
  const farming2 = useFarming2(contract);

  const shouldShow =
    (isStakingTab(selectedTab) && !isLpToken(farming2.tokenMode)) ||
    (!isStakingTab(selectedTab) && isLpToken(farming2.tokenMode));
  return shouldShow ? (
    <ExtendableRow
      contractAddress={contract.address}
      stakeToken={farming2.stakeToken}
      rewardToken={farming2.rewardToken}
      projectedReward={'---'}
      apr={0}
      lockPeriod={farming2.lockPeriod}
      liquidity={'---'}
      endDate={farming2.endDate}
      deposit={farming2.balance}
      type={FarmingTimeType.fixed}
      onStake={farming2.stake}
      onCollect={farming2.collect}
      tokenMode={farming2.tokenMode}
    />
  ) : null;
};

export default Farm2Component;
