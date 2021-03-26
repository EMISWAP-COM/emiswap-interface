import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../state';
import { useActiveWeb3React } from './index';
import Web3 from 'web3';
import { useLocalStorage } from './useLocalStorage';
// import { MOCK_USER } from './useClaim';
import { useCallback } from 'react';
import { fetchWrapper } from '../api/fetchWrapper';
import { addPopup } from '../state/application/actions';

const baseUrl = window['env']?.REACT_APP_PUBLIC_URL;
// 'https://emiswap-oracle-development.emirex.co';

export function useAuth() {
  const user = useSelector((state: AppState) => state.user);
  const id = user?.info?.id;
  const { library, account } = useActiveWeb3React();
  const [authToken, setAuthToken] = useLocalStorage('auth_token', null);
  const dispatch = useDispatch();
  const initSession = useCallback(
    async (userID: string) => {
      try {
        return await fetchWrapper.post(`${baseUrl}/v1/public/sessions`, {
          body: JSON.stringify({ user_id: userID }),
        });
      } catch (e) {
        dispatch(
          addPopup({
            key: 'useAuth_sessions',
            content: {
              status: {
                name: e.message,
                isError: true,
              },
            },
          }),
        );
        return Promise.reject(e);
      }
    },
    [dispatch],
  );

  const signSession = useCallback(
    async (sessionID: string, signature: string) => {
      try {
        return await fetchWrapper.post(`${baseUrl}/v1/public/sessions/confirm`, {
          body: JSON.stringify({
            id: sessionID,
            signature,
          }),
        });
      } catch (e) {
        dispatch(
          addPopup({
            key: 'useAuth_sign_session',
            content: {
              status: {
                name: e.message,
                isError: true,
              },
            },
          }),
        );
        return Promise.reject(e);
      }
    },
    [dispatch],
  );

  const signToMetamask = useCallback(
    async (signature: string, walletID: string) => {
      const instance = new Web3(library!.provider as any);
      return instance.eth.personal.sign(signature, walletID, '');
    },
    [library],
  );

  const init = useCallback(async () => {
    if (authToken) {
      const isExpired = (Date.now() - authToken.time) / (1000 * 3600) > 12;
      if (!isExpired) {
        return authToken.token;
      }
    }
    if (account && id) {
      try {
        const session = await initSession(id);
        const signature = await signToMetamask(session.auth_message, account);
        const sessionToken = await signSession(session.session_id, signature);
        setAuthToken({ time: Date.now(), token: sessionToken.token });
        return sessionToken.token;
      } catch (e) {
        dispatch(
          addPopup({
            key: 'useAuth_init',
            content: {
              status: {
                name: e.message,
                isError: true,
              },
            },
          }),
        );
        return Promise.reject(e);
      }
    }
  }, [authToken, account, id, setAuthToken, signToMetamask, dispatch, initSession, signSession]);

  return init;
}
