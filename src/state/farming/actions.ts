import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWrapper } from '../../api/fetchWrapper';

// @ts-ignore
const baseUrl = window['env'] ? window['env'].REACT_APP_PUBLIC_URL : '';

export const loadFarms = createAsyncThunk(
  'farms/load',
  async () => {
    const url = `${baseUrl}/v2/staking_farms?include=contract`;

    return await fetchWrapper.get(url);
  },
);

export const loadUserFarms = createAsyncThunk(
  'farms/loadUser',
  async (userId: string) => {
    const url = `${baseUrl}/v2/users/${userId}/staking_farms?expand=rewardSum,amountSum,balance`;

    return await fetchWrapper.get(url);
  },
);

export const loadUserFarmsForLK = createAsyncThunk(
  'farms/loadUserForLK',
  async (userId: string) => {
    const url = `${baseUrl}/v2/users/${userId}/staking_farms?include=stakingUserFarms`;

    return await fetchWrapper.get(url);
  },
);
