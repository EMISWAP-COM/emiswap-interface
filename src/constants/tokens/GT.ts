import { Token, ZERO_ADDRESS } from '@uniswap/sdk';
import chainIds from '../chainIds';

export const GT = new Token(chainIds.GATECHAIN as any, ZERO_ADDRESS, 18, 'GT', 'GT');

export const getGtToken = (chainId: number | undefined) => {
  return new Token(chainId || chainIds.GATECHAIN, ZERO_ADDRESS, 18, 'GT', 'GT');
};
