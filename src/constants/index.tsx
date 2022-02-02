import { keccak256 } from '@ethersproject/solidity';
import { ChainId, ETHER, JSBI, Percent, Token } from '@uniswap/sdk';
import EthereumNetworkIcon from '../assets/svg/ethereum-network.svg';
import KuCoinNetworkIcon from '../assets/svg/kucoin-network.svg';
import { fortmatic, injected, portis, walletconnect, walletlink } from '../connectors';
import { bytecode } from './abis/Emiswap.json';
import chainIds from './chainIds';
import esw_addresses from './esw_addresses';
import PolygonNetworkIcon from '../assets/svg/polygon-network.svg';
import ShidenNetworkIcon from '../assets/images/shiden-network.png';
import AvalancheNetworkIcon from '../assets/svg/avalanche-network.svg';
import AuroraNetworkIcon from '../assets/svg/aurora-network.svg';

import { KCS } from './tokens/KCS';
import { MATIC } from './tokens/MATIC';
import { AVAX } from './tokens/AVAX';
import { SDN } from './tokens/SDN';

export const MAX_NUM_DECIMALS = 18;
export const ROUTER_ADDRESS = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[];
};

declare namespace window {
  export const env: Record<string, string>;
}
const env = window['env'];

export const WETH = new Token(
  ChainId.MAINNET,
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  18,
  'WETH',
  'WrappedEther',
);

export const WKCS = new Token(
  // @ts-ignore
  chainIds.KUCOIN,
  '0x4446fc4eb47f2f6586f9faab68b3498f86c07521',
  18,
  'WKCS',
  'WKCS',
);

export const WMATIC = new Token(
  // @ts-ignore
  chainIds.POLYGON,
  '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
  18,
  'WMATIC',
  'WMATIC',
);

export const MUMBAI_WMATIC = new Token(
  // @ts-ignore
  chainIds.MUMBAI,
  '0xbd15365b5883382A3ebFfDB0C8780F9881eff71e',
  18,
  'WMATIC',
  'WMATIC',
);

export const WSDN = new Token(
  // @ts-ignore
  chainIds.SHIDEN,
  '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef',
  18,
  'WSDN',
  'WSDN',
);

export const WAVAX = new Token(
  // @ts-ignore
  chainIds.AVALANCHE,
  '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
  18,
  'WAVAX',
  'WAVAX',
);

export const DAI = new Token(
  ChainId.MAINNET,
  '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  18,
  'DAI',
  'Dai Stablecoin',
);
export const USDC = new Token(
  ChainId.MAINNET,
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  6,
  'USDC',
  'USD//C',
);
export const USDT = new Token(
  ChainId.MAINNET,
  '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  6,
  'USDT',
  'Tether USD',
);
export const COMP = new Token(
  ChainId.MAINNET,
  '0xc00e94Cb662C3520282E6f5717214004A7f26888',
  18,
  'COMP',
  'Compound',
);
export const MKR = new Token(
  ChainId.MAINNET,
  '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
  18,
  'MKR',
  'Maker',
);
export const CHI = new Token(
  ChainId.MAINNET,
  '0x0000000000004946c0e9F43F4Dee607b0eF1fA1c',
  0,
  'CHI',
  'Chi Gastoken by 1inch',
);

export const KOVAN_DAI = new Token(
  ChainId.KOVAN,
  env.REACT_APP_KOVAN_DAI_ADDRESS,
  18,
  'DAI',
  'Dai Stablecoin',
);
export const KOVAN_USDC = new Token(
  ChainId.KOVAN,
  env.REACT_APP_KOVAN_USDC_ADDRESS,
  6,
  'USDC',
  'USD//C',
);
export const KOVAN_WETH = new Token(
  ChainId.KOVAN,
  env.REACT_APP_KOVAN_WETH_ADDRESS,
  18,
  'WETH',
  'WrappedEther',
);
export const KOVAN_USDT = new Token(
  ChainId.KOVAN,
  env.REACT_APP_KOVAN_USDT_ADDRESS,
  6,
  'USDT',
  'Tether USD',
);
export const KOVAN_COMP = new Token(
  ChainId.KOVAN,
  '0xc00e94Cb662C3520282E6f5717214004A7f26888',
  18,
  'COMP',
  'Compound',
);
export const KOVAN_MKR = new Token(
  ChainId.KOVAN,
  '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
  18,
  'MKR',
  'Maker',
);
export const KOVAN_CHI = new Token(
  ChainId.KOVAN,
  '0x0000000000004946c0e9F43F4Dee607b0eF1fA1c',
  0,
  'CHI',
  'Chi Gastoken by 1inch',
);

