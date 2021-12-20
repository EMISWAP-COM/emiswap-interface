import { FarmingTimeType } from '../Farm/constants';
import ExtendableRow from '../Farm/ExtendableRow';
import React, { useEffect, useState } from 'react';
import { Contract } from '@ethersproject/contracts';
import useFarming365 from '../../hooks/useFarming365';
import { ESW } from '../../constants';
import { Token } from '@uniswap/sdk';
import { BigNumber } from '@ethersproject/bignumber';
import { useActiveWeb3React } from '../../hooks';
import { calcFarming365Apr } from './helpers';
import dayjs from 'dayjs';

type Farm365ItemProps = {
  contract: Contract;
  selectedFilterTab: 'active' | 'finished';
};

export default function Farm365Item({ contract, selectedFilterTab }: Farm365ItemProps) {
  const { chainId } = useActiveWeb3React();
  const farming365 = useFarming365(contract);

  const eswCurrency: Token = ESW[chainId][0];

  const [eswRate, setEswRate] = useState(0);
  const [apr, setApr] = useState<number>(0);

  useEffect(() => {
    contract
      .getTokenPrice(eswCurrency.address)
      .then((value: BigNumber) => {
        setEswRate(+value.toString() / 1000000);
      })
      .catch(e => {
        console.log(e);
      });
  }, [contract, eswCurrency.address]);

  useEffect(() => {
    if (farming365.liquidity) {
      setApr(calcFarming365Apr(farming365.liquidity, farming365.blockReward, eswRate));
    }
  }, [eswRate, farming365.blockReward, farming365.liquidity]);

  // console.log('farming', farming365);

  const dateNow = dayjs();
  const endDate = dayjs(farming365.endDate, 'DD.MM.YYYY HH:mm:ss');

  const isVisibleFarm = selectedFilterTab === 'active' ? endDate > dateNow : endDate < dateNow;

  return isVisibleFarm ? (
    <ExtendableRow
      farming365={farming365}
      contractAddress={contract.address}
      stakeToken={farming365.stakeToken}
      rewardToken={farming365.rewardToken}
      projectedReward={farming365.reward}
      apr={apr}
      eswRate={eswRate}
      blockReward={farming365.blockReward}
      liquidity={farming365.liquidity}
      endDate={farming365.endDate}
      deposit={farming365.balanceLp}
      type={FarmingTimeType.farming365}
      tokenMode={farming365.tokenMode}
    />
  ) : null;
}
