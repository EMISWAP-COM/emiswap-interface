import { createReducer } from '@reduxjs/toolkit';
import {
  loadBalance,
  loadBonus,
  loadDepositsEswHistory,
  loadDepositsEswHistoryRewards,
  loadPerformance,
  loadTotalBalance,
} from './actions';

export interface DepositsEswHistoryRewards {
  total: number;
  collected: number;
  available_collect: number;
}

interface Unlock {
  amount: string;
  lock_date: string;
  unlock_part: number;
  period: number;
  unlock_date: string;
}

interface ChangeLevel {
  amount: string;
  next_level: string;
}

//TODO: вывести в единый тип лейблов токенов.
type TokenKey = 'ESW' | 'DAI';
export type PaymentOperationTokens = {
  [token in TokenKey]?: string;
};

export interface Balance {
  histories: {
    deposits: Deposit[];
    referral_bonus: Deposit[];
  };
  wallet: PaymentOperationTokens;
  total: {
    grouped: {
      pool_bonus?: PaymentOperationTokens;
      pool_bonus_10x?: PaymentOperationTokens;
      pool_swap_bonus?: PaymentOperationTokens;
      compensation?: PaymentOperationTokens;
      referral_bonus?: PaymentOperationTokens;
      pool_referral_bonus?: PaymentOperationTokens;
      pool_block_bonus?: PaymentOperationTokens;
      swap_bonus?: PaymentOperationTokens;
      swap_bonus_10x?: PaymentOperationTokens;
    };
    locked: PaymentOperationTokens;
    unlocked: PaymentOperationTokens;
  };
  details: {
    locked: LockedDeposit;
    deposit: Deposit[];
    compensation: Deposit[];
    pool_bonus: Deposit[];
    pool_bonus_10x: Deposit[];
    pool_swap_bonus: Deposit[];
    pool_referral_bonus: Deposit[];
    swap_bonus: Deposit[];
    swap_bonus_10x: Deposit[];
  };
  total_fee_compensation: string;
  available: PaymentOperationTokens;
  nearest_unlock: null | Unlock;
  change_level_info: ChangeLevel | null;
}

interface BonusDetails {
  pool_block_bonuses: PoolBonus[];
  pool_bonuses: PoolBonus[];
}

export interface DepositsEswHistory {
  date: '2021-06-28';
  total_system_reward: 124.02;
  share: 2.42;
  reward: 3.0;
}

interface CabinetState {
  performance: ReferralPerformance;
  balance: Balance;
  bonusDetails: BonusDetails;
  purchaseHistory: PurchaseHistory[];
  referralHistory: ReferralPurchaseHistory[];
  depositsEswHistory: DepositsEswHistory[];
  depositsEswHistoryRewards: DepositsEswHistoryRewards;
  totalBalance: any;
}

interface TotalBalance {
  available: { ESW: string };
  wallet: { ESW: string };
  total: {
    locked: { ESW: string };
    unlocked: { ESW: string };
    withdrawn: {};
  };
}

interface PerformanceLevel {
  total_count: number;
  purchases_count: number;
  amount: string;
}

interface Reward {
  dai: {
    available: string;
    locked: string;
    total: string;
  };
  esw: {
    available: string;
    locked: string;
    total: string;
  };
}

export interface Deposit {
  transaction_hash: string;
  token: TokenKey;
  created_at: string;
  available_at: string;
  amount: string;
  amount_dai: string | null;
  unlock_at: string;
}

interface PoolBonus {
  date: string;
  name: string;
  esw_reward: string;
  esw_price: string;
  pool_part: string;
  swap_turnover: string;
}

export type LockedDeposit = {
  [tokenKey in TokenKey]: Deposit[];
};

interface Referral {
  deposits: Deposit[];
  level: number;
}

interface ReferralLevel {
  referrals_count: number;
  bought: PaymentOperationTokens;
  reward: string;
}

export interface ReferralPerformance {
  total: {
    bought: PaymentOperationTokens;
    level1: ReferralLevel;
    level2: ReferralLevel;
    level3: ReferralLevel;
    reward: PaymentOperationTokens;
  };
  referrals: Referral[];
  reward: Reward;
  total_amount: string;
  total_count: number;
  first_level: PerformanceLevel;
  second_level: PerformanceLevel;
  third_level: PerformanceLevel;
}

export interface PurchaseHistory {
  amount: string;
  date: string;
  transaction_hash: string;
}

export interface ReferralPurchaseHistory extends PurchaseHistory {
  referral_level: number;
}

const initialState: CabinetState = {
  performance: {
    referrals: [] as Referral[],
    total: {
      bought: {} as PaymentOperationTokens,
      reward: {},
    },
    reward: {} as Reward,
  } as ReferralPerformance,
  balance: {
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
  },
  bonusDetails: {
    pool_block_bonuses: [],
    pool_bonuses: [],
  },
  purchaseHistory: [] as PurchaseHistory[],
  referralHistory: [] as ReferralPurchaseHistory[],
  depositsEswHistory: new Array<DepositsEswHistory>(),
  depositsEswHistoryRewards: {} as DepositsEswHistoryRewards,
  totalBalance: {
    available: { ESW: '0' },
    wallet: { ESW: '0' },
    total: {
      locked: { ESW: '0' },
      unlocked: { ESW: '0' },
      withdrawn: {},
    },
  },
};

export default createReducer(initialState, builder =>
  builder
    .addCase(loadPerformance.fulfilled, (state, action) => {
      state.performance = action.payload;
    })
    .addCase(loadBalance.fulfilled, (state, action) => {
      state.balance = action.payload;
    })
    .addCase(loadBonus.fulfilled, (state, action) => {
      state.bonusDetails = action.payload;
    })
    .addCase(loadDepositsEswHistory.fulfilled, (state, action) => {
      state.depositsEswHistory = action.payload;
    })
    .addCase(loadTotalBalance.fulfilled, (state, action) => {
      state.totalBalance = action.payload;
    })
    .addCase(loadDepositsEswHistoryRewards.fulfilled, (state, action) => {
      state.depositsEswHistoryRewards = action.payload;
    }),
);
