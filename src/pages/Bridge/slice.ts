import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { parseUnits } from '@ethersproject/units';
import { AppState } from '../../state';
import { Chain, Token, Quote } from './types';
import custMovr from './movr';

export interface BridgeState {
  fromChain: null | Chain;
  toChain: null | Chain;
  fromToken: null | Token;
  amountFromToken: null | string;
  toToken: null | Token;
  quote: 'no-route' | 'waiting' | 'error' | 'loading' | Quote;
}

const initialState: BridgeState = {
  fromChain: null,
  toChain: null,
  fromToken: null,
  amountFromToken: null,
  toToken: null,
  quote: 'waiting',
};
interface FetchQuoteInterface {
  fromAsset: Token['address'];
  fromChainId: Chain['chainId'];
  toAsset: Token['address'];
  toChainId: Chain['chainId'];
  amount: string;
  decimals: number;
}

export const fetchQuote = createAsyncThunk(
  'bridge/fetchQuote',
  async ({ fromAsset, fromChainId, toAsset, toChainId, amount, decimals }: FetchQuoteInterface) => {
    const timestamp = Date.now();
    const quotes = await custMovr.fetchQuoteByChains(
      fromAsset,
      fromChainId,
      toAsset,
      toChainId,
      parseUnits(amount, decimals),
    );
    return { ...quotes.result, timestamp } as Quote;
  },
);

export const bridgeSlice = createSlice({
  name: 'bridge',
  initialState,
  reducers: {
    setFromChain: (state, action: PayloadAction<Chain>) => {
      state.fromChain = action.payload;
      state.fromToken = null;
      state.toToken = null;
    },
    setToChain: (state, action: PayloadAction<Chain>) => {
      state.toChain = action.payload;
      state.fromToken = null;
      state.toToken = null;
    },
    setFromToken: (state, action: PayloadAction<Token>) => {
      state.fromToken = action.payload;
      state.quote = 'waiting';
    },
    setAmountFromToken: (state, action: PayloadAction<string>) => {
      state.amountFromToken = action.payload;
      state.quote = 'waiting';
    },
    setToToken: (state, action: PayloadAction<Token>) => {
      state.toToken = action.payload;
      state.quote = 'waiting';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchQuote.fulfilled, (state, action) => {
        // fix race condition
        if (typeof state.quote !== 'string' && state.quote.timestamp > action.payload.timestamp) {
          return;
        }
        if (action.payload.routes?.length) {
          state.quote = action.payload;
        } else {
          state.quote = 'no-route';
        }
      })
      .addCase(fetchQuote.pending, (state, action) => {
        state.quote = 'loading';
      })
      .addCase(fetchQuote.rejected, (state, action) => {
        // TODO handle error
      });
  },
});

export const {
  setFromChain,
  setToChain,
  setFromToken,
  setToToken,
  setAmountFromToken,
} = bridgeSlice.actions;

export const selectFromToken = (state: AppState) => state.bridge.fromToken;
export const selectToToken = (state: AppState) => state.bridge.toToken;
export const selectQuote = (state: AppState) => state.bridge.quote;
export const selectAmountFromToken = (state: AppState) => state.bridge.amountFromToken;

export const selectFromToChains = (state: AppState) => ({
  fromChain: state.bridge.fromChain,
  toChain: state.bridge.toChain,
});

export default bridgeSlice.reducer;
