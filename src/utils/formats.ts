import { MAX_NUM_DECIMALS } from '../constants';

export const tokenAmountToString = (value, decimals: number = 6): string => {
  if (!value) return '';
  if (value.token && MAX_NUM_DECIMALS > value.token.decimals) {
    decimals = value.token.decimals;
  }
  return Number(value.toFixed(decimals)).toLocaleString('en', {
    useGrouping: false,
    maximumFractionDigits: decimals,
  });
};
