import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWrapper } from '../../api/fetchWrapper';

const baseUrl = window['env'] ? window['env'].REACT_APP_PUBLIC_URL : '';

export const loadGasPrice = createAsyncThunk('stats/loadGasPrice', async (_, { dispatch }) => {
  try {
    const url = `${baseUrl}/v1/public/ethereum/gas_trackers`;
    return await fetchWrapper.get(url);
  } catch (e) {
    console.debug('loadGasPrice: ', { e });
    //FIXME - встроить централизованную обработку ошибок
    // dispatch(
    //   addPopup({
    //     key: 'loadGasPrice',
    //     content: {
    //       status: {
    //         name: e.message,
    //         isError: true,
    //       },
    //     },
    //   }),
    // );
    return Promise.reject(e);
  }
});
