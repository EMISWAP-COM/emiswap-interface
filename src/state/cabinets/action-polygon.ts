import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadBalance } from './common';

export const loadPolygonBalance = createAsyncThunk('loadPolygonBalance', loadBalance);
