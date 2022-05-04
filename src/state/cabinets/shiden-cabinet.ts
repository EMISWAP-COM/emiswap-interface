import { createReducer } from '@reduxjs/toolkit';
import { initialState } from './common';
import { loadShidenBalance } from './action-shiden';

export default createReducer(initialState, builder =>
  builder.addCase(loadShidenBalance.fulfilled, (state, action) => {
    state.balance = action.payload;
    console.log(action.payload);
    // FIX_ME
    state.balance.farming365 = {};
  }),
);
