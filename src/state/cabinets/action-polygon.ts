import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadBalance } from './common';

// export const loadPolygonBalance = createAction('loadPolygonBalance');

export const loadPolygonBalance = createAsyncThunk('loadPolygonBalance', loadBalance);
