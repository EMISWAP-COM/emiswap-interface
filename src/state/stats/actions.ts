import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWrapper } from '../../api/fetchWrapper';

const baseUrl = window['env'] ? window['env'].REACT_APP_PUBLIC_URL : '';

export const loadGasPrice = createAsyncThunk('stats/loadGasPrice', async () => {
  const url = `${baseUrl}/v1/public/ethereum/gas_trackers`;
  return await fetchWrapper.get(url);
});
