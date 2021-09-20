import { Token, ZERO_ADDRESS } from '@uniswap/sdk';
import chainIds from '../chainIds';

export const MATIC = new Token(chainIds.POLYGON as any, ZERO_ADDRESS, 18, 'MATIC', 'MATIC');

export const getMaticToken = (chainId: number | undefined) => {
  return new Token(chainId || chainIds.POLYGON, ZERO_ADDRESS, 18, 'MATIC', 'MATIC');
};
