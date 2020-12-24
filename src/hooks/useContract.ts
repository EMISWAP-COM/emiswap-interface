import { Contract } from '@ethersproject/contracts';
import { ChainId } from '@uniswap/sdk';
import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json';
import MooniswapABI from '../constants/v1-mooniswap/v1_mooniswap_exchange.json';
import MooniswapFactoryABI from '../constants/v1-mooniswap/v1_mooniswap_factory.json';
import MooniswapHelperABI from '../constants/v1-mooniswap/MooniswapHelper.json';
import { useMemo } from 'react';
import { ERC20_BYTES32_ABI } from '../constants/abis/erc20';
import CHI_ABI from '../constants/abis/chi.json';
import UNISOCKS_ABI from '../constants/abis/unisocks.json';
import ERC20_ABI from '../constants/abis/erc20.json';
import { MIGRATOR_ABI, MIGRATOR_ADDRESS } from '../constants/abis/migrator';
import { MULTICALL_ABI, MULTICALL_NETWORKS } from '../constants/multicall';
import { V1_EXCHANGE_ABI, V1_FACTORY_ABI, V1_FACTORY_ADDRESSES } from '../constants/v1';
import {
  V1_MOONISWAP_FACTORY_ADDRESSES,
  V1_EMIROUTER_HELPER_ADDRESSES,
} from '../constants/v1-mooniswap';
import { getContract } from '../utils';
import { useActiveWeb3React } from './index';
import { ONE_SPLIT_ABI, ONE_SPLIT_ADDRESSES } from '../constants/one-split';
import {
  UNISWAP_V2_HELPER_ABI,
  UNISWAP_V2_HELPER_ADDRESS,
} from '../constants/abis/uniswap-v2-helper';
import { UNISWAP_V2_PAIR } from '../constants/abis/uniswap-v2-pair';
import {
  UNISWAP_V2_FACTORY_ABI,
  UNISWAP_V2_FACTORY_ADDRESS,
} from '../constants/abis/uniswap-v2-factory';
import { ESW_ABI, ESW_ADDRESS } from '../constants/abis/esw'

// returns null on errors
function useContract(address?: string, ABI?: any, withSignerIfPossible = true): Contract | null {
  const { library, account } = useActiveWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !library) return null;
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined,
      );
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [address, ABI, library, withSignerIfPossible, account]);
}

export function useV1FactoryContract(): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(chainId && V1_FACTORY_ADDRESSES[chainId], V1_FACTORY_ABI, false);
}

export function useUniswapV2HelperContract(): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(chainId && UNISWAP_V2_HELPER_ADDRESS, UNISWAP_V2_HELPER_ABI, false);
}

export function useUniswapV2PairContract(pairAddress: string | undefined): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(chainId && pairAddress, UNISWAP_V2_PAIR, false);
}

export function useUniswapV2FactoryContract(): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(chainId && UNISWAP_V2_FACTORY_ADDRESS, UNISWAP_V2_FACTORY_ABI, false);
}

export function useMooniswapMigratorContract(): Contract | null {
  return useContract(MIGRATOR_ADDRESS, MIGRATOR_ABI, true);
}

export function useV1ExchangeContract(
  address?: string,
  withSignerIfPossible?: boolean,
): Contract | null {
  return useContract(address, V1_EXCHANGE_ABI, withSignerIfPossible);
}

export function useTokenContract(
  tokenAddress?: string,
  withSignerIfPossible?: boolean,
): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible);
}

export function useBytes32TokenContract(
  tokenAddress?: string,
  withSignerIfPossible?: boolean,
): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible);
}

export function usePairContract(
  pairAddress?: string,
  withSignerIfPossible?: boolean,
): Contract | null {
  return useContract(pairAddress, IUniswapV2PairABI, withSignerIfPossible);
}

export function useMulticallContract(): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(chainId && MULTICALL_NETWORKS[chainId], MULTICALL_ABI, false);
}

export function useSocksController(): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(
    chainId === ChainId.MAINNET ? '0x65770b5283117639760beA3F867b69b3697a91dd' : undefined,
    UNISOCKS_ABI,
    false,
  );
}

////// MOONISWAP ////////

export function useMooniswapV1FactoryContract(): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(
    chainId && V1_MOONISWAP_FACTORY_ADDRESSES[chainId],
    MooniswapFactoryABI,
    false,
  );
}

export function useMooniswapV1HelperContract(): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(chainId && V1_EMIROUTER_HELPER_ADDRESSES[chainId], MooniswapHelperABI, false);
}

export function useMooniswapContract(
  poolAddress?: string,
  withSignerIfPossible?: boolean,
): Contract | null {
  return useContract(poolAddress, MooniswapABI, withSignerIfPossible);
}

export function useOneSplit(): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(chainId && ONE_SPLIT_ADDRESSES[chainId], ONE_SPLIT_ABI, false);
}

export function useChiController(): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(
    chainId === ChainId.MAINNET ? '0x0000000000004946c0e9F43F4Dee607b0eF1fA1c' : undefined,
    CHI_ABI,
    false,
  );
}

export function useESWContract(): Contract | null {
  return useContract(ESW_ADDRESS, ESW_ABI, false);
}
