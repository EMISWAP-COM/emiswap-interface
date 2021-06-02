import { Interface } from '@ethersproject/abi';
import { ChainId } from '@uniswap/sdk';
import V1_MOONISWAP_EXCHANGE_ABI from './v1_mooniswap_exchange.json';
import V1_MOONISWAP_FACTORY_ABI from './v1_mooniswap_factory.json';

const V1_MOONISWAP_FACTORY_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x1771dff85160768255f0a44d20965665806cbf48',
  [ChainId.ROPSTEN]: '0x71CD6666064C3A1354a3B4dca5fA1E2D3ee7D303',
  [ChainId.RINKEBY]: '0x71CD6666064C3A1354a3B4dca5fA1E2D3ee7D303',
  [ChainId.GÖRLI]: '0x71CD6666064C3A1354a3B4dca5fA1E2D3ee7D303',
  [ChainId.KOVAN]: '0xb9Cba89F4caFa60f9040D6d495a56344F37EBA23',
};

const V1_EMIROUTER_HELPER_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: window['env' as keyof Window].REACT_APP_EMI_ROUTER_MAINNET,
  [ChainId.ROPSTEN]: window['env' as keyof Window].REACT_APP_EMI_ROUTER_ROPSTEN,
  [ChainId.RINKEBY]: window['env' as keyof Window].REACT_APP_EMI_ROUTER_RINKEBY,
  [ChainId.GÖRLI]: window['env' as keyof Window].REACT_APP_EMI_ROUTER_GÖRLI,
  [ChainId.KOVAN]: window['env' as keyof Window].REACT_APP_EMI_ROUTER_KOVAN,
};

const VAMP_ADDRESS = window['env' as keyof Window].REACT_APP_EMI_VAMP;
const V1_FACTORY_INTERFACE = new Interface(V1_MOONISWAP_FACTORY_ABI);
const V1_EXCHANGE_INTERFACE = new Interface(V1_MOONISWAP_EXCHANGE_ABI);

export {
  V1_FACTORY_INTERFACE,
  V1_MOONISWAP_FACTORY_ABI,
  V1_EXCHANGE_INTERFACE,
  V1_MOONISWAP_EXCHANGE_ABI,
  V1_MOONISWAP_FACTORY_ADDRESSES,
  V1_EMIROUTER_HELPER_ADDRESSES,
  VAMP_ADDRESS,
};
