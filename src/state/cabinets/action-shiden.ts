import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadBalance } from './common';

export const loadShidenBalance = createAsyncThunk('loadShidenBalance', loadBalance);
