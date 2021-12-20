import { ChainId } from '@uniswap/sdk';
import V1_MOONISWAP_EXCHANGE_ABI from './v1_mooniswap_exchange.json';
import V1_MOONISWAP_FACTORY_ABI from './v1_mooniswap_factory.json';
import chainIds from '../chainIds';
import emirouter_addresses from '../emirouter_addresses';
import factory_addresses from '../factory_addresses';

const V1_MOONISWAP_FACTORY_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: factory_addresses[chainIds.MAINNET],
  [ChainId.ROPSTEN]: factory_addresses[chainIds.ROPSTEN],
  [ChainId.RINKEBY]: factory_addresses[chainIds.RINKEBY],
  [ChainId.GÖRLI]: factory_addresses[chainIds.GÖRLI],
  [ChainId.KOVAN]: factory_addresses[chainIds.KOVAN],
  // @ts-ignore
  [chainIds.KUCOIN]: factory_addresses[chainIds.KUCOIN],
  // @ts-ignore
  [chainIds.POLYGON]: factory_addresses[chainIds.POLYGON],
  [chainIds.MUMBAI]: factory_addresses[chainIds.MUMBAI],
  [chainIds.AVALANCHE]: factory_addresses[chainIds.AVALANCHE],
};

const V1_EMIROUTER_HELPER_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: emirouter_addresses[chainIds.MAINNET],
  [ChainId.ROPSTEN]: emirouter_addresses[chainIds.ROPSTEN],
  [ChainId.RINKEBY]: emirouter_addresses[chainIds.RINKEBY],
  [ChainId.GÖRLI]: emirouter_addresses[chainIds.GÖRLI],
  [ChainId.KOVAN]: emirouter_addresses[chainIds.KOVAN],
  // @ts-ignore
  [chainIds.KUCOIN]: emirouter_addresses[chainIds.KUCOIN],
  [chainIds.POLYGON]: emirouter_addresses[chainIds.POLYGON],
  [chainIds.MUMBAI]: emirouter_addresses[chainIds.MUMBAI],
  [chainIds.AVALANCHE]: emirouter_addresses[chainIds.AVALANCHE],
};

export {
  V1_MOONISWAP_FACTORY_ABI,
  V1_MOONISWAP_EXCHANGE_ABI,
  V1_MOONISWAP_FACTORY_ADDRESSES,
  V1_EMIROUTER_HELPER_ADDRESSES,
};
