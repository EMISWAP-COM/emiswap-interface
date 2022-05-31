import { createReducer } from '@reduxjs/toolkit';
import { initialState } from './common';
import { loadAuroraBalance } from './action-aurora';

export default createReducer(initialState, builder =>
  builder.addCase(loadAuroraBalance.fulfilled, (state, action) => {
    state.balance = action.payload;
    console.log(action.payload);
    // FIX_ME
    state.balance.farming365 = {};
  }),
);
