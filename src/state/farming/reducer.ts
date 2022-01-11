import { createReducer } from '@reduxjs/toolkit';
import { loadFarms, loadUserFarms, loadUserFarmsForLK } from './actions';

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

export interface FarmState {
  loaded: boolean;
  errors: any;
  farms: IFarm[];
  stakes: any[];
}

const initialState: FarmState = {
  loaded: false,
  errors: {},
  farms: [],
  stakes: [],
};

export default createReducer<FarmState>(initialState, builder =>
  builder
    .addCase(loadFarms.fulfilled, (state, action) => {
      const farms: IFarm[] = action.payload.data.map((farm: any) => {
        const contractDataId = farm.relationships.contract.data.id;
        const contractAddress = action.payload.included.find(
          (inc: any) => inc.id === contractDataId,
        ).attributes.address;

        return {
          id: farm.id,
          farmingPeriod: farm.attributes.farmingPeriod,
          farmingFrequency: farm.attributes.farmingFrequency,
          percentageRate: farm.attributes.percentageRate,
          contractAddress: contractAddress,
        };
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
        const farmIndex = tmpFarms.findIndex(farm => farm.id === item.id);
        tmpFarms[farmIndex] = {
          ...tmpFarms[farmIndex],
          reward: item.meta.rewardSum,
        };
      });

      return {
        ...state,
        loaded: true,
        farms: [...tmpFarms],
      };
    })
    .addCase(loadUserFarmsForLK.fulfilled, (state, action) => {
      const includedStakes = [...(action.payload.included || [])];

      return {
        ...state,
        loaded: true,
        stakes: includedStakes.map(stake => {
          const farm = action.payload.data.find((item: any) => {
            return item.relationships.stakingUserFarms.data.some(
              (farm: any) => farm.id === stake.id,
            );
          });

          const farmFromStore = state.farms.find(searchedFarm => searchedFarm.id === farm.id);

          return {
            id: stake.id,
            stakedAmount: stake.attributes.amount,
            contractAddress: farmFromStore?.contractAddress,
            percentageRate: farmFromStore?.percentageRate,
            reward: stake.attributes.reward,
            startDate: stake.attributes.startedAt,
            endDate: stake.attributes.finishedAt,
          };
        }),
      };
    }),
);
