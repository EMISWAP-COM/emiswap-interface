import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReferralPerformance } from './reducer';
import { fetchWrapper } from '../../api/fetchWrapper';
// @ts-ignore
const baseUrl = window.env ? window.env.REACT_APP_PUBLIC_URL : '';

export const loadPerformance = createAsyncThunk(
  'cabinets/loadReferalPerformance',
  async (userId: string) => {
    const url = `${baseUrl}/v1/public/users/${userId}/referrals/total`;

    const { referrals } = await fetchWrapper.get(url);

    return referrals as ReferralPerformance;
  },
);

export const loadPurchaseHistory = createAsyncThunk(
  'cabinets/loadPurchaseHistory',
  async (userId: string) => {
    const url = `${baseUrl}/v1/public/users/${userId}/purchases/history`;
    const response = await fetchWrapper.get(url);
    return response;
  },
);

export const loadReferralPurchaseHistory = createAsyncThunk(
  'cabinets/loadReferralPurchaseHistory',
  async (userId: string) => {
    const url = `${baseUrl}/v1/public/users/${userId}/referrals/purchases/history`;
    const response = await fetchWrapper.get(url);
    return response;
  },
);
export const loadBalance = createAsyncThunk('cabinets/loadBalance', async (userId: string) => {
  const url = `${baseUrl}/v1/public/users/${userId}/balance`;
  const response = await fetchWrapper.get(url);
  return response;
});
