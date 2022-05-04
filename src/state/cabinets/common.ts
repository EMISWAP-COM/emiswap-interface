import { Deposit, LockedDeposit, PaymentOperationTokens } from './reducer';
import { fetchWrapper } from '../../api/fetchWrapper';

// @ts-ignore
const baseUrl = window.env ? window.env.REACT_APP_PUBLIC_URL : '';

export interface InitialState {
  balance: Balance;
}

export interface Balance {
  histories: {
    deposits: Deposit[];
    referral_bonus: Deposit[];
  };
  wallet: PaymentOperationTokens;
  total: {
    grouped: {
      referral_bonus_180?: PaymentOperationTokens;
      referral_bonus_365?: PaymentOperationTokens;
      bonus_180?: PaymentOperationTokens;
      bonus_365?: PaymentOperationTokens;
      pool_bonus?: PaymentOperationTokens;
      pool_bonus_10x?: PaymentOperationTokens;
      pool_swap_bonus?: PaymentOperationTokens;
      compensation?: PaymentOperationTokens;
      referral_bonus?: PaymentOperationTokens;
      pool_referral_bonus?: PaymentOperationTokens;
      pool_block_bonus?: PaymentOperationTokens;
      swap_bonus?: PaymentOperationTokens;
      swap_bonus_10x?: PaymentOperationTokens;
      farming_bonus: PaymentOperationTokens;
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
    farming_bonus: Deposit[];
    bonus_180: Deposit[];
    bonus_365: Deposit[];
  };
  total_fee_compensation: string;
  available: PaymentOperationTokens;
  farming365: { ESW?: string };
  nearest_unlock: null;
  change_level_info: null;
  myRewardHistory: [];
}

export interface MyRewardHistory {
  date: string;
  forWhat: string;
  ESW: number;
  unlockDate: string;
}

export const initialState: InitialState = {
  balance: {
    histories: {
      deposits: [],
      referral_bonus: [],
    },
    wallet: {},
    total: {
      grouped: {
        referral_bonus_180: {},
        referral_bonus_365: {},
        bonus_180: {},
        bonus_365: {},
        pool_bonus: {},
        pool_bonus_10x: {},
        pool_swap_bonus: {},
        compensation: {},
        referral_bonus: {},
        pool_block_bonus: {},
        swap_bonus: {},
        swap_bonus_10x: {},
        farming_bonus: {},
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
      farming_bonus: [],
      bonus_180: [],
      bonus_365: [],
    },
    total_fee_compensation: '',
    available: {},
    nearest_unlock: null,
    change_level_info: null,
    farming365: {},
    myRewardHistory: [],
  },
};

export const getNetworkUrl = (network: string): string => {
  switch (network) {
    case 'polygon':
      return 'polygon_main';
    case 'mumbai':
      return 'polygon_test';
    case 'shiden':
      return 'shiden_main';
    default:
      return 'eth_main';
  }
};

export const loadBalance = async (
  { userId, network }: { userId: string; network: string },
  { dispatch, getState },
) => {
  const url = `${baseUrl}/v1/public/users/${userId}/balances/${getNetworkUrl(network)} `;
  try {
    const response = await fetchWrapper.get(url);
    return response;
  } catch (e) {
    //FIXME - встроить централизованную обработку ошибок
    // dispatch(
    //   addPopup({
    //     key: 'loadBalance',
    //     content: {
    //       status: {
    //         name: e.message,
    //         isError: true,
    //       },
    //     },
    //   }),
    // );
    return Promise.reject(e);
  }
};
