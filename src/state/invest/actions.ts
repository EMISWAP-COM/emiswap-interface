import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ChainId, Token } from '@uniswap/sdk';
import { getCrowdsaleContract } from '../../utils';
import { Contract } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';

export enum Field {
  INPUT = 'INPUT',
  OUTPUT = 'OUTPUT',
}

export const selectCurrency = createAction<{ field: Field; currencyId: string }>(
  'invest/selectCurrency',
);
export const switchCurrencies = createAction<void>('invest/switchCurrencies');
export const typeInput = createAction<{ field: Field; typedValue: string }>('invest/typeInput');
export const receiveOutputAmount = createAction<{ outputAmount: string }>(
  'invest/receiveOutputAmount',
);
export const receiveOutput = createAction<{ outputValue: string }>('invest/receiveOutput');
export const replaceInvestState = createAction<{
  field: Field;
  typedValue: string;
  inputCurrencyId?: string;
  outputCurrencyId?: string;
}>('invest/replaceInvestState');

async function useCoinList(
  chainId: ChainId,
  account: string,
  library: Web3Provider,
): Promise<any[]> {
  const contract: Contract | null = getCrowdsaleContract(library, account);

  const counter = await contract.coinCounter();
  let coins: any[] = [];
  for (let i = 0; i < counter; i++) {
    const coin = await contract.coin(i);
    const coinData = await contract.coinData(i);
    if (coin.status === 3) {
    coins[i] = {
      chainId,
      address: coinData.coinAddress,
      decimals: coin.decimals,
      symbol: coin.symbol,
      name: coin.name,
      status: coin.status
    };
  }
  }
  console.debug("useCoinList: coins = ", coins)
  return coins;
}

export const getCoinList = createAsyncThunk<Token[], any>(
  'invest/receiveCoinList',
  ({ chainId, account, library }) => {
    return useCoinList(chainId, account, library);
  },
);
