import { Token, TokenAmount } from '@uniswap/sdk';
import { useMemo } from 'react';

import { useTokenContract } from '../hooks/useContract';
import { useSingleCallResult } from '../state/multicall/hooks';

export function useTokenAllowance(
  token?: Token,
  owner?: string,
  spender?: string,
): TokenAmount | undefined {
  const contract = useTokenContract(token?.address, false);
console.log(`==========>contract`, contract)
  const inputs = useMemo(() => [owner, spender], [owner, spender]);
  const allowance = useSingleCallResult(contract, 'allowance', inputs).result;
console.log(`==========>inputs`, inputs)
  console.log(`==========>allowance12312`, allowance)
  return useMemo(
    () => (token && allowance ? new TokenAmount(token, allowance.toString()) : undefined),
    [token, allowance],
  );
}
