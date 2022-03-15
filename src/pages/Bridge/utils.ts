import { Token } from './types';

export const getUniqueTokens = (payload: { token: Token; chainId: number }[]): Token[] => {
  const tokenMap = new Map();
  payload.forEach(({ token }) => {
    if (tokenMap.has(token.address)) {
      return;
    }
    tokenMap.set(token.address, token);
  });
  return Array.from(tokenMap, ([_, token]) => token);
};
