import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { parseUnits } from '@ethersproject/units';
import { AppState } from '../../state';
import custMovr from './movr';

export interface Chain {
  chainId: number;
  name: string;
  isL1: boolean;
  isTestnet: boolean;
  sendingEnabled: boolean;
  icon: string;
  receivingEnabled: boolean;
  currency: { address: string; name: string; symbol: string; decimals: number };
  rpcs: string[];
  explorers: string[];
}

export interface Token {
  name: string;
  address: string;
  chainId: number;
  decimals: number;
  symbol: string;
  icon: string;
}

export interface Token {
  name: string;
  address: string;
  chainId: number;
  decimals: number;
  symbol: string;
  icon: string;
}

interface Quote {
  fromAsset: Token;
  fromChainId: Chain['chainId'];
  toAsset: Token;
  toChainId: Chain['chainId'];
  routes: {
    allowanceTarget: string;
    isApprovalRequired: boolean;
    routePath: string;
    middlewareRoute: {
      middlewareId: number;
      middlewareName: string;
      middlewareInfo: {
        displayName: string;
        icon: string;
      };
      fromAsset: Token;
      toAsset: Token;
      inputAmount: string;
      outputAmount: string;
    };
    bridgeRoute: {
      bridgeName: string;
      bridgeId: number;
      bridgeInfo: {
        serviceTime: number;
        displayName: string;
        icon: string;
      };
      fromAsset: Token;
      fromChainId: Chain['chainId'];
      toAsset: Token;
      toChainId: Chain['chainId'];
      inputAmount: string;
      outputAmount: string;
    };

    fees: {
      gasLimit: { amount: string; assetAddress: string; chainId: number }[];
      middlewareFee: { amount: string; assetAddress: string };
      bridgeFee: { amount: string; assetAddress: string };
    };
  }[];
  amount: string;
}

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
  quote: 'loading',
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
    const quotes = await custMovr.fetchQuoteByChains(
      fromAsset,
      fromChainId,
      toAsset,
      toChainId,
      parseUnits(amount, decimals),
    );
    return quotes.result as Quote;
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
      state.quote = 'loading';
    },
    setAmountFromToken: (state, action: PayloadAction<string>) => {
      state.amountFromToken = action.payload;
      state.quote = 'loading';
    },
    setToToken: (state, action: PayloadAction<Token>) => {
      state.toToken = action.payload;
      state.quote = 'loading';
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
        if (action.payload.routes.length === 0) {
          state.quote = 'no-route';
        } else {
          state.quote = action.payload;
        }
      })
      .addCase(fetchQuote.pending, (state, action) => {
        // TODO set to loading state
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
