import { BigNumber } from 'ethers';
import { useESWContract } from './useContract';
import { useAuth } from './useAuth';
import { useLocalStorage } from './useLocalStorage';
import { useSelector } from 'react-redux';
import { AppState } from '../state';
import { useActiveWeb3React } from './index';

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
        if (token) {
          console.log('has token', nonce);

          return fetch(confirmClaimSignatureUrl, {
            headers: {
              'Content-Type': 'application/json',
              authorization: token,
            },
            method: 'POST',
            body: JSON.stringify({
              amount: amount.toString() + '000000000000000000',
              nonce: nonce.add(1).toNumber(),
              contract_address: ESW_ADDRESS,
              token_name: tokenName,
              userID: id,
              chainID: 'ETH_KV',
            }),
          }).then(res => res.json());
        }
        handleAuth();
        return Promise.resolve(undefined);
      });
    }
    return Promise.resolve(undefined);
  };
  return { claimCallback };
}
