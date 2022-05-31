import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadBalance } from './common';

export const loadAstarBalance = createAsyncThunk('loadAstarBalance', loadBalance);
