import { ETHER, Token } from '@uniswap/sdk';

export function currencyId(currency: Token): string {
  return currency.address;
}

export const currencyKey = (currency: Token): string =>
  currency instanceof Token ? currency.address : currency === ETHER ? 'ETHER' : '';
