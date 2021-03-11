import { Token } from '@uniswap/sdk';
import { useMultipleContractSingleData } from '../state/multicall/hooks';
import { Interface } from '@ethersproject/abi';
import ERC20_ABI from '../constants/abis/erc20.json';
import { useActiveWeb3React } from './index';
import { useMemo } from 'react';

export function useLpCurrencies(addresses: string[], lpAddress: string): Token | undefined {
  const tokenInterface = new Interface(ERC20_ABI);
  const { chainId } = useActiveWeb3React();
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
    [lpAddress],
    tokenInterface,
    'decimals',
    undefined,
    undefined,
    undefined,
    undefined,
    true,
  );

  const name = useMultipleContractSingleData(
    [lpAddress],
    tokenInterface,
    'name',
    undefined,
    undefined,
    undefined,
    undefined,
    true,
  );
  return useMemo(() => {
    if (
      symbols.filter(el => el.result).length === symbols.length &&
      symbols.length &&
      decimals[0].result &&
      name[0].result
    ) {
      return new Token(
        chainId ?? 42,
        lpAddress,
        decimals[0].result[0],
        symbols.map(el => el.result?.[0])?.join('-'),
        name[0].result[0],
      );
    }
    return undefined;
  }, [chainId, decimals, lpAddress, name, symbols]);
}
