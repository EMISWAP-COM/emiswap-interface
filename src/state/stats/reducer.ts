import { createReducer } from '@reduxjs/toolkit';
import { loadGasPrice } from './actions';

interface GasPrice {
  last_block: number;
  safe_gas_price: number;
  propose_gas_price: number;
  fast_gas_price: number;
}

interface StatsState {
  gasPrice: GasPrice;
}

const initialState: StatsState = {
  gasPrice: {
    last_block: 0,
    safe_gas_price: 0,
    propose_gas_price: 0,
    fast_gas_price: 0,
  },
};

export default createReducer(initialState, builder =>
  builder.addCase(loadGasPrice.fulfilled, (state, action) => {
    state.gasPrice = action.payload;
  }),
);
