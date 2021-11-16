import { isAddress } from '../../utils';
import { Token } from '@uniswap/sdk';

export function filterTokens(tokens: Token[], search: string, isLpTokens: boolean = false): Token[] {
  let visibleTokens = tokens;

  if (isLpTokens) {
    visibleTokens = visibleTokens.filter(token => token.name.includes('LP '))
  }

  if (search.length === 0) return visibleTokens;

  const searchingAddress = isAddress(search);

  if (searchingAddress) {
    return visibleTokens.filter(token => token.address === searchingAddress);
  }

  const lowerSearchParts = search
    .toLowerCase()
    .split(/\s+/)
    .filter(s => s.length > 0);

  if (lowerSearchParts.length === 0) {
    return visibleTokens;
  }

  const matchesSearch = (s: string): boolean => {
    const sParts = s
      .toLowerCase()
      .split(/\s+/)
      .filter(s => s.length > 0);

    return lowerSearchParts.every(
      p => p.length === 0 || sParts.some(sp => sp.startsWith(p) || sp.endsWith(p)),
    );
  };

  return visibleTokens.filter(token => {
    const { symbol, name } = token;

    return matchesSearch(symbol) || matchesSearch(name);
  });
}
