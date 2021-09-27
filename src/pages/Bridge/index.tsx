import React, { useCallback, useEffect, useState, useMemo, useContext } from 'react';
import { Movr, Chain, Token, RouteOptions, WatcherEvent } from '@movr/fund-movr-sdk';
import { rpcList as chains, ChainType } from './rpcList';
import { SwapPoolTabs, TabNames } from '../../components/NavigationTabs';
import AppBody from '../AppBody';
import { AutoColumn } from '../../components/Column';
import CurrencyInputPanel from '../../components/CurrencyInputPanel';
import * as Styled from '../../components/CurrencyInputPanel/styled';

import * as S from './styled';

import { ArrowWrapper, Wrapper } from '../../components/swap/styleds';
import { ButtonLight } from '../../components/Button';
import { useWalletModalToggle } from '../../state/application/hooks';
import { useWeb3React } from '@web3-react/core';
import ethers from 'ethers';
import { Field } from '../../state/swap/actions';
import {
  useTokenBalances,
} from '../../state/wallet/hooks';
import { useToken } from '../../hooks/Tokens';
import TokenOption from './TokenOption';
import { Token as UniSwapToken, TokenAmount } from '@uniswap/sdk';
import { tokenAmountToString } from '../../utils/formats';
import { currencyKey } from '../../utils/currencyId';
import CurrencyLogo from '../../components/CurrencyLogo';
import TokensSearchModal from './TokenSearchModal';
import BridgeSearchModal from './BridgeSearchModal';
// import ChainSearchModal from './ChainSearchModal';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from 'styled-components';
import { ArrowDown, ArrowUp } from 'react-feather';
import { AutoRow, RowBetween } from '../../components/Row';
import { CursorPointer, StyledButtonNavigation, TextWrapper } from '../../theme';
import { Input as NumericalInput } from '../../components/NumericalInput';
import { useActiveWeb3React } from '../../hooks';
import customMovr from './movr';
import { Flow } from './Flow';

const getMovr = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer: any = provider.getSigner();
  
  return [new Movr(signer), signer];
};

