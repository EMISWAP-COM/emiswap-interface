import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppState } from '../../state';
import custMovr from './movr';

interface Chain {
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

export interface BridgeState {
  chainList: 'loading' | Chain[];
  fromChain: null | Chain;
  toChain: null | Chain;
}

const initialState: BridgeState = {
  chainList: 'loading',
  fromChain: null,
  toChain: null,
};

export const fetchSupportedChains = createAsyncThunk('bridge/fetchSupportedChains', async () => {
  const response = await custMovr.fetchSupportedChains();
  return response as Chain[];
});

export const bridgeSlice = createSlice({
  name: 'bridge',
  initialState,
  reducers: {
    setChains: (state, action: PayloadAction<Chain[]>) => {
      state.chainList = action.payload;
    },
    setFromChain: (state, action: PayloadAction<Chain>) => {
      state.fromChain = action.payload;
    },
    setToChain: (state, action: PayloadAction<Chain>) => {
      state.toChain = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchSupportedChains.fulfilled, (state, action) => {
      state.chainList = action.payload;
    });
  },
});

export const { setChains, setFromChain, setToChain } = bridgeSlice.actions;

export const selectChainList = (state: AppState) => state.bridge.chainList;

export const selectFromToChains = (state: AppState) => ({
  fromChain: state.bridge.fromChain,
  toChain: state.bridge.toChain,
});

export default bridgeSlice.reducer;
