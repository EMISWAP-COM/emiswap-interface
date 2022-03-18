import { Token, ZERO_ADDRESS } from '@uniswap/sdk';
import chainIds from '../chainIds';

export const ASTR = new Token(chainIds.ASTAR as any, ZERO_ADDRESS, 18, 'ASTR', 'ASTR');

export const getAstrToken = (chainId: number | undefined) => {
  return new Token(chainId || chainIds.ASTAR, ZERO_ADDRESS, 18, 'ASTR', 'ASTR');
};
