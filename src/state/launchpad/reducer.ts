import { createReducer } from '@reduxjs/toolkit';
import { loadLaunchpadStatus } from './actions';

interface StatsState {
  loaded: boolean;
  limit: number;
  total: number;
  started_at: string | Date;
  finished_at: string | Date;
  reached_limit: boolean;
}

const initialState: StatsState = {
  loaded: true,   // TODO: Выставить в false, после того как бек этого метода заработает
  limit: 0,
  total: 0,
  started_at: new Date('2021-06-23'),
  finished_at: new Date('2021-06-25'),
  reached_limit: false,
};

export default createReducer(initialState, builder =>
  builder
    .addCase(loadLaunchpadStatus.fulfilled, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    }),
);
