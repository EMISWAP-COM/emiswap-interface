import { ChainId } from '@uniswap/sdk';
import chainIds from '../chainIds';

export const EmiSwapAddress = '0xBFd4065A7004B1c8DE08e965969E306Be6bE78D4';

export const EMI_ROUTER_ADRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x22B8CCdeEEACB1F3879E36e06af413d44FD79F01',
  [ChainId.KOVAN]: '0x7EeE1d070924B8255DAd03ddE989ebBffC1000eB',
  [ChainId.GÖRLI]: '0x7EeE1d070924B8255DAd03ddE989ebBffC1000eB',
  [ChainId.ROPSTEN]: '0x7EeE1d070924B8255DAd03ddE989ebBffC1000eB',
  [ChainId.RINKEBY]: '0x7EeE1d070924B8255DAd03ddE989ebBffC1000eB',
  // @ts-ignore
  [chainIds.KUCOIN]: '0xB3184913A87EEfe616788FBA3A02128A01188Ef2',
};
