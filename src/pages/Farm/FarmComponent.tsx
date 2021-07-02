import { FarmingTimeType } from './constants';
import ExtendableRow from './ExtendableRow';
import React, { useEffect, useState } from 'react';
import useFarming from '../../hooks/useFarming';
import { Contract } from '@ethersproject/contracts';
import isLpToken from './isLpToken';
import { isStakingTab } from '.';

type FarmComponentProps = {
  contract: Contract;
  selectedTab: string;
  eswPriceInDai: string;
};

const FarmComponent: React.FC<FarmComponentProps> = (
  {
    contract,
    selectedTab,
    eswPriceInDai,
  }
) => {
  const farming = useFarming(contract);

  const [apr, setApr] = useState<string>('0%');
  useEffect(() => {
    if (farming.blockReward && farming.liquidity && eswPriceInDai) {
      const calculatedApr = (parseFloat(farming.blockReward) * 5 * 60 * 24 * 365 * parseFloat(eswPriceInDai)) / parseFloat(farming.liquidity);
      setApr(String(calculatedApr.toFixed(10)) + '%');
    }
  }, [eswPriceInDai, farming.blockReward, farming.liquidity])

  const shouldShow =
    (isStakingTab(selectedTab) && !isLpToken(farming.stakeToken)) ||
    (!isStakingTab(selectedTab) && isLpToken(farming.stakeToken));
  return shouldShow ? (
    <ExtendableRow
      contractAddress={contract.address}
      stakeToken={farming.stakeToken}
      rewardToken={farming.rewardToken}
      projectedReward={farming.reward}
      apr={apr}
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
