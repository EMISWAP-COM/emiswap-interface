import { BigNumber } from '@ethersproject/bignumber';
import { useESWContract } from './useContract';
import { useAuth } from './useAuth';
import { useLocalStorage } from './useLocalStorage';
import { useSelector } from 'react-redux';
import { AppState } from '../state';
import { useActiveWeb3React } from './index';
import { parseUnits } from '@ethersproject/units';

const ESW_ADDRESS = window['env'].REACT_APP_ESW_ID;
const ESW_CLAIM_API = window['env'].REACT_APP_ESW_CLAIM_API;
const ESW_CLAIM_CHAIN_ID = window['env'].REACT_APP_ESW_CLAIM_CHAIN_ID;

export function useClaim() {
  const { id } = useSelector((state: AppState) => state.user.info);
  const contractESW = useESWContract();
  const { account } = useActiveWeb3React();

  const handleAuth = useAuth();

  const [{ token }] = useLocalStorage('auth_token', { token: null });

  const claimCallback = (tokenName: string, amount: number) => {
    console.log('contract', contractESW, token);
    if (contractESW) {
      return contractESW.walletNonce(account).then((nonce: BigNumber) => {
        console.log('has token', parseUnits(amount.toString(), 18).toString());

        return handleAuth().then((token: string) => {
          console.log('token', token);
          return fetch(ESW_CLAIM_API, {
            headers: {
              'Content-Type': 'application/json',
              authorization: token,
            },
            method: 'POST',
            body: JSON.stringify({
              amount: parseUnits(amount.toString(), 18).toString(),
              nonce: nonce.add(1).toNumber(),
              contract_address: ESW_ADDRESS,
              token_name: tokenName,
              userID: id,
              chainID: ESW_CLAIM_CHAIN_ID,
            }),
          }).then(res => res.json());
        });

        // }
        // handleAuth();
        // return Promise.resolve(undefined);
      });
    }
    return Promise.resolve(undefined);
  };
  return { claimCallback };
}
