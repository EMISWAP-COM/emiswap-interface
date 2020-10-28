import { Contract } from '@ethersproject/contracts';
import { BigNumber } from '@ethersproject/bignumber';
import { useEffect, useMemo, useState } from 'react';
import { useActiveWeb3React } from './index';
import { getCrowdsaleContract, getVaultContract, getVestingContract } from '../utils';
import { useAllTokens } from './Tokens';
import { useTransactionAdder } from '../state/transactions/hooks'

const bn2num = (value: BigNumber): number => {
  return (
    BigNumber.from(value)
      .div(BigNumber.from('100000000000000'))
      .toNumber() / 10000
  );
};

const roundToAny = (value: number, places: number): number => {
  return parseFloat(value.toFixed(places));
};

export type ClaimCallback = null | (() => Promise<void>);

export type tokenListResult = string[];

export type profitInfo = {
  collectedTokens: number;
  availableTokens: number;
  availableDAI: number;
};

export type TokenVault = {
  address: string;
  collectedTokens: number;
  availableTokens: number;
  availableDAI: number;
  symbol?: string;
  name?: string;
  decimals?: number;
};

export type TokenListVault = TokenVault[] | null;

export type EarningActionHandlers = {
  totalAcquired: number;
  totalAcquiredInDAI: number;
  availableToCollect: number;
  frozenTokens: number;
  nextUnlockAmount: number;
  nextUnlockDate: string;
  crowdSaleAcquired: number;
  crowdSaleAlreadyMinted: number;
  crowdSaleAvailableForMinting: number;
  crowdSaleReferralRewardAcquired: number;
  crowdSaleReferralRewardAlreadyMinted: number;
  crowdSaleReferralRewardAvailableForMinting: number;
};

