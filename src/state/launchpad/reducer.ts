import { createReducer } from '@reduxjs/toolkit';
import { loadLaunchpadStatus } from './actions';

export interface LaunchpadState {
  loaded: boolean;
  errors: any;
  limit: string;
  total: string;
  started_at: string | Date;
  finished_at: string | Date;
  reached_limit: boolean;
  user_limit: string;
  user_deposits_amount: string;
  user_reached_limit: boolean;
  user_deposits_count: number;
}

const initialState: LaunchpadState = {
  loaded: false,
  errors: {},
  limit: '0',
  total: '0',
  started_at: new Date('2021-06-23'),
  finished_at: new Date('2021-06-25'),
  reached_limit: false,
  user_limit: '0',
  user_deposits_amount: '0',
  user_reached_limit: false,
  user_deposits_count: 0,
};

export default createReducer<LaunchpadState>(initialState, builder =>
  builder
    .addCase(loadLaunchpadStatus.fulfilled, (state, action) => {
      return {
        ...state,
        ...action.payload,
        loaded: true,
        errors: null,
      };
    })
  .addCase(loadLaunchpadStatus.rejected, (state, action) => {
    return {
      ...state,
      loaded: true,
      errors: action.payload || {unknown: 'Unknown error'},
    };
  }),
);
