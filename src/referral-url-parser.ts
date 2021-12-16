import { getAddress, isAddress } from '@ethersproject/address';
import { REFERRAL_ADDRESS_STORAGE_KEY } from './constants';

const saveReferralLinkToLocalStorage = (link: string): void => {
  localStorage.setItem(REFERRAL_ADDRESS_STORAGE_KEY, link);
};

export function useReferralUrlParser(): string | null {
  const queryParams = new URLSearchParams(window.location.search);
  const queryReferral = queryParams.get('r');

  const localReferral = localStorage.getItem(REFERRAL_ADDRESS_STORAGE_KEY);
  const localUtmSearch = localStorage.getItem('UTMMarks');

  if (queryReferral && isAddress(queryReferral)) {
    saveReferralLinkToLocalStorage(getAddress(queryReferral));
    return getAddress(queryReferral);
  }

  if (localReferral && isAddress(queryReferral)) {
    return getAddress(localReferral);
  }

  if (localUtmSearch) {
    const localUtmParams = new URLSearchParams(localUtmSearch);
    const localUtmReferral = localUtmParams.get('r');
    if (isAddress(localUtmReferral)) {
      return getAddress(localUtmReferral);
    }
  }

  return null;
}