export function useAccountInfo(): EarningActionHandlers {
  const { library, account } = useActiveWeb3React();
  const [totalAcquired, setTotalAcquired] = useState(0);
  const [totalAcquiredInDAI, setTotalAcquiredInDAI] = useState(0);
  const [availableToCollect, setAvailableToCollect] = useState(0);
  const [frozenTokens, setFrozenTokens] = useState(0);
  const [nextUnlockAmount, setNextUnlockAmount] = useState(0);
  const [nextUnlockDate, setNextUnlockDate] = useState('');
  const [crowdSaleAcquired, setCrowdSaleAcquired] = useState(0);
  const [crowdSaleAlreadyMinted, setCrowdSaleAlreadyMinted] = useState(0);
  const [crowdSaleAvailableForMinting, setCrowdSaleAvailableForMinting] = useState(0);
  const [crowdSaleReferralRewardAcquired, setCrowdSaleReferralRewardAcquired] = useState(0);
  const [crowdSaleReferralRewardAlreadyMinted, setCrowdSaleReferralRewardAlreadyMinted] = useState(
    0,
  );
  const [
    crowdSaleReferralRewardAvailableForMinting,
    setCrowdSaleReferralRewardAvailableForMinting,
  ] = useState(0);

  if (!library) {
    throw new Error('Failed to get a library');
  }
  if (!account) {
    throw new Error('Failed to get an account');
  }

  const contract: Contract | null = getVestingContract(library, account);

  if (!contract) {
    throw new Error('Failed to get a vesting contract');
  }

  const contractCrowdSale: Contract | null = getCrowdsaleContract(library, account);

  if (!contractCrowdSale) {
    throw new Error('Failed to get a crowdsale contract');
  }

  useEffect(() => {
    if (!account) {
      setTotalAcquired(0);
      setTotalAcquiredInDAI(0);
      setAvailableToCollect(0);
      setFrozenTokens(0);
      setNextUnlockAmount(0);
      setNextUnlockDate('');
      setCrowdSaleAcquired(0);
      setCrowdSaleAlreadyMinted(0);
      setCrowdSaleAvailableForMinting(0);
      setCrowdSaleReferralRewardAcquired(0);
      setCrowdSaleReferralRewardAlreadyMinted(0);
      setCrowdSaleReferralRewardAvailableForMinting(0);
    } else {
      contract.getMyStats(1).then((result: BigNumber[]) => {
        const crowdSaleAcquired = bn2num(result[0]);
        const crowdSaleAlreadyMinted = bn2num(result[1]);
        const crowdSaleAvailableForMinting = bn2num(result[2]);
        console.log(
          'getMyStats(1): ',
          result,
          crowdSaleAlreadyMinted,
          crowdSaleAvailableForMinting,
        );
        setCrowdSaleAcquired(crowdSaleAcquired);
        setCrowdSaleAlreadyMinted(crowdSaleAlreadyMinted);
        setCrowdSaleAvailableForMinting(crowdSaleAvailableForMinting);

        contract.getMyStats(2).then((result: BigNumber[]) => {
          console.log('getMyStats(2): ', result);
          const crowdSaleReferralRewardAcquired = bn2num(result[0]);
          const crowdSaleReferralRewardAlreadyMinted = bn2num(result[1]);
          const crowdSaleReferralRewardAvailableForMinting = bn2num(result[2]);
          setCrowdSaleReferralRewardAcquired(crowdSaleReferralRewardAcquired);
          setCrowdSaleReferralRewardAlreadyMinted(crowdSaleReferralRewardAlreadyMinted);
          setCrowdSaleReferralRewardAvailableForMinting(crowdSaleReferralRewardAvailableForMinting);
          /* ----------- */
          contract.balanceOf(account).then((result: BigNumber) => {
            const balanceAmount = bn2num(result).toString();
            console.log('balanceOf: ', balanceAmount);

            contract.unlockedBalanceOf(account).then((result: BigNumber) => {
              const unlockedBalanceAmount = bn2num(result).toString();
              console.log('unlockedBalanceOf: ', unlockedBalanceAmount);

              setAvailableToCollect(parseFloat(unlockedBalanceAmount));
              setFrozenTokens(parseFloat(balanceAmount) - parseFloat(unlockedBalanceAmount));

              contract.getNextUnlock().then((result: BigNumber[]) => {
                console.log('getNextUnlock result: ', result);

                const unlockTime = BigNumber.from(result[0]).isZero()
                  ? ''
                  : new Date(
                      BigNumber.from(result[0])
                        .mul(1000)
                        .toNumber(),
                    ).toDateString();
                const lockAmount = bn2num(result[1]);
                setNextUnlockAmount(lockAmount);
                setNextUnlockDate(unlockTime);

                contractCrowdSale.coinRate(1).then((result: BigNumber) => {
                  const rate = BigNumber.from(result).toNumber() / 10000;
                  console.log('rate: ', rate);
                  setTotalAcquired(parseFloat(balanceAmount));
                  setTotalAcquiredInDAI(roundToAny(parseFloat(balanceAmount) * rate, 4));
                });
              });
            });
          });
        });
      });
    }
  }, [account, contract, contractCrowdSale]);

  return {
    totalAcquired,
    totalAcquiredInDAI,
    availableToCollect,
    frozenTokens,
    nextUnlockAmount,
    nextUnlockDate,
    crowdSaleAcquired,
    crowdSaleAlreadyMinted,
    crowdSaleAvailableForMinting,
    crowdSaleReferralRewardAcquired,
    crowdSaleReferralRewardAlreadyMinted,
    crowdSaleReferralRewardAvailableForMinting,
  };
}

