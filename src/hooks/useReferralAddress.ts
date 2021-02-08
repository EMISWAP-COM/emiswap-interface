import { REFERRAL_ADDRESS_STORAGE_KEY } from '../constants';
import { useActiveWeb3React } from './index';
import { ZERO_ADDRESS } from '../constants/one-split';
import { AppState } from '../state';
import { useSelector } from 'react-redux';

export const useReferralAddress = () => {
  const referral_id = useSelector((state: AppState) => state.user.info.referral_id);
  let addressStorage = localStorage.getItem(REFERRAL_ADDRESS_STORAGE_KEY);
  if (!addressStorage && referral_id) {
    addressStorage = referral_id;
  }
  const { account } = useActiveWeb3React();
  return !addressStorage || account === addressStorage ? ZERO_ADDRESS : addressStorage;
};
