import { FarmingTimeType } from '../Farm/constants';
import ExtendableRow from '../Farm/ExtendableRow';
import React, { useEffect, useState } from 'react';
import { Contract } from '@ethersproject/contracts';
import useFarming365 from '../../hooks/useFarming365';
import { ESW } from '../../constants';
import { Token } from '@uniswap/sdk';
import { BigNumber } from '@ethersproject/bignumber';
import { useActiveWeb3React } from '../../hooks';

type Farm365ItemProps = {
  contract: Contract;
};

export default function Farm365Item({
  contract,
}: Farm365ItemProps) {
  const { chainId } = useActiveWeb3React();
  const farming365 = useFarming365(contract);

  const eswCurrency: Token = ESW[chainId][0];

  const [eswRate, setEswRate] = useState(0);
  const [apr, setApr] = useState<number>(0);

  useEffect(() => {
    contract
      .getTokenPrice(eswCurrency.address)
      .then((value: BigNumber) => {
        console.log('tokenPrice string', value.toString());
        console.log('tokenPrice', +value.toString() / 1000000);
        setEswRate(+value.toString() / 1000000);
      })
      .catch(e => {
        console.log(e);
      });
  }, [contract, eswCurrency.address]);

  useEffect(() => {
    if (farming365.liquidity) {
      const liq = parseFloat(farming365.liquidity);
      const blockReward = parseFloat(farming365.blockReward);
      // 365 + (36000 * 365 * blockReward * eswRate * 100 / (liquidity + 1))
      setApr(365 + ((36000 * 365 * blockReward * eswRate * 100) / (liq + 1)));
    }
  }, [eswRate, farming365.blockReward, farming365.liquidity]);

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
