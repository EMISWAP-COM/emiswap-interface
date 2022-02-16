import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { parseUnits } from '@ethersproject/units';
import { AppState } from '../../state';
import { Chain, Token, Quote } from './types';
import custMovr from './movr';

export interface BridgeState {
  fromChain: null | Chain;
  toChain: null | Chain;
  fromToken: null | Token;
  amountFromToken: string;
  toToken: null | Token;
}

const initialState: BridgeState = {
  fromChain: null,
  toChain: null,
  fromToken: null,
  amountFromToken: '',
  toToken: null,
};

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
    },
    setAmountFromToken: (state, action: PayloadAction<string>) => {
      state.amountFromToken = action.payload;
    },
    setToToken: (state, action: PayloadAction<Token>) => {
      state.toToken = action.payload;
    },
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
export const selectAmountFromToken = (state: AppState) => state.bridge.amountFromToken;

export const selectFromToChains = (state: AppState) => ({
  fromChain: state.bridge.fromChain,
  toChain: state.bridge.toChain,
});

export default bridgeSlice.reducer;
