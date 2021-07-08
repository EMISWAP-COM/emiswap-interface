import { createAsyncThunk } from '@reduxjs/toolkit';

import { ReferralPerformance } from './reducer';
import { addPopup } from '../application/actions';
import { fetchWrapper } from '../../api/fetchWrapper';

// @ts-ignore
const baseUrl = window.env ? window.env.REACT_APP_PUBLIC_URL : '';

export const loadPerformance = createAsyncThunk(
  'cabinets/loadReferalPerformance',
  async (userId: string, { dispatch }) => {
    const url = `${baseUrl}/v1/public/users/${userId}/referrals`;
    try {
      const referrals = await fetchWrapper.get(url);

      return referrals as ReferralPerformance;
    } catch (e) {
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
      return Promise.reject(e);
    }
  },
);

export const loadBalance = createAsyncThunk(
  'cabinets/loadBalance',
  async (userId: string, { dispatch }) => {
    const url = `${baseUrl}/v1/public/users/${userId}/balances`;
    try {
      const response = await fetchWrapper.get(url);
      return response;
    } catch (e) {
      dispatch(
        addPopup({
          key: 'loadBalance',
          content: {
            status: {
              name: e.message,
              isError: true,
            },
          },
        }),
      );
      return Promise.reject(e);
    }
  },
);

export const loadBonus = createAsyncThunk(
  'cabinets/loadBonus',
  async (userId: string, { dispatch }) => {
    const url = `${baseUrl}/v1/public/users/${userId}/bonus_details`;
    try {
      const response = await fetchWrapper.get(url);
      return response;
    } catch (e) {
      dispatch(
        addPopup({
          key: 'loadBonus',
          content: {
            status: {
              name: e.message,
              isError: true,
            },
          },
        }),
      );
      return Promise.reject(e);
    }
  },
);

export const loadPoolBlockBonus = createAsyncThunk(
  'cabinets/loadPoolBlockBonus',
  async (userId: string, { dispatch }) => {
    const url = `${baseUrl}/v1/public/users/${userId}/bonus_details/pool_block_bonus`;
    try {
      const response = await fetchWrapper.get(url);
      return response;
    } catch (e) {
      dispatch(
        addPopup({
          key: 'loadPoolBlockBonus',
          content: {
            status: {
              name: e.message,
              isError: true,
            },
          },
        }),
      );
      return Promise.reject(e);
    }
  },
);

export const loadPool = createAsyncThunk(
  'cabinets/loadPool',
  async (userId: string, { dispatch }) => {
    const url = `${baseUrl}/v1/public/users/${userId}/bonus_details/pool`;
    try {
      const response = await fetchWrapper.get(url);
      return response;
    } catch (e) {
      dispatch(
        addPopup({
          key: 'loadPool',
          content: {
            status: {
              name: e.message,
              isError: true,
            },
          },
        }),
      );
      return Promise.reject(e);
    }
  },
);

// https://emiswap.emirex.co/v1/public/users/c35b1a1c-d38b-466c-b743-c4dea98d7d29/bonus_details/pool_bonus
export const loadPoolBonus = createAsyncThunk(
  'cabinets/loadPoolBonus',
  async (userId: string, { dispatch }) => {
    const url = `${baseUrl}/v1/public/users/${userId}/bonus_details/pool_bonus`;
    try {
      const response = await fetchWrapper.get(url);
      return response;
    } catch (e) {
      dispatch(
        addPopup({
          key: 'loadBonusDetails',
          content: {
            status: {
              name: e.message,
              isError: true,
            },
          },
        }),
      );
      return Promise.reject(e);
    }
  },
);

export const loadPoolBonus10X = createAsyncThunk(
  'cabinets/loadPoolBonus10X',
  async (userId: string, { dispatch }) => {
    const url = `${baseUrl}/v1/public/users/${userId}/bonus_details/pool_bonus_10x`;
    try {
      const response = await fetchWrapper.get(url);
      return response;
    } catch (e) {
      dispatch(
        addPopup({
          key: 'loadBonusDetails',
          content: {
            status: {
              name: e.message,
              isError: true,
            },
          },
        }),
      );
      return Promise.reject(e);
    }
  },
);

export const loadDepositsEswHistory = createAsyncThunk(
  'cabinets/loadDepositsEswHistory',
  async (userId: string, { dispatch }) => {
    const url = `${baseUrl}/v1/public/users/${userId}/dividends/esw_history`;
    try {
      return await fetchWrapper.get(url);
    } catch (e) {
      dispatch(
        addPopup({
          key: 'loadDepositsEswHistory',
          content: {
            status: {
              name: e.message,
              isError: true,
            },
          },
        }),
      );
      return Promise.reject(e);
    }
  },
);

export const loadDepositsEswHistoryRewards = createAsyncThunk(
  'cabinets/loadDepositsEswHistoryRewards',
  async (userId: string, { dispatch }) => {
    const url = `${baseUrl}/v1/public/users/${userId}/dividends/esw_holding_rewards`;
    try {
      return await fetchWrapper.get(url);
    } catch (e) {
      dispatch(
        addPopup({
          key: 'loadDepositsEswHistoryRewards',
          content: {
            status: {
              name: e.message,
              isError: true,
            },
          },
        }),
      );
      return Promise.reject(e);
    }
  },
);
