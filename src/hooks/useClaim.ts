import { useESWContract } from './useContract';
import { useAuth } from './useAuth';
import { useSelector } from 'react-redux';
import { AppState } from '../state';
import { useActiveWeb3React } from './index';
import { parseUnits } from '@ethersproject/units';
import { fetchWrapper } from '../api/fetchWrapper';

const ESW_ADDRESS = window['env' as keyof Window].REACT_APP_ESW_ID;
const ESW_CLAIM_API = window['env' as keyof Window].REACT_APP_ESW_CLAIM_API;
const ESW_CLAIM_CHAIN_ID = window['env' as keyof Window].REACT_APP_ESW_CLAIM_CHAIN_ID;

export function useClaim() {
  const { id } = useSelector((state: AppState) => state.user.info);
  const contractESW = useESWContract();
  const { account } = useActiveWeb3React();

  const handleAuth = useAuth();

  const claimCallback = async (tokenName: string, amount: number) => {
    if (contractESW) {
      const nonce = await contractESW.walletNonce(account);
      const token = await handleAuth();

      return fetchWrapper.post(ESW_CLAIM_API, {
        headers: {
          authorization: token,
        },
        body: JSON.stringify({
          amount: parseUnits(amount.toString(), 18).toString(),
          nonce: nonce.add(1).toNumber(),
          contract_address: ESW_ADDRESS,
          token_name: tokenName,
          userID: id,
          chainID: ESW_CLAIM_CHAIN_ID,
        }),
      });
    }
  };
  return { claimCallback };
}
