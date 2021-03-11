import { useSelector } from 'react-redux';
import { AppState } from '../state';
import { useActiveWeb3React } from './index';
import Web3 from 'web3';
import { useLocalStorage } from './useLocalStorage';
// import { MOCK_USER } from './useClaim';
import { useCallback } from 'react';

const baseUrl = window['env']?.REACT_APP_PUBLIC_URL;
// 'https://emiswap-oracle-development.emirex.co';

export function useAuth() {
  const { id } = useSelector((state: AppState) => state.user.info);
  const { library, account } = useActiveWeb3React();
  const [auth, setAuth] = useLocalStorage('auth_token', null);
  const initSession = async (userID: string) => {
    return await fetch(`${baseUrl}/v1/public/sessions`, {
      method: 'POST',
      body: JSON.stringify({ user_id: userID }),
    }).then(res => res.json());
  };

  const signSession = async (sessionID: string, signature: string) => {
    return await fetch(`${baseUrl}/v1/public/sessions/confirm`, {
      method: 'POST',
      body: JSON.stringify({
        id: sessionID,
        signature,
      }),
    }).then(res => res.json());
  };

  const signToMetamask = useCallback(
    async (signature: string, walletID: string) => {
      const instance = new Web3(library!.provider as any);
      return instance.eth.personal.sign(signature, walletID, '');
    },
    [library],
  );

  const init = useCallback(async () => {
    if (auth) {
      const isExpired = (Date.now() - auth.time) / (1000 * 3600) > 12;
      if (!isExpired) {
        return;
      }
    }
    if (account && id) {
      const session = await initSession(id);
      const signature = await signToMetamask(session.auth_message, account);
      const sessionToken = await signSession(session.session_id, signature);
      setAuth({ time: Date.now(), token: sessionToken.token });
    }
  }, [auth, account, id, setAuth, signToMetamask]);

  return init;
}
