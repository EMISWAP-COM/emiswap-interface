import { parseBytes32String } from '@ethersproject/strings';
import { Token, ETHER } from '@uniswap/sdk';
import { useMemo } from 'react';
import { useDefaultTokenList, WrappedTokenInfo } from '../state/lists/hooks';
import { NEVER_RELOAD, useSingleCallResult } from '../state/multicall/hooks';
import { useUserAddedTokens } from '../state/user/hooks';
import { isAddress } from '../utils';
import { useActiveWeb3React } from './index';
import { useBytes32TokenContract, useTokenContract } from './useContract';
import { useDefaultCoin } from './Coins';
import { ZERO_ADDRESS } from '@uniswap/sdk';
import { useTokenListWithPair } from './useTokenListWithPair';
import getKcsToken from '../constants/tokens/KCS';
import chainIds from '../constants/chainIds';

export declare interface Window {
  env: Record<string, unknown>;
}

export function useAllTokens(): [{ [address: string]: Token }, boolean] {
  const { chainId } = useActiveWeb3React();
  const userAddedTokens = useUserAddedTokens();
  const allTokens = useDefaultTokenList();
  const [enableTokensList, isLoading] = useTokenListWithPair();
  return [
    useMemo(() => {
      if (!chainId) return {};
      const filteredTokens = Object.values(allTokens[chainId])
        .filter(
          el =>
            // @ts-ignore // todo: fix it
            enableTokensList.includes(el.address) || el.address === window['env'].REACT_APP_ESW_ID,
        )
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
    }, [chainId, userAddedTokens, allTokens, enableTokensList]),
    isLoading,
  ];
}

// parse a name or symbol from a token response
const BYTES32_REGEX = /^0x[a-fA-F0-9]{64}$/;
function parseStringOrBytes32(
  str: string | undefined,
  bytes32: string | undefined,
  defaultValue: string,
): string {
  return str && str.length > 0
    ? str
    : bytes32 && BYTES32_REGEX.test(bytes32)
    ? parseBytes32String(bytes32)
    : defaultValue;
}

// undefined if invalid or does not exist
// null if loading
// otherwise returns the token
export function useToken(tokenAddress?: string): Token | undefined | null {
  const { chainId } = useActiveWeb3React();
  const [tokens] = useAllTokens();

  const address = isAddress(tokenAddress);
  const tokenContract = useTokenContract(address ? address : undefined, false);
  const tokenContractBytes32 = useBytes32TokenContract(address ? address : undefined, false);
  const defaultToken = useDefaultCoin(tokenAddress);
  const token: Token | undefined = (address ? tokens[address] : undefined) || defaultToken;

  const tokenName = useSingleCallResult(
    token ? undefined : tokenContract,
    'name',
    undefined,
    NEVER_RELOAD,
  );
  const tokenNameBytes32 = useSingleCallResult(
    token ? undefined : tokenContractBytes32,
    'name',
    undefined,
    NEVER_RELOAD,
  );
  const symbol = useSingleCallResult(
    token ? undefined : tokenContract,
    'symbol',
    undefined,
    NEVER_RELOAD,
  );
  const symbolBytes32 = useSingleCallResult(
    token ? undefined : tokenContractBytes32,
    'symbol',
    undefined,
    NEVER_RELOAD,
  );
  const decimals = useSingleCallResult(
    token ? undefined : tokenContract,
    'decimals',
    undefined,
    NEVER_RELOAD,
  );

  return useMemo(() => {
    if (token) return token;
    if (!chainId || !address) return undefined;
    if (decimals.loading || symbol.loading || tokenName.loading) return null;
    if (decimals.result) {
      return new Token(
        chainId,
        address,
        decimals.result[0],
        parseStringOrBytes32(symbol.result?.[0], symbolBytes32.result?.[0], 'UNKNOWN'),
        parseStringOrBytes32(tokenName.result?.[0], tokenNameBytes32.result?.[0], 'Unknown Token'),
      );
    }
    return undefined;
  }, [
    address,
    chainId,
    decimals.loading,
    decimals.result,
    symbol.loading,
    symbol.result,
    symbolBytes32.result,
    token,
    tokenName.loading,
    tokenName.result,
    tokenNameBytes32.result,
  ]);
}

export function useCurrency(currencyId: string | undefined): Token | null | undefined {
  const { chainId } = useActiveWeb3React();

  // @ts-ignore // todo: fix it
  const isESW = currencyId?.toUpperCase() === window['env'].REACT_APP_ESW_ID?.toUpperCase();
  const defaultCoin = useDefaultCoin(currencyId);
  const isETH = currencyId?.toUpperCase() === ETHER.address.toUpperCase();
  const token = useToken(isESW || isETH ? undefined : currencyId);

  const ether = new Token(chainId || 1, ZERO_ADDRESS, 18, 'ETH', 'Ethereum');
  const KCS = getKcsToken(chainId);

  // @ts-ignore
  const ethereumOrKcsCoin = chainId === chainIds.KUCOIN ? KCS : ether;

  return isESW ? defaultCoin : isETH ? ethereumOrKcsCoin : token;
}
