import { useActiveWeb3React } from './index';
import { BigNumber } from '@ethersproject/bignumber';
import defaultCoins from '../constants/defaultCoins';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { JSBI, Token, TokenAmount } from '@uniswap/sdk';
import { expNumberToStr, tokenAmountToString } from '../utils/formats';
import { TransactionResponse } from '@ethersproject/providers';
import { useCompletedTransactionsCount, useTransactionAdder } from '../state/transactions/hooks';
import { EMI_ROUTER_ADRESSES } from '../constants/emi/addresses';
import { Contract } from '@ethersproject/contracts';
import useEthErrorPopup, { RequestError } from './useEthErrorPopup';

const useFarming = (contract: Contract) => {
  const { chainId, account } = useActiveWeb3React();
  const addTransaction = useTransactionAdder();
  const addEthErrorPopup = useEthErrorPopup();

  // This counter is used to update data whenever transaction finishes
  const completedTransactionsCount = useCompletedTransactionsCount();

  // This counter is used to update data every N seconds
  const [intervalUpdateCounter, setIntervalUpdateCounter] = useState<number>(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIntervalUpdateCounter(counter => ++counter);
    }, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const [stakeToken, setStakeToken] = useState<Token | undefined>(undefined);
  useEffect(() => {
    contract.stakeToken().then((value: string) => {
      const defaultCoin = defaultCoins.tokens.find(
        coin => coin.address.toLowerCase() === value.toLowerCase(),
      );
      if (chainId && defaultCoin) {
        const token = new Token(
          chainId,
          defaultCoin.address,
          defaultCoin.decimals,
          defaultCoin.symbol,
          defaultCoin.name,
        );
        setStakeToken(token);
      }
    })
      .catch((error: RequestError) => {
        addEthErrorPopup(error);
        throw error;
      });
  }, [chainId, contract]);

  const [rewardToken, setRewardToken] = useState<Token | undefined>(undefined);
  useEffect(() => {
    contract.rewardToken().then((value: string) => {
      const defaultCoin = defaultCoins.tokens.find(
        coin => coin.address.toLowerCase() === value.toLowerCase(),
      );
      if (chainId && defaultCoin) {
        const token = new Token(
          chainId,
          defaultCoin.address,
          defaultCoin.decimals,
          defaultCoin.symbol,
          defaultCoin.name,
        );
        setRewardToken(token);
      }
    })
      .catch((error: RequestError) => {
        addEthErrorPopup(error);
        throw error;
      });
  }, [chainId, contract]);

  const [balance, setBalance] = useState<string>('0');
  useEffect(() => {
    if (!account) return;

    contract
      .balanceOf(account)
      .then((value: BigNumber) => {
        if (chainId && stakeToken) {
          const tokenAmount = new TokenAmount(stakeToken, JSBI.BigInt(value.toString()));
          return tokenAmountToString(tokenAmount, stakeToken.decimals);
        } else {
          return '0';
        }
      })
      .then((value: string) => setBalance(value))
      .catch((error: RequestError) => {
        addEthErrorPopup(error);
        throw error;
      });
  }, [account, chainId, contract, stakeToken, completedTransactionsCount]);

  const [reward, setReward] = useState<string>('0');
  useEffect(() => {
    if (!account) return;

    contract
      .earned(account)
      .then((value: BigNumber) => {
        if (chainId && rewardToken) {
          const tokenAmount = new TokenAmount(rewardToken, JSBI.BigInt(value.toString()));
          return tokenAmountToString(tokenAmount, rewardToken.decimals);
        } else {
          return '0';
        }
      })
      .then((value: string) => setReward(value))
      .catch((error: RequestError) => {
        addEthErrorPopup(error);
        throw error;
      });
  }, [account, chainId, contract, rewardToken, completedTransactionsCount, intervalUpdateCounter]);

  const [blockReward, setBlockReward] = useState<string>('0');
  useEffect(() => {
    contract
      .rewardRate()
      .then((value: BigNumber) => {
        if (chainId && rewardToken) {
          const tokenAmount = new TokenAmount(
            rewardToken,
            JSBI.BigInt(value.mul(BigNumber.from(13)).toString()),
          );
          return tokenAmountToString(tokenAmount, rewardToken.decimals);
        } else {
          return '0';
        }
      })
      .then((value: string) => setBlockReward(value))
      .catch((error: RequestError) => {
        addEthErrorPopup(error);
        throw error;
      });
  }, [chainId, contract, rewardToken]);

  const handleStake = (amount: string): Promise<unknown> => {
    if (!stakeToken) throw new Error('No stake token');
    if (!chainId) throw new Error('No chain id');

    const bigIntAmount = BigNumber.from(expNumberToStr(+amount * 10 ** stakeToken.decimals));
    return contract
      .stake(bigIntAmount)
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: `Stake ${amount} ${stakeToken.symbol}`,
          approval: { tokenAddress: stakeToken.address, spender: EMI_ROUTER_ADRESSES[chainId] },
        });
      })
      .catch((error: RequestError) => {
        addEthErrorPopup(error);
        throw error;
      });
  };

  const handleCollect = (): Promise<unknown> => {
    if (!stakeToken) throw new Error('No stake token');
    if (!chainId) throw new Error('No chain id');

    return contract
      .exit()
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: `Collect all ${stakeToken.symbol}`,
          approval: { tokenAddress: stakeToken.address, spender: EMI_ROUTER_ADRESSES[chainId] },
        });
      })
      .catch((error: RequestError) => {
        addEthErrorPopup(error);
        throw error;
      });
  };

  const [totalSupply, setTotalSupply] = useState<string | undefined>(undefined);
  useEffect(() => {
    contract
      .totalSupply()
      .then((value: BigNumber) => {
        if (chainId && stakeToken) {
          const tokenAmount = new TokenAmount(stakeToken, JSBI.BigInt(value.toString()));
          return tokenAmountToString(tokenAmount, stakeToken.decimals);
        } else {
          return '0';
        }
      })
      .then((value: string) => setTotalSupply(value))
      .catch((error: RequestError) => {
        addEthErrorPopup(error);
        throw error;
      });
  }, [chainId, contract, stakeToken]);

  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  useEffect(() => {
    contract.periodFinish().then((value: BigNumber) => {
      const timestampInMs = value.toNumber() * 1000;
      const formattedDate = dayjs(timestampInMs).format('DD.MM.YYYY HH:MM:ss');
      setEndDate(formattedDate);
    })
      .catch((error: RequestError) => {
        addEthErrorPopup(error);
        throw error;
      });
  }, [contract, stakeToken]);

  const [liquidity, setLiquidity] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (!chainId) return;

    // @ts-ignore
    const liquidityTokenAddress = window.env.FARMING_LIQUIDITY_TOKENS[contract.address];
    const defaultCoin = defaultCoins.tokens.find(
      token =>
        token.chainId === chainId &&
        token.address.toLowerCase() === liquidityTokenAddress.toLowerCase(),
    );
    if (!defaultCoin) {
      throw new Error("Couldn't get coin");
    }
    const liquidityToken = new Token(
      chainId,
      defaultCoin.address,
      defaultCoin.decimals,
      defaultCoin.symbol,
      defaultCoin.name,
    );
    contract.getStakedValuesinUSD(account).then((response: [BigNumber, BigNumber]) => {
      const [, totalStake] = response;
      const tokenAmount = new TokenAmount(liquidityToken, JSBI.BigInt(totalStake.toString()));
      setLiquidity(tokenAmountToString(tokenAmount, liquidityToken.decimals));
    })
      .catch((error: RequestError) => {
        addEthErrorPopup(error);
        throw error;
      });
  }, [contract, account, chainId, completedTransactionsCount, intervalUpdateCounter]);

  const [tokenMode, setTokenMode] = useState<number>(0);
  useEffect(() => {
    contract.tokenMode().then((value: BigNumber) => setTokenMode(value.toNumber()))
      .catch((error: RequestError) => {
        addEthErrorPopup(error);
        throw error;
      });
  }, [contract]);

  return {
    stakeToken: stakeToken,
    rewardToken: rewardToken,
    balance: balance,
    reward: reward,
    blockReward: blockReward,
    collect: handleCollect,
    stake: handleStake,
    totalSupply: totalSupply,
    endDate: endDate,
    liquidity: liquidity,
    tokenMode: tokenMode,
  };
};

export default useFarming;
