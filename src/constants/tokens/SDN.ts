import { Token, ZERO_ADDRESS } from '@uniswap/sdk';
import chainIds from '../chainIds';

export const SDN = new Token(chainIds.SHIDEN as any, ZERO_ADDRESS, 18, 'SDN', 'SDN');

export const getSdnToken = (chainId: number | undefined) => {
  return new Token(chainId || chainIds.SHIDEN, ZERO_ADDRESS, 18, 'SDN', 'SDN');
};
