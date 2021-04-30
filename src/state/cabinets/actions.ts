import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReferralPerformance } from './reducer';
import { fetchWrapper } from '../../api/fetchWrapper';
import { addPopup } from '../application/actions';
// @ts-ignore
const baseUrl = window.env ? window.env.REACT_APP_PUBLIC_URL : '';

export const loadPerformance = createAsyncThunk(
  'cabinets/loadReferalPerformance',
  async (userId: string, { dispatch }) => {
    const url = `${baseUrl}/v1/public/users/${userId}/referrals`;
    try {
      const referrals = await fetchWrapper.get(url);

      return referrals as ReferralPerformance;
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
  },
);

// export const loadPurchaseHistory = createAsyncThunk(
//   'cabinets/loadPurchaseHistory',
//   async (userId: string, { dispatch }) => {
//     const url = `${baseUrl}/v1/public/users/${userId}/purchases/history`;
//     try {
//       const response = await fetchWrapper.get(url);
//       return response;
//     } catch (e) {
//       dispatch(
//         addPopup({
//           key: 'purchaseHistory',
//           content: {
//             status: {
//               name: e.message,
//               isError: true,
//             },
//           },
//         }),
//       );
//       return Promise.reject(e);
//     }
//   },
// );

// export const loadReferralPurchaseHistory = createAsyncThunk(
//   'cabinets/loadReferralPurchaseHistory',
//   async (userId: string, { dispatch }) => {
//     const url = `${baseUrl}/v1/public/users/${userId}/referrals/purchases/history`;
//     try {
//       const response = await fetchWrapper.get(url);
//       return response;
//     } catch (e) {
//       dispatch(
//         addPopup({
//           key: 'refHistory',
//           content: {
//             status: {
//               name: e.message,
//               isError: true,
//             },
//           },
//         }),
//       );
//       return Promise.reject(e);
//     }
//   },
// );
export const loadBalance = createAsyncThunk(
  'cabinets/loadBalance',
  async (userId: string, { dispatch }) => {
    const url = `${baseUrl}/v1/public/users/${userId}/balances`;
    try {
      const response = await fetchWrapper.get(url);
      return response;
    } catch (e) {
      dispatch(
        addPopup({
          key: 'loadBalance',
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

// https://emiswap.emirex.co/v1/public/users/c35b1a1c-d38b-466c-b743-c4dea98d7d29/bonus_details/pool_bonus
export const loadPoolBonus = createAsyncThunk(
  'cabinets/loadPoolBonus',
  async (userId: string, { dispatch }) => {
    const url = `${baseUrl}/v1/public/users/${userId}/bonus_details/pool_bonus`;
    try {
      const response = await fetchWrapper.get(url);
      return response;
    } catch (e) {
      dispatch(
        addPopup({
          key: 'loadBonusDetails',
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

export const loadPoolBonus10X = createAsyncThunk(
  'cabinets/loadPoolBonus10X',
  async (userId: string, { dispatch }) => {
    const url = `${baseUrl}/v1/public/users/${userId}/bonus_details/pool_bonus_10x`;
    try {
      const response = await fetchWrapper.get(url);
      return response;
    } catch (e) {
      dispatch(
        addPopup({
          key: 'loadBonusDetails',
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
