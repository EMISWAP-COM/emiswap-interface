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
import getFarmingLiquidityTokenAddress from '../pages/Farm/getFarmingLiquidityTokenAddress';
import getFarmingCoinNameAndSymbol from '../pages/Farm/getFarmingCoinNameAndSymbol';

const logContractError = (
  methodName: string,
  account: string | null | undefined,
  chainId: number | undefined,
  contractAddress: string,
  args: string,
  originalError: Error,
) => {
  if ((originalError as RequestError)?.code === -32000) return;
  console.error(`
  Contract error\n
  Method name: ${methodName}\n
  Account: ${account}\n
  ChainId: ${chainId}\n
  Contract address: ${contractAddress}\n
  Args: ${args ? args : '---'}\n
  Error message: ${originalError.message}\n
`);
};

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
    contract
      .stakeToken()
      .then((value: string) => {
        const defaultCoin = defaultCoins.tokens.find(
          coin => coin.address.toLowerCase() === value.toLowerCase(),
        );
        if (chainId && defaultCoin) {
          const token = new Token(
            chainId,
            defaultCoin.address,
            defaultCoin.decimals,
            getFarmingCoinNameAndSymbol(contract.address).symbol || defaultCoin.symbol,
            getFarmingCoinNameAndSymbol(contract.address).name || defaultCoin.name,
          );
          setStakeToken(token);
        }
      })
      .catch((error: RequestError) => {
        addEthErrorPopup(error);
        logContractError('stakeToken', account, chainId, contract.address, '', error);
      });
  }, [chainId, contract, addEthErrorPopup, account]);

  const [rewardToken, setRewardToken] = useState<Token | undefined>(undefined);
  useEffect(() => {
    contract
      .rewardToken()
      .then((value: string) => {
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
        logContractError('rewardToken', account, chainId, contract.address, '', error);
      });
  }, [chainId, contract, addEthErrorPopup, account]);

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
        logContractError('balanceOf', account, chainId, contract.address, '', error);
      });
  }, [account, chainId, contract, stakeToken, addEthErrorPopup, completedTransactionsCount]);

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
        logContractError('earned', account, chainId, contract.address, '', error);
      });
  }, [
    account,
    chainId,
    contract,
    rewardToken,
    addEthErrorPopup,
    completedTransactionsCount,
    intervalUpdateCounter,
  ]);

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
        logContractError('rewardRate', account, chainId, contract.address, '', error);
      });
  }, [chainId, contract, rewardToken, addEthErrorPopup, account]);

  const handleStake = (amount: string): Promise<unknown> => {
    if (!stakeToken) throw new Error('No stake token');
    if (!chainId) throw new Error('No chain id');

    // Can't use more than 18 decimals
    const splittedAmount = amount.split('.');
    //FIXME Написать красиво
    let decimals = splittedAmount[1];
    if (decimals === undefined) {
      decimals = '0';
    }

    const constrainedAmount = splittedAmount[0] + '.' + decimals.substring(0, stakeToken.decimals);

    let bigIntAmount: BigNumber;
    try {
      bigIntAmount = BigNumber.from(expNumberToStr(+constrainedAmount * 10 ** stakeToken.decimals));
    } catch (e) {
      throw new Error('Invalid amount to stake');
    }
    if (!bigIntAmount) return Promise.reject();
    return contract
      .stake(bigIntAmount)
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: `Stake ${constrainedAmount} ${stakeToken.symbol}`,
          approval: { tokenAddress: stakeToken.address, spender: EMI_ROUTER_ADRESSES[chainId] },
        });
      })
      .catch((error: RequestError) => {
        // addEthErrorPopup(error);
        logContractError(
          'stake',
          account,
          chainId,
          contract.address,
          bigIntAmount.toString(),
          error,
        );
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
        // addEthErrorPopup(error);
        logContractError('exit', account, chainId, contract.address, '', error);
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
        logContractError('totalSupply', account, chainId, contract.address, '', error);
      });
  }, [chainId, contract, stakeToken, addEthErrorPopup, account]);

  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  useEffect(() => {
    contract
      .periodFinish()
      .then((value: BigNumber) => {
        const timestampInMs = value.toNumber() * 1000;
        const formattedDate = dayjs(timestampInMs).format('DD.MM.YYYY HH:MM:ss');
        setEndDate(formattedDate);
      })
      .catch((error: RequestError) => {
        addEthErrorPopup(error);
        logContractError('periodFinish', account, chainId, contract.address, '', error);
      });
  }, [contract, stakeToken, addEthErrorPopup, account, chainId]);

  const [liquidity, setLiquidity] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (!chainId) return;

    const liquidityTokenAddress = getFarmingLiquidityTokenAddress(contract.address);
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
    contract
      .getStakedValuesinUSD(account)
      .then((response: [BigNumber, BigNumber]) => {
        const [, totalStake] = response;
        const tokenAmount = new TokenAmount(liquidityToken, JSBI.BigInt(totalStake.toString()));
        setLiquidity(tokenAmountToString(tokenAmount, liquidityToken.decimals));
      })
      .catch((error: RequestError) => {
        addEthErrorPopup(error);
        logContractError('getStakedValuesinUSD', account, chainId, contract.address, '', error);
      });
  }, [
    contract,
    account,
    chainId,
    addEthErrorPopup,
    completedTransactionsCount,
    intervalUpdateCounter,
  ]);

  const [tokenMode, setTokenMode] = useState<number>(0);
  useEffect(() => {
    contract
      .tokenMode()
      .then((value: BigNumber) => setTokenMode(value.toNumber()))
      .catch((error: RequestError) => {
        addEthErrorPopup(error);
        logContractError('tokenMode', account, chainId, contract.address, '', error);
      });
  }, [contract, addEthErrorPopup, account, chainId]);

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
