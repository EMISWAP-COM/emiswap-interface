import { Token, ZERO_ADDRESS } from '@uniswap/sdk';
import chainIds from '../chainIds';

export const KCS = new Token(chainIds.KUCOIN as any, ZERO_ADDRESS, 18, 'KCS', 'KCS');

const getKcsToken = (chainId: number | undefined) => {
  return new Token(chainId || chainIds.KUCOIN, ZERO_ADDRESS, 18, 'KCS', 'KCS');
};

export default getKcsToken;
