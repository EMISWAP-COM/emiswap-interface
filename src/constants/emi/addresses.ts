import { ChainId } from '@uniswap/sdk';

export const EmiFactoryAddress = '0x1771dff85160768255f0a44d20965665806cbf48';
export const EmiSwapAddress = '0xBFd4065A7004B1c8DE08e965969E306Be6bE78D4';
export const EmiVampAddress = window['env' as keyof Window].REACT_APP_EMI_VAMP;

export const EMI_ROUTER_ADRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x52893082158ee997bb46748bd2ccb2bbb5a23e71',
  [ChainId.KOVAN]: '0x3c756eed6dc66f7013923ac50ab236111a9494bd',
  [ChainId.GÖRLI]: '0x3c756eed6dc66f7013923ac50ab236111a9494bd',
  [ChainId.ROPSTEN]: '0x3c756eed6dc66f7013923ac50ab236111a9494bd',
  [ChainId.RINKEBY]: '0x3c756eed6dc66f7013923ac50ab236111a9494bd',
};
