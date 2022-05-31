import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { load, save } from 'redux-localstorage-simple';

import application from './application/reducer';
import user from './user/reducer';
import transactions from './transactions/reducer';
import swap from './swap/reducer';
import mint from './mint/reducer';
import lists from './lists/reducer';
import burn from './burn/reducer';
import multicall from './multicall/reducer';
import invest from './invest/reducer';
import cabinets from './cabinets/reducer';
import stats from './stats/reducer';
import launchpad from './launchpad/reducer';
import farming from './farming/reducer';
import polygonCabinet from './cabinets/polygon-cabinet';
import shidenCabinet from './cabinets/shiden-cabinet';
import auroraCabinet from './cabinets/aurora-cabinet';
import astarCabinet from './cabinets/astar-cabinet';
import bridge from '../pages/Bridge/slice';
import { apiSlice } from '../pages/Bridge/api';

import { updateVersion } from './user/actions';

const PERSISTED_KEYS: string[] = ['lists', 'invest'];

const store = configureStore({
  reducer: {
    application,
    user,
    transactions,
    swap,
    mint,
    burn,
    multicall,
    lists,
    invest,
    cabinets,
    stats,
    launchpad,
    farming,
    polygonCabinet,
    shidenCabinet,
    auroraCabinet,
    astarCabinet,
    bridge,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: [
    ...getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware),
    save({ states: PERSISTED_KEYS }),
  ],
  preloadedState: load({ states: PERSISTED_KEYS }),
});

store.dispatch(updateVersion());

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
