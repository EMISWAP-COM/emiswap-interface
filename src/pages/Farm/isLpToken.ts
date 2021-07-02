import { Token } from '@uniswap/sdk';

//FIXME Replace with check by Token mode
const isLpToken = (token: Token) => token && token.name.indexOf('-') !== -1;

export default isLpToken;
