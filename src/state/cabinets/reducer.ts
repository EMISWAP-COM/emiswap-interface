import { createReducer } from '@reduxjs/toolkit';
import {
  loadBalance,
  loadPerformance,
  loadPurchaseHistory,
  loadReferralPurchaseHistory,
} from './actions';

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
type PaymentOperationTokens = {
  [token in TokenKey]?: string;
};

interface Balance {
  wallet: PaymentOperationTokens;
  total: {
    grouped: {
      pool_bonus?: PaymentOperationTokens;
      compensation?: PaymentOperationTokens;
      referral_bonus?: PaymentOperationTokens;
    };
    locked: PaymentOperationTokens;
    unlocked: PaymentOperationTokens;
  };
  details: {
    locked: LockedDeposit;
    deposit: Deposit[];
  };
  total_fee_compensation: string;
  available: PaymentOperationTokens;
  nearest_unlock: null | Unlock;
  change_level_info: ChangeLevel | null;
}

interface CabinetState {
  performance: ReferralPerformance;
  balance: Balance;
  purchaseHistory: PurchaseHistory[];
  referralHistory: ReferralPurchaseHistory[];
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

interface Deposit {
  transaction_hash: string;
  token: TokenKey;
  created_at: string;
  amount: string;
}

type LockedDeposit = {
  [tokenKey in TokenKey]: Deposit[];
};

interface Referral {
  deposits: Deposit[];
  level: number;
}

interface ReferralLevel {
  referrals_count: number;
  bought: PaymentOperationTokens;
}

// {total: {bought: {ESW: "1906447.636374"}, reward: {ESW: "92735.631824"},…}, referrals: [,…]}
// referrals: [,…]
// total: {bought: {ESW: "1906447.636374"}, reward: {ESW: "92735.631824"},…}
// bought: {ESW: "1906447.636374"}
// level1: {referrals_count: 4, deposits_count: 10, bought: {ESW: "1786012.636374"}}
// bought: {ESW: "1786012.636374"}
// deposits_count: 10
// referrals_count: 4
// level2: {referrals_count: 5, deposits_count: 14, bought: {ESW: "117585.0"}}
// level3: {referrals_count: 2, deposits_count: 3, bought: {ESW: "2850.0"}}
// bought: {ESW: "2850.0"}

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
    wallet: {},
    total: {
      grouped: {
        pool_bonus: {},
        compensation: {},
        referral_bonus: {},
      },
      locked: {},
      unlocked: {},
    },
    details: {
      locked: {} as LockedDeposit,
      deposit: [] as Deposit[],
    },
    total_fee_compensation: '',
    available: {},
    nearest_unlock: null,
    change_level_info: null,
  },
  purchaseHistory: [] as PurchaseHistory[],
  referralHistory: [] as ReferralPurchaseHistory[],
};

export default createReducer(initialState, builder =>
  builder
    .addCase(loadPerformance.fulfilled, (state, action) => {
      state.performance = action.payload;
    })
    .addCase(loadPurchaseHistory.fulfilled, (state, action) => {
      state.purchaseHistory = action.payload;
    })
    .addCase(loadBalance.fulfilled, (state, action) => {
      state.balance = action.payload;
    })
    .addCase(loadReferralPurchaseHistory.fulfilled, (state, action) => {
      state.referralHistory = action.payload;
    }),
);
