import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { UserInfo } from './reducer';
import {
  loadBalance,
  loadPerformance,
  loadPurchaseHistory,
  loadReferralPurchaseHistory,
} from '../cabinets/actions';
import { loadGasPrice } from '../stats/actions';

export interface SerializedToken {
  chainId: number;
  address: string;
  decimals: number;
  symbol?: string;
  name?: string;
}

export interface SerializedPair {
  token0: SerializedToken;
  token1: SerializedToken;
}

const baseUrl = window['env'] ? window['env'].REACT_APP_PUBLIC_URL : '';

export const login = createAction<UserInfo>('user/login');

export const updateVersion = createAction<void>('updateVersion');
export const updateMatchesDarkMode = createAction<{ matchesDarkMode: boolean }>(
  'updateMatchesDarkMode',
);
export const updateUserDarkMode = createAction<{ userDarkMode: boolean }>('updateUserDarkMode');
export const updateUserExpertMode = createAction<{ userExpertMode: boolean }>(
  'updateUserExpertMode',
);
export const updateUserSlippageTolerance = createAction<{ userSlippageTolerance: number }>(
  'updateUserSlippageTolerance',
);
export const updateUserDeadline = createAction<{ userDeadline: number }>('updateUserDeadline');
export const addSerializedToken = createAction<{ serializedToken: SerializedToken }>(
  'addSerializedToken',
);
export const removeSerializedToken = createAction<{ chainId: number; address: string }>(
  'removeSerializedToken',
);
export const addSerializedPair = createAction<{ serializedPair: SerializedPair }>(
  'addSerializedPair',
);
export const removeSerializedPair = createAction<{
  chainId: number;
  tokenAAddress: string;
  tokenBAddress: string;
}>('removeSerializedPair');
export const dismissTokenWarning = createAction<{ chainId: number; tokenAddress: string }>(
  'dismissTokenWarning',
);

export const loadWalletAddress = createAsyncThunk(
  'user/loadWalletAddress',
  async (referralId: string) => {
    const url = `${baseUrl}/v1/public/users/${referralId}`;
    try {
      const user = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(data => data);
      return user.address;
    } catch (e) {
      alert(e.message);
    }
  },
);

export const loginCabinets = createAsyncThunk(
  'user/login',
  async (payload: { account: string; referral_address?: string }, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { account, referral_address } = payload;
    fetch(`${baseUrl}/v1/public/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address: account,
        referral_address,
      }),
    })
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          return res.json();
        }
        throw new Error('no user');
      })
      .then(data => {
        dispatch(login(data));
        dispatch(loadPerformance(data.id) as any);
        dispatch(loadPurchaseHistory(data.id) as any);
        dispatch(loadReferralPurchaseHistory(data.id) as any);
        dispatch(loadBalance(data.id) as any);
        dispatch(loadGasPrice() as any);
        if (data.referral_id) {
          dispatch(loadWalletAddress(data.referral_id) as any);
        }
      })
      .catch(e => {
        console.log(e);
      });
  },
);
