import { FarmingTimeType } from './constants';
import ExtendableRow from './ExtendableRow';
import React from 'react';
import { Contract } from '@ethersproject/contracts';
import useFarming2 from '../../hooks/useFarming2';
import useIsVisibleFarm from '../../hooks/useIsVisibleFarm';

type FarmComponentProps = {
  contract: Contract;
  selectedTab: string;
  selectedFilterTab: 'active' | 'finished';
  eswPriceInDai: string;
};

const Farm2Component: React.FC<FarmComponentProps> = ({
  contract,
  selectedTab,
  selectedFilterTab,
  eswPriceInDai,
}) => {
  const farming2 = useFarming2(contract);

  const isKuCoinToken = farming2.stakeToken?.symbol?.includes('KCS');

  const isVisibleFarm = useIsVisibleFarm(farming2, selectedTab, selectedFilterTab);

  return isVisibleFarm ? (
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
      isKuCoinToken={isKuCoinToken}
    />
  ) : null;
};

export default Farm2Component;