const Bridge = () => {
  const { t } = useTranslation();
  const theme = useContext(ThemeContext);

  const { account } = useActiveWeb3React();
  const toggleWalletModal = useWalletModalToggle();
  const [tokens, setAvalableTokens] = useState<any[]>([]);
  const [token, setToken] = useState<UniSwapToken | null>(null);
  const [fromChain, setFromChain] = useState<any | null>(null);
  const [toChain, setToChain] = useState<any | null>(null);
  const [allChains, setAllChain] = useState<any[]>(null);
  const [modalOpened, setModalOpened] = useState<string | null>(null);
  const [amount, onAmountInput] = useState(100);
  const [route, setRoute] = useState<any | null>(null);

  const setChains = useCallback(async () => {
    const movrChains = await customMovr.fetchSupportedChains();
    setAllChain(movrChains);
    setFromChain(movrChains[4]);
    setToChain(movrChains[3] || null);
  }, []);

  useEffect(() => {
    setChains();
  }, [setChains]);

  const balances = useTokenBalances(account, tokens);

  const finalTokens = tokens; // filter?

  useEffect(() => {
    const [movr] = getMovr();
    if (!fromChain || !toChain) return;

    customMovr.getSupportedTokensByChain(fromChain.chainId).then(tokens => {
      setAvalableTokens(tokens);
      setToken(tokens[0] || null);
    });
  }, [fromChain, toChain]);


  const getRoutes = useCallback(async () => {
    const fromChainRoutes = await customMovr.getRoutes(fromChain.chainId, token.address, false);

    const commonRoutes = fromChainRoutes.reduce((memo, curr) => {
      if (curr.fromChainId === fromChain.chainId && curr.toChainId === toChain.chainId) {
        memo.push(curr);
      }

      return memo;
    }, []);

    setRoute(commonRoutes[0]);

    const avRoute = commonRoutes[0];

    if (!avRoute) {

      return;
    }

    const mainAmount = (amount * 10 ** token.decimals).toString();

    try {
      const quote = await customMovr.fetchQuoteByChains(
        avRoute.fromToken.address,
        avRoute.fromChainId,
        avRoute.toToken.address,
        avRoute.toChainId,
        mainAmount,
        'cheapestRoute'
      );
  
    } catch (error) {
      console.log('ERR quote', error)
    }
    
  }, [fromChain, toChain, token, amount]);


  useEffect(() => {
    if (!token) {
      return;
    }

    getRoutes();

    const sendingChain = new Chain(fromChain.chainId, fromChain.rpcURL);
    const destinationChain = new Chain(toChain.chainId, toChain.rpcURL);
    const sendingTokenInstance = token;
    const [movr, signer] = getMovr();
    const mainAmount = (amount * 10 ** token.decimals).toString();
    const result = movr
      .connect(signer)
      .move(sendingTokenInstance, sendingChain, destinationChain)
      .estimateFee(RouteOptions.MaxOutput, mainAmount)
      .then(res => {
        console.log('esitmate: ', res);

      });
  }, [fromChain, toChain, token, amount]);

  const send = useCallback(() => {
    if (!token || !route) {
      return;
    }

    const sendingChain = new Chain(fromChain.chainId, fromChain.rpcURL);
    const destinationChain = new Chain(toChain.chainId, toChain.rpcURL);
    const [movr, signer] = getMovr();
    const mainAmount = (amount * 10 ** token.decimals).toString();

    const bridge = {
      bridgeName: route.bridgeName,
      fromAsset: route.fromToken.address,
      fromChainId: route.fromChainId,
      toChainId: route.toChainId,
      totalAmount: mainAmount,
    };

    const result = movr
      .connect(signer)
      .move(token, sendingChain, destinationChain)
      .approveAndSendWithRoute(bridge)
      .then(reswhen => {
      });

  }, [fromChain, toChain, token, amount, route]);

  const onSwitchChains = () => {
    setToChain(fromChain);
    setFromChain(toChain);
    setToken(null);
  };

  return (
    <AppBody>
      <SwapPoolTabs active={TabNames.BRIDGE} />
      <Wrapper>
        <AutoColumn gap={'md'}>
          {/* TOKEN INPUT */}
          <Styled.InputPanel id="token">
            <Styled.Container hideInput={false} isError={false}>
              <Styled.LabelRow>
                <RowBetween>
                  {account && (
                    <CursorPointer>
                      <TextWrapper
                        color="white"
                        fontWeight={500}
                        fontSize={14}
                        style={{ display: 'inline' }}
                      >
                        {token ? 'Balance: ' + tokenAmountToString(balances[token.address]) : ''}
                      </TextWrapper>
                    </CursorPointer>
                  )}
                </RowBetween>
              </Styled.LabelRow>
              <Styled.InputRow selected={false}>
                {token ? (
                  <NumericalInput
                    className="token-amount-input"
                    value={amount}
                    onUserInput={val => {
                      console.log('SET AMOUNT', val)
                      onAmountInput(val);
                    }}
                  />
                ) : (
                  <div />
                )}
                <Styled.CurrencySelect
                  selected={!!token}
                  className="open-currency-select-button"
                  onClick={() => setModalOpened('token')}
                >
                  <Styled.Aligner>
                    <CurrencyLogo currency={token} size={'24px'} />
                    <Styled.StyledTokenName
                      className="token-symbol-container"
                      active={Boolean(token && token.symbol)}
                    >
                      {(token && token.symbol && token.symbol.length > 20
                        ? token.symbol.slice(0, 4) +
                        '...' +
                        token.symbol.slice(token.symbol.length - 5, token.symbol.length)
                        : token?.symbol) || t('selectToken')}
                    </Styled.StyledTokenName>
                    <Styled.StyledDropDown selected={Boolean(token)} />
                  </Styled.Aligner>
                </Styled.CurrencySelect>
              </Styled.InputRow>
            </Styled.Container>
          </Styled.InputPanel>

          <TokensSearchModal
            tokens={finalTokens}
            isOpen={modalOpened === 'token'}
            onDismiss={() => setModalOpened(null)}
            onSelect={token => {
              setToken(token);
              setModalOpened(null);
            }}
          />
          {/* END TOKEN INPUT */}

          {/* FROM CHAIN INPUT */}
          <Styled.InputPanel id="from-chain">
            <Styled.Container hideInput={false} isError={false}>
              <Styled.InputRow
                selected={false}
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <span>FROM </span>
                <Styled.CurrencySelect
                  selected={!!fromChain}
                  className="open-currency-select-button"
                  onClick={() => setModalOpened('fromChain')}
                >
                  <Styled.Aligner>
                    {/* <CurrencyLogo currency={fromChain} size={'24px'} /> */}

                    <Styled.StyledTokenName
                      className="token-symbol-container"
                      active={Boolean(fromChain && fromChain.name)}
                    >
                      {fromChain ? fromChain.name : t('selectToken')}
                    </Styled.StyledTokenName>
                    <Styled.StyledDropDown selected={true} />
                  </Styled.Aligner>
                </Styled.CurrencySelect>
              </Styled.InputRow>
            </Styled.Container>
          </Styled.InputPanel>
          <BridgeSearchModal
            items={allChains}
            isOpen={modalOpened === 'fromChain'}
            onDismiss={() => setModalOpened(null)}
            onSelect={chain => {
              setFromChain(chain);
              setToken(null);
              setModalOpened(null);
            }}
          />
          {/* END FROM CHAIN INPUT */}

          <CursorPointer>
            <StyledButtonNavigation onClick={onSwitchChains}>
              <AutoColumn justify="space-between">
                <AutoRow justify="space-between" style={{ padding: '0 1rem' }}>
                  <ArrowWrapper clickable>
                    <ArrowDown size="16" color={theme.green} />
                    <span style={{ marginLeft: '-3px' }}>
                      <ArrowUp size="16" color={theme.red} />
                    </span>
                  </ArrowWrapper>
                </AutoRow>
              </AutoColumn>
            </StyledButtonNavigation>
          </CursorPointer>

          {/* TO CHAIN INPUT */}
          <Styled.InputPanel id="from-chain">
            <Styled.Container hideInput={false} isError={false}>
              <Styled.InputRow
                selected={false}
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <span>TO </span>
                <Styled.CurrencySelect
                  selected={!!fromChain}
                  className="open-currency-select-button"
                  onClick={() => setModalOpened('toChain')}
                >
                  <Styled.Aligner>
                    {/* <CurrencyLogo currency={fromChain} size={'24px'} /> */}
                    <Styled.StyledTokenName
                      className="token-symbol-container"
                      active={Boolean(toChain && toChain.name)}
                    >
                      {toChain ? toChain.name : t('selectToken')}
                    </Styled.StyledTokenName>
                    <Styled.StyledDropDown selected={true} />
                  </Styled.Aligner>
                </Styled.CurrencySelect>
              </Styled.InputRow>
            </Styled.Container>
          </Styled.InputPanel>
          <BridgeSearchModal
            items={allChains}
            isOpen={modalOpened === 'toChain'}
            onDismiss={() => setModalOpened(null)}
            onSelect={chain => {
              setToChain(chain);
              setToken(null);
              setModalOpened(null);
            }}
          />
          {/* END TO CHAIN INPUT */}
          <S.Fee>
            <S.FeeRow>
              <S.FeeRowLabel>Fee</S.FeeRowLabel>
              <S.FeeRowValue>$999</S.FeeRowValue>
            </S.FeeRow>
            <S.FeeRow>
              <S.FeeRowLabel>Expected latency</S.FeeRowLabel>
              <S.FeeRowValue>Unknown</S.FeeRowValue>
            </S.FeeRow>
          </S.Fee>

          <Flow fromChain={fromChain} toChain={toChain} token={token} />
          {/* {estimate && <pre>{JSON.stringify(estimate, null, 1)}</pre>} */}
          {/* {estimate && <pre>Fees: {JSON.stringify(estimate, null, 2)}</pre>} */}
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
