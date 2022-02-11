import React, { useCallback, useEffect, useState } from 'react';
import AppBody from '../AppBody';
import { AutoColumn } from '../../components/Column';
import { ButtonLight } from '../../components/Button';
import { Wrapper } from '../../components/swap/styleds';
import ChainsSelect from './ChainSelect';
import { SwapPoolTabs, TabNames } from '../../components/NavigationTabs';
import { Confirmation } from './Confirmation';
import { Status } from './Status';
import { Complete } from './Complete';
import { useWalletModalToggle } from '../../state/application/hooks';
import { useActiveWeb3React } from '../../hooks';
import useFeesByRoute from './hooks/useFeesByRoute';
import useBuildTx from './hooks/useBuildTx';

import {
  BridgeState,
  selectFromToChains,
  fetchFromTokenList,
  fetchToTokenList,
  fetchQuote,
  selectFromToken,
  selectToToken,
  selectQuote,
  selectAmountFromToken,
  fetchSupportedChains,
} from './slice';
import { useAppSelector } from 'state/hooks';
import { useDispatch } from 'react-redux';
import FromTokenInput from './FromTokenInput';
import ToTokenInput from './ToTokenInput';
import Fee from './Fee';
import { fetchWrapper } from 'api/fetchWrapper';

async function sendTransaction(
  txData,
  signer,
  fromChainId,
  toChainId,
  bridgeName,
  updateNonce,
  status,
  setStep,
) {
  txData.map(async txItem => {
    const tx = await signer.sendTransaction(txItem);
    if (status === 'approve') {
      setStep({ name: 'confirm' });
    }
    if (status === 'move') {
      setStep({ name: 'status', params: { step: 0 } });
    }
    const receipt = await tx.wait();
    if (status === 'approve') {
      setStep({ name: 'form' });
    }
    if (status === 'move') {
      setStep({ name: 'status', params: { step: 1 } });
      const interval = setInterval(async () => {
        const { sourceTxStatus, destinationTxStatus } = await fetchWrapper.get(
          `https://watcherapi.fund.movr.network/api/v1/transaction-status?` +
            new URLSearchParams({
              transactionHash: receipt.transactionHash,
              fromChainId,
              toChainId,
              bridgeName,
            }),
        );
        console.log(sourceTxStatus, destinationTxStatus);
        setStep({
          name: 'status',
          params: {
            step: sourceTxStatus === 'PENDING' ? 2 : destinationTxStatus === 'PENDING' ? 3 : 4,
          },
        });
        if (destinationTxStatus === 'COMPLETED') {
          clearInterval(interval);
          setTimeout(() => {
            setStep({ name: 'complete' });
          }, 5000);
        }
      }, 2000);
    }
    updateNonce(x => x + 1);
  });
}

const getButtonTitle = (quote: BridgeState['quote'], status: string): string => {
  if (quote === 'loading') {
    return 'Loading quote...';
  } else if (quote === 'no-route') {
    return 'No routes available';
  } else if (quote === 'waiting') {
    return 'Please fill all fields';
  } else {
    if (status === 'approve') {
      return 'Approve transaction';
    }
    if (status === 'move') {
      return 'Send Transaction';
    }
    return 'Wait transaction data';
  }
};

const Bridge = () => {
  const [nonce, updateNonce] = useState(1);
  const { account, library } = useActiveWeb3React();

  const toggleWalletModal = useWalletModalToggle();

  const [step, setStep] = useState<{
    name: 'form' | 'confirm' | 'status' | 'complete';
    params?: any;
  }>({ name: 'form' });

  const { fromChain, toChain } = useAppSelector(selectFromToChains);
  const fromToken = useAppSelector(selectFromToken);
  const toToken = useAppSelector(selectToToken);
  const quotes = useAppSelector(selectQuote);
  const amount = useAppSelector(selectAmountFromToken);

  const dispatch = useDispatch();

  const { fees } = useFeesByRoute(typeof quotes !== 'string' ? quotes.routes[0] : null);
  const toAmount = typeof quotes !== 'string' ? quotes.routes[0]?.bridgeRoute?.outputAmount : null;
  const isApprovalRequired =
    typeof quotes !== 'string' ? quotes.routes[0]?.isApprovalRequired : false;
  const signer = library?.getSigner();

  useEffect(() => {
    if (fromToken && toToken && fromChain && toChain && amount) {
      dispatch(
        fetchQuote({
          fromAsset: fromToken.address,
          fromChainId: fromChain.chainId,
          toAsset: toToken.address,
          toChainId: toChain.chainId,
          amount,
          decimals: fromToken.decimals,
        }),
      );
    }
  }, [dispatch, fromToken, fromChain, toToken, toChain, amount]);

  useEffect(() => {
    dispatch(fetchFromTokenList({ fromChain, toChain }));
    dispatch(fetchToTokenList({ fromChain, toChain }));
  }, [dispatch, fromChain, toChain]);

  useEffect(() => {
    dispatch(fetchSupportedChains());
  }, [dispatch]);

  const { tx, status } = useBuildTx(
    fromToken?.address,
    fromChain?.chainId,
    toToken?.address,
    toChain?.chainId,
    amount,
    fromToken?.decimals,
    typeof quotes !== 'string' ? quotes.routes[0]?.routePath : null,
    toAmount,
    account,
    isApprovalRequired,
    typeof quotes !== 'string' ? quotes.routes[0]?.allowanceTarget : null,
    nonce,
  );

  const send = useCallback(() => {
    if (tx.length === 0) {
      return;
    }
    sendTransaction(
      tx,
      signer,
      fromChain.chainId,
      toChain.chainId,
      typeof quotes !== 'string' ? quotes.routes[0].bridgeRoute.bridgeName : null,
      updateNonce,
      status,
      setStep,
    );
  }, [tx, signer, fromChain, toChain, quotes]);

  const match = (value, obj) => obj[value] || null;

  if (step.name !== 'form')
    return (
      <AppBody>
        <SwapPoolTabs active={TabNames.BRIDGE} />
        <Wrapper>
          <AutoColumn gap={'md'}>
            {match(step.name, {
              confirm: <Confirmation {...step.params} />,
              status: <Status fromChain={fromChain} toChain={toChain} {...step.params} />,
              complete: (
                <Complete fromChain={fromChain} toChain={toChain} token={fromToken} fees={fees} />
              ),
            })}
          </AutoColumn>
        </Wrapper>
      </AppBody>
    );

  return (
    <AppBody>
      <SwapPoolTabs active={TabNames.BRIDGE} />
      <Wrapper>
        <AutoColumn gap={'md'}>
          <ChainsSelect />
          <FromTokenInput />
          <ToTokenInput />
          <Fee />
          {/* // TODO: remove this or refactor */}
          {/* <Flow fromChain={fromChain} toChain={toChain} token={token} /> */}
        </AutoColumn>
      </Wrapper>
      {account ? (
        <ButtonLight
          onClick={() => {
            send();
          }}
          disabled={!tx || typeof quotes === 'string'}
        >
          {getButtonTitle(quotes, status)}
        </ButtonLight>
      ) : (
        <ButtonLight onClick={toggleWalletModal}>Connect Wallet</ButtonLight>
      )}
    </AppBody>
  );
};
export default Bridge;
