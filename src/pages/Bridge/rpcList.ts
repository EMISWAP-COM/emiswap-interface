export type ChainType = { chainId: number; name: string; isL1: boolean; rpcURL: string };
export const rpcList: ChainType[] = [
  {
    chainId: 1,
    name: 'mainnet',
    isL1: true,
    rpcURL: 'https://mainnet.infura.io/v3/075fc531371e495fb7c174106506ec4c',
  },
  {
    chainId: 5,
    name: 'goerli',
    isL1: true,
    rpcURL: 'https://goerli.prylabs.net',
  },
  {
    chainId: 42,
    name: 'kovan',
    isL1: true,

    rpcURL: 'https://kovan.infura.io/v3/075fc531371e495fb7c174106506ec4c',
  },
  {
    chainId: 77,
    name: 'sokol',
    isL1: false,
    rpcURL: 'https://blockscout.com/poa/sokol/api/eth-rpc',
  },
  { chainId: 100, name: 'xDai', isL1: false, rpcURL: 'https://rpc.xdaichain.com/' },
  {
    chainId: 137,
    name: 'polygon',
    isL1: false,
    rpcURL: 'https://polygon-mainnet.infura.io/v3/075fc531371e495fb7c174106506ec4c',
  },
  {
    chainId: 80001,
    name: 'mumbai',
    isL1: false,
    rpcURL: 'https://polygon-mumbai.infura.io/v3/075fc531371e495fb7c174106506ec4c',
  },
  {
    chainId: 321,
    name: 'KCC-MAINNET',
    isL1: false,
    rpcURL: 'https://rpc-mainnet.kcc.network',
  }
];
