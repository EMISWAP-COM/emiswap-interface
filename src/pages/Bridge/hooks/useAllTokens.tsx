import { Token, ChainId } from '@uniswap/sdk';
import { useMemo } from 'react';
import { useDefaultTokenList, WrappedTokenInfo } from 'state/lists/hooks';
import { useUserAddedTokens } from 'state/user/hooks';
import { useTokenListWithPair } from '../../../hooks/useTokenListWithPair';
import defaultCoins, { mustVisibleAddresses } from '../../../constants/defaultCoins';

export function useAllTokens({
  chainId,
}: {
  chainId: ChainId;
}): [{ [address: string]: Token }, boolean] {
  const isPolygonActive = chainId == (137 as ChainId);
  const isAvalancheActive = chainId == (43114 as ChainId);
  const userAddedTokens = useUserAddedTokens();
  const allTokens = useDefaultTokenList();
  const [enableTokensList, isLoading] = useTokenListWithPair();
  return [
    useMemo(() => {
      if (!chainId) {
        return {};
      }
      const filteredTokens = Object.values(allTokens[chainId])
        .filter(el => {
          if (isPolygonActive) {
            const exists = defaultCoins.tokens.find(
              ct =>
                ct.chainId === chainId &&
                el.address.toLowerCase() === ct.address.toLowerCase() &&
                ct.symbol !== 'WMATIC',
              // && mustVisibleAddresses.polygon.includes(el.address.toLowerCase())
            );

            // @ts-ignore
            return (
              Boolean(exists) ||
              el.address === window['env'].REACT_APP_ESW_ID ||
              el.symbol === 'ESW'
            );
          } else if (isAvalancheActive) {
            const exists = defaultCoins.tokens.find(
              ct =>
                (ct.chainId === chainId &&
                  el.address.toLowerCase() === ct.address.toLowerCase() &&
                  mustVisibleAddresses.avalanche.includes(el.address.toLowerCase())) ||
                enableTokensList.includes(el.address) ||
                el.address === window['env'].REACT_APP_ESW_ID,
            );

            // @ts-ignore
            return (
              Boolean(exists) ||
              el.address === window['env'].REACT_APP_ESW_ID ||
              el.symbol === 'ESW'
            );
          }
          // @ts-ignore // todo: fix it
          return (
            enableTokensList.includes(el.address) || el.address === window['env'].REACT_APP_ESW_ID
          );
        })
        /*.filter(el => {
            return (isLpTokens && el.name?.includes('LP '))
              || (!isLpTokens && !el.name?.includes('LP '));
          })*/
        .reduce((acc: { [key: string]: WrappedTokenInfo }, val) => {
          acc[val.address] = val;
          return acc;
        }, {});
      return (
        userAddedTokens
          // reduce into all ALL_TOKENS filtered by the current chain
          .reduce<{ [address: string]: Token }>(
            (tokenMap, token) => {
              tokenMap[token.address] = token;
              return tokenMap;
            },
            // must make a copy because reduce modifies the map, and we do not
            // want to make a copy in every iteration
            { ...filteredTokens },
          )
      );
    }, [chainId, userAddedTokens, allTokens, enableTokensList, isPolygonActive, isAvalancheActive]),
    isLoading,
  ];
}
