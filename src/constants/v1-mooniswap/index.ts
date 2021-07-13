import { ChainId } from '@uniswap/sdk';
import V1_MOONISWAP_EXCHANGE_ABI from './v1_mooniswap_exchange.json';
import V1_MOONISWAP_FACTORY_ABI from './v1_mooniswap_factory.json';
import chainIds from '../chainIds';

const V1_MOONISWAP_FACTORY_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x1771dff85160768255f0a44d20965665806cbf48',
  [ChainId.ROPSTEN]: '0x71CD6666064C3A1354a3B4dca5fA1E2D3ee7D303',
  [ChainId.RINKEBY]: '0x71CD6666064C3A1354a3B4dca5fA1E2D3ee7D303',
  [ChainId.GÖRLI]: '0x71CD6666064C3A1354a3B4dca5fA1E2D3ee7D303',
  [ChainId.KOVAN]: '0xe4917eb85A6C11a56189DbE621433ce5c2a3bfc3',
  // @ts-ignore
  [chainIds.KUCOIN]: '0x945316F2964ef5C6C84921b435a528DD1790E93a',
};

const V1_EMIROUTER_HELPER_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: window['env'].REACT_APP_EMI_ROUTER_MAINNET,
  [ChainId.ROPSTEN]: window['env'].REACT_APP_EMI_ROUTER_ROPSTEN,
  [ChainId.RINKEBY]: window['env'].REACT_APP_EMI_ROUTER_RINKEBY,
  [ChainId.GÖRLI]: window['env'].REACT_APP_EMI_ROUTER_GÖRLI,
  [ChainId.KOVAN]: window['env'].REACT_APP_EMI_ROUTER_KOVAN,
  // @ts-ignore
  [chainIds.KUCOIN]: window['env'].REACT_APP_EMI_ROUTER_KUCOIN,
};

export {
  V1_MOONISWAP_FACTORY_ABI,
  V1_MOONISWAP_EXCHANGE_ABI,
  V1_MOONISWAP_FACTORY_ADDRESSES,
  V1_EMIROUTER_HELPER_ADDRESSES,
};
