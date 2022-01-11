import { ChainId, Pair, Token } from '@uniswap/sdk';
import flatMap from 'lodash.flatmap';
import { useCallback, useEffect, useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  BASES_TO_TRACK_LIQUIDITY_FOR,
  PINNED_PAIRS,
  REFERRAL_ADDRESS_STORAGE_KEY,
} from '../../constants';

import { useActiveWeb3React } from '../../hooks';
import { useAllTokens } from '../../hooks/Tokens';
import { AppDispatch, AppState } from '../index';
import {
  addSerializedPair,
  addSerializedToken,
  dismissTokenWarning,
  loginCabinets,
  removeSerializedToken,
  SerializedPair,
  SerializedToken,
  updateUserDarkMode,
  updateUserDeadline,
  updateUserExpertMode,
  updateUserSlippageTolerance,
} from './actions';
import { useDefaultTokenList } from '../lists/hooks';
import { getLpTokenByAddress, isDefaultToken } from '../../utils';
import { useTokens } from '../../hooks/useTokens';

//TODO refactor after release
// @ts-ignore

export const useLogin = async (account: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const referral_address = localStorage.getItem(REFERRAL_ADDRESS_STORAGE_KEY);
  const getUser = useCallback(async () => {
    //TODO create proper instance wrapper for REST
    dispatch(loginCabinets({ account, ...(referral_address ? { referral_address } : {}) }) as any);
  }, [account, dispatch, referral_address]);

  useEffect(() => {
    let interval: any;
    if (account) {
      getUser();
      interval = setInterval(() => {
        getUser();
      }, 30000);
    }
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line
    //todo Change the user status update logic
  }, [getUser, account]);
};

function serializeToken(token: Token): SerializedToken {
  return {
    chainId: token.chainId,
    address: token.address,
    decimals: token.decimals,
    symbol: token.symbol,
    name: token.name,
  };
}

function deserializeToken(serializedToken: SerializedToken): Token {
  return new Token(
    serializedToken.chainId,
    serializedToken.address,
    serializedToken.decimals,
    serializedToken.symbol,
    serializedToken.name,
  );
}

export function useIsDarkMode(): boolean {
  const { userDarkMode, matchesDarkMode } = useSelector<
    AppState,
    { userDarkMode: boolean | null; matchesDarkMode: boolean }
  >(
    ({ user: { matchesDarkMode, userDarkMode } }) => ({
      userDarkMode,
      matchesDarkMode,
    }),
    shallowEqual,
  );

  return userDarkMode === null ? matchesDarkMode : userDarkMode;
}

export function useDarkModeManager(): [boolean, () => void] {
  const dispatch = useDispatch<AppDispatch>();
  const darkMode = useIsDarkMode();

  const toggleSetDarkMode = useCallback(() => {
    dispatch(updateUserDarkMode({ userDarkMode: !darkMode }));
  }, [darkMode, dispatch]);

  return [darkMode, toggleSetDarkMode];
}

export function useIsExpertMode(): boolean {
  return useSelector<AppState, AppState['user']['userExpertMode']>(
    state => state.user.userExpertMode,
  );
}

export function useExpertModeManager(): [boolean, () => void] {
  const dispatch = useDispatch<AppDispatch>();
  const expertMode = useIsExpertMode();

  const toggleSetExpertMode = useCallback(() => {
    dispatch(updateUserExpertMode({ userExpertMode: !expertMode }));
  }, [expertMode, dispatch]);

  return [expertMode, toggleSetExpertMode];
}

export function useUserSlippageTolerance(): [number, (slippage: number) => void] {
  const dispatch = useDispatch<AppDispatch>();
  const userSlippageTolerance = useSelector<AppState, AppState['user']['userSlippageTolerance']>(
    state => {
      return state.user.userSlippageTolerance;
    },
  );

  const setUserSlippageTolerance = useCallback(
    (userSlippageTolerance: number) => {
      dispatch(updateUserSlippageTolerance({ userSlippageTolerance }));
    },
    [dispatch],
  );

  return [userSlippageTolerance, setUserSlippageTolerance];
}

export function useUserDeadline(): [number, (slippage: number) => void] {
  const dispatch = useDispatch<AppDispatch>();
  const userDeadline = useSelector<AppState, AppState['user']['userDeadline']>(state => {
    return state.user.userDeadline;
  });

  const setUserDeadline = useCallback(
    (userDeadline: number) => {
      dispatch(updateUserDeadline({ userDeadline }));
    },
    [dispatch],
  );

  return [userDeadline, setUserDeadline];
}

export function useAddUserToken(): (token: Token) => void {
  const { chainId, account, library } = useActiveWeb3React();

  const dispatch = useDispatch<AppDispatch>();

  return useCallback(
    async (token: Token) => {
      if (token?.name?.includes('LP ') && account && library) {
        const lpToken = await getLpTokenByAddress(token.address, chainId, account, library);
        dispatch(addSerializedToken({ serializedToken: serializeToken(lpToken) }));
      } else {
        dispatch(addSerializedToken({ serializedToken: serializeToken(token) }));
      }
    },
    [chainId, account, library, dispatch],
  );
}

export function useRemoveUserAddedToken(): (chainId: number, address: string) => void {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (chainId: number, address: string) => {
      dispatch(removeSerializedToken({ chainId, address }));
    },
    [dispatch],
  );
}

