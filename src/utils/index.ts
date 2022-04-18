import { Contract } from '@ethersproject/contracts';
import { getAddress } from '@ethersproject/address';
import { AddressZero, MaxUint256 } from '@ethersproject/constants';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { BigNumber } from '@ethersproject/bignumber';
import MooniswapABI from '../constants/v1-mooniswap/v1_mooniswap_exchange.json';
import EmiRouterABI from '../constants/abis/EmiRouter.json';
import { ChainId, ETHER, JSBI, Percent, Token, TokenAmount } from '@uniswap/sdk';
import { TokenAddressMap } from '../state/lists/hooks';
import { V1_EMIROUTER_HELPER_ADDRESSES } from '../constants/v1-mooniswap';
import { EMISWAP_CROWDSALE_ABI } from '../constants/abis/crowdsale';
import { EMISWAP_VESTING_ABI } from '../constants/abis/emiswap-vesting';
import { EMISWAP_COLLECT_ABI } from '../constants/abis/emiswap-collect';
import { FARMING_ABI } from '../constants/abis/farming';
import { EMI_PRICE_2_ABI } from '../constants/abis/emiPrice2';
import crowdsale_addresses from '../constants/crowdsale_addresses';
import chainIds from '../constants/chainIds';
import vesting_addresses from '../constants/vestring_addresses';
import emiprice2_addresses from '../constants/emiprice2_addresses';
import getFarmingAddresses from '../pages/Farm/getFarmingAddresses';
import { networksItems } from '../constants';
import { KCS } from '../constants/tokens/KCS';
import { MATIC } from '../constants/tokens/MATIC';
import { AVAX } from '../constants/tokens/AVAX';
import { FARMING_365_ABI } from '../constants/abis/farming365';
import { expNumberToStr } from './formats';
import { abi as EMI_SWAP_ABI } from '../constants/abis/Emiswap.json';
import { ERC20_ABI } from '../constants/abis/erc20';
import { SDN } from '../constants/tokens/SDN';
import { AURORA_ETHER } from '../constants/tokens/AURORA_ETHER';
import { ASTR } from '../constants/tokens/ASTR';
import { GT } from '../constants/tokens/GT';

const EMI_DELIVERY = window['env'].REACT_APP_EMI_DELIVERY;
const POLYGON_EMI_DELIVERY = window['env'].REACT_APP_POLYGON_EMI_DELIVERY;

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

const ETHERSCAN_PREFIXES: { [chainId in chainIds]: string } = {
  1: '',
  3: 'ropsten.',
  4: 'rinkeby.',
  5: 'goerli.',
  42: 'kovan.',
  56: 'bsc.',
  321: 'kucoin.',
  137: 'polygon.',
  80001: 'mumbai.',
  336: 'shiden',
  43114: 'avalanche.',
  592: 'astar.',
  86: 'gatechain.',
  1313161554: 'aurora.',
};

export function getExplorerLink(
  chainId: ChainId,
  data: string,
  type: 'transaction' | 'token' | 'address' | 'block',
): string {
  const { blockExplorerUrl: path } = getNetworkData(chainId);

  switch (type) {
    case 'transaction': {
      return `${path}/tx/${data}`;
    }
    case 'token': {
      return `${path}/token/${data}`;
    }
    case 'block': {
      return `${path}/block/${data}`;
    }
    case 'address':
    default: {
      return `${path}/address/${data}`;
    }
  }
}

export function isUseOneSplitContract(distribution: BigNumber[] | undefined): boolean {
  return Boolean(
    distribution &&
      (distribution?.filter((x: BigNumber) => x && !x.isZero())?.length > 1 ||
        distribution[12].isZero()),
  );
}

export const maxUint256Div2 = MaxUint256.div(2);

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

