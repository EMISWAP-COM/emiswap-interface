import FARMING_ABI from './Farming.json';
import getFarmingAddresses from '../../pages/Farm/getFarmingAddresses';

// @ts-ignore
const FARMING_ADDRESSES: string[] = getFarmingAddresses();

export { FARMING_ADDRESSES, FARMING_ABI };