export function useUserAddedTokens(): Token[] {
  const { chainId } = useActiveWeb3React();
  const serializedTokensMap = useSelector<AppState, AppState['user']['tokens']>(
    ({ user: { tokens } }) => tokens,
  );

  return useMemo(() => {
    if (!chainId) return [];
    return Object.values(serializedTokensMap[chainId as ChainId] ?? {}).map(deserializeToken);
  }, [serializedTokensMap, chainId]);
}

function serializePair(pair: Pair): SerializedPair {
  return {
    token0: serializeToken(pair.token0),
    token1: serializeToken(pair.token1),
  };
}

export function usePairAdder(): (pair: Pair) => void {
  const dispatch = useDispatch<AppDispatch>();

  return useCallback(
    (pair: Pair) => {
      dispatch(addSerializedPair({ serializedPair: serializePair(pair) }));
    },
    [dispatch],
  );
}

/**
 * Returns whether a token warning has been dismissed and a callback to dismiss it,
 * iff it has not already been dismissed and is a valid token.
 */
export function useTokenWarningDismissal(
  chainId?: number,
  token?: Token,
): [boolean, null | (() => void)] {
  const dismissalState = useSelector<AppState, AppState['user']['dismissedTokenWarnings']>(
    state => state.user.dismissedTokenWarnings,
  );

  const dispatch = useDispatch<AppDispatch>();

  // get default list, mark as dismissed if on list
  const defaultList = useDefaultTokenList();
  const isDefault = isDefaultToken(defaultList, token);

  return useMemo(() => {
    if (!chainId || !token) return [false, null];

    const dismissed: boolean =
      token instanceof Token
        ? dismissalState?.[chainId]?.[token.address] === true || isDefault
        : true;

    const callback =
      dismissed || !(token instanceof Token)
        ? null
        : () => dispatch(dismissTokenWarning({ chainId, tokenAddress: token.address }));

    return [dismissed, callback];
  }, [chainId, token, dismissalState, isDefault, dispatch]);
}

/**
 * Given two tokens return the liquidity token that represents its liquidity shares
 * @param tokenA one of the two tokens
 * @param tokenB the other token
 */
export function toV2LiquidityToken([tokenA, tokenB]: [Token, Token]): Token {
  const symbol = 'EMI-V1' + tokenA.symbol + tokenB.symbol;
  const name = `Emiswap V1 (${tokenA.symbol}-${tokenB.symbol})`;
  return new Token(tokenA.chainId, '0x000000001', 18, symbol, name);
}

/**
 * Returns all the pairs of tokens that are tracked by the user for the current chain ID.
 */
export function useTrackedTokenPairs(): [Token, Token][] {
  const { chainId } = useActiveWeb3React();
  const [tokens] = useAllTokens();
  const tokensFromPools = useTokens();
  const formattedTokensFromPools = tokensFromPools.reduce((acc: { [key: string]: Token }, val) => {
    acc[val.address] = val;
    return acc;
  }, {});
  const newTokens = Object.assign(tokens, formattedTokensFromPools);
  // pinned pairs
  const pinnedPairs = useMemo(() => (chainId ? PINNED_PAIRS[chainId] ?? [] : []), [chainId]);

  // pairs for every token against every base
  const generatedPairs: [Token, Token][] = useMemo(
    () =>
      chainId
        ? flatMap(Object.keys(newTokens), tokenAddress => {
            const token = newTokens[tokenAddress];

            // for each token on the current chain,
            return (
              // loop though all bases on the current chain
              tokensFromPools
                .concat(BASES_TO_TRACK_LIQUIDITY_FOR[chainId] ?? [])
                // to construct pairs of the given token with each base
                .map(base => {
                  if (base.address === token.address) {
                    return null;
                  } else {
                    return [base, token];
                  }
                })
                .filter((p): p is [Token, Token] => p !== null)
            );
          })
        : [],
    [newTokens, chainId, tokensFromPools],
  );

  // pairs saved by users
  const savedSerializedPairs = useSelector<AppState, AppState['user']['pairs']>(
    ({ user: { pairs } }) => pairs,
  );

  const userPairs: [Token, Token][] = useMemo(() => {
    if (!chainId || !savedSerializedPairs) return [];
    const forChain = savedSerializedPairs[chainId];
    if (!forChain) return [];

    return Object.keys(forChain).map(pairId => {
      return [deserializeToken(forChain[pairId].token0), deserializeToken(forChain[pairId].token1)];
    });
  }, [savedSerializedPairs, chainId]);

  const combinedList = useMemo(
    () => userPairs.concat(generatedPairs.slice(0, 1000)).concat(pinnedPairs),
    [generatedPairs, pinnedPairs, userPairs],
  );

  return useMemo(() => {
    // dedupes pairs of tokens in the combined list
    const keyed = combinedList.reduce<{ [key: string]: [Token, Token] }>(
      (memo, [tokenA, tokenB]) => {
        const key = `${tokenA.address}:${tokenB.address}`;
        if (memo[key]) return memo;
        memo[key] = [tokenA, tokenB];
        return memo;
      },
      {},
    );

    return Object.keys(keyed).map(key => keyed[key]);
  }, [combinedList]);
}
