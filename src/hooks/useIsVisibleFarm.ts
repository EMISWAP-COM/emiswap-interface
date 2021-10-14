import dayjs from 'dayjs';
import { isStakingTab } from '../pages/Farm';
import isLpToken from '../pages/Farm/isLpToken';

export default function useIsVisibleFarm<T>(
  farming: any,
  selectedTab: string,
  selectedFilterTab: string
): boolean {
  const dateNow = dayjs();
  const endDate = dayjs(farming.endDate, 'DD.MM.YYYY HH:mm:ss');

  const visibleForTab =
    (isStakingTab(selectedTab) && !isLpToken(farming.tokenMode)) ||
    (!isStakingTab(selectedTab) && isLpToken(farming.tokenMode));

  const visibleForFilter = selectedFilterTab === 'active'
    ? endDate > dateNow
    : endDate < dateNow;

  return visibleForTab && visibleForFilter;
}
