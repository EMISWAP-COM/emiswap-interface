import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ChainId, Token } from '@uniswap/sdk';
import { getCrowdsaleContract } from '../../utils';
import { Contract } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';
import { BigNumber } from '@ethersproject/bignumber';

export enum Field {
  INPUT = 'INPUT',
  OUTPUT = 'OUTPUT',
}

export const selectCurrency = createAction<{ field: Field; currencyId: string }>(
  'invest/selectCurrency',
);
export const switchCurrencies = createAction<void>('invest/switchCurrencies');
export const typeInput = createAction<{ field: Field; typedValue: string }>('invest/typeInput');
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

  // const am = await contract.getBuyCoinAmount('0xc73cbC85C8Df0e7b40Cc05f8B82De4a7ae8F8813', 12);
  // const amBig = BigNumber.from(am)
  // console.log('---am---', am, amBig.toNumber())

  const counter = await contract.coinCounter();
  let coins: any[] = [];
  for (let i = 1; i < counter; i++) {
    const coin = await contract.coin(i);
    const coinData = await contract.coinData(i);
    const coinRate = await contract.coinRate(i);
    coins[i - 1] = {
      chainId,
      address: coinData.coinAddress,
      decimals: coin.decimals,
      symbol: coin.symbol,
      name: coin.name,
      rate: coinRate,
    };
  }
  return coins;
}

export const getCoinList = createAsyncThunk<Token[], any>(
  'invest/receiveCoinList',
  ({ chainId, account, library }) => {
    return useCoinList(chainId, account, library);
  },
);
