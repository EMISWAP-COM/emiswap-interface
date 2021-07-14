import { ChainId, Token, TokenAmount, ETHER } from '@uniswap/sdk';
import { WETH, WKCS } from '../constants';
import chainIds from '../constants/chainIds';
export function wrappedCurrency(
  currency: Token | undefined,
  chainId: ChainId | undefined,
): Token | undefined {
  return chainId && currency instanceof Token ? currency : undefined;
}

export function wrappedCurrencyAmount(
  currencyAmount: TokenAmount | undefined,
  chainId: ChainId | undefined,
): TokenAmount | undefined {
  const token =
    currencyAmount && chainId ? wrappedCurrency(currencyAmount.token, chainId) : undefined;
  return token && currencyAmount ? new TokenAmount(token, currencyAmount.raw) : undefined;
}

export function unwrappedToken(chainId: ChainId, token: Token): Token {
  // @ts-ignore
  if (token.symbol === (chainId === chainIds.KUCOIN ? WKCS.symbol : WETH.symbol)) return ETHER;

  return token;
}
