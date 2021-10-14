import { ChainId, Token, TokenAmount } from '@uniswap/sdk';
import { getNetworkData } from './index';

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
  const networkData = getNetworkData(chainId);

  if (token.symbol === networkData.currencySymbolWrap) {
    return networkData.token;
  }

  return token;
}
