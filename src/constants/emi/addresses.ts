import { ChainId } from '@uniswap/sdk';
import chainIds from '../chainIds';

export const EmiSwapAddress = '0xBFd4065A7004B1c8DE08e965969E306Be6bE78D4';

// mumbai
export const EMI_DELIVERY = '0x2Bf14d077769849270bfc5Cec08759f095311665';

export const EMI_ROUTER_ADRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x22B8CCdeEEACB1F3879E36e06af413d44FD79F01',
  [ChainId.KOVAN]: '0x7EeE1d070924B8255DAd03ddE989ebBffC1000eB',
  [ChainId.GÖRLI]: '0x7EeE1d070924B8255DAd03ddE989ebBffC1000eB',
  [ChainId.ROPSTEN]: '0x7EeE1d070924B8255DAd03ddE989ebBffC1000eB',
  [ChainId.RINKEBY]: '0x7EeE1d070924B8255DAd03ddE989ebBffC1000eB',
  // @ts-ignore
  [chainIds.KUCOIN]: '0xB3184913A87EEfe616788FBA3A02128A01188Ef2',
  [chainIds.POLYGON]: '0x38680777a6A402E98Fa4609725664f6766c2c46a',
  [chainIds.MUMBAI]: '0x0916C07AC981febB849e100631adFA38fBC33343',
  [chainIds.AVALANCHE]: '0x7B4b70c61a8fDE4E8c03f99adC567C1762d9d247',
};
