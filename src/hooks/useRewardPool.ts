import { useActiveWeb3React } from './index';
import { Contract } from '@ethersproject/contracts';
import { getRewardPoolContract } from '../utils';
import { BigNumber } from '@ethersproject/bignumber';
import defaultCoins from '../constants/defaultCoins';
import { useEffect, useMemo, useState } from 'react';
import { JSBI, Token, TokenAmount } from '@uniswap/sdk';
import { tokenAmountToString } from '../utils/formats';
import { TransactionResponse } from '@ethersproject/providers';
import { useCompletedTransactionsCount, useTransactionAdder } from '../state/transactions/hooks';
import { EMI_ROUTER_ADRESSES } from '../constants/emi/addresses';

const useRewardPool = () => {
  const { chainId, library, account } = useActiveWeb3React();
  const addTransaction = useTransactionAdder();

  // This counter is used to update data whenever transaction finishes
  const completedTransactionsCount = useCompletedTransactionsCount();

  if (!library) {
    throw new Error('Failed to get a library');
  }
  if (!account) {
    throw new Error('Failed to get an account');
  }

  const contract: Contract | null = useMemo(() => getRewardPoolContract(library, account), [library, account]);

  if (!contract) {
    throw new Error('Failed to get a RewardPool contract');
  }

  const [stakeToken, setStakeToken] = useState<Token | undefined>(undefined);
  useEffect(() => {
    contract.stakeToken().then((value: string) => {
      const defaultCoin = defaultCoins.tokens.find((coin) => coin.address === value);
      if (chainId && defaultCoin) {
        const token = new Token(chainId, defaultCoin.address, defaultCoin.decimals, defaultCoin.symbol, defaultCoin.name);
        setStakeToken(token);
      }
    });
  }, [chainId, contract])

  const [rewardToken, setRewardToken] = useState<Token | undefined>(undefined);
  useEffect(() => {
    contract.rewardToken().then((value: string) => {
      const defaultCoin = defaultCoins.tokens.find((coin) => coin.address === value);
      if (chainId && defaultCoin) {
        const token = new Token(chainId, defaultCoin.address, defaultCoin.decimals, defaultCoin.symbol, defaultCoin.name);
        setRewardToken(token);
      }
    });
  }, [chainId, contract]);

  const [balance, setBalance] = useState<string | undefined>(undefined);
  useEffect(() => {
    contract.balanceOf(account)
      .then((value: BigNumber) => {
          if (chainId && stakeToken) {
            const tokenAmount = new TokenAmount(
              stakeToken,
              JSBI.BigInt(value.toString())
            );
            return tokenAmountToString(tokenAmount, stakeToken.decimals);
          } else {
            return '0';
          }
        }
      ).then((value: string) => setBalance(value));
  }, [account, chainId, contract, stakeToken, completedTransactionsCount]);

  const [reward, setReward] = useState<string | undefined>(undefined);
  useEffect(() => {
    contract.earned(account)
      .then((value: BigNumber) => {
          if (chainId && rewardToken) {
            const tokenAmount = new TokenAmount(
              rewardToken,
              JSBI.BigInt(value.toString())
            );
            return tokenAmountToString(tokenAmount, rewardToken.decimals);
          } else {
            return '0';
          }
        },
      ).then((value: string) => setReward(value));
  }, [account, chainId, contract, rewardToken, completedTransactionsCount]);

  const [blockReward, setBlockReward] = useState<string | undefined>(undefined);
  useEffect(() => {
    contract.rewardRate().then((value: BigNumber) => {
        if (chainId && rewardToken) {
          const tokenAmount = new TokenAmount(
            rewardToken,
            JSBI.BigInt(value.mul(BigNumber.from(13)).toString()),
          );
          return tokenAmountToString(tokenAmount, rewardToken.decimals);
        } else {
          return '0';
        }
      },
    ).then((value: string) => setBlockReward(value));
  }, [chainId, contract, rewardToken]);

  const handleStake = (amount: string): Promise<unknown> => {
    if (!stakeToken) throw new Error('No stake token');
    if (!chainId) throw new Error('No chain id');

    const bigIntAmount = BigNumber.from(amount).mul(BigNumber.from(Math.pow(10, stakeToken.decimals)));
    return contract.stake(bigIntAmount)
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: `Stake ${amount} ${stakeToken.symbol}`,
          approval: { tokenAddress: stakeToken.address, spender: EMI_ROUTER_ADRESSES[chainId] },
        });
      })
      .catch((error: Error) => {
        console.error('Failed to approve token');
        throw error;
      });
  };

  const handleCollect = (): Promise<unknown> => {
    if (!stakeToken) throw new Error('No stake token');
    if (!chainId) throw new Error('No chain id');

    return contract.exit()
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: `Collect all ${stakeToken.symbol}`,
          approval: { tokenAddress: stakeToken.address, spender: EMI_ROUTER_ADRESSES[chainId] },
        });
      })
      .catch((error: Error) => {
        console.error('Failed to approve token');
        throw error;
      });
  };


  return {
    getStakeToken: () => stakeToken,
    getRewardToken: () => rewardToken,
    getBalance: () => balance,
    getReward: () => reward,
    getBlockReward: () => blockReward,
    collect: handleCollect,
    stake: handleStake,
  }
}

export default useRewardPool;
