import { useActiveWeb3React } from './index';
import { Contract } from '@ethersproject/contracts';
import defaultCoins from '../constants/defaultCoins';
import { useEffect, useState } from 'react';
import { JSBI, Token, TokenAmount } from '@uniswap/sdk';
import getFarmingCoinNameAndSymbol from '../pages/Farm/getFarmingCoinNameAndSymbol';
import useEthErrorPopup, { RequestError } from './useEthErrorPopup';
import { BigNumber } from '@ethersproject/bignumber';
import { expNumberToStr, tokenAmountToString } from '../utils/formats';
import { TransactionResponse } from '@ethersproject/providers';
import { EMI_ROUTER_ADRESSES } from '../constants/emi/addresses';
import { useCompletedTransactionsCount, useTransactionAdder } from '../state/transactions/hooks';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { AppState } from '../state';

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

const useFarming2 = (contract: Contract) => {
  const { chainId, account } = useActiveWeb3React();
  const addTransaction = useTransactionAdder();
  const addEthErrorPopup = useEthErrorPopup();
  const farm = useSelector((state: AppState) => state.farming.farms.find(item => item.contractAddress === contract.address));

  // This counter is used to update data whenever transaction finishes
  const completedTransactionsCount = useCompletedTransactionsCount();

  const [stakeToken, setStakeToken] = useState<Token | undefined>(undefined);
  useEffect(() => {
    contract.lockToken().then((value: string) => {
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
        logContractError('lockToken', account, chainId, contract.address, '', error);
      });
  }, [chainId, contract, addEthErrorPopup, account]);

  const [rewardToken, setRewardToken] = useState<Token | undefined>(undefined);
  useEffect(() => {
    const defaultCoin = defaultCoins.tokens.find(
      // @ts-ignore
      coin => coin.address.toLowerCase() === window.env.REACT_APP_ESW_ID.toLowerCase(),
    );
    if (chainId && defaultCoin) {
      const token = new Token(
        chainId,
        defaultCoin.address,
        defaultCoin.decimals,
        getFarmingCoinNameAndSymbol(contract.address).symbol || defaultCoin.symbol,
        getFarmingCoinNameAndSymbol(contract.address).name || defaultCoin.name,
      );
      setRewardToken(token);
    }
  }, [chainId, contract.address]);

  const [tokenMode, setTokenMode] = useState<number>(0);
  useEffect(() => {
    contract.tokenMode().then((value: number) => {
      setTokenMode(value);
    })
      .catch((error: RequestError) => {
        addEthErrorPopup(error);
        logContractError('tokenMode', account, chainId, contract.address, '', error);
      });
  }, [contract, addEthErrorPopup, account, chainId]);

  const [availableToCollect, setAvailableToCollect] = useState<string>('0');
  useEffect(() => {
    if (!account) return;

    contract
      .myUnlockedBalance()
      .then((result: BigNumber[]) => {
        const valueInTokens = result[0];
        if (chainId && stakeToken) {
          const tokenAmount = new TokenAmount(stakeToken, JSBI.BigInt(valueInTokens.toString()));
          return tokenAmountToString(tokenAmount, stakeToken.decimals);
        } else {
          return '0';
        }
      })
      .then((value: string) => setAvailableToCollect(value))
      .catch((error: RequestError) => {
        addEthErrorPopup(error);
        logContractError('myUnlockedBalance', account, chainId, contract.address, '', error);
      });
  }, [account, chainId, contract, stakeToken, addEthErrorPopup, completedTransactionsCount]);

  const [deposit, setDeposit] = useState<string>('0');
  useEffect(() => {
    if (!account) return;

    contract
      .balanceOf()
      .then((result: BigNumber[]) => {
        const valueInTokens = result[0];
        if (chainId && stakeToken) {
          const tokenAmount = new TokenAmount(stakeToken, JSBI.BigInt(valueInTokens.toString()));
          return tokenAmountToString(tokenAmount, stakeToken.decimals);
        } else {
          return '0';
        }
      })
      .then((value: string) => setDeposit(value))
      .catch((error: RequestError) => {
        addEthErrorPopup(error);
        logContractError('balanceOf', account, chainId, contract.address, '', error);
      });
  }, [account, chainId, contract, stakeToken, addEthErrorPopup, completedTransactionsCount]);

  const [lockPeriod, setLockPeriod] = useState<number>(0);
  useEffect(() => {
    if (!account) return;

    contract
      .lockPeriod()
      .then((value: BigNumber) => {
        setLockPeriod(Math.floor(value.toNumber() / 60 / 60 / 24));
      })
      .catch((error: RequestError) => {
        addEthErrorPopup(error);
        logContractError('lockPeriod', account, chainId, contract.address, '', error);
      });
  }, [account, chainId, contract, stakeToken, addEthErrorPopup]);

  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  useEffect(() => {
    contract.stakingEndDate().then((value: BigNumber) => {
      const timestampInMs = value.toNumber() * 1000;
      const formattedDate = dayjs(timestampInMs).format('DD.MM.YYYY HH:MM:ss');
      setEndDate(formattedDate);
    })
      .catch((error: RequestError) => {
        addEthErrorPopup(error);
        logContractError('stakingEndDate', account, chainId, contract.address, '', error);
      });
  }, [contract, stakeToken, addEthErrorPopup, account, chainId]);

  const [myStakesLen, setMyStakesLen] = useState<number>(0);
  useEffect(() => {
    if (!account) return;

    contract
      .getMyStakesLen()
      .then((value: BigNumber) => {
        setMyStakesLen(value.toNumber());
      })
      .catch((error: RequestError) => {
        addEthErrorPopup(error);
        logContractError('getMyStakesLen', account, chainId, contract.address, '', error);
      });
  }, [account, chainId, contract, stakeToken, addEthErrorPopup, completedTransactionsCount]);

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
        addEthErrorPopup(error);
        logContractError('stake', account, chainId, contract.address, bigIntAmount.toString(), error);
      });
  };

  const handleCollect = (): Promise<unknown> => {
    if (!stakeToken) throw new Error('No stake token');
    if (!chainId) throw new Error('No chain id');

    return contract
      .withdraw()
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: `Collect all ${stakeToken.symbol}`,
          approval: { tokenAddress: stakeToken.address, spender: EMI_ROUTER_ADRESSES[chainId] },
        });
      })
      .catch((error: RequestError) => {
        addEthErrorPopup(error);
        logContractError('exit', account, chainId, contract.address, '', error);
      });
  };

  const [liquidity, setLiquidity] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (!chainId) return;

    contract.getTotals().then((response: [BigNumber, BigNumber]) => {
      const [, totalStakeUSD] = response;
      setLiquidity(totalStakeUSD.toString());
    })
      .catch((error: RequestError) => {
        addEthErrorPopup(error);
        logContractError('getTotals', account, chainId, contract.address, '', error);
      });
  }, [contract, account, chainId, addEthErrorPopup, completedTransactionsCount]);

  return {
    stakeToken: stakeToken,
    rewardToken: rewardToken,
    tokenMode: tokenMode,
    availableToCollect: availableToCollect,
    lockPeriod: lockPeriod,
    endDate: endDate,
    myStakesLen: myStakesLen,
    apr: +(farm?.percentageRate || '0') * 100,
    deposit: deposit,
    reward: farm?.reward || '0',
    liquidity: liquidity,
    collect: handleCollect,
    stake: handleStake,
  }
};

export default useFarming2;
