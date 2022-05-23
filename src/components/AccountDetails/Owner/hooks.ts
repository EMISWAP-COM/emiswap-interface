import { useEffect, useMemo, useState } from 'react';
import { useActiveWeb3React, usePolygonWeb3React } from '../../../hooks';
import { AppState } from '../../../state';
import { getCollectContract } from '../../../utils';
import { Contract } from '@ethersproject/contracts';
import { formatUnits, parseUnits } from '@ethersproject/units';
import { useAuth } from '../../../hooks/useAuth';
import { useSelector } from 'react-redux';
import { fetchWrapper } from '../../../api/fetchWrapper';
import { format } from 'date-fns/fp';
import { useNetworkData } from '../../../hooks/Coins';
import { getNetworkUrl } from '../../../state/cabinets/action-polygon';

const ESW_CLAIM_API = window['env'].REACT_APP_ESW_CLAIM_API;
const ESW_CLAIM_CHAIN_ID = window['env'].REACT_APP_ESW_CLAIM_CHAIN_ID;
const EMI_DELIVERY = window['env'].REACT_APP_EMI_DELIVERY;

export const useRequestCollect = (userInput: string, closeWindow: () => void) => {
  const { library, account, chainId } = useActiveWeb3React();
  const [title, changeTitle] = useState('Request');
  const [status, changeStatus] = useState('');
  const [progress, changeProgress] = useState('init');
  const [txHash, changeTxHash] = useState('');
  const [requestedAmount, changeRequestedAmount] = useState('');
  const { value: network } = useNetworkData();
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
        handleAuth().then(async token => {
          changeStatus('');
          const isWrongInput =
            parseFloat(userInput) <= 0 ||
            Number.isNaN(parseFloat(userInput)) ||
            parseFloat(userInput) > maxAvailableForRequests;
          if (isWrongInput) {
            changeStatus('Error input. The Request amount is not valid');
            changeTitle('Request');
            return Promise.resolve();
          }
          const amount = parseUnits(userInput, 18).toString();
          let res;
          try {
            res = await fetchWrapper.post(ESW_CLAIM_API, {
              body: JSON.stringify({
                token_name: 'ESW',
                amount,
                contract_address: EMI_DELIVERY,
                nonce,
                // TODO: use from env
                blockchain_network: getNetworkUrl(network),
                chainID: ESW_CLAIM_CHAIN_ID,
                userID,
              }),
              headers: { Authorization: token },
            });
          } catch (e) {
            if (e?.payload?.error_message === 'withdrawal_amount_is_more_than_available') {
              changeStatus('Withdrawal amount is more than available');
            } else {
              changeStatus(
                'Please wait for the previous request being processed. It usually takes less than two minutes',
              );
            }
            changeTitle('Request');
            return;
          }
          changeRequestedAmount(userInput);
          contract
            .request(account, amount, nonce, `0x${res.signature}`)
            .then(transactionResult => {
              if (!transactionResult) {
                throw new Error('');
              }
              changeTxHash(transactionResult.hash);
              return transactionResult.wait();
            })
            .catch(_ => {
              changeStatus('fail');
            })
            .then(transactionResult => {
              if (!transactionResult) {
                throw new Error('');
              }
              if (transactionResult.status === 0) {
                changeStatus('fail');
                return;
              }
              const transactionStateEndPoint = `/v1/private/users/${userID}/transactions/${res.id}`;
              fetchWrapper.put(transactionStateEndPoint, {
                headers: {
                  authorization: token,
                },
                body: JSON.stringify({
                  state: 'sent',
                  transaction_hash: transactionResult.hash,
                }),
              });
              changeProgress('success');
              closeWindow();
            })
            .catch(() => {
              changeStatus('fail');
            })
            .finally(() => {
              changeTitle('Request');
              changeProgress('init');
            });
        }),
      );
  };

  return {
    handler,
    availableReqestCollect: availableESW,
    title,
    status,
    progress,
    maxAvailableForRequests,
    txHash,
    requestedAmount,
  };
};

const toDate = bigNumberTimestamp => new Date(Number(bigNumberTimestamp) * 1000);
const formatTomorrow = format('RRRR-MM-dd');

