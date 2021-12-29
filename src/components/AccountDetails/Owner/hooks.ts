import { useEffect, useMemo, useState } from 'react';
import { useActiveWeb3React } from '../../../hooks';
import { AppState } from '../../../state';
import { getCollectContract } from '../../../utils';
import { Contract } from '@ethersproject/contracts';
import { formatUnits, parseUnits } from '@ethersproject/units';
import { useAuth } from '../../../hooks/useAuth';
import { useSelector } from 'react-redux';
import { fetchWrapper } from '../../../api/fetchWrapper';
import { EMI_DELIVERY } from '../../../constants/emi/addresses';
import { format } from 'date-fns/fp';

const ESW_CLAIM_API = window['env'].REACT_APP_ESW_CLAIM_API;

export const useRequestCollect = (userInput: string, closeWindow: () => void) => {
  const { library, account, chainId } = useActiveWeb3React();
  const [title, changeTitle] = useState('Request');
  const [status, changeStatus] = useState('');
  const {
    available: { ESW: availableESW },
  } = useSelector((state: AppState) => state.cabinets.totalBalance);
  const contract: Contract | null = getCollectContract(library, account, chainId);
  const handleAuth = useAuth();
  const { id: userID } = useSelector((state: AppState) => state.user.info);
  const [maxAvailableForRequests, setMaxAvailableForRequests] = useState(0);

  useEffect(() => {
    contract.availableForRequests().then(max => {
      const formatedMax = formatUnits(max);
      setMaxAvailableForRequests(Number(formatedMax));
    });
  }, [contract]);

  const handler = () => {
    changeTitle('Pending');
    contract
      .getWalletNonce()
      .then(nonce => Number(nonce) + 1)
      .then(nonce =>
        handleAuth().then(token => {
          changeStatus('');
          if (parseFloat(userInput) <= 0 || Number.isNaN(parseFloat(userInput))) {
            changeStatus('Error input. The Request amount is not valid');
            changeTitle('Request');
            return Promise.resolve();
          }
          if (parseFloat(userInput) > maxAvailableForRequests) {
            changeStatus('Error input. The Request amount is too big');
            changeTitle('Request');
            return Promise.resolve();
          }
          const amount = parseUnits(userInput, 18).toString();
          fetchWrapper
            .post(ESW_CLAIM_API, {
              body: JSON.stringify({
                token_name: 'ESW',
                amount,
                contract_address: EMI_DELIVERY,
                nonce,
                // TODO: use from env
                blockchain_network: 'polygon_main',
                chainID: 'ETH_MN',
                userID,
              }),
              headers: { Authorization: token },
            })
            .catch(_ => {
              changeStatus(
                'Please wait for the previous request being processed. It usually takes less than two minutes',
              );
              changeTitle('Request');
            })
            .then(({ signature, id }) => {
              return contract
                .request(account, amount, nonce, `0x${signature}`)
                .then(transactionResult => [transactionResult, id]);
            })
            .catch(_ => {
              // TODO handle errors
              changeTitle('Request');
            })
            .then(([transactionResult, id]) => {
              const transactionStateEndPoint = `/v1/private/users/${userID}/transactions/${id}`;
              fetchWrapper.put(transactionStateEndPoint, {
                headers: {
                  authorization: token,
                },
                body: JSON.stringify({
                  state: 'sent',
                  transaction_hash: transactionResult.hash,
                }),
              });
              closeWindow();
              changeTitle('Request');
            })
            .catch(e => {
              // TODO error handling
            });
        }),
      );
  };

  return { handler, availableReqestCollect: availableESW, title, status, maxAvailableForRequests };
};

export type RemainderStatus =
  | { status: 'remaindTime'; value: string }
  | { status: 'disable'; value: string }
  | { status: 'enable'; value: string };

export const useGetRemainder = () => {
  const [state, changeState] = useState<RemainderStatus>({
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
            // const date = new Date(stringDate);
            // if (date < new Date()) {
            //   changeState({ status: 'enable', value: 'Collect' });
            // } else {
            changeState({
              value: stringDate,
              status: 'remaindTime',
            });
            // }
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

const timeFormating = format('k:mm:ss');
const formatDateing = format("do 'of' MMMM");

const toDate = bigNumberTimestamp => new Date(Number(bigNumberTimestamp) * 1000);

const formatTime = bigNumber => timeFormating(toDate(bigNumber));
const formatDate = bigNumber => formatDateing(toDate(bigNumber));

export const useCollectData = closeWindow => {
  const [state, changeState] = useState({
    requested: '',
    unlocked: '',
    avalible: '',
    currentTime: '',
    currentDay: '',
    nextTime: '',
    nextDay: '',
    nextValue: '',
    handler: () => {},
  });
  const { library, account, chainId } = useActiveWeb3React();
  const contract: Contract | null = useMemo(() => getCollectContract(library, account, chainId), [
    library,
    account,
    chainId,
  ]);

  useEffect(() => {
    Promise.all([
      contract.getRemainderOfRequests(),
      contract.getAvailableToClaim(),
      contract.getDatesStarts(),
      contract.claimDailyLimit(),
    ]).then(
      ([
        { remainderTotal, remainderPreparedForClaim },
        { available },
        { todayStart, tomorrowStart },
        claimLimit,
      ]) => {
        changeState({
          requested: formatUnits(remainderTotal, 18),
          unlocked: formatUnits(remainderPreparedForClaim, 18),
          avalible: formatUnits(available, 18),
          currentTime: formatTime(todayStart),
          currentDay: formatDate(todayStart),
          nextTime: formatTime(tomorrowStart),
          nextDay: formatDate(tomorrowStart),
          nextValue: formatUnits(claimLimit, 18),
          handler: () => {
            contract.claim().then(() => {
              closeWindow();
            });
          },
        });
      },
    );
  }, [contract, closeWindow]);

  return state;
};