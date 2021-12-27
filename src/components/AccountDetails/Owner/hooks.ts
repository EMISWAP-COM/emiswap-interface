import { useEffect, useMemo, useState } from 'react';
import { useActiveWeb3React } from '../../../hooks';
import { AppState } from '../../../state';
import { getCollectContract } from '../../../utils';
import { Contract } from '@ethersproject/contracts';
import { parseUnits } from '@ethersproject/units';
// import { useAuth } from '../../../hooks/useAuth';
import { useSelector } from 'react-redux';
// import { fetchWrapper } from '../../../api/fetchWrapper';
// import { EMI_DELIVERY } from '../../../constants/emi/addresses';

// const ESW_CLAIM_API = window['env'].REACT_APP_ESW_CLAIM_API;
const randomSignature =
  'eed2d9de70b25f4de060d41ad1aa894bb78920d6668d67695b592a89d3261275108ded542513ee4073119d9d809b363d00ecded1801e71927c6ba93b28e2d58e1b';

export const useRequestCollect = (userInput: string, closeWindow: () => void) => {
  const { library, account, chainId } = useActiveWeb3React();
  const [isValidInput, changeIsValidInput] = useState(true);
  const {
    available: { ESW: availableESW },
  } = useSelector((state: AppState) => state.cabinets.totalBalance);
  const contract: Contract | null = getCollectContract(library, account, chainId);

  try {
    parseUnits(userInput, 18).toString();
  } catch {
    if (isValidInput === true) {
      changeIsValidInput(false);
    }
    return { isValidInput };
  }
  const amount = parseUnits(userInput, 18).toString();
  // const handleAuth = useAuth();
  // const [availableContact, setAvailableContact] = useState<string>('null');
  // const { id: userID } = useSelector((state: AppState) => state.user.info);

  const handler = () => {
    contract
      .getWalletNonce()
      .then(nonce => nonce + 1)
      .then(nonce => {
        return contract.requestUnsigned(account, amount, nonce, `0x${randomSignature}`).then(() => {
          closeWindow();
        });

        // start TODO revert then sign server work correct
        // return handleAuth().then(token => {
        //   fetchWrapper
        //     .post(ESW_CLAIM_API, {
        //       body: JSON.stringify({
        //         token_name: 'ESW',
        //         amount,
        //         contract_address: EMI_DELIVERY,
        //         nonce,
        //         // TODO: use from env
        //         blockchain_network: 'polygon_test',
        //         chainID: 'ETH_KV',
        //         userID,
        //       }),
        //       headers: { Authorization: token },
        //     })
        //     .then(({ signature }) => {
        //       return contract.request(account, amount, nonce, `0x${signature}`);
        //     });
        // });
        // end TODO revert then sign server work correct

        // start TODO request PUT
        // .then(transactionResult => {
        //   const transactionStateEndPoint = `${baseUrl}/v1/private/users/${userID}/transactions/${id}`;
        //   fetchWrapper.put(transactionStateEndPoint, {
        //     headers: {
        //       authorization: authToken,
        //     },
        //     body: JSON.stringify(transactionResult),
        //   });
        // });
        // end TODO request PUT
      });
  };

  return { handler, availableReqestCollect: availableESW, isValidInput };
};

type ButtonStatus =
  | { status: 'remaindTime'; value: string }
  | { status: 'disable'; value: string }
  | { status: 'enable'; value: string };

export const useGetRemainder = () => {
  const [state, changeState] = useState<ButtonStatus>({
    status: 'disable',
    value: 'Collect to my wallet',
  });
  const { library, account, chainId } = useActiveWeb3React();
  const contract: Contract | null = useMemo(() => getCollectContract(library, account, chainId), [
    library,
    account,
    chainId,
  ]);

  useEffect(() => {
    contract.getAvailableToClaim().then(result => {
      if (result.available > 0) {
        changeState({ status: 'enable', value: 'Collect' });
      } else {
        contract.getRemainderOfRequests().then(result => {
          if (result.remainderTotal > 0) {
            const numberDate = Number(result.veryFirstRequestDate).toString();
            const stringDate = `${numberDate.slice(0, 4)}-${numberDate.slice(
              4,
              6,
            )}-${numberDate.slice(6, 8)}`;
            const date = new Date(stringDate);
            if (date < new Date()) {
              changeState({ status: 'enable', value: 'Collect' });
            } else {
              changeState({
                value: stringDate,
                status: 'remaindTime',
              });
            }
          } else {
            changeState({
              value: 'Collect to my wallet',
              status: 'disable',
            });
          }
        });
      }
    });
  }, [contract]);
  return state;
};