export function useAccountVaultInfo() {
  const { library, account } = useActiveWeb3React();
  const contractVault: Contract | null = getVaultContract(library, account);
  const [tokenList, setTokenList] = useState(null);
  const allTokens = useAllTokens();

  if (!contractVault) {
    throw new Error('Failed to get a vault contract');
  }

  useMemo(() => {
    if (!allTokens || !!allTokens.length) {
      return;
    }
    return contractVault.getTokenList().then((tokenListResult: tokenListResult) => {
      return Promise.all(
        tokenListResult.map((address: string) => contractVault.getProfitbyToken(address)),
      ).then((profitResult: profitInfo[]) => {
        const tokenListArr = tokenListResult.map((address: string, index) => {
          const token = allTokens['0x8D71af014cD98344dfab1d56e48f21C44C17Ed0C'];
          const collectedTokensStr = BigNumber.from(profitResult[index].collectedTokens).toString();
          const collectedTokens = (
            Number(collectedTokensStr) / Math.pow(10, token.decimals)
          ).toLocaleString('fullwide', {
            useGrouping: false,
            maximumFractionDigits: token.decimals,
          });
          const availableTokensStr = BigNumber.from(profitResult[index].availableTokens).toString();
          const availableTokens = (
            Number(availableTokensStr) / Math.pow(10, token.decimals)
          ).toLocaleString('fullwide', {
            useGrouping: false,
            maximumFractionDigits: token.decimals,
          });
          const availableDAIStr = BigNumber.from(profitResult[index].availableDAI).toString();
          const availableDAI = (
            Number(availableDAIStr) / Math.pow(10, token.decimals)
          ).toLocaleString('fullwide', {
            useGrouping: false,
            maximumFractionDigits: token.decimals,
          });
          return {
            address,
            collectedTokens,
            availableTokens,
            availableDAI,
            ...allTokens[address],
          };
        });
        setTokenList(tokenListArr);
      });
    });
  }, [allTokens]);
  console.log('---tokenList---', tokenList);
  return { tokenList };
}

export function useClaimProfit(tokenList: string[]): any {
  const claimProfitTokensCallback = useClaimProfitTokensCallback(tokenList);
  const claimProfitDAICallback = useClaimProfitDAICallback(tokenList);
  return [claimProfitTokensCallback, claimProfitDAICallback];
}

export function useClaimProfitTokensCallback(tokenList: string[]): ClaimCallback {
  const { library, account } = useActiveWeb3React();
  const addTransaction = useTransactionAdder();

  return useMemo(() => {
    return async function onClaimProfitTokens() {
      if (!tokenList || !!tokenList.length) {
        return null;
      }

      const contractVault: Contract | null = getVaultContract(library, account);

      if (!contractVault) {
        throw new Error('Failed to get a vault contract');
      }

      const onSuccess = (response: any) => {
        console.log('--ClaimProfitTokens onSuccess--', response);
        const withVersion = `Collect profit in Tokens`;

        addTransaction(response, {
          summary: withVersion,
        });

        return response.hash;
      };

      const onError = (error: any) => {
        console.log('--ClaimProfitTokens onError--', error);
      };

      return contractVault
        .claimProfitTokens(tokenList)
        .then(onSuccess)
        .catch(onError);
    };
  }, [library, account, tokenList, addTransaction]);
}

export function useClaimProfitDAICallback(tokenList: string[]): ClaimCallback {
  const { library, account } = useActiveWeb3React();
  const addTransaction = useTransactionAdder();

  return useMemo(() => {
    return async function onClaimProfitDAI() {
      if (!tokenList || !!tokenList.length) {
        return null;
      }

      const contractVault: Contract | null = getVaultContract(library, account);

      if (!contractVault) {
        throw new Error('Failed to get a vault contract');
      }

      const onSuccess = (response: any) => {
        console.log('--ClaimProfitDAI onSuccess--', response);
        const withVersion = `Collect profit in DAI`;

        addTransaction(response, {
          summary: withVersion,
        });

        return response.hash;
      };

      const onError = (error: any) => {
        console.log('--ClaimProfitDAI onError--', error);
      };

      return contractVault
        .claimProfitDAI(tokenList)
        .then(onSuccess)
        .catch(onError);
    };
  }, [library, account, tokenList, addTransaction]);
}
