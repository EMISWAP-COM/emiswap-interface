import { Contract } from '@ethersproject/contracts';
import { ChainId } from '@uniswap/sdk';
import MooniswapHelperABI from '../constants/v1-mooniswap/MooniswapHelper.json';
import { useMemo } from 'react';
import { ERC20_BYTES32_ABI } from '../constants/abis/erc20';
import CHI_ABI from '../constants/abis/chi.json';
import UNISOCKS_ABI from '../constants/abis/unisocks.json';
import ERC20_ABI from '../constants/abis/erc20.json';
import VAMP_ABI from '../constants/abis/vamp.json';
import EMI_FACTORY_ABI from '../constants/abis/EmiFactory.json';
import { abi as EMI_SWAP_ABI } from '../constants/abis/Emiswap.json';
import { MULTICALL_ABI, MULTICALL_NETWORKS } from '../constants/multicall';
import { V1_FACTORY_ABI, V1_FACTORY_ADDRESSES } from '../constants/v1';
import { V1_EMIROUTER_HELPER_ADDRESSES, V1_MOONISWAP_FACTORY_ADDRESSES } from '../constants/v1-mooniswap';
import { getContract, getProviderOrSigner } from '../utils';
import { useActiveWeb3React } from './index';
import EMI_ROUTER_ABI from '../constants/abis/EmiRouter.json';
import { ESW_ABI } from '../constants/abis/esw';
import { Web3Provider } from '@ethersproject/providers';
import { EmiSwapAddress } from '../constants/emi/addresses';
import chainIds from '../constants/chainIds';
import esw_addresses from '../constants/esw_addresses';
import vamp_addresses from '../constants/vamp_addresses';

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

export function useEmiFactoryContract(): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(V1_MOONISWAP_FACTORY_ADDRESSES[chainId ?? 42], EMI_FACTORY_ABI, true);
}
export function useEmiSwapContract(): Contract | null {
  return useContract(EmiSwapAddress, EMI_SWAP_ABI, true);
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

export function useMooniswapV1HelperContract(): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(chainId && V1_EMIROUTER_HELPER_ADDRESSES[chainId], MooniswapHelperABI, false);
}

export function useEmiRouter(): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(
    chainId
      ? V1_EMIROUTER_HELPER_ADDRESSES[chainId]
      : V1_EMIROUTER_HELPER_ADDRESSES[chainIds.MAINNET],
    EMI_ROUTER_ABI,
    false,
  );
}

export function useSwapEmiRouter(library: Web3Provider, account?: string): Contract | null {
  const { chainId } = useActiveWeb3React();

  return new Contract(
    V1_EMIROUTER_HELPER_ADDRESSES[chainId || ChainId.KOVAN],
    EMI_ROUTER_ABI,
    getProviderOrSigner(library, account) as any,
  );
}

export function useChiController(): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(
    chainId === ChainId.MAINNET ? '0x0000000000004946c0e9F43F4Dee607b0eF1fA1c' : undefined,
    CHI_ABI,
    false,
  );
}

export function useESWContract(chainId: any): Contract | null {
  return useContract(
    esw_addresses[chainId] ? esw_addresses[chainId] : esw_addresses[chainIds.MAINNET],
    ESW_ABI,
    true,
  );
}

export function useVampContract(chainId: any): Contract | null {
  return useContract(
    vamp_addresses[chainId] ? vamp_addresses[chainId] : vamp_addresses[chainIds.MAINNET],
    VAMP_ABI,
    true,
  );
}
