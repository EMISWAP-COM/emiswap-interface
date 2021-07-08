import FARMING_ABI from './Farming.json';

// @ts-ignore
const FARMING_ADDRESSES: string[] = window['env'].FARMING_ADDRESSES || [];

export { FARMING_ADDRESSES, FARMING_ABI };
