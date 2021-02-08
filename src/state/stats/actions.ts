import { createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = window['env'] ? window['env'].REACT_APP_PUBLIC_URL : ''

export const loadGasPrice = createAsyncThunk('stats/loadGasPrice', async () => {
  const url = `${baseUrl}/v1/public/ethereum/gas_trackers`;
  const prices = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return prices.json();
});