export function shortenAddressHeadTail(address: string, headchars = 4, tailChars = 20): string {
  const parsed = isAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, headchars + 2)}...${parsed.substring(42 - tailChars)}`;
}

export function calculateGasMargin(value: BigNumber, chainId: number): BigNumber {
  if (chainId === chainIds.AURORA) {
    return BigNumber.from(400000);
  }

  // add 10%
  return value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000));
}

// converts a basis points value to a sdk percent
export function basisPointsToPercent(num: number): Percent {
  return new Percent(JSBI.BigInt(Math.floor(num)), JSBI.BigInt(10000));
}

export function calculateSlippageAmount(value: TokenAmount, slippage: number): [JSBI, JSBI] {
  if (slippage < 0 || slippage > 10000) {
    throw Error(`Unexpected slippage value: ${slippage}`);
  }
  slippage = Math.floor(slippage);
  return [
    JSBI.divide(JSBI.multiply(value.raw, JSBI.BigInt(10000 - slippage)), JSBI.BigInt(10000)),
    JSBI.divide(JSBI.multiply(value.raw, JSBI.BigInt(10000 + slippage)), JSBI.BigInt(10000)),
  ];
}

// account is not optional
export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(
  library: Web3Provider,
  account?: string,
): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

// account is optional
export function getContract(
  address: string,
  ABI: any,
  library: Web3Provider,
  account?: string,
): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account) as any);
}

export function getMooniswapContract(
  _: number,
  library: Web3Provider,
  pairAddress: string,
  account?: string,
) {
  return getContract(pairAddress, MooniswapABI, library, account);
}

export function getEmiRouterContract(chainId: ChainId, library: Web3Provider, account?: string) {
  return getContract(V1_EMIROUTER_HELPER_ADDRESSES[chainId], EmiRouterABI, library, account);
}

export function getMinReturn(allowedSlippage: number, amount: string | undefined) {
  return BigNumber.from(amount)
    .mul(String(10000 - allowedSlippage))
    .div(String(10000))
    .toString();
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export function isDefaultToken(defaultTokens: TokenAddressMap, currency?: Token): boolean {
  const defaultAddresses = [
    ETHER.address,
    KCS.address,
    MATIC.address,
    SDN.address,
    AVAX.address,
    ASTR.address,
    GT.address,
    AURORA_ETHER.address,
  ];

  if (currency && defaultAddresses.includes(currency.address)) {
    return true;
  }

  return Boolean(currency instanceof Token && defaultTokens[currency.chainId]?.[currency.address]);
}

export function getCrowdsaleContract(library: Web3Provider, account: string, chainId: ChainId) {
  return getContract(
    crowdsale_addresses[chainId]
      ? crowdsale_addresses[chainId]
      : crowdsale_addresses[chainIds.MAINNET],
    EMISWAP_CROWDSALE_ABI,
    library,
    account,
  );
}

export function getVestingContract(library: Web3Provider, account: string, chainId: ChainId) {
  return getContract(
    vesting_addresses[chainId] ? vesting_addresses[chainId] : vesting_addresses[chainIds.MAINNET],
    EMISWAP_VESTING_ABI,
    library,
    account,
  );
}

export function getPolygonCollectContract(library: Web3Provider, account: string) {
  return getContract(POLYGON_EMI_DELIVERY, EMISWAP_COLLECT_ABI, library, account);
}

export function getCollectContract(library: Web3Provider, account: string, chainId: ChainId) {
  return getContract(EMI_DELIVERY, EMISWAP_COLLECT_ABI, library, account);
}

export function getFarmingContracts(library: Web3Provider, account: string, chainId: ChainId) {
  return getFarmingAddresses(chainId).map((address: any) =>
    getContract(address, FARMING_ABI, library, account),
  );
}

export function getFarming365Contracts(library: Web3Provider, account: string, chainId: ChainId) {
  return getFarmingAddresses(chainId).map((address: any) =>
    getContract(address, FARMING_365_ABI, library, account),
  );
}

export function getMyFarmingContracts(library: Web3Provider, account: string, chainId: ChainId) {
  return new Promise<Contract[]>(resolve => {
    const contracts = getFarmingAddresses(chainId).map((address: any) =>
      getContract(address, FARMING_ABI, library, account),
    );
    const myFarming: Contract[] = [];
    let processedContractsCount = 0;

    contracts.forEach((contract: any) => {
      contract.balanceOf(account).then((value: BigNumber) => {
        if (value.toString() !== '0') {
          myFarming.push(contract);
        }
        processedContractsCount++;
        if (processedContractsCount === contracts.length) {
          resolve(myFarming);
        }
      });
    });
  });
}

export function getEmiPrice2Contract(library: Web3Provider, account: string, chainId: ChainId) {
  return getContract(emiprice2_addresses[chainId], EMI_PRICE_2_ABI, library, account);
}

export function getNetworkData(chainId: ChainId | number | undefined) {
  return networksItems.find(item => item.chainId === chainId) || networksItems[0];
}

export function isEthereumActive(chainId: ChainId | number | undefined) {
  return [chainIds.MAINNET, chainIds.KOVAN].includes(chainId as any);
}

export function convertTokenAmount(token: Token, amount: string): BigNumber {
  const splittedAmount = amount.split('.');

  let decimals = splittedAmount[1];
  if (decimals === undefined) {
    decimals = '0';
  }

  const constrainedAmount = splittedAmount[0] + '.' + decimals.substring(0, token.decimals);

  let bigIntAmount: BigNumber;
  try {
    bigIntAmount = BigNumber.from(expNumberToStr(+constrainedAmount * 10 ** token.decimals));
  } catch (e) {
    throw new Error('Convert amount error');
  }

  return bigIntAmount;
}

export async function getLpTokenByAddress(
  tokenAddress: string,
  chainId: ChainId | any,
  account: string,
  library: Web3Provider,
) {
  const lpContract = getContract(tokenAddress, EMI_SWAP_ABI, library, account);

  const pair = await lpContract.getTokens();
  const token0Contract = getContract(pair[0], ERC20_ABI, library, account);
  const token1Contract = getContract(pair[1], ERC20_ABI, library, account);

  const decimals = await lpContract.decimals();
  const symbol = 'LP ' + (await token0Contract.symbol()) + '-' + (await token1Contract.symbol());
  const name = 'LP ' + (await token0Contract.symbol()) + '-' + (await token1Contract.symbol());

  const token = new Token(chainId, tokenAddress, decimals, symbol, name);

  return token;
}
