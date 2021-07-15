import { createReducer } from '@reduxjs/toolkit';
import { loadFarms, loadUserFarms } from './actions';

interface IFarm {
  id: string;
  farmingPeriod: number;
  farmingFrequency: number;
  percentageRate: number;
  contractAddress: string;
  deposit?: string;
  reward?: string;
  balance?: string;
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
    .addCase(loadUserFarms.fulfilled, (state, action) => {
      const tmpFarms = [...state.farms];

      action.payload.data.forEach((item: any) => {
        const farmIndex = tmpFarms.findIndex((farm) => farm.id === item.id);
        tmpFarms[farmIndex] = {
          ...tmpFarms[farmIndex],
          reward: item.meta.rewardSum,
        }
      });

      return {
        ...state,
        loaded: true,
        farms: [...tmpFarms],
      };
    })
);
