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

const FarmComponent: React.FC<FarmComponentProps> = ({ contract, selectedTab, eswPriceInDai }) => {
  const farming = useFarming(contract);

  const [apr, setApr] = useState<number>(0);
  useEffect(() => {
    if (farming.blockReward && Number(farming.liquidity) && eswPriceInDai) {
      const calculatedApr =
        (parseFloat(farming.blockReward) * 6400 * 365 * 100 * parseFloat(eswPriceInDai)) /
        parseFloat(farming.liquidity);
      setApr(calculatedApr);
    }
  }, [eswPriceInDai, farming.blockReward, farming.liquidity, selectedTab]);

  const shouldShow =
    (isStakingTab(selectedTab) && !isLpToken(farming.tokenMode)) ||
    (!isStakingTab(selectedTab) && isLpToken(farming.tokenMode));
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
      tokenMode={farming.tokenMode}
    />
  ) : null;
};

export default FarmComponent;
