import { FarmingTimeType } from '../Farm/constants';
import ExtendableRow from '../Farm/ExtendableRow';
import React, { useEffect, useState } from 'react';
import { Contract } from '@ethersproject/contracts';
import useFarming365 from '../../hooks/useFarming365';

type Farm365ItemProps = {
  contract: Contract;
  eswPriceInDai: string;
};

export default function Farm365Item({
  contract,
  // eswPriceInDai,
}: Farm365ItemProps) {
  const farming365 = useFarming365(contract);

  const [apr, setApr] = useState<number>(0);

  useEffect(() => {

    // (Reward per block * blocks per year * 100% * Price of Reward token) / (Total Pool Value)

    if (farming365.blockReward && Number(farming365.reward)) {
      const block = parseFloat(farming365.blockReward);
      const priceReward = parseFloat(farming365.reward);
      const liq = parseFloat(farming365.liquidity);
      const totalPoolValue = 100000;

      setApr(((block * 37000 * 365 * 100 * priceReward) / totalPoolValue / liq) + 365);
    }
  }, [farming365.blockReward, farming365.reward, farming365.liquidity]);

  // console.log('farming', farming365);

  return (
    <ExtendableRow
      farming365={farming365}
      contractAddress={contract.address}
      stakeToken={farming365.stakeToken}
      rewardToken={farming365.rewardToken}
      projectedReward={farming365.reward}
      apr={apr}
      blockReward={farming365.blockReward}
      liquidity={farming365.liquidity}
      endDate={farming365.endDate}
      deposit={farming365.balanceLp}
      type={FarmingTimeType.farming365}
      tokenMode={farming365.tokenMode}
    />
  );
};
