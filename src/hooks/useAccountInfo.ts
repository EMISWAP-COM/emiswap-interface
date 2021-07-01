import { Contract } from '@ethersproject/contracts';
import { BigNumber } from '@ethersproject/bignumber';
import { useEffect, useState } from 'react';
import { useActiveWeb3React } from './index';
import { getCrowdsaleContract, getVestingContract } from '../utils';

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
  collectedTokens: BigNumber;
  availableTokens: BigNumber;
  availableDAI: BigNumber;
};

export type TokenVault = {
  address: string;
  collectedTokens: string;
  availableTokens: string;
  availableDAI: string;
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
    throw new Error('Failed to get a crowdsale contract');
  }

  const contractCrowdSale: Contract | null = getCrowdsaleContract(library, account);

  if (!contract) {
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

        setCrowdSaleAcquired(crowdSaleAcquired);
        setCrowdSaleAlreadyMinted(crowdSaleAlreadyMinted);
        setCrowdSaleAvailableForMinting(crowdSaleAvailableForMinting);

        contract.getMyStats(2).then((result: BigNumber[]) => {
          const crowdSaleReferralRewardAcquired = bn2num(result[0]);
          const crowdSaleReferralRewardAlreadyMinted = bn2num(result[1]);
          const crowdSaleReferralRewardAvailableForMinting = bn2num(result[2]);
          setCrowdSaleReferralRewardAcquired(crowdSaleReferralRewardAcquired);
          setCrowdSaleReferralRewardAlreadyMinted(crowdSaleReferralRewardAlreadyMinted);
          setCrowdSaleReferralRewardAvailableForMinting(crowdSaleReferralRewardAvailableForMinting);
          /* ----------- */
          contract.balanceOf(account).then((result: BigNumber) => {
            const balanceAmount = bn2num(result).toString();

            contract.unlockedBalanceOf(account).then((result: BigNumber) => {
              const unlockedBalanceAmount = bn2num(result).toString();

              setAvailableToCollect(parseFloat(unlockedBalanceAmount));
              setFrozenTokens(parseFloat(balanceAmount) - parseFloat(unlockedBalanceAmount));

              contract.getNextUnlock().then((result: BigNumber[]) => {
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

                contractCrowdSale.coinRate(0).then((result: BigNumber) => {
                  const rate = BigNumber.from(result).toNumber() / 10000;
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
