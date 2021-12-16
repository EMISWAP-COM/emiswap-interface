import { getAddress, isAddress } from '@ethersproject/address';
import { REFERRAL_ADDRESS_STORAGE_KEY } from './constants';

const isReferralLinkSetInLocalStorage = (): boolean => {
  const item = localStorage.getItem(REFERRAL_ADDRESS_STORAGE_KEY);
  return item && isAddress(item);
};

const saveReferralLinkToLocalStorage = (link: string): void => {
  localStorage.setItem(REFERRAL_ADDRESS_STORAGE_KEY, link);
};

const removeReferralLinkToLocalStorage = (): void => {
  localStorage.removeItem(REFERRAL_ADDRESS_STORAGE_KEY);
};

export function useReferralUrlParser(): string | null {
  const query = new URLSearchParams(window.location.search);

  const queryReferral = query.get('r');
  const localReferral = localStorage.getItem(REFERRAL_ADDRESS_STORAGE_KEY);

  if (isReferralLinkSetInLocalStorage() && localReferral === queryReferral) {
    return localReferral;
  }

  if (queryReferral) {
    if (isAddress(queryReferral)) {
      saveReferralLinkToLocalStorage(getAddress(queryReferral));
      return getAddress(queryReferral);
    } else {
      removeReferralLinkToLocalStorage();
    }
  }

  return null;
}
