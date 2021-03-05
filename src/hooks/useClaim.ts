import { BigNumber } from 'ethers';
import { useESWContract } from './useContract';
import { useAuth } from './useAuth';
import { useLocalStorage } from './useLocalStorage';

export const MOCK_USER = 'c98052fa-99ff-479c-8a8a-19d32acdbbf8';
const ESW_ADDRESS = window['env'].REACT_APP_ESW_ID;

export function useClaim() {
  const contractESW = useESWContract();
  // todo поменять с моков
  // const { id } = useSelector((state: AppState) => state.user.info);
  const handleAuth = useAuth();
  const [{ token }] = useLocalStorage('auth_token', { token: null });

  const claimCallback = (tokenName: string, amount: number) => {
    if (contractESW) {
      contractESW.getWalletNonce().then((nonce: BigNumber) => {
        if (token) {
          return fetch(
            `https://emiswap-oracle-development.emirex.co/v1/private/users/${MOCK_USER}/transactions`,
            {
              headers: {
                'Content-Type': 'application/json',
                authorization: token,
              },
              method: 'POST',
              body: JSON.stringify({
                amount,
                nonce: nonce.add(1).toNumber(),
                contract_address: ESW_ADDRESS,
                token_name: tokenName,
              }),
            },
          ).then(res => res.json());
        }
        handleAuth();
        return Promise.resolve(undefined);
      });
    }
    return Promise.resolve(undefined);
  };
  return { claimCallback };
}
