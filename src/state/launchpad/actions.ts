import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWrapper } from '../../api/fetchWrapper';

// @ts-ignore
const baseUrl = window['env'] ? window['env'].REACT_APP_PUBLIC_URL : '';

export const loadLaunchpadStatus = createAsyncThunk(
  'loadLaunchpad/status',
  async (payload: { account: string; userId: string | null }, { dispatch }) => {
    const { userId } = payload;
    let url = `${baseUrl}/v1/public/launchpads/status`;
    if (userId) {
      url += `?user_id=${userId}`;
    }

    try {
      return await fetchWrapper.get(url);
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
  },
);

export const successInvest = createAction<{
  amount: number;
}>('loadLaunchpad/successInvest');
