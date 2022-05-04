import { createReducer } from '@reduxjs/toolkit';
import { loadPolygonBalance } from './action-polygon';
import { initialState } from './common';

export default createReducer(initialState, builder =>
  builder.addCase(loadPolygonBalance.fulfilled, (state, action) => {
    state.balance = action.payload;
    console.log(action.payload);
    // FIX_ME
    state.balance.farming365 = {};
  }),
);
