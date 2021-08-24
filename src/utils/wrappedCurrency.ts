import { ChainId, ETHER, Token, TokenAmount } from '@uniswap/sdk';
import { WETH, WKCS } from '../constants';
import chainIds from '../constants/chainIds';
import getKcsToken from '../constants/tokens/KCS';

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
  if (token.symbol === ((chainId as any) === chainIds.KUCOIN ? WKCS.symbol : WETH.symbol)) {
    // @ts-ignore
    return chainId === chainIds.KUCOIN ? getKcsToken(chainId) : ETHER;
  }

  return token;
}
