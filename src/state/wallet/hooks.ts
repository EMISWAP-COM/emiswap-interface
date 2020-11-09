import { Token, TokenAmount, JSBI } from '@uniswap/sdk';
import { useMemo } from 'react';
import ERC20_INTERFACE from '../../constants/abis/erc20';
import { useAllTokens } from '../../hooks/Tokens';
import { useActiveWeb3React } from '../../hooks';
import { useESWContract, useMulticallContract } from '../../hooks/useContract';
import { useAllCoins } from '../../hooks/Coins';
import { isAddress } from '../../utils';
import { useSingleContractMultipleData, useMultipleContractSingleData } from '../multicall/hooks';
import { ETH_ONLY } from '../../constants';

/**
 * Returns a map of the given addresses to their eventually consistent ETH balances.
 */
export function useETHBalances(
  uncheckedAddresses?: (string | undefined)[],
): { [address: string]: TokenAmount | undefined } {
  const { chainId } = useActiveWeb3React();
  const multicallContract = useMulticallContract();

  const addresses: string[] = useMemo(
    () =>
      uncheckedAddresses
        ? uncheckedAddresses
            .map(isAddress)
            .filter((a): a is string => a !== false)
            .sort()
        : [],
    [uncheckedAddresses],
  );

  const results = useSingleContractMultipleData(
    multicallContract,
    'getEthBalance',
    addresses.map(address => [address]),
  );

  return useMemo(
    () =>
      addresses.reduce<{ [address: string]: TokenAmount }>((memo, address, i) => {
        const value = results?.[i]?.result?.[0];
        if (value) memo[address] = new TokenAmount(ETH_ONLY[chainId][0], JSBI.BigInt(value.toString()));
        return memo;
      }, {}),
    [addresses, results, chainId],
  );
}

export function useESWBalances(
  uncheckedAddresses?: (string | undefined)[],
): { [address: string]: TokenAmount | undefined } {
  const { chainId } = useActiveWeb3React();
  const eswContract = useESWContract();

  const addresses: string[] = useMemo(
    () =>
      uncheckedAddresses
        ? uncheckedAddresses
            .map(isAddress)
            .filter((a): a is string => a !== false)
            .sort()
        : [],
    [uncheckedAddresses],
  );

  const results = useSingleContractMultipleData(
    eswContract,
    'balanceOf2',
    addresses.map(address => [address]),
  );

  return useMemo(
    () =>
      addresses.reduce<{ [address: string]: TokenAmount }>((memo, address, i) => {
        const value = results?.[i]?.result?.[0];
        if (value) memo[address] = new TokenAmount(ETH_ONLY[chainId][0], JSBI.BigInt(value.toString()));
        return memo;
      }, {}),
    [addresses, results, chainId],
  );
}

/**
 * Returns a map of token addresses to their eventually consistent token balances for a single account.
 */
export function useTokenBalancesWithLoadingIndicator(
  address?: string,
  tokens?: (Token | undefined)[],
): [{ [tokenAddress: string]: TokenAmount | undefined }, boolean] {
  const validatedTokens: Token[] = useMemo(
    () => tokens?.filter((t?: Token): t is Token => isAddress(t?.address) !== false) ?? [],
    [tokens],
  );

  const validatedTokenAddresses = useMemo(() => validatedTokens.map(vt => vt.address), [
    validatedTokens,
  ]);

  const balances = useMultipleContractSingleData(
    validatedTokenAddresses,
    ERC20_INTERFACE,
    'balanceOf',
    [address],
  );

  const anyLoading: boolean = useMemo(() => balances.some(callState => callState.loading), [
    balances,
  ]);

  return [
    useMemo(
      () =>
        address && validatedTokens.length > 0
          ? validatedTokens.reduce<{ [tokenAddress: string]: TokenAmount | undefined }>(
              (memo, token, i) => {
                const value = balances?.[i]?.result?.[0];
                const amount = value ? JSBI.BigInt(value.toString()) : undefined;
                if (amount) {
                  memo[token.address] = new TokenAmount(token, amount);
                }
                return memo;
              },
              {},
            )
          : {},
      [address, validatedTokens, balances],
    ),
    anyLoading,
  ];
}

