import { createReducer } from '@reduxjs/toolkit';
import { loadLaunchpadStatus, successInvest } from './actions';
import { ESW_PER_USD } from '../../constants/invest';

export interface LaunchpadState {
  loaded: boolean;
  errors: any;
  limit: string;
  total: string;
  current_at: Date;
  whitelist_finished_at: Date,
  started_at: Date;
  finished_at: Date;
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
  current_at: new Date(),
  whitelist_finished_at: new Date('2021-06-27 14:00:00 UTC'),
  started_at: new Date('2021-06-28 14:00:00 UTC'),
  finished_at: new Date('2021-06-29 12:00:00 UTC'),
  reached_limit: false,
  user_limit: '0',
  user_deposits_amount: '0',
  user_reached_limit: false,
  user_deposits_count: 0,
};

export default createReducer<LaunchpadState>(initialState, builder =>
  builder
    .addCase(loadLaunchpadStatus.fulfilled, (state, action) => {
      const { current_at, started_at, finished_at, user_deposits_amount, total } = action.payload;
      return {
        ...state,
        ...action.payload,
        loaded: true,
        errors: null,
        current_at: new Date(current_at),
        started_at: new Date(started_at),
        finished_at: new Date(finished_at),
        user_deposits_amount: parseInt((+user_deposits_amount * ESW_PER_USD).toFixed()).toString(),
        total: parseInt((+total * ESW_PER_USD).toFixed()).toString(),
      };
    })
    .addCase(loadLaunchpadStatus.rejected, (state, action) => {
      return {
        ...state,
        loaded: true,
        errors: action.payload || { unknown: 'Unknown error' },
      };
    })
    .addCase(successInvest, (state, action) => {
      return {
        ...state,
        user_deposits_amount: (parseInt(state.user_deposits_amount) + action.payload.amount).toString(),
        user_deposits_count: state.user_deposits_count + 1,

      };
    })
);
