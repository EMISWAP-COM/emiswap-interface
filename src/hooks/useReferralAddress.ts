import { REFERRAL_ADDRESS_STORAGE_KEY } from '../constants';
import { useActiveWeb3React } from './index';
import { ZERO_ADDRESS } from '../constants/one-split';

export const useReferralAddress = () => {
  const addressStorage = localStorage.getItem(REFERRAL_ADDRESS_STORAGE_KEY);
  const { account } = useActiveWeb3React();
  return !addressStorage || account === addressStorage ? ZERO_ADDRESS : addressStorage;
};