// // Used for Pools (Account == Pool)
// export function useTokenBalanceForMultipleAccounts(
//   addresses?: string[], // Addresses of the pool
//   token?: (Token | undefined) // Address of token that we take balance
// ): [{ [accountAddress: string]: TokenAmount | undefined }, boolean] {
//
//   if (!addresses || !token) {
//     return useMemo(() => {
//       return [{}, false]
//     }, [])
//   }
//
//   const erc20Contract = useTokenContract(token?.address)
//   const callData = addresses?.map(x => [x]) || [] // wrap each param into array
//
//   const balances = useSingleContractMultipleData(erc20Contract, 'balanceOf', callData)
//   const anyLoading: boolean = useMemo(() => balances.some(callState => callState.loading), [balances])
//
//   return [
//     useMemo(
//       () =>
//         addresses?.length > 0
//           ? addresses?.reduce<{ [tokenAddress: string]: TokenAmount | undefined }>((memo, pool, i) => {
//             const value = balances?.[i]?.result?.[0]
//             const amount = value ? JSBI.BigInt(value.toString()) : undefined
//             if (amount) {
//               memo[pool] = new TokenAmount(token, amount)
//             }
//             return memo
//           }, {})
//           : {},
//       [addresses, token, balances]
//     ),
//     anyLoading
//   ]
// }

export function useTokenBalances(
  address?: string,
  tokens?: (Token | undefined)[],
): { [tokenAddress: string]: TokenAmount | undefined } {
  return useTokenBalancesWithLoadingIndicator(address, tokens)[0];
}

// get the balance for a single token/account combo
export function useTokenBalance(account?: string, token?: Token): TokenAmount | undefined {
  const tokenBalances = useTokenBalances(account, [token]);
  if (!token) return;
  return tokenBalances[token.address];
}

export function useCurrencyBalances(
  account?: string,
  currencies?: (Token | undefined)[],
): (TokenAmount | undefined)[] {
  const tokens = useMemo(
    () => currencies?.filter((currency): currency is Token => currency instanceof Token) ?? [],
    [currencies],
  );

  const tokenBalances = useTokenBalances(account, tokens);
  const containsETH: boolean = useMemo(
    () => currencies?.some(currency => currency?.isEther) ?? false,
    [currencies],
  );
  const ethBalance = useETHBalances(containsETH ? [account] : []);

  const containsESW: boolean = useMemo(
    () => currencies?.some(currency => currency?.address === process.env.REACT_APP_ESW_ID) ?? false,
    [currencies],
  );
  const eswBalance = useESWBalances(containsESW ? [account] : []);

  return useMemo(
    () =>
      currencies?.map(currency => {
        if (!account || !currency) return;
        if (currency.isEther) return ethBalance[account];
        if (currency.address === process.env.REACT_APP_ESW_ID) return eswBalance[account];
        return tokenBalances[currency.address];
      }) ?? [],
    [account, currencies, ethBalance, tokenBalances, eswBalance],
  );
}

// Use case: Account is Pool
// export function useCurrencyBalancesFromManyAccounts(
//   accounts?: string[],
//   currency?: (Token | undefined)
// ): (TokenAmount | undefined)[] {
//
//   let balances: [{ [accountAddress: string]: TokenAmount | undefined }, boolean] = [{}, false]
//   let ethBalances: { [address: string]: TokenAmount | undefined } = {}
//
//   if (currency?.isEther) {
//     ethBalances = useETHBalances(accounts)
//   } else {
//     balances = useTokenBalanceForMultipleAccounts(accounts, currency)
//   }
//
//   return useMemo(
//     () =>
//       accounts?.map((account) => {
//         if (!account || !currency) return
//         if (currency.isEther) {
//           return ethBalances[account]
//         }
//         return balances[0][account]
//       }) ?? [],
//     [accounts, currency, balances]
//   )
// }

export function useCurrencyBalance(account?: string, currency?: Token): TokenAmount | undefined {
  return useCurrencyBalances(account, [currency])[0];
}

// mimics useAllBalances
export function useAllTokenBalances(): { [tokenAddress: string]: TokenAmount | undefined } {
  const { account } = useActiveWeb3React();
  const allTokens = useAllTokens();
  const allTokensArray = useMemo(() => Object.values(allTokens ?? {}), [allTokens]);
  const balances = useTokenBalances(account ?? undefined, allTokensArray);
  return balances ?? {};
}

// mimics useAllBalances
export function useAllCoinBalances(): { [tokenAddress: string]: TokenAmount | undefined } {
  const { account } = useActiveWeb3React();
  const allCoins = useAllCoins();
  const allCoinsArray = useMemo(() => Object.values(allCoins ?? {}), [allCoins]);
  const balances = useTokenBalances(account ?? undefined, allCoinsArray);
  return balances ?? {};
}
