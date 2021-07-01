import { Token } from '@uniswap/sdk';

const isLpToken = (token: Token) => token && token.symbol.indexOf('-') !== -1;

export default isLpToken;
