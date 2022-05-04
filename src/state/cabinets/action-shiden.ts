import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadBalance } from './common';

// export const loadPolygonBalance = createAction('loadPolygonBalance');

export const loadShidenBalance = createAsyncThunk('loadShidenBalance', loadBalance);
