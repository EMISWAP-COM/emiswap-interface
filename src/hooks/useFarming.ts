import { useActiveWeb3React } from './index';
import { BigNumber } from '@ethersproject/bignumber';
import defaultCoins from '../constants/defaultCoins';
import { useEffect, useState } from 'react';
import { JSBI, Token, TokenAmount } from '@uniswap/sdk';
import { tokenAmountToString } from '../utils/formats';
import { TransactionResponse } from '@ethersproject/providers';
import { useCompletedTransactionsCount, useTransactionAdder } from '../state/transactions/hooks';
import { EMI_ROUTER_ADRESSES } from '../constants/emi/addresses';
import { Contract } from '@ethersproject/contracts';

const useFarming = (contract: Contract) => {
  const { chainId, account } = useActiveWeb3React();
  const addTransaction = useTransactionAdder();

  // This counter is used to update data whenever transaction finishes
  const completedTransactionsCount = useCompletedTransactionsCount();

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

  const [totalSupply, setTotalSupply] = useState<string | undefined>(undefined);
  useEffect(() => {
    contract.totalSupply().then((value: BigNumber) => {
        if (chainId && stakeToken) {
          const tokenAmount = new TokenAmount(
            stakeToken,
            JSBI.BigInt(value.toString())
          );
          return tokenAmountToString(tokenAmount, stakeToken.decimals);
        } else {
          return '0';
        }
      },
    ).then((value: string) => setTotalSupply(value));
  }, [chainId, contract, stakeToken]);

  return {
    stakeToken: stakeToken,
    rewardToken: rewardToken,
    balance: balance,
    reward: reward,
    blockReward: blockReward,
    collect: handleCollect,
    stake: handleStake,
    totalSupply: totalSupply,
  }
}

export default useFarming;
