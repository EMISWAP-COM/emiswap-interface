import { Token, ZERO_ADDRESS } from '@uniswap/sdk';
import chainIds from '../chainIds';

export const AVAX = new Token(chainIds.AVALANCHE as any, ZERO_ADDRESS, 18, 'AVAX', 'AVAX');

export const getAvaxToken = (chainId: number | undefined) => {
  return new Token(chainId || chainIds.AVALANCHE, ZERO_ADDRESS, 18, 'AVAX', 'AVAX');
};
