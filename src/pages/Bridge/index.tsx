import React, { useCallback, useEffect, useState } from 'react';
import { Movr, Chain, Token, RouteOptions, WatcherEvent } from '@movr/fund-movr-sdk';
import { rpcList as chains, ChainType } from './rpcList';
import { SwapPoolTabs, TabNames } from '../../components/NavigationTabs';
import AppBody from '../AppBody';
import { AutoColumn } from '../../components/Column';
import CurrencyInputPanel from '../../components/CurrencyInputPanel';
import * as Styled from '../../components/CurrencyInputPanel/styled';
import { Wrapper } from '../../components/swap/styleds';
import { ButtonLight } from '../../components/Button';
import { useWalletModalToggle } from '../../state/application/hooks';
import { useWeb3React } from '@web3-react/core';
import ethers from 'ethers';
import { Field } from '../../state/swap/actions';

const getMovr = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer: any = provider.getSigner();
  return [new Movr(signer), signer];
};

const Bridge = () => {
  const { active, account, connector, error } = useWeb3React();
  const toggleWalletModal = useWalletModalToggle();
  const [tokens, setAvalableTokens] = useState<string[]>([]);
  const [token, setToken] = useState<string | null>(null);
  // const [sendingToken, setSendingToken] = useState<string | null>(null);
  const [fromChain, setFromChain] = useState<ChainType>(chains[1]);
  const [toChain, setToChain] = useState<ChainType>(chains[6]);
  // const [bridge, setBridge] = useState<string>('');
  const [estimate, setEstimate] = useState<string | null>(null);

  useEffect(() => {
    const [movr] = getMovr();
    movr.getSupportedTokensByChain(fromChain.chainId).then(res => {
      if (res && res.success === false) {
        return;
      }
      const some = res.filter(
        ({ fromChainId, toChainId }) =>
          fromChainId === fromChain.chainId && toChainId === toChain.chainId,
      );

      setAvalableTokens(some.map(({ tokenAddress }) => tokenAddress));
      setToken(res[0].tokenAddress);
    });
  }, [fromChain, toChain]);

  useEffect(() => {
    if (!token) {
      return;
    }
    const sendingChain = new Chain(fromChain.chainId, fromChain.rpcURL);
    const destinationChain = new Chain(toChain.chainId, toChain.rpcURL);
    const sendingTokenInstance = new Token(token, sendingChain);

    const [movr, signer] = getMovr();

    const mainAmount = (1 * 1000000000).toString();
    const result = movr
      .connect(signer)
      .move(sendingTokenInstance, sendingChain, destinationChain)
      .estimateFee(RouteOptions.MaxOutput, mainAmount)
      .then(res => {
        console.log('esitmate: ');
        console.log(res);
        if (res.routes && res.routes.length > 0) {
          setEstimate(res.routes[0].totalFee);
        }
      });
  }, [fromChain, toChain, token]);

  const send = useCallback(() => {
    if (!token) {
      return;
    }
    const sendingChain = new Chain(fromChain.chainId, fromChain.rpcURL);
    const destinationChain = new Chain(toChain.chainId, toChain.rpcURL);
    const sendingTokenInstance = new Token(token, sendingChain);

    const [movr, signer] = getMovr();

    const mainAmount = (1 * 1000000000).toString();
    const result = movr
      .connect(signer)
      .move(sendingTokenInstance, sendingChain, destinationChain)
      .estimateFee(RouteOptions.MaxOutput, mainAmount)
      .then(res => {
        if (res.routes && res.routes.length > 0) {
          const route = res.routes[0];
          const result = movr
            .connect(signer)
            .move(sendingTokenInstance, sendingChain, destinationChain)
            .approveAndSendWithRoute(route)
            .then(reswhen => {
              // const [tx, { isClaimRequired, bridgeName }] = reswhen;
            });
        }
      });
  }, [fromChain, toChain, token]);
  console.log(token);

  return (
    <AppBody>
      <SwapPoolTabs active={TabNames.BRIDGE} />
      <Wrapper>
        <AutoColumn gap={'md'}>
          <select
            onChange={event => {
              const newChain = chains.find(
                ({ chainId }) => chainId === parseInt(event.target.value),
              );
              console.log(newChain);
              if (newChain) {
                setFromChain(newChain);
              }
            }}
            value={fromChain.chainId}
          >
            {chains.map(chain => {
              return (
                <option key={chain.chainId} value={chain.chainId}>
                  {chain.name}
                </option>
              );
            })}
          </select>
          <select
            onChange={event => {
              const newChain = chains.find(
                ({ chainId }) => chainId === parseInt(event.target.value),
              );
              if (newChain) {
                setToChain(newChain);
              }
            }}
            value={toChain.chainId}
          >
            {chains.map(chain => {
              return (
                <option key={chain.chainId} value={chain.chainId}>
                  {chain.name}
                </option>
              );
            })}
          </select>
          <select
            onChange={event => {
              const newToken = tokens.find(tokenId => tokenId === event.target.value);
              if (newToken) {
                setToken(newToken);
              }
            }}
            value={token}
          >
            {tokens.map((chain, index) => {
              return <option key={index}>{chain}</option>;
            })}
          </select>
          {estimate && <span>Fees: {estimate}</span>}
        </AutoColumn>
      </Wrapper>
      {account ? (
        <ButtonLight
          onClick={() => {
            send();
          }}
        >
          Send Transaction
        </ButtonLight>
      ) : (
        <ButtonLight onClick={toggleWalletModal}>Connect Wallet</ButtonLight>
      )}
    </AppBody>
  );
};
export default Bridge;
