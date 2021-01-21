import { createReducer } from '@reduxjs/toolkit';
import { loadPerformance } from './actions'

interface CabinetState {
  performance: any
}

const initialState: CabinetState = {
  performance: null
}

export default createReducer(initialState, builder =>
  builder
    .addCase(loadPerformance.fulfilled, (state, action) => {
      return {
        ...state,
        performance: action.payload,
      };
    })

)
