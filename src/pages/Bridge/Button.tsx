import React, { useCallback, useState } from 'react';
import { ButtonLight } from 'components/Button';
import { useWalletModalToggle } from '../../state/application/hooks';
import { useActiveWeb3React, useSwitchNetwork } from '../../hooks';
import { fetchWrapper } from 'api/fetchWrapper';
import { INetworkItem, networksItems } from '../../constants';
import useBuildTx from './hooks/useBuildTx';
import { selectFromToChains, selectFromToken, selectToToken, selectAmountFromToken } from './slice';
import { useAppSelector } from 'state/hooks';
import { Quote } from './types';
import { useQuoteData } from './hooks/useQuoteData';

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
        const {
          result: { sourceTxStatus, destinationTxStatus },
        } = await fetchWrapper.get(
          `https://watcherapi.fund.movr.network/api/v1/transaction-status?` +
            new URLSearchParams({
              transactionHash: receipt.transactionHash,
              fromChainId,
              toChainId,
              bridgeName,
            }),
        );
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
            setTimeout(() => {
              setStep({ name: 'form' });
            }, 10000);
          }, 5000);
        }
      }, 2000);
    }
    updateNonce(x => x + 1);
  });
}

const getButtonTitle = (
  isFetching: boolean,
  isError: boolean,
  quote: Quote,
  status: string,
): { buttonTitle: string; buttonActive: boolean } => {
  if (isFetching) {
    return { buttonTitle: 'Loading quote...', buttonActive: false };
  } else if (quote?.routes.length === 0) {
    return { buttonTitle: 'No routes available', buttonActive: false };
  } else if (isError) {
    return { buttonTitle: 'Please fill all fields', buttonActive: false };
  } else {
    if (status === 'approve') {
      return { buttonTitle: 'Approve transaction', buttonActive: true };
    }
    if (status === 'move') {
      return { buttonTitle: 'Send Transaction', buttonActive: true };
    }
    return { buttonTitle: 'Wait transaction data...', buttonActive: false };
  }
};

const Button = ({ setStep }) => {
  const [nonce, updateNonce] = useState(1);
  const { account, library, chainId } = useActiveWeb3React();
  const toggleWalletModal = useWalletModalToggle();
  const { fromChain, toChain } = useAppSelector(selectFromToChains);
  const fromToken = useAppSelector(selectFromToken);
  const toToken = useAppSelector(selectToToken);
  const { switchNetwork } = useSwitchNetwork();

  const amount = useAppSelector(selectAmountFromToken);
  const { isSuccess, isFetching, isError, quotes } = useQuoteData();
  const toAmount = isSuccess ? quotes.routes[0]?.bridgeRoute?.outputAmount : null;
  const isApprovalRequired = isSuccess ? quotes.routes[0]?.isApprovalRequired : false;
  const signer = library?.getSigner();

  const { tx, status } = useBuildTx(
    fromToken?.address,
    fromChain?.chainId,
    toToken?.address,
    toChain?.chainId,
    amount,
    fromToken?.decimals,
    isSuccess ? quotes.routes[0]?.routePath : null,
    toAmount,
    account,
    isApprovalRequired,
    isSuccess ? quotes.routes[0]?.allowanceTarget : null,
    nonce,
  );

  const switchChain = async () => {
    if (fromChain?.chainId === chainId) {
      return;
    }
    const targetChain = networksItems.filter(network => network.chainId === fromChain?.chainId)
    await switchNetwork(targetChain[0]);
  }

  const send = useCallback(() => {
    if (tx.length === 0) {
      return;
    }
    sendTransaction(
      tx,
      signer,
      fromChain.chainId,
      toChain.chainId,
      isSuccess ? quotes.routes[0].bridgeRoute.bridgeName : null,
      updateNonce,
      status,
      setStep,
    );
  }, [tx, signer, fromChain, toChain, quotes]);

  const { buttonTitle, buttonActive } = getButtonTitle(isFetching, isError, quotes, status);
  const isActualChain = fromChain?.chainId === chainId;

  if (!isActualChain) {
    return <ButtonLight onClick={switchChain}>Switch to {fromChain?.name} chain</ButtonLight>;
  }
  return account ? (
    <ButtonLight
      onClick={() => {
        send();
      }}
      disabled={!buttonActive}
    >
      {buttonTitle}
    </ButtonLight>
  ) : (
    <ButtonLight onClick={toggleWalletModal}>Connect Wallet</ButtonLight>
  );
};

export default Button;
