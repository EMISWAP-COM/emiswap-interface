import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWrapper } from '../../api/fetchWrapper';

// @ts-ignore
const baseUrl = window.env ? window.env.REACT_APP_PUBLIC_URL : '';

// export const loadPolygonBalance = createAction('loadPolygonBalance');

const getNetworkUrl = (network: string): string => {
  switch (network) {
    case 'polygon':
      return 'polygon_main';
    case 'mumbai':
      return 'polygon_test';
    default:
      return 'eth_main'
  }
}

export const loadPolygonBalance = createAsyncThunk(
  'loadPolygonBalance',
  async ({ userId, network }: { userId: string; network: string }, { dispatch, getState }) => {
    const url = `${baseUrl}/v1/public/users/${userId}/balances/${
      getNetworkUrl(network)
    } `;
    try {
      const response = await fetchWrapper.get(url);
      return response;
    } catch (e) {
      console.debug('loadBalance: ', { e });
      //FIXME - встроить централизованную обработку ошибок
      // dispatch(
      //   addPopup({
      //     key: 'loadBalance',
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
  },
);
