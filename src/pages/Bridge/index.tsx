import React, { useCallback, useEffect, useState } from 'react';
import ethers from 'ethers';
import customMovr from './movr';
import AppBody from '../AppBody';
import { AutoColumn } from '../../components/Column';
import { ButtonLight } from '../../components/Button';
import { Token as UniSwapToken } from '@uniswap/sdk';
import { Wrapper } from '../../components/swap/styleds';
import TokenInput from './TokenInput';
import ChainsSelect from './ChainsSelect';
import { SwapPoolTabs, TabNames } from '../../components/NavigationTabs';
import { Flow } from './Flow';
import { Confirmation } from './Confirmation';
import { Status } from './Status';
import { Complete } from './Complete';
import { useTranslation } from 'react-i18next';
import { useTokenBalances } from '../../state/wallet/hooks';
import { useWalletModalToggle } from '../../state/application/hooks';
import { useActiveWeb3React } from '../../hooks';
import useRouteByChains from './hooks/useRouteByChains';
import useFeesByRoute from './hooks/useFeesByRoute';
import useDefaultChains from './hooks/useDefaultChains';
import useTokensByChain from './hooks/useTokensByChain';

import * as S from './styled';

const Bridge = () => {
  const { account, chainId, library } = useActiveWeb3React();

  const toggleWalletModal = useWalletModalToggle();

  const [step, setStep] = useState<{
    name: 'form' | 'confirm' | 'status' | 'complete';
    params?: any;
  }>({ name: 'form' });

  const { allChains } = useDefaultChains();
  const [fromChain, setFromChain] = useState<any | null>(null);
  const [toChain, setToChain] = useState<any | null>(null);
  const tokens = useTokensByChain(fromChain, toChain);
  const [token, setToken] = useState<UniSwapToken | null>(null);
  const [amount, onAmountInput] = useState(2);
  const { route } = useRouteByChains(fromChain, toChain, token, amount);
  const { fees } = useFeesByRoute(route);
  const balances = useTokenBalances(account, tokens); // Preloading balances

  // console.log('allChains', allChains);
  // console.log('tokens', tokens);

  useEffect(() => {
    setFromChain(allChains[4] || null);
    setToChain(allChains[3] || null);
  }, [allChains]);

  useEffect(() => {
    setToken(tokens[0] || null);
  }, [tokens]);

  const send = useCallback(async () => {
    if (!token || !route) {
      return;
    }

    const onTransactionStart = () => {};

    const beforeAllowance = () => {
      setStep({ name: 'confirm', params: 1 });
    };
    const afterAllowance = () => {
      setStep({ name: 'status', params: { step: 0 } });
    };
    const onTransactionHash = () => {
      setStep({ name: 'status', params: { step: 1 } });
    };

    // TODO: don't use ?
    const onReceipt = () => {
      // setStep({ name: 'status', params: { step } });
    };
    const onConfirm = step => {
      setStep({ name: 'confirm', params: { step } });

      // if (step === ???) {
        // setStep({ name: 'confirm' });
      // }
    };
    const onError = () => {
      console.log('ERROR');
    };

    const signer = library.getSigner();
    const res = customMovr.approveAndSendWithRoute(
      route.bridgeRoute,
      token,
      fromChain,
      toChain,
      signer,
      true,
      {
        beforeAllowance,
        afterAllowance,
        onTransactionStart,
        onTransactionHash,
        onReceipt,
        onConfirm,
        onError,
      },
    );
  }, [route, token, fromChain, toChain, library]);

  const onSwitchChains = () => {
    setToChain(fromChain);
    setFromChain(toChain);
    setToken(null);
  };

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
                <Complete fromChain={fromChain} toChain={toChain} token={token} fees={fees} />
              ),
            })}
          </AutoColumn>
        </Wrapper>
      </AppBody>
    );

  if (step.name === 'form')
    return (
      <AppBody>
        <SwapPoolTabs active={TabNames.BRIDGE} />
        <Wrapper>
          <AutoColumn gap={'md'}>
            <TokenInput
              tokens={tokens}
              token={token}
              amount={amount}
              onAmountInput={onAmountInput}
              setToken={setToken}
            />

            <ChainsSelect
              allChains={allChains}
              fromChain={fromChain}
              toChain={toChain}
              setFromChain={setFromChain}
              setToChain={setToChain}
              setToken={setToken}
              onSwitchChains={onSwitchChains}
            />

            <S.Fee>
              <S.FeeRow>
                <S.FeeRowLabel>Transaction Fee</S.FeeRowLabel>
                <S.FeeRowValue>{fees.transactionFee || 'Unknown'}</S.FeeRowValue>
              </S.FeeRow>
              <S.FeeRow>
                <S.FeeRowLabel>Bridge Fee</S.FeeRowLabel>
                <S.FeeRowValue>{fees.bridgeFee || 'Unknown'}</S.FeeRowValue>
              </S.FeeRow>
            </S.Fee>

            <Flow fromChain={fromChain} toChain={toChain} token={token} />
          </AutoColumn>
        </Wrapper>
        {account ? (
          <ButtonLight
            onClick={() => {
              send();
            }}
            disabled={!route}
          >
            {route ? 'Send Transaction' : 'No routes available'}
          </ButtonLight>
        ) : (
          <ButtonLight onClick={toggleWalletModal}>Connect Wallet</ButtonLight>
        )}
      </AppBody>
    );
};
export default Bridge;
