import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWrapper } from '../../api/fetchWrapper';
import { addPopup } from '../application/actions';

// @ts-ignore
const baseUrl = window['env'] ? window['env'].REACT_APP_PUBLIC_URL : '';

export const loadLaunchpadStatus = createAsyncThunk(
  'loadLaunchpad/status',
  async (account: unknown, { dispatch }) => {
    const url = `${baseUrl}/v1/public/launchpad_transactions/status`;
    try {
      const response = await fetchWrapper.get(url);
      return response;
    } catch (e) {
      dispatch(
        addPopup({
          key: 'launchpadStatus',
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
