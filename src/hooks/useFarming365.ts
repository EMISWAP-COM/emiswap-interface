import { useActiveWeb3React } from './index';
import { BigNumber } from '@ethersproject/bignumber';
import defaultCoins from '../constants/defaultCoins';
import { useCallback, useEffect, useState } from 'react';
import { JSBI, Token, TokenAmount } from '@uniswap/sdk';
import { tokenAmountToString } from '../utils/formats';
import { TransactionResponse } from '@ethersproject/providers';
import { useCompletedTransactionsCount, useTransactionAdder } from '../state/transactions/hooks';
import { EMI_ROUTER_ADRESSES } from '../constants/emi/addresses';
import { Contract } from '@ethersproject/contracts';
import useEthErrorPopup, { RequestError } from './useEthErrorPopup';
import getFarmingCoinNameAndSymbol from '../pages/Farm/getFarmingCoinNameAndSymbol';
import getFarmingLiquidityTokenAddress from '../pages/Farm/getFarmingLiquidityTokenAddress';
import dayjs from 'dayjs';
import { convertTokenAmount } from '../utils';

const logContractError = (
  methodName: string,
  account: string | null | undefined,
  chainId: number | undefined,
  contractAddress: string,
  args: string,
  originalError: Error,
) => {
  if ((originalError as RequestError)?.code === -32000) {
    return;
  }
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

export default function useFarming365(contract: Contract) {
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

  const showError = useCallback((methodName: string, args: string, error: RequestError, showPopup = true) => {
    if (showPopup) {
      addEthErrorPopup(error);
    }
    logContractError(methodName, account, chainId, contract.address, args, error);
  }, [account, chainId, contract.address, addEthErrorPopup]);

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
        } else {
          console.log('stakeToken', value);
        }
      })
      .catch((error: RequestError) => {
        showError('stakeToken', '', error);
      });
  }, [chainId, contract, showError, account]);

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
        showError('rewardToken', '', error);
      });
  }, [chainId, contract, showError, account]);

  const [balanceLp, setBalanceLp] = useState<string>('0');
  useEffect(() => {
    if (!account) {
      return;
    }
    contract
      .balanceOfLPToken(account, stakeToken?.address)
      .then((value: BigNumber) => {
        console.log(rewardToken, stakeToken);
        if (chainId && rewardToken) {
          const tokenAmount = new TokenAmount(rewardToken, JSBI.BigInt(value.toString()));
          return tokenAmountToString(tokenAmount, rewardToken.decimals);
        } else {
          return '0';
        }
      })
      .then((value: string) => setBalanceLp(value))
      .catch((error: RequestError) => {
        showError('balanceOfLPToken', account, error);
      });
  }, [account, chainId, contract, rewardToken, stakeToken, showError, completedTransactionsCount]);

  const [balanceStake, setBalanceStake] = useState<string>('0');
  useEffect(() => {
    if (!account) {
      return;
    }
    contract
      .balanceOfStakeToken(account)
      .then((value: BigNumber) => {
        if (chainId && stakeToken) {
          const tokenAmount = new TokenAmount(stakeToken, JSBI.BigInt(value.toString()));
          return tokenAmountToString(tokenAmount, stakeToken.decimals);
        } else {
          return '0';
        }
      })
      .then((value: string) => setBalanceStake(value))
      .catch((error: RequestError) => {
        showError('balanceOfStakeToken', account, error);
      });
  }, [account, chainId, contract, stakeToken, showError, completedTransactionsCount]);

  const [reward, setReward] = useState<string>('0');
  useEffect(() => {
    if (!account) {
      return;
    }

    contract
      .earned(account)
      .then((value: BigNumber) => {
        console.log('earned', value.toString());
        if (chainId && rewardToken) {
          const tokenAmount = new TokenAmount(rewardToken, JSBI.BigInt(value.toString()));
          return tokenAmountToString(tokenAmount, rewardToken.decimals);
        } else {
          return '0';
        }
      })
      .then((value: string) => setReward(value))
      .catch((error: RequestError) => {
        showError('earned', account, error);
      });
  }, [
    account,
    chainId,
    contract,
    rewardToken,
    showError,
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
        showError('rewardRate', '', error);
      });
  }, [chainId, contract, rewardToken, showError, account]);

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
        showError('totalSupply', '', error);
      });
  }, [chainId, contract, stakeToken, showError, account]);

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
        showError('periodFinish', '', error);
      });
  }, [contract, stakeToken, showError, account, chainId]);

  const [liquidity, setLiquidity] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (!chainId) {
      return;
    }

    const liquidityTokenAddress = getFarmingLiquidityTokenAddress(contract.address);
    const defaultCoin = defaultCoins.tokens.find(
      token =>
        token.chainId === chainId &&
        token.address.toLowerCase() === liquidityTokenAddress.toLowerCase(),
    );
    if (!defaultCoin) {
      throw new Error('Couldn\'t get coin');
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
        showError('getStakedValuesinUSD', '', error);
      });
  }, [
    contract,
    account,
    chainId,
    showError,
    completedTransactionsCount,
    intervalUpdateCounter,
  ]);

  const [stakedTokens, setStakedTokens] = useState<any[]>([]);
  useEffect(() => {
    contract
      .getStakedTokens(account)
      .then((value: any[]) => {
        setStakedTokens(value);
      })
      .catch((error: RequestError) => {
        showError('getStakedTokens', account || '', error);
      });
  }, [contract, showError, account, chainId]);

  const handleCalcEswByLp = (lpToken: Token, lpValue: string): Promise<string> => {
    const lpAmount = convertTokenAmount(lpToken, lpValue);
    return contract
      .getStakeValuebyLP(lpToken.address, lpAmount)
      .then((value: BigNumber) => {
        const tokenAmount = new TokenAmount(lpToken, JSBI.BigInt(value.toString()));
        return tokenAmountToString(tokenAmount, lpToken.decimals);
      })
      .catch((error: RequestError) => {
        const args = lpToken.address + ', ' + lpAmount.toString();
        showError('getStakeValuebyLP', args, error);
      });
  };

  const handleCalcLpByEsw = (lpToken: Token, eswValue: string): Promise<string> => {
    const eswAmount = convertTokenAmount(lpToken, eswValue);
    return contract
      .getLPValuebyStake(lpToken.address, eswAmount)
      .then((value: BigNumber) => {
        const tokenAmount = new TokenAmount(lpToken, JSBI.BigInt(value.toString()));
        return tokenAmountToString(tokenAmount, lpToken.decimals);
      })
      .catch((error: RequestError) => {
        const args = lpToken.address + ', ' + eswAmount.toString();
        showError('getLPValuebyStake', args, error);
      });
  };

  const handleStake = (lpToken: Token, lpValue: string, eswValue: string): Promise<unknown> => {
    const lpAmount = convertTokenAmount(lpToken, lpValue);
    const eswAmount = convertTokenAmount(lpToken, eswValue);
    const eswWithSlippage = eswAmount.add(eswAmount.div(100));

    return contract
      .stake(lpToken.address, lpAmount, eswWithSlippage)
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: `Stake ${lpValue} ${lpToken.symbol}`,
          approval: { tokenAddress: lpToken.address, spender: EMI_ROUTER_ADRESSES[chainId!] },
        });
      })
      .catch((error: RequestError) => {
        const args = lpToken.address + ', ' + lpAmount.toString() + ', ' + eswWithSlippage.toString();
        showError('stake', args, error);
      });
  };

  const handleCollect = (): Promise<unknown> => {
    if (!stakeToken) {
      throw new Error('No stake token');
    }
    return contract
      .exit()
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: `Collect all ${stakeToken.symbol}`,
          approval: { tokenAddress: stakeToken.address, spender: EMI_ROUTER_ADRESSES[chainId!] },
        });
      })
      .catch((error: RequestError) => {
        showError('exit', '', error);
      });
  };

  return {
    stakeToken,
    rewardToken,
    balanceLp,
    balanceStake,
    reward,
    blockReward,
    totalSupply,
    endDate,
    liquidity,
    tokenMode: 1,
    stakedTokens,
    calcEswByLp: handleCalcEswByLp,
    calcLpByEsw: handleCalcLpByEsw,
    collect: handleCollect,
    stake: handleStake,
  };
};
