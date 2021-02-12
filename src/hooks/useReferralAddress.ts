import { useActiveWeb3React } from './index';
import { ZERO_ADDRESS } from '../constants/one-split';
import { AppState } from '../state';
import { useSelector } from 'react-redux';

export const useReferralAddress = () => {
  const walletAddress = useSelector((state: AppState) => state.user.info?.walletAddress);
  const { account } = useActiveWeb3React();
  return !walletAddress || account === walletAddress ? ZERO_ADDRESS : walletAddress;
};
