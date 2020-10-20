import { Contract } from '@ethersproject/contracts';
import { BigNumber } from '@ethersproject/bignumber';
import { useEffect, useState } from 'react';
import { useActiveWeb3React } from './index';
import { getCrowdsaleContract, getVestingContract } from '../utils';

const bn2num = (value: BigNumber): number => {
  return (BigNumber.from(value).div(BigNumber.from('100000000000000')).toNumber()/10000);
}
export type EarningActionHandlers = {
  totalAcquired: number;
  totalAcquiredInDAI: number;
  availableToCollect: number;
  frozenTokens: number;
  nextUnlockAmount: number;
  nextUnlockDate: string;
  crowdSaleAlreadyMinted: number;
  crowdSaleAvailableForMinting: number;
  crowdSaleReferalRewardAlreadyMinted: number;
  crowdSaleReferalRewardAvailableForMinting: number;
};

export default function useAccountInfo(): EarningActionHandlers {
  const { library, account } = useActiveWeb3React();
  const [totalAcquired, setTotalAcquired] = useState(0);
  const [totalAcquiredInDAI, setTotalAcquiredInDAI] = useState(0);
  const [availableToCollect, setAvailableToCollect] = useState(0);
  const [frozenTokens, setFrozenTokens] = useState(0);
  const [nextUnlockAmount, setNextUnlockAmount] = useState(0);
  const [nextUnlockDate, setNextUnlockDate] = useState("");
  const [crowdSaleAlreadyMinted, setCrowdSaleAlreadyMinted] = useState(0);
  const [crowdSaleAvailableForMinting, setCrowdSaleAvailableForMinting] = useState(0);
  const [crowdSaleReferalRewardAlreadyMinted, setCrowdSaleReferalRewardAlreadyMinted] = useState(0);
  const [crowdSaleReferalRewardAvailableForMinting, setCrowdSaleReferalRewardAvailableForMinting] = useState(0);

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
      setNextUnlockDate("");
      setCrowdSaleAlreadyMinted(0);
      setCrowdSaleAvailableForMinting(0);
      setCrowdSaleReferalRewardAlreadyMinted(0);
      setCrowdSaleReferalRewardAvailableForMinting(0);
    } else {
      contract.balanceOf(account).then((result: BigNumber) => {
        const balanceAmount = bn2num(result).toString();
        console.log("balanceOf: ", balanceAmount);
        
        contract.unlockedBalanceOf(account).then((result: BigNumber) => {
          const unlockedBalanceAmount = bn2num(result).toString();
          console.log("unlockedBalanceOf: ",unlockedBalanceAmount);
          
          setAvailableToCollect(parseFloat(unlockedBalanceAmount));
          setFrozenTokens(parseFloat(balanceAmount) - parseFloat(unlockedBalanceAmount));

          contract.getNextUnlock().then((result: BigNumber[]) => {
            console.log("getNextUnlock result: ", result);
            
            const unlockTime = BigNumber.from(result[0]).isZero() ? "" : new Date(BigNumber.from(result[0]).mul(1000).toNumber()).toDateString();
            const lockAmount = bn2num(result[1]);
            setNextUnlockAmount(lockAmount);
            setNextUnlockDate(unlockTime);
            contractCrowdSale.coinRate(1).then((result: BigNumber) => {
              const rate = bn2num(result);
              console.log("rate: ",rate);
              setTotalAcquired(parseFloat(balanceAmount));
              setTotalAcquiredInDAI(parseFloat(balanceAmount) * rate);
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
    crowdSaleAlreadyMinted, 
    crowdSaleAvailableForMinting, 
    crowdSaleReferalRewardAlreadyMinted,
    crowdSaleReferalRewardAvailableForMinting
  };
}
