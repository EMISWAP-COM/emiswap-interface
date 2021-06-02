import ESW_ABI from './esw.json';

const ESW_ADDRESS = window['env' as keyof Window].REACT_APP_ESW_ID || '';

export { ESW_ADDRESS, ESW_ABI };
