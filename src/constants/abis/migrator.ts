import MIGRATOR_ABI from './migrator.json';

const MIGRATOR_ADDRESS = window['env' as keyof Window].REACT_APP_MIGRATOR_ADDRESS || '';

export { MIGRATOR_ADDRESS, MIGRATOR_ABI };
