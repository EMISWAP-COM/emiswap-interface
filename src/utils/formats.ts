import { MAX_NUM_DECIMALS } from '../constants';

export const tokenAmountToString = (value?: any, decimals: number = 6): string => {
  if (!value) return '';
  if (value.token && MAX_NUM_DECIMALS > value.token.decimals) {
    decimals = value.token.decimals;
  }
  return Number(value.toFixed(decimals)).toLocaleString('en', {
    useGrouping: false,
    maximumFractionDigits: decimals,
  });
};
// need to avoid specific notation for large numbers
export const expNumberToStr = (num: number) => {
  let str = num.toFixed();
  if (str.indexOf('e+') === -1) return str;

  str = str
    .replace('.', '')
    .split('e+')
    .reduce(function(p, b) {
      return p + Array(+b - p.length + 2).join('0');
    });

  return str;
};
