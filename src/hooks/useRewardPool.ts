import { useActiveWeb3React } from './index';
import { Contract } from '@ethersproject/contracts';
import { getRewardPoolContract } from '../utils';
import { BigNumber } from '@ethersproject/bignumber';
import defaultCoins, { DefaultCoinsToken } from '../constants/defaultCoins';
import { useState } from 'react';

const useRewardPool = () => {
  const { library, account } = useActiveWeb3React();

  if (!library) {
    throw new Error('Failed to get a library');
  }
  if (!account) {
    throw new Error('Failed to get an account');
  }

  const contract: Contract | null = getRewardPoolContract(library, account);

  if (!contract) {
    throw new Error('Failed to get a RewardPool contract');
  }

  const [stakeToken, setStakeToken] = useState<DefaultCoinsToken | undefined>(undefined);
  const updateStakeToken = () => {
    contract.stakeToken().then((value: string) => {
      setStakeToken(defaultCoins.tokens.find((coin) => coin.address === value));
    });
  }
  updateStakeToken();

  const [rewardToken, setRewardToken] = useState<DefaultCoinsToken | undefined>(undefined);
  const updateRewardToken = () => {
    contract.rewardToken().then((value: string) => {
      setRewardToken(defaultCoins.tokens.find((coin) => coin.address === value));
    });
  }
  updateRewardToken();

  const [balance, setBalance] = useState<string | undefined>(undefined);
  const updateBalance = () => {
    contract.balanceOf(account)
      .then((value: BigNumber) => value
        .div(BigNumber.from(Math.pow(10, stakeToken?.decimals || 1)))
        .toString()
      ).then((value: string) => setBalance(value));
  }
  updateBalance();

  const [reward, setReward] = useState<string | undefined>(undefined);
  const updateReward = () => {
    contract.earned(account)
      .then((value: BigNumber) => value
        .div(BigNumber.from(Math.pow(10, rewardToken?.decimals || 18)))
        .toString()
      ).then((value: string) => setReward(value));
  }
  updateReward();

  const [blockReward, setBlockReward] = useState<string | undefined>(undefined);
  const updateBlockReward = () => {
    contract.rewardRate().then((value: BigNumber) => value
      .mul(BigNumber.from(13))
      .div(BigNumber.from(Math.pow(10, rewardToken?.decimals || 1)))
      .toString()
    ).then((value: string) => setBlockReward(value));
  }
  updateBlockReward();

  const handleStake = (amount: string) => {
    const bigIntAmount = BigNumber.from(amount).mul(BigNumber.from(Math.pow(10, stakeToken?.decimals || 1)));
    contract.stake(bigIntAmount);
  }


  return {
    getStakeToken: () => stakeToken,
    getRewardToken: () => rewardToken,
    getBalance: () => balance,
    getReward: () => reward,
    getBlockReward: () => blockReward,
    collect: () => contract.exit(),
    stake: handleStake,
  }
}

export default useRewardPool;
