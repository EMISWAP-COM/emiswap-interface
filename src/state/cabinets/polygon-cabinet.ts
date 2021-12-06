import { createReducer } from '@reduxjs/toolkit';
import { loadPolygonBalance } from './action-polygon';
import { LockedDeposit, Deposit, Balance, PaymentOperationTokens } from './reducer';

export interface InitialState extends Balance {
  farming365: PaymentOperationTokens;
  myRewardHistory: MyRewardHistory[];
}

export interface MyRewardHistory {
  date: string;
  forWhat: string;
  ESW: number;
  unlockDate: string;
}

export const initialState: InitialState = {
  histories: {
    deposits: [],
    referral_bonus: [],
  },
  wallet: {},
  total: {
    grouped: {
      pool_bonus: {},
      pool_bonus_10x: {},
      pool_swap_bonus: {},
      compensation: {},
      referral_bonus: {},
      pool_block_bonus: {},
      swap_bonus: {},
      swap_bonus_10x: {},
    },
    locked: {},
    unlocked: {},
  },
  details: {
    locked: {} as LockedDeposit,
    deposit: [] as Deposit[],
    compensation: [],
    pool_bonus: [],
    pool_bonus_10x: [],
    pool_swap_bonus: [],
    pool_referral_bonus: [],
    swap_bonus: [],
    swap_bonus_10x: [],
  },
  total_fee_compensation: '',
  available: {},
  nearest_unlock: null,
  change_level_info: null,
  farming365: {},
  myRewardHistory: [],
};

export default createReducer(initialState, builder =>
  builder.addCase(loadPolygonBalance, (state, action) => {
    return {
      ...state,
      wallet: { ESW: '1' },
      farming365: { ESW: '4' },
      myRewardHistory: [
        { date: '2021-06-28', forWhat: 'Referral Reward', ESW: 2.42, unlockDate: '2022-01-01' },
        { date: '2021-06-28', forWhat: 'Farming365', ESW: 0.42, unlockDate: '2022-01-01' },
        { date: '2021-06-28', forWhat: 'Providing Liquidity', ESW: 1.42, unlockDate: '2022-01-01' },
      ],
    };
  }),
);