export const AURORA_WETH = new Token(
  // @ts-ignore
  chainIds.AURORA,
  '0xC9BdeEd33CD01541e1eeD10f90519d2C06Fe3feB',
  18,
  'WETH',
  'WrappedEther',
);

export const AURORA_DAI = new Token(
  // @ts-ignore
  chainIds.AURORA,
  '0xe3520349F477A5F6EB06107066048508498A291b',
  18,
  'DAI',
  'WrappedEther',
);

export const AURORA_USDT = new Token(
  // @ts-ignore
  chainIds.AURORA,
  '0x4988a896b1227218e4A686fdE5EabdcAbd91571f',
  18,
  'USDT',
  'Tether USD',
);

export const ESW: ChainTokenList = {
  [ChainId.MAINNET]: [
    new Token(ChainId.MAINNET, esw_addresses[chainIds.MAINNET], 18, 'ESW', 'EmiDAO Token'),
  ],
  [ChainId.ROPSTEN]: [
    new Token(ChainId.ROPSTEN, esw_addresses[chainIds.MAINNET], 18, 'ESW', 'EmiDAO Token'),
  ],
  [ChainId.RINKEBY]: [
    new Token(ChainId.RINKEBY, esw_addresses[chainIds.MAINNET], 18, 'ESW', 'EmiDAO Token'),
  ],
  [ChainId.GÖRLI]: [
    new Token(ChainId.GÖRLI, esw_addresses[chainIds.MAINNET], 18, 'ESW', 'EmiDAO Token'),
  ],
  [ChainId.KOVAN]: [
    new Token(ChainId.KOVAN, esw_addresses[chainIds.KOVAN], 18, 'ESW', 'EmiDAO Token'),
  ],
  // @ts-ignore
  [chainIds.KUCOIN]: [
    // @ts-ignore
    new Token(chainIds.KUCOIN, esw_addresses[chainIds.KUCOIN], 18, 'ESW', 'EmiDAO Token'),
  ],
  // @ts-ignore
  [chainIds.POLYGON]: [
    // @ts-ignore
    new Token(chainIds.POLYGON, esw_addresses[chainIds.POLYGON], 18, 'ESW', 'EmiDAO Token'),
  ],
  // @ts-ignore
  [chainIds.MUMBAI]: [
    // @ts-ignore
    new Token(chainIds.MUMBAI, esw_addresses[chainIds.MUMBAI], 18, 'ESW', 'EmiDAO Token'),
  ],
  [chainIds.SHIDEN]: [
    // @ts-ignore
    new Token(chainIds.SHIDEN, esw_addresses[chainIds.SHIDEN], 18, 'ESW', 'EmiDAO Token'),
  ],
  [chainIds.AVALANCHE]: [
    // @ts-ignore
    new Token(chainIds.AVALANCHE, esw_addresses[chainIds.AVALANCHE], 18, 'ESW', 'EmiDAO Token'),
  ],
  [chainIds.AURORA]: [
    // @ts-ignore
    new Token(chainIds.AURORA, esw_addresses[chainIds.AURORA], 18, 'ESW', 'EmiDAO Token'),
  ],
};

const ETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [ETHER],
  [ChainId.ROPSTEN]: [ETHER],
  [ChainId.RINKEBY]: [ETHER],
  [ChainId.GÖRLI]: [ETHER],
  [ChainId.KOVAN]: [ETHER],
  // @ts-ignore
  [chainIds.KUCOIN]: [ETHER],
  [chainIds.POLYGON]: [ETHER],
  [chainIds.MUMBAI]: [ETHER],
  [chainIds.SHIDEN]: [ETHER],
  [chainIds.AVALANCHE]: [ETHER],
  [chainIds.AURORA]: [ETHER],
};

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...ETH_ONLY,
  [ChainId.KOVAN]: [KOVAN_DAI, KOVAN_USDC, KOVAN_WETH],
  [ChainId.MAINNET]: [DAI, USDC, USDT, COMP, MKR, CHI, WETH],
  // @ts-ignore
  [chainIds.KUCOIN]: [WKCS],
  [chainIds.POLYGON]: [WMATIC],
  [chainIds.MUMBAI]: [MUMBAI_WMATIC],
  [chainIds.SHIDEN]: [WSDN],
  [chainIds.AVALANCHE]: [WAVAX],
  [chainIds.AURORA]: [AURORA_DAI, AURORA_USDT /*AURORA_WETH*/],
};

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...ETH_ONLY,
  [ChainId.KOVAN]: [KOVAN_DAI, KOVAN_USDC, KOVAN_WETH, ESW[ChainId.KOVAN][0]],
  [ChainId.MAINNET]: [DAI, USDC, USDT, CHI, ESW[ChainId.MAINNET][0]],
  // @ts-ignore
  [chainIds.KUCOIN]: [ESW[chainIds.KUCOIN][0]],
  // @ts-ignore
  [chainIds.POLYGON]: [ESW[chainIds.POLYGON][0]],
  // @ts-ignore
  [chainIds.MUMBAI]: [ESW[chainIds.MUMBAI][0]],
  // @ts-ignore
  [chainIds.SHIDEN]: [ESW[chainIds.SHIDEN][0]],
  // @ts-ignore
  [chainIds.AVALANCHE]: [ESW[chainIds.AVALANCHE][0]],
  // @ts-ignore
  [chainIds.AURORA]: [AURORA_DAI, AURORA_USDT /*AURORA_WETH*/ /*ESW[chainIds.AURORA][0]*/],
};

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...ETH_ONLY,
  [ChainId.KOVAN]: [KOVAN_DAI, KOVAN_USDC, KOVAN_WETH, ESW[ChainId.KOVAN][0]],
  [ChainId.MAINNET]: [ETHER, DAI, USDC, USDT, CHI, ESW[ChainId.MAINNET][0], WETH],
  // @ts-ignore
  [chainIds.KUCOIN]: [ESW[chainIds.KUCOIN][0]],
  // @ts-ignore
  [chainIds.POLYGON]: [ESW[chainIds.POLYGON][0]],
  // @ts-ignore
  [chainIds.MUMBAI]: [ESW[chainIds.MUMBAI][0]],
  // @ts-ignore
  [chainIds.SHIDEN]: [ESW[chainIds.SHIDEN][0]],
  // @ts-ignore
  [chainIds.AVALANCHE]: [ESW[chainIds.AVALANCHE][0]],
  // @ts-ignore
  [chainIds.AURORA]: [AURORA_DAI, AURORA_USDT /*AURORA_WETH*/ /*ESW[chainIds.AURORA][0]*/],
};

// @ts-ignore
export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.MAINNET]: [
    [
      new Token(
        ChainId.MAINNET,
        '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643',
        8,
        'cDAI',
        'Compound Dai',
      ),
      new Token(
        ChainId.MAINNET,
        '0x39AA39c021dfbaE8faC545936693aC917d5E7563',
        8,
        'cUSDC',
        'Compound USD Coin',
      ),
    ],
    [USDC, USDT],
    [DAI, USDT],
    [ETHER, CHI],
    [USDC, CHI],
    [ETHER, USDC],
  ],
};

const TESTNET_CAPABLE_WALLETS = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    unavailableNetworksIds: [],
    color: '#010101',
    primary: true,
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    unavailableNetworksIds: [],
    color: '#E8831D',
  },
};

