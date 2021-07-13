import { createReducer } from '@reduxjs/toolkit';
import { loadFarms } from './actions';

interface IFarm {
  id: string;
  farmingPeriod: number;
  farmingFrequency: number;
  percentageRate: number;
  contractAddress: string;
}

export interface LaunchpadState {
  loaded: boolean;
  errors: any;
  farms: IFarm[];
}

const initialState: LaunchpadState = {
  loaded: false,
  errors: {},
  farms: [],
};

export default createReducer<LaunchpadState>(initialState, builder =>
  builder
    .addCase(loadFarms.fulfilled, (state, action) => {
      const farms: IFarm[] = action.payload.data.map((farm: any) => {
        const contractDataId = farm.relationships.contract.data.id;
        const contractAddress = action.payload.included.find((inc: any) => inc.id === contractDataId).attributes.address;

        return ({
          id: farm.id,
          farmingPeriod: farm.attributes.farmingPeriod,
          farmingFrequency: farm.attributes.farmingFrequency,
          percentageRate: farm.attributes.percentageRate,
          contractAddress: contractAddress,
        });
      });

      return {
        ...state,
        loaded: true,
        farms: farms,
      };
    })
    .addCase(loadFarms.rejected, (state, action) => {
      return {
        ...state,
        loaded: true,
        errors: action.payload || { unknown: 'Unknown error' },
      };
    })
);
