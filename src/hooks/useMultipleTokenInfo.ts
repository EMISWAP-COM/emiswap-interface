import { useMemo } from 'react';
import { useMultipleContractSingleData } from '../state/multicall/hooks';
import { Interface } from '@ethersproject/abi';
import ERC20_ABI from '../constants/abis/erc20.json';
import { useActiveWeb3React } from './index';
import { Token } from '@uniswap/sdk';

export function useMultipleTokenInfo(addresses: string[], lpTokensAddresses: string[]) {
  const { chainId } = useActiveWeb3React();
  const tokenInterface = new Interface(ERC20_ABI);
  const names = useMultipleContractSingleData(
    [...addresses],
    tokenInterface,
    'name',
    undefined,
    undefined,
    undefined,
    undefined,
    true,
  );
  const symbols = useMultipleContractSingleData(
    [...addresses],
    tokenInterface,
    'symbol',
    undefined,
    undefined,
    undefined,
    undefined,
    true,
  );
  const decimals = useMultipleContractSingleData(
    [...addresses],
    tokenInterface,
    'decimals',
    undefined,
    undefined,
    undefined,
    undefined,
    true,
  );
  const balances = useMultipleContractSingleData(
    [...lpTokensAddresses],
    tokenInterface,
    'decimals',
    undefined,
    undefined,
    undefined,
    undefined,
    true,
  );

  return useMemo(() => {
    const tokens = addresses.map((el, idx) => {
      if (!chainId) return undefined;
      const name = names?.[idx] ? names?.[idx].result?.[0] : '';
      const symbol = symbols?.[idx] ? symbols?.[idx].result?.[0] : '';
      const decimal = decimals?.[idx] ? decimals?.[idx].result?.[0] : '';
      return new Token(chainId, el, decimal, symbol, name);
    });
    const formattedBalances = balances.map(el => el?.result?.[0]);
    return { tokens, balances: formattedBalances };
  }, [addresses, names, symbols]);
}