export type RemainderStatus =
  | { status: 'remaindTime'; value: string }
  | { status: 'disable'; value: string }
  | { status: 'enable'; value: string }
  | { status: 'progress'; value: string };

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
      changeState({ status: 'progress', value: 'Collect' });
      if (result.available > 0) {
        changeState({ status: 'enable', value: 'Collect' });
      } else {
        contract
          .getRemainderOfRequests()
          .then(result => {
            if (result.remainderTotal > 0) {
              const numberDate = Number(result.veryFirstRequestDate).toString();
              const stringDate = `${numberDate.slice(0, 4)}-${numberDate.slice(
                4,
                6,
              )}-${numberDate.slice(6, 8)}`;
              const date = new Date(stringDate);
              if (date < new Date()) {
                contract.getDatesStarts().then(({ tomorrowStart }) => {
                  const tomorrow = formatTomorrow(toDate(tomorrowStart));
                  changeState({ status: 'remaindTime', value: tomorrow });
                });
              } else {
              }
            } else {
              changeState({
                value: 'Collect to my wallet',
                status: 'disable',
              });
            }
          })
          .catch(() => {
            changeState({
              value: 'Collect to my wallet',
              status: 'disable',
            });
          });
      }
    });
  }, [contract]);
  return state;
};

const timeFormating = format('k:mm:ss');
const formatDateing = format("do 'of' MMMM");
const formatDateShortMonth = format("do 'of' MMM");

const toDateFromContract = str => {
  const stringStr = String(str);
  const year = stringStr.substring(0, 4);
  const month = stringStr.substring(4, 6);
  const day = stringStr.slice(6);
  return new Date(`${year}.${month}.${day}`);
};

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
    veryFirstRequestDate: '',
    handler: () => {},
  });
  const { library, account, chainId } = useActiveWeb3React();
  const {
    library: polygonLibrary,
    account: polygonAccount,
    chainId: polygonChainId,
  } = usePolygonWeb3React();
  const [txHash, changeTxHash] = useState('');
  const [progress, changeProgress] = useState('init');
  const contract: Contract | null = useMemo(() => getCollectContract(library, account, chainId), [
    library,
    account,
    chainId,
  ]);
  const polygonContract: Contract | null = useMemo(
    () => getCollectContract(polygonLibrary, polygonAccount, chainId),
    [polygonLibrary, polygonAccount, polygonChainId],
  );

  useEffect(() => {
    polygonContract
      .getRemainderOfRequestsbyWallet(account)
      .then(({ remainderTotal, remainderPreparedForClaim, veryFirstRequestDate }) => {
        changeState({
          ...state,
          requested: formatUnits(remainderTotal, 18),
          unlocked: formatUnits(remainderPreparedForClaim, 18),
          veryFirstRequestDate: formatDateShortMonth(toDateFromContract(veryFirstRequestDate)),
        });
      });
  }, [polygonContract.address]);

  useEffect(() => {
    Promise.all([
      contract.getAvailableToClaim(),
      contract.getDatesStarts(),
      contract.claimDailyLimit(),
    ]).then(([{ available }, { todayStart, tomorrowStart }, claimLimit]) => {
      changeState({
        ...state,
        avalible: formatUnits(available, 18),
        currentTime: formatTime(todayStart),
        currentDay: formatDate(todayStart),
        nextTime: formatTime(tomorrowStart),
        nextDay: formatDate(tomorrowStart),
        nextValue: formatUnits(claimLimit, 18),
        handler: () => {
          changeProgress('pending');
          contract
            .claim()
            .then(transactionResult => {
              if (!transactionResult) {
                throw new Error('');
              }
              changeTxHash(transactionResult.hash);
              return transactionResult.wait();
            })
            .catch(_ => {
              // TODO handle errors
            })
            .then(transactionResult => {
              if (!transactionResult) {
                throw new Error('');
              }
              changeProgress('success');
            })
            .finally(() => {
              closeWindow();
              changeProgress('init');
            });
        },
      });
    });
  }, [contract, closeWindow]);

  return Object.assign({ progress, txHash }, state);
};
