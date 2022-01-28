import { FarmingTimeType } from './constants';
import ExtendableRow from './ExtendableRow';
import React, { useEffect, useState } from 'react';
import useFarming from '../../hooks/useFarming';
import { Contract } from '@ethersproject/contracts';
import useIsVisibleFarm from '../../hooks/useIsVisibleFarm';

type FarmComponentProps = {
  contract: Contract;
  selectedTab: string;
  selectedFilterTab: 'active' | 'finished';
  eswPriceInDai: string;
};

const FarmComponent: React.FC<FarmComponentProps> = ({
  contract,
  selectedTab,
  selectedFilterTab,
  eswPriceInDai,
}) => {
  const farming = useFarming(contract);

  const [apr, setApr] = useState<number>(0);

  const isKuCoinToken = farming.stakeToken?.symbol?.includes('KCS');

  const isVisibleFarm = useIsVisibleFarm(farming, selectedTab, selectedFilterTab);

  useEffect(() => {
    if (farming.blockReward && Number(farming.liquidity) && eswPriceInDai) {
      const block = parseFloat(farming.blockReward);
      const dai = parseFloat(eswPriceInDai);
      const liq = parseFloat(farming.liquidity);

      if (isKuCoinToken) {
        setApr((block * 28800 * 365 * 100 * dai) / liq);
      } else {
        setApr((block * 6400 * 365 * 100 * dai) / liq);
      }
    }
  }, [eswPriceInDai, farming.blockReward, farming.liquidity, selectedTab, isKuCoinToken]);

  return isVisibleFarm ? (
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
      isKuCoinToken={isKuCoinToken}
    />
  ) : null;
};

export default FarmComponent;
