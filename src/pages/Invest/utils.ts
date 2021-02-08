import { accountAmounts } from '../../constants/invest';

export const getClosestNumber = (counts: number[], goal: number) => {
  return counts.reduce(function(prev, curr) {
    return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
  });
};

export const getPriceToNextStep = (prevRole: string, nextRole: string) => {
  return String(accountAmounts[nextRole] - accountAmounts[prevRole]);
};
