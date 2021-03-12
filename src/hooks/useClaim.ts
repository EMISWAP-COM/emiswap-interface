import { BigNumber } from '@ethersproject/bignumber';
import { useESWContract } from './useContract';
import { useAuth } from './useAuth';
import { useLocalStorage } from './useLocalStorage';
import { useSelector } from 'react-redux';
import { AppState } from '../state';
import { useActiveWeb3React } from './index';
import { parseUnits } from '@ethersproject/units';

export const MOCK_USER = 'c98052fa-99ff-479c-8a8a-19d32acdbbf8';
const ESW_ADDRESS = window['env'].REACT_APP_ESW_ID;

const confirmClaimSignatureUrl = 'https://us-central1-emirex-preprod.cloudfunctions.net/sign_trans';

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
        // if (token) {
        // console.log('has token', BigNumber.from(amount).mul(BigNumber.from('1000000000000000000')), Number(amount) * 1000000000000000000);
        console.log('has token', parseUnits(amount.toString(), 18).toString());

        // BigNumber.from(amount).mul(BigNumber.from('1000000000000000000')), Number(amount) * 1000000000000000000);

        return handleAuth().then((token: string) => {
          console.log('token', token);
          return fetch(confirmClaimSignatureUrl, {
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
              chainID: 'ETH_KV',
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
