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
import { convertTokenAmount, getLpTokenByAddress } from '../utils';
import { useIsPolygonActive, useIsShidenActive } from './Coins';

const logContractError = (
  methodName: string,
  account: string | null | undefined,
  chainId: number | undefined,
  contractAddress: string,
  args: string,
  error: Error,
) => {
  if ((error as RequestError)?.code === -32000) {
    return;
  }
  console.error(`
  Contract error\n
  Method name: ${methodName}\n
  Account: ${account}\n
  ChainId: ${chainId}\n
  Contract address: ${contractAddress}\n
  Args: ${args ? args : '---'}\n
  Error message: ${error.message}\n
`);
  console.error(error);
};

export default function useFarming365(contract: Contract) {
  const { chainId, account, library } = useActiveWeb3React();
  const addTransaction = useTransactionAdder();
  const addEthErrorPopup = useEthErrorPopup();

  const isPolygonActive = useIsPolygonActive();
  const isShidenActive = useIsShidenActive();

  // This counter is used to update data whenever transaction finishes
  const completedTransactionsCount = useCompletedTransactionsCount();

  // This counter is used to update data every N seconds
  const [intervalUpdateCounter, setIntervalUpdateCounter] = useState<number>(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIntervalUpdateCounter(counter => ++counter);
    }, 20000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const showError = useCallback(
    (methodName: string, args: string, error: RequestError, showPopup = true) => {
      if (showPopup) {
        addEthErrorPopup(error);
      }
      logContractError(methodName, account, chainId, contract.address, args, error);
    },
    [account, chainId, contract.address, addEthErrorPopup],
  );

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
          // console.log('stakeToken', value);
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
    if (!account || !stakeToken?.address) {
      return;
    }
    contract
      .balanceOfLPToken(account, stakeToken?.address)
      .then((value: BigNumber) => {
        // console.log(rewardToken, stakeToken);
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
        // console.log('earned', value.toString());
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
          let calcValue = value;
          if (isPolygonActive) {
            calcValue = value.mul(BigNumber.from(24)).div(BigNumber.from(10));
          } else if (isShidenActive) {
            calcValue = value.mul(BigNumber.from(12));
          }
          const tokenAmount = new TokenAmount(rewardToken, JSBI.BigInt(calcValue.toString()));
          return tokenAmountToString(tokenAmount, rewardToken.decimals);
        } else {
          return '0';
        }
      })
      .then((value: string) => setBlockReward(value))
      .catch((error: RequestError) => {
        showError('rewardRate', '', error);
      });
  }, [chainId, isPolygonActive, isShidenActive, contract, rewardToken, showError, account]);

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

  const [stopDate, setStopDate] = useState<string | undefined>(undefined);
  useEffect(() => {
    contract
      .periodStop()
      .then((value: BigNumber) => {
        const timestampInMs = value.toNumber() * 1000;
        const formattedDate = dayjs(timestampInMs).format('DD.MM.YYYY HH:MM:ss');
        setStopDate(formattedDate);
      })
      .catch((error: RequestError) => {
        showError('periodFinish', '', error);
      });
  }, [contract, stakeToken, showError, account, chainId]);

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

    const liquidityTokenAddress = getFarmingLiquidityTokenAddress(chainId, contract.address);
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
        showError('getStakedValuesinUSD', '', error);
      });
  }, [contract, account, chainId, showError, completedTransactionsCount, intervalUpdateCounter]);

  const updateStakedTokens = useCallback(() => {
    // console.log(contract);
    // console.log(Object.keys(allTokens));
    contract
      .getStakedTokens(account)
      .then(async (value: any[]) => {
        const tokensAmounts = [];

        for (const tokenAddress of value) {
          const balance: BigNumber = await contract.balanceOfLPToken(account, tokenAddress);
          const defaultCoin = defaultCoins.tokens.find(
            t => t.address.toLowerCase() === tokenAddress.toLowerCase(),
          );

          if (!defaultCoin && library && account && chainId) {
            try {
              const lpToken = await getLpTokenByAddress(tokenAddress, chainId, account, library);
              tokensAmounts.push(new TokenAmount(lpToken, JSBI.BigInt(balance)));
            } catch (e) {
              console.log(e);
            }
          } else if (defaultCoin && chainId) {
            const token = new Token(
              chainId,
              defaultCoin.address,
              defaultCoin.decimals,
              getFarmingCoinNameAndSymbol(contract.address).symbol || defaultCoin.symbol,
              getFarmingCoinNameAndSymbol(contract.address).name || defaultCoin.name,
            );
            tokensAmounts.push(new TokenAmount(token, JSBI.BigInt(balance)));
          }
        }

        setStakedTokens(tokensAmounts);
      })
      .catch((error: RequestError) => {
        showError('getStakedTokens', account || '', error);
      });
  }, [contract, showError, account, chainId, library]);

  const [stakedTokens, setStakedTokens] = useState<TokenAmount[]>([]);
  useEffect(() => {
    updateStakedTokens();
  }, [updateStakedTokens, intervalUpdateCounter]);

  const [exitDateLimit, setExitDateLimit] = useState<number | undefined>(undefined);
  useEffect(() => {
    contract
      .exitLimits(account)
      .then((value: BigNumber) => {
        const unix = value.toNumber();

        /*const timestampInMs = unix * 1000;
        const formattedDate = dayjs(timestampInMs).format('DD.MM.YYYY HH:MM:ss');
        console.log('exitLimits', unix);
        console.log('exitLimits formatted', formattedDate);*/

        setExitDateLimit(unix);
      })
      .catch((error: RequestError) => {
        showError('exitLimits', '', error);
      });
  }, [contract, stakeToken, showError, account, chainId, intervalUpdateCounter]);

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
        const args =
          lpToken.address + ', ' + lpAmount.toString() + ', ' + eswWithSlippage.toString();
        showError('stake', args, error);
        throw Error('cancel');
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

  const update = () => {
    setIntervalUpdateCounter(counter => ++counter);
  };

  return {
    contract,
    stakeToken,
    rewardToken,
    balanceLp,
    balanceStake,
    reward,
    blockReward,
    totalSupply,
    stopDate,
    endDate,
    liquidity,
    tokenMode: 1,
    stakedTokens,
    exitDateLimit,
    calcEswByLp: handleCalcEswByLp,
    calcLpByEsw: handleCalcLpByEsw,
    collect: handleCollect,
    stake: handleStake,
    updateStakedTokens,
    update,
  };
}
