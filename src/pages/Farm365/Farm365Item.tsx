import { FarmingTimeType } from '../Farm/constants';
import ExtendableRow from '../Farm/ExtendableRow';
import React, { useEffect, useState } from 'react';
import { Contract } from '@ethersproject/contracts';
import useFarming from '../../hooks/useFarming';

type Farm365ItemProps = {
  contract: Contract;
  eswPriceInDai: string;
};

export default function Farm365Item({
  contract,
  eswPriceInDai,
}: Farm365ItemProps) {
  const farming = useFarming(contract);

  const [apr, setApr] = useState<number>(0);

  useEffect(() => {
    if (farming.blockReward && Number(farming.liquidity) && eswPriceInDai) {
      const block = parseFloat(farming.blockReward);
      const dai = parseFloat(eswPriceInDai);
      const liq = parseFloat(farming.liquidity);

      setApr((block * 6400 * 365 * 100 * dai) / liq);
    }
  }, [eswPriceInDai, farming.blockReward, farming.liquidity]);

  console.log('farming', farming);

  return (
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
      farming365={true}
    />
  );
};
