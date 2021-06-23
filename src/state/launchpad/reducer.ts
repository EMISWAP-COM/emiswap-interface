import { createReducer } from '@reduxjs/toolkit';
import { loadLaunchpadStatus } from './actions';

export interface LaunchpadState {
  loaded: boolean;
  limit: number;
  total: number;
  started_at: string | Date;
  finished_at: string | Date;
  reached_limit: boolean;
}

const initialState: LaunchpadState = {
  loaded: false,
  limit: 0,
  total: 0,
  started_at: new Date('2021-06-23'),
  finished_at: new Date('2021-06-25'),
  reached_limit: false,
};

export default createReducer<LaunchpadState>(initialState, builder =>
  builder
    .addCase(loadLaunchpadStatus.fulfilled, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    }),
);
