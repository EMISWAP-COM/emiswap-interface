import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { PortisConnector } from '@web3-react/portis-connector';

import { FortmaticConnector } from './Fortmatic';
import { NetworkConnector } from './NetworkConnector';
import chainIds from '../constants/chainIds';

const CHAIN_ID = window['env'].REACT_APP_CHAIN_ID;
const NETWORK_URL = window['env'].REACT_APP_NETWORK_URL;
const FORMATIC_KEY = window['env'].REACT_APP_FORTMATIC_KEY;
const PORTIS_ID = window['env'].REACT_APP_PORTIS_ID;

if (typeof NETWORK_URL === 'undefined') {
  throw new Error(`REACT_APP_NETWORK_URL must be a defined environment variable`);
}

export const network = new NetworkConnector({
  urls: { [Number(window['env'].REACT_APP_CHAIN_ID)]: NETWORK_URL },
});

export const injected = new InjectedConnector({
  supportedChainIds: [
    chainIds.MAINNET,
    3,
    4,
    5,
    chainIds.KOVAN,
    chainIds.KUCOIN,
    chainIds.POLYGON,
    chainIds.MUMBAI,
    chainIds.SHIDEN,
    chainIds.AVALANCHE,
    chainIds.AURORA,
  ],
});

// initialized once, based on the envs - kovan or mainnet. Chain id changes during session have no effect.

export const walletconnect = new WalletConnectConnector({
  infuraId: '2b7c5bba80094418abf5e746ba10dac0',
  supportedChainIds: [
    chainIds.MAINNET,
    chainIds.KOVAN,
    chainIds.POLYGON,
    chainIds.MUMBAI,
    chainIds.SHIDEN,
    chainIds.AVALANCHE,
  ],
  rpc: {
    [CHAIN_ID]: NETWORK_URL,
    137: 'https://matic-mainnet.chainstacklabs.com',
  },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 15000,
});

// mainnet only
export const fortmatic = new FortmaticConnector({
  apiKey: FORMATIC_KEY ?? '',
  chainId: 1,
});

// mainnet only
export const portis = new PortisConnector({
  dAppId: PORTIS_ID ?? '',
  networks: [1],
});

// mainnet only
export const walletlink = new WalletLinkConnector({
  url: NETWORK_URL,
  appName: 'Emiswap',
  appLogoUrl:
    'https://mpng.pngfly.com/20181202/bex/kisspng-emoji-domain-unicorn-pin-badges-sticker-unicorn-tumblr-emoji-unicorn-iphoneemoji-5c046729264a77.5671679315437924251569.jpg',
});
