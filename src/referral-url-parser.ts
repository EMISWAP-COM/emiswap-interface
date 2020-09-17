import { getAddress, isAddress } from '@ethersproject/address';
import { REFERRAL_ADDRESS_STORAGE_KEY } from './constants';
//
const separator = 'r=';
const offset = separator.length;
//
const isReferralLinkSetInLocalStorage = (): boolean => {
  const x = localStorage.getItem(REFERRAL_ADDRESS_STORAGE_KEY);
  return x && isAddress(x);
};

const saveReferralLinkToLocalStorage = (link: string): void => {
  localStorage.setItem(REFERRAL_ADDRESS_STORAGE_KEY, link);
};

const ReferralUrlParser = ({ children }) => {
  if (isReferralLinkSetInLocalStorage()) {
    return children;
  }

  const href = window.location.href;
  const begin = href.indexOf(separator) + offset;
  const addrStr = href.slice(begin, begin + 42);
  if (addrStr && isAddress(addrStr)) {
    saveReferralLinkToLocalStorage(getAddress(addrStr));
  }
  return children;
};

export default ReferralUrlParser;
