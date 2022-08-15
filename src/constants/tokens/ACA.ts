import { Token } from '@uniswap/sdk';
import chainIds from '../chainIds';

export const ACA = new Token(
  chainIds.MANDALA as any,
  '0x0000000000000000000100000000000000000000',
  18,
  'ACA',
  'ACA',
);

export const getAcaToken = (chainId: number | undefined) => {
  return new Token(
    chainId || chainIds.MANDALA,
    '0x0000000000000000000100000000000000000000',
    18,
    'ACA',
    'ACA',
  );
};
