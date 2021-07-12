import FARMING_2_ABI from './Farming2.json';
import getFarmingAddresses from '../../pages/Farm/getFarming2Addresses';

// @ts-ignore
const FARMING_2_ADDRESSES: string[] = getFarmingAddresses();

export { FARMING_2_ADDRESSES, FARMING_2_ABI };
