import { Token } from '@uniswap/sdk';
import { TokenInfo, TokenList } from '@uniswap/token-lists';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { DEFAULT_TOKEN_LIST_URL } from '../../constants';
import { AppState } from '../index';
import { useActiveWeb3React } from '../../hooks';
import { SupportedChainId } from '../../connectors'

/**
 * Token instances created from token info.
 */
export class WrappedTokenInfo extends Token {
  public readonly tokenInfo: TokenInfo;

  constructor(tokenInfo: TokenInfo) {
    super(
      tokenInfo.chainId,
      tokenInfo.address,
      tokenInfo.decimals,
      tokenInfo.symbol,
      tokenInfo.name,
    );
    this.tokenInfo = tokenInfo;
  }

  public get logoURI(): string | undefined {
    return this.tokenInfo.logoURI;
  }
}

export type TokenAddressMap = Readonly<
  { [chainId in SupportedChainId]: Readonly<{ [tokenAddress: string]: WrappedTokenInfo }> }
>;

/**
 * An empty result, useful as a default.
 */

export const emptyTokenList: TokenAddressMap = {
  [SupportedChainId.BSCTESTNET]: {},
  [SupportedChainId.BSC]: {},
  [SupportedChainId.KOVAN]: {},
  [SupportedChainId.RINKEBY]: {},
  [SupportedChainId.ROPSTEN]: {},
  [SupportedChainId.GÖRLI]: {},
  [SupportedChainId.MAINNET]: {},

};


const listCache: WeakMap<TokenList, TokenAddressMap> | null =
  'WeakMap' in window ? new WeakMap<TokenList, TokenAddressMap>() : null;

export function listToTokenMap(list: TokenList): TokenAddressMap {
  const result = listCache?.get(list);
  if (result) return result;

  const map = list.tokens.reduce<TokenAddressMap>(
    (tokenMap, tokenInfo) => {
      const token = new WrappedTokenInfo(tokenInfo);


      if (tokenMap[token.chainId][token.address] !== undefined) throw Error('Duplicate tokens.');
      if (token.address === '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE') {
        return { ...tokenMap };
      }
      return {
        ...tokenMap,
        [token.chainId]: {
          ...tokenMap[token.chainId],
          [token.address]: token,
        },
      };
    },
    { ...emptyTokenList },
  );
  listCache?.set(list, map);
  return map;
}

export function useTokenList(url: string): TokenAddressMap {
  const lists = useSelector<AppState, AppState['lists']['byUrl']>(state => state.lists.byUrl);
  const { chainId } = useActiveWeb3React();
  return useMemo(() => {
    const current = lists[url]?.current;
    if (!current) return emptyTokenList;
    const newCurrent = {
      ...current,
      tokens: [
        {
          address: window['env'].REACT_APP_ESW_ID,
          chainId: chainId,
          name: 'EmiDAO Token',
          decimals: 18,
          symbol: 'ESW',
        },
        ...current.tokens,
      ],
    };
    return listToTokenMap(newCurrent);
  }, [lists, url, chainId]);
}

export function useDefaultTokenList(): TokenAddressMap {
  return useTokenList(DEFAULT_TOKEN_LIST_URL);
}

// returns all downloaded current lists
export function useAllLists(): TokenList[] {
  const lists = useSelector<AppState, AppState['lists']['byUrl']>(state => state.lists.byUrl);

  return useMemo(
    () =>
      Object.keys(lists)
        .map(url => lists[url].current)
        .filter((l): l is TokenList => Boolean(l)),
    [lists],
  );
}
