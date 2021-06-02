import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWrapper } from '../../api/fetchWrapper';
import { addPopup } from '../application/actions';

const baseUrl = window['env' as keyof Window].REACT_APP_PUBLIC_URL ?? '';

export const loadGasPrice = createAsyncThunk('stats/loadGasPrice', async (_, { dispatch }) => {
  try {
    const url = `${baseUrl}/v1/public/ethereum/gas_trackers`;
    return await fetchWrapper.get(url);
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
});
