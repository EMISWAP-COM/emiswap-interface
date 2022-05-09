import { createReducer } from '@reduxjs/toolkit';
import { initialState } from './common';
import { loadAstarBalance } from './action-astar';

export default createReducer(initialState, builder =>
  builder.addCase(loadAstarBalance.fulfilled, (state, action) => {
    state.balance = action.payload;
    console.log(action.payload);
    // FIX_ME
    state.balance.farming365 = {};
  }),
);