export const SUPPORTED_WALLETS = {
  ...TESTNET_CAPABLE_WALLETS,
  ...{
    WALLET_CONNECT: {
      connector: walletconnect,
      name: 'WalletConnect',
      iconName: 'walletConnectIcon.svg',
      description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
      href: null,
      unavailableNetworksIds: [],
      color: '#4196FC',
      mobile: true,
    },
    WALLET_LINK: {
      connector: walletlink,
      name: 'Coinbase Wallet',
      iconName: 'coinbaseWalletIcon.svg',
      description: 'Use Coinbase Wallet app on mobile device',
      href: null,
      unavailableNetworksIds: [chainIds.KUCOIN, chainIds.SHIDEN],
      color: '#315CF5',
    },
    COINBASE_LINK: {
      name: 'Open in Coinbase Wallet',
      iconName: 'coinbaseWalletIcon.svg',
      description: 'Open in Coinbase Wallet app.',
      href: 'https://go.cb-w.com/fWpxXDRLvhb',
      unavailableNetworksIds: [chainIds.KUCOIN, chainIds.SHIDEN],
      color: '#315CF5',
      mobile: true,
      mobileOnly: true,
    },
    FORTMATIC: {
      connector: fortmatic,
      name: 'Fortmatic',
      iconName: 'fortmaticIcon.png',
      description: 'Login using Fortmatic hosted wallet',
      href: null,
      unavailableNetworksIds: [
        chainIds.KUCOIN,
        chainIds.POLYGON,
        chainIds.MUMBAI,
        chainIds.SHIDEN,
        chainIds.AVALANCHE,
      ],
      color: '#6748FF',
      mobile: true,
    },
    Portis: {
      connector: portis,
      name: 'Portis',
      iconName: 'portisIcon.png',
      description: 'Login using Portis hosted wallet',
      href: null,
      unavailableNetworksIds: [chainIds.KUCOIN, chainIds.SHIDEN, chainIds.AVALANCHE],
      color: '#4A6C9B',
      mobile: true,
    },
  },
};

export const NetworkContextName = 'NETWORK';

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50;
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20;

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000));
export const BIPS_BASE = JSBI.BigInt(10000);
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE); // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE); // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE); // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(
  JSBI.BigInt(1000),
  BIPS_BASE,
); // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE); // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.multiply(
  JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(9)),
  JSBI.BigInt(180_000 * 6),
); // 6GWei * 180_000

export const MIN_ETH_INVEST: JSBI = JSBI.multiply(
  JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(9)),
  JSBI.BigInt(8_000_000),
); // 8MWei * 1_000_000

export const BETTER_TRADE_LINK_THRESHOLD = new Percent(JSBI.BigInt(75), JSBI.BigInt(10000));

// the Uniswap Default token list lives here

export const DEFAULT_TOKEN_LIST_URL = 'https://gateway.ipfs.io/ipfs/test';

export const REFERRAL_ADDRESS_STORAGE_KEY = 'referral-address';

export const INIT_CODE_HASH = keccak256(['bytes'], [bytecode]);

export const FACTORY_ADDRESS = '0xe4917eb85A6C11a56189DbE621433ce5c2a3bfc3';

export interface INetworkItem {
  alias: string;
  value: string;
  chainId: number;
  token: Token;
  icon: any;
  name: string;
  rpcUrls: string[];
  currencySymbol: string;
  currencySymbolWrap: string;
  currencySymbolWeth: string;
  blockExplorerUrl: string;
  blockExplorerName: string;
  analyticsUrl: string;
  eswExplorerUrl: string;
  eswExplorerName: string;
  active: boolean;
  bridgeUrl?: string;
}

