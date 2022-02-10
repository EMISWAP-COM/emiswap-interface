import { Token, ZERO_ADDRESS } from '@uniswap/sdk';
import chainIds from '../chainIds';

export const AURORA_ETHER = new Token(chainIds.AURORA as any, ZERO_ADDRESS, 18, 'ETH', 'ETH');

export const getAuroraEtherToken = (chainId: number | undefined) => {
  return new Token(chainId || chainIds.AURORA, ZERO_ADDRESS, 18, 'ETH', 'ETH');
};
