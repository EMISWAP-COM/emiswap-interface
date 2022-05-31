import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadBalance } from './common';

export const loadAuroraBalance = createAsyncThunk('loadAuroraBalance', loadBalance);