export const networksItems: INetworkItem[] = [
  {
    alias: 'main',
    value: 'ethereum',
    chainId: ChainId.MAINNET,
    token: ETHER,
    icon: EthereumNetworkIcon,
    name: 'Ethereum',
    rpcUrls: [''],
    currencySymbol: 'ETH',
    currencySymbolWrap: 'WETH',
    currencySymbolWeth: 'WETH',
    blockExplorerUrl: 'https://etherscan.io',
    blockExplorerName: 'Etherscan',
    analyticsUrl: 'https://emiswap.com/analytics?network=main',
    eswExplorerUrl: 'https://etherscan.io/token/0x5a75A093747b72a0e14056352751eDF03518031d',
    eswExplorerName: 'ESW Etherscan',
    active: true,
  },
  {
    alias: 'kcc',
    value: 'kucoin',
    chainId: chainIds.KUCOIN,
    token: KCS,
    icon: KuCoinNetworkIcon,
    name: 'KuCoin',
    rpcUrls: ['https://rpc-mainnet.kcc.network'],
    currencySymbol: 'KCS',
    currencySymbolWrap: 'WKCS',
    currencySymbolWeth: 'KCS',
    blockExplorerUrl: 'https://explorer.kcc.io/en',
    blockExplorerName: 'KCC Explorer',
    analyticsUrl: 'https://emiswap.com/analytics?network=kcc',
    eswExplorerUrl: 'https://explorer.kcc.io/en/token/0x8933a6e58eeee063b5fd3221f2e1d17821dc1031',
    eswExplorerName: 'ESW KCC Explorer',
    active: true,
    bridgeUrl: 'https://www.kcc.io/#/bridge/transfer',
  },
  {
    alias: 'polygon',
    value: 'polygon',
    chainId: chainIds.POLYGON,
    token: MATIC,
    icon: PolygonNetworkIcon,
    name: 'Polygon',
    rpcUrls: ['https://polygon-rpc.com/'],
    currencySymbol: 'MATIC',
    currencySymbolWrap: 'WMATIC',
    currencySymbolWeth: 'WMATIC',
    blockExplorerUrl: 'https://polygonscan.com',
    blockExplorerName: 'Polygonscan',
    analyticsUrl: 'https://emiswap.com/analytics?network=polygon',
    eswExplorerUrl: 'https://polygonscan.com/token/0xd2A2a353D28e4833FAFfC882f6649c9c884a7D8f',
    eswExplorerName: 'ESW Polygonscan',
    active: true,
    bridgeUrl: 'https://wallet.matic.network/bridge',
  },
  {
    alias: 'shiden',
    value: 'shiden',
    chainId: chainIds.SHIDEN,
    token: SDN,
    icon: ShidenNetworkIcon,
    name: 'Shiden',
    rpcUrls: ['https://rpc.shiden.astar.network:8545/'],
    currencySymbol: 'SDN',
    currencySymbolWrap: 'WSDN',
    currencySymbolWeth: 'WSDN',
    blockExplorerUrl: 'https://blockscout.com/shiden/',
    blockExplorerName: 'Shiden Blockscout',
    analyticsUrl: 'https://emiswap.com/analytics?network=shiden',
    eswExplorerUrl:
      'https://blockscout.com/shiden/token/0xb4BcA5955F26d2fA6B57842655d7aCf2380Ac854',
    eswExplorerName: 'ESW Shiden Blockscout',
    active: true,
    bridgeUrl: 'https://app.relaychain.com/#/cross-chain-bridge-transfer',
  },
  {
    alias: 'avalanche',
    value: 'avalanche',
    chainId: chainIds.AVALANCHE,
    token: AVAX,
    icon: AvalancheNetworkIcon,
    name: 'Avalanche',
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    currencySymbol: 'AVAX',
    currencySymbolWrap: 'WAVAX',
    currencySymbolWeth: 'WAVAX',
    blockExplorerUrl: 'https://cchain.explorer.avax.network/',
    blockExplorerName: 'Avax Explorer',
    analyticsUrl: 'https://emiswap.com/analytics?network=avalanche',
    eswExplorerUrl: 'https://etherscan.io/token/0x5a75A093747b72a0e14056352751eDF03518031d',
    eswExplorerName: 'ESW KCC Explorer',
    bridgeUrl: 'https://bridge.avax.network',
    active: true,
  },
  {
    alias: 'mumbai',
    value: 'mumbai',
    chainId: chainIds.MUMBAI,
    token: MUMBAI_WMATIC,
    icon: PolygonNetworkIcon,
    name: 'Mumbai',
    rpcUrls: ['https://rpc-mumbai.matic.today'],
    currencySymbol: 'MATIC',
    currencySymbolWrap: 'WMATIC',
    currencySymbolWeth: 'WMATIC',
    blockExplorerUrl: 'https://mumbai.polygonscan.com/',
    blockExplorerName: 'Polygonscan',
    analyticsUrl: 'https://emiswap.com/analytics?network=polygon',
    eswExplorerUrl:
      'https://mumbai.polygonscan.com/token/0xd2A2a353D28e4833FAFfC882f6649c9c884a7D8f',
    eswExplorerName: 'ESW Polygonscan',
    active: false,
  },
  {
    alias: 'aurora',
    value: 'aurora',
    chainId: chainIds.AURORA,
    token: ETHER,
    icon: AuroraNetworkIcon,
    name: 'Aurora',
    rpcUrls: ['https://mainnet.aurora.dev'],
    currencySymbol: 'ETH',
    currencySymbolWrap: 'WETH',
    currencySymbolWeth: 'WETH',
    blockExplorerUrl: 'https://browser.aurorachain.io/',
    blockExplorerName: 'Aurora Block Explorer',
    analyticsUrl: 'https://emiswap.com/analytics?network=aurora',
    eswExplorerUrl: 'https://etherscan.io/token/0x5a75A093747b72a0e14056352751eDF03518031d',
    eswExplorerName: 'ESW Etherscan',
    active: true,
  },
];
