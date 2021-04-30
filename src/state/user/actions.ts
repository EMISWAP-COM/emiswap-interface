import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { UserInfo } from './reducer';
import {
  loadBalance,
  loadPerformance, loadPool,
  loadPoolBlockBonus,
} from '../cabinets/actions';
import { loadGasPrice } from '../stats/actions';
import { fetchWrapper } from '../../api/fetchWrapper';
import { addPopup } from '../application/actions';

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
  async (referralId: string, { dispatch }) => {
    const url = `${baseUrl}/v1/public/users/${referralId}`;
    try {
      const user = await fetchWrapper.get(url).then(data => data);
      return user.address;
    } catch (e) {
      alert(e.message);
      dispatch(
        addPopup({
          key: 'loadPerformance',
          content: {
            status: {
              name: e.message,
              isError: true,
            },
          },
        }),
      );
    }
  },
);

export const loginCabinets = createAsyncThunk(
  'user/login',
  async (payload: { account: string; referral_address?: string }, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { account, referral_address } = payload;

    const testAddress = window['env'] ? window['env'].REACT_APP_TEST_WALLET_ADDRESS : null;

    fetchWrapper
      .post(`${baseUrl}/v1/public/users`, {
        body: JSON.stringify({
          address: testAddress || account,
          referral_address,
        }),
      })
      .then(data => {
        dispatch(login(data));
        dispatch(loadPerformance(data.id) as any);
        dispatch(loadBalance(data.id) as any);
        dispatch(loadPoolBlockBonus(data.id) as any);
        dispatch(loadPool(data.id) as any);
        dispatch(loadGasPrice() as any);
        if (data.referral_id) {
          dispatch(loadWalletAddress(data.referral_id) as any);
        }
      })
      .catch(e => {
        console.log(e);
        dispatch(
          addPopup({
            key: 'loginCabinets',
            content: {
              status: {
                name: e.message,
                isError: true,
              },
            },
          }),
        );
      });
  },
);
