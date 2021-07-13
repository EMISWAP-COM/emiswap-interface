import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWrapper } from '../../api/fetchWrapper';

// @ts-ignore
const baseUrl = window['env'] ? window['env'].REACT_APP_PUBLIC_URL : '';

export const loadFarms = createAsyncThunk(
  'farms/load',
  async () => {
    const url = `${baseUrl}/v2/staking_farms?include=contract,resource`;

    return await fetchWrapper.get(url);
  },
);
