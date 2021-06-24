import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWrapper } from '../../api/fetchWrapper';
import { addPopup } from '../application/actions';

// @ts-ignore
const baseUrl = window['env'] ? window['env'].REACT_APP_PUBLIC_URL : '';

export const loadLaunchpadStatus = createAsyncThunk(
  'loadLaunchpad/status',
  async (payload: { account: string; authToken: string }, { dispatch }) => {
    const {authToken} = payload;
    const url = `${baseUrl}/v1/public/launchpads/status`;
    try {
      const response = await fetchWrapper.get(url, {
        headers: {
          authorization: authToken,
        },
      });
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
