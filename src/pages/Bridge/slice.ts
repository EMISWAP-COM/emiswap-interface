import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { parseUnits } from '@ethersproject/units';
import { AppState } from '../../state';
import { Chain, Token, Quote } from './types';
import custMovr from './movr';

export interface BridgeState {
  chainList: 'loading' | 'error' | Chain[];
  fromChain: null | Chain;
  toChain: null | Chain;
  fromTokenList: 'loading' | Token[];
  fromToken: null | Token;
  amountFromToken: null | string;
  toTokenList: 'loading' | Token[];
  toToken: null | Token;
  quote: 'no-route' | 'waiting' | 'error' | 'loading' | Quote;
}

const initialState: BridgeState = {
  chainList: 'loading',
  fromChain: null,
  toChain: null,
  fromTokenList: 'loading',
  fromToken: null,
  amountFromToken: null,
  toTokenList: 'loading',
  toToken: null,
  quote: 'waiting',
};

export const fetchSupportedChains = createAsyncThunk('bridge/fetchSupportedChains', async () => {
  const response = await custMovr.fetchSupportedChains();
  return response as Chain[];
});

export const fetchFromTokenList = createAsyncThunk(
  'bridge/fetchFromTokenList',
  async ({
    fromChain,
    toChain,
  }: {
    fromChain: BridgeState['fromChain'];
    toChain: BridgeState['toChain'];
  }) => {
    if (fromChain && toChain) {
      const response = await custMovr.fetchSupportedTokensByChain(
        fromChain.chainId,
        toChain.chainId,
      );
      return response as { token: Token; chainId: number }[];
    } else {
      // TODO handle this
      throw new Error('waiting chain');
    }
  },
);

export const fetchToTokenList = createAsyncThunk(
  'bridge/fetchToTokenList',
  async ({
    fromChain,
    toChain,
  }: {
    fromChain: BridgeState['fromChain'];
    toChain: BridgeState['toChain'];
  }) => {
    if (fromChain && toChain) {
      const response = await custMovr.fetchSupportedTokensToChain(
        fromChain.chainId,
        toChain.chainId,
      );
      return response as { token: Token; chainId: number }[];
    } else {
      // TODO handle this
      throw new Error('waiting chain');
    }
  },
);

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
      .addCase(fetchSupportedChains.fulfilled, (state, action) => {
        state.chainList = action.payload;
        state.fromChain = state.chainList[4];
        state.toChain = state.chainList[2];
      })
      .addCase(fetchSupportedChains.pending, (state, action) => {
        state.chainList = 'loading';
      })
      .addCase(fetchSupportedChains.rejected, (state, action) => {
        state.chainList = 'error';
      });

    builder
      .addCase(fetchFromTokenList.fulfilled, (state, action) => {
        state.fromTokenList = action.payload.map(x => x.token);
        state.fromToken = state.fromTokenList[0];
      })
      .addCase(fetchFromTokenList.pending, (state, action) => {
        // TODO
      })
      .addCase(fetchFromTokenList.rejected, (state, action) => {
        // TODO handle error two case
        // 1. waiting chain
        // 2. error handling
      });

    builder
      .addCase(fetchToTokenList.fulfilled, (state, action) => {
        state.toTokenList = action.payload.map(x => x.token);
        state.toToken = state.toTokenList[0];
      })
      .addCase(fetchToTokenList.pending, (state, action) => {
        // TODO set to loading state
      })
      .addCase(fetchToTokenList.rejected, (state, action) => {
        // TODO handle error two case
        // 1. waiting chain
        // 2. error handling
      });

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

export const selectChainList = (state: AppState) => state.bridge.chainList;
export const selectFromTokenList = (state: AppState) => state.bridge.fromTokenList;
export const selectToTokenList = (state: AppState) => state.bridge.toTokenList;
export const selectFromToken = (state: AppState) => state.bridge.fromToken;
export const selectToToken = (state: AppState) => state.bridge.toToken;
export const selectQuote = (state: AppState) => state.bridge.quote;
export const selectAmountFromToken = (state: AppState) => state.bridge.amountFromToken;

export const selectFromToChains = (state: AppState) => ({
  fromChain: state.bridge.fromChain,
  toChain: state.bridge.toChain,
});

export default bridgeSlice.reducer;
