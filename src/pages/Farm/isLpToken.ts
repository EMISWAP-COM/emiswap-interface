import { Token } from '@uniswap/sdk';

const isLpToken = (token: Token) => token && token.name.indexOf('-') !== -1;

export default isLpToken;
