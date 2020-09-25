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

const removeReferralLinkToLocalStorage = (): void => {
  localStorage.removeItem(REFERRAL_ADDRESS_STORAGE_KEY);
};

const ReferralUrlParser = ({ children }) => {
  const href = window.location.href;
  const begin = href.indexOf(separator) + offset;
  const addrStr = href.slice(begin, begin + 42);
  if (isReferralLinkSetInLocalStorage()) {
    const referralAddress = localStorage.getItem(REFERRAL_ADDRESS_STORAGE_KEY);
    if (referralAddress === addrStr) {
      return children;
    }
  }
  if (addrStr) {
    if (isAddress(addrStr)) {
      saveReferralLinkToLocalStorage(getAddress(addrStr));
    } else {
      removeReferralLinkToLocalStorage();
    }
  }
  return children;
};

export default ReferralUrlParser;
