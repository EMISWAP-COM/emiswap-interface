import { Interface } from '@ethersproject/abi';
import { ChainId, JSBI } from '@uniswap/sdk';
import ONE_SPLIT_ABI from './one_split.json';
import EMI_ROUTER_ABI from '../abis/EmiRouter.json';

const FLAG_DISABLE_ALL_SPLIT_SOURCES = JSBI.BigInt(0x20000000);
const FLAG_DISABLE_ALL_WRAP_SOURCES = JSBI.BigInt(0x40000000);
const FLAG_DISABLE_MOONISWAP = JSBI.BigInt(0x1000000);
const FLAG_DISABLE_MOONISWAP_ALL = JSBI.BigInt(0x8000000000000000);
const FLAG_ENABLE_CHI_BURN = JSBI.BigInt(0x10000000000);
const FLAG_ENABLE_CHI_BURN_BY_ORIGIN = JSBI.BigInt(0x4000000000000000);
const FLAG_ENABLE_REFERRAL_GAS_SPONSORSHIP = JSBI.BigInt(0x80000000000000);

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
const ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
const bn1e18 = JSBI.BigInt('1000000000000000000');

const ONE_SPLIT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x40ac138CbD9809DDF7815A83Ed48BF7C14971D73',
  [ChainId.ROPSTEN]: '0x40ac138CbD9809DDF7815A83Ed48BF7C14971D73',
  [ChainId.RINKEBY]: '0x40ac138CbD9809DDF7815A83Ed48BF7C14971D73',
  [ChainId.GÖRLI]: '0x40ac138CbD9809DDF7815A83Ed48BF7C14971D73',
  [ChainId.KOVAN]: '0x3c756Eed6DC66F7013923AC50aB236111a9494bD',
};

const ONE_SPLIT_ABI_INTERFACE = new Interface(ONE_SPLIT_ABI);

const EMI_ROUTER_ABI_INTERFACE = new Interface(EMI_ROUTER_ABI);

export {
  ONE_SPLIT_ABI_INTERFACE,
  EMI_ROUTER_ABI_INTERFACE,
  ONE_SPLIT_ABI,
  EMI_ROUTER_ABI,
  ONE_SPLIT_ADDRESSES,
  FLAG_DISABLE_ALL_SPLIT_SOURCES,
  FLAG_DISABLE_ALL_WRAP_SOURCES,
  FLAG_DISABLE_MOONISWAP,
  FLAG_DISABLE_MOONISWAP_ALL,
  FLAG_ENABLE_CHI_BURN,
  FLAG_ENABLE_CHI_BURN_BY_ORIGIN,
  FLAG_ENABLE_REFERRAL_GAS_SPONSORSHIP,
  ZERO_ADDRESS,
  ETH_ADDRESS,
  bn1e18,
};
