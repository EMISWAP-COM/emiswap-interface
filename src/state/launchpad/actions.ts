import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWrapper } from '../../api/fetchWrapper';

// @ts-ignore
const baseUrl = window['env'] ? window['env'].REACT_APP_PUBLIC_URL : '';

export const loadLaunchpadStatus = createAsyncThunk(
  'loadLaunchpad/status',
  async (payload: { account: string; userId: string | null }, { dispatch }) => {
    const { userId } = payload;
    let url = `${baseUrl}/v1/public/launchpads/status`;
    if (userId) {
      url += `?userId=${userId}`;
    }

    try {
      const response = await fetchWrapper.get(url);
      return response;
    } catch (e) {
      /*dispatch(
        addPopup({
          key: 'launchpadStatus',
          content: {
            status: {
              name: e.message,
              isError: true,
            },
          },
        }),
      );*/
      console.log(e);
      return Promise.reject(e);
    }
  },
);
