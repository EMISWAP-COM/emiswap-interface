import React, { useCallback, useEffect, useState } from 'react';
import { formatUnits } from '@ethersproject/units';
import AppBody from '../AppBody';
import { AutoColumn } from '../../components/Column';
import { ButtonLight } from '../../components/Button';
import { Token as UniSwapToken } from '@uniswap/sdk';
import { Wrapper } from '../../components/swap/styleds';
import TokenInput from './TokenInput';
import ChainsSelect from './ChainsSelect';
import { SwapPoolTabs, TabNames } from '../../components/NavigationTabs';
import { Confirmation } from './Confirmation';
import { Status } from './Status';
import { Complete } from './Complete';
import { useWalletModalToggle } from '../../state/application/hooks';
import { useActiveWeb3React } from '../../hooks';
import useFeesByRoute from './hooks/useFeesByRoute';
import useTokensByChain from './hooks/useTokensByChain';
import useTokensToChain from './hooks/useTokensToChain';
import useTokenChainQuote from './hooks/useTokenChainQuote';
import useBuildTx from './hooks/useBuildTx';

import * as S from './styled';
import { selectFromToChains } from './bridgeSlice';
import { useAppSelector } from 'state/hooks';

async function sendTransaction(txData, signer) {
  txData.map(async txItem => {
    const tx = await signer.sendTransaction(txItem);
    const receipt = await tx.wait();
    console.log('receipt');
    console.log(receipt);
  });
}

const Bridge = () => {
  const { account, library } = useActiveWeb3React();

  const toggleWalletModal = useWalletModalToggle();

  const [step] = useState<{
    name: 'form' | 'confirm' | 'status' | 'complete';
    params?: any;
  }>({ name: 'form' });

  // const { allChains } = useDefaultChains();

  const { fromChain, toChain } = useAppSelector(selectFromToChains);

  const tokens = useTokensByChain(fromChain?.chainId, toChain?.chainId);
  const [token, setToken] = useState<UniSwapToken | null>(null);
  const [toToken, setToToken] = useState<UniSwapToken | null>(null);
  const toTokens = useTokensToChain(fromChain?.chainId, toChain?.chainId);
  const [amount, onAmountInput] = useState(null);
  const { quotes } = useTokenChainQuote(
    token?.address,
    fromChain?.chainId,
    toToken?.address,
    toChain?.chainId,
    amount,
    token?.decimals,
  );
  const { fees } = useFeesByRoute(quotes?.result?.routes?.[0]);
  const toAmount = quotes?.result?.routes?.[0]?.bridgeRoute?.outputAmount;
  const isApprovalRequired = quotes?.result?.routes?.[0]?.isApprovalRequired;
  const signer = library.getSigner();
  console.log(toTokens);

  useEffect(() => {
    if (
      !fromChain ||
      !account ||
      !token?.address ||
      !quotes?.result?.routes?.[0]?.allowanceTarget
    ) {
      return;
    }
    // TODO  I do it, but for what?

    // customMovr.fetchCheckAllowance({
    //   chainID: fromChain?.chainId,
    //   owner: account,
    //   allowanceTarget: quotes?.result?.routes?.[0]?.allowanceTarget,
    //   tokenAddress: token?.address,
    // });
  }, [fromChain, account, token, quotes]);

  const { tx } = useBuildTx(
    token?.address,
    fromChain?.chainId,
    toToken?.address,
    toChain?.chainId,
    amount,
    token?.decimals,
    quotes?.result?.routes?.[0]?.routePath,
    toAmount,
    account,
    isApprovalRequired,
    quotes?.result?.routes?.[0]?.allowanceTarget,
  );

  const send = useCallback(() => {
    if (tx.length === 0) {
      return;
    }
    sendTransaction(tx, signer);
  }, [tx, signer]);

  useEffect(() => {
    setToken(tokens[0] || null);
    setToToken(toTokens[0] || null);
  }, [tokens, toTokens]);

  const match = (value, obj) => obj[value] || null;
  console.log(quotes);

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

  console.log('toAmount :' + toAmount);
  console.log('decimals :' + toToken?.decimals);
  console.log(formatUnits(111000000, 1));
  return (
    <AppBody>
      <SwapPoolTabs active={TabNames.BRIDGE} />
      <Wrapper>
        <AutoColumn gap={'md'}>
          <ChainsSelect setToken={setToken} />
          <TokenInput
            tokens={tokens}
            token={token}
            amount={amount}
            onAmountInput={onAmountInput}
            setToken={setToken}
          />
          <TokenInput
            tokens={toTokens}
            token={toToken}
            amount={formatUnits(toAmount || 0, toToken?.decimals || 1)}
            onAmountInput={() => {}}
            setToken={setToToken}
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
          {/* // TODO: remove this or refactor */}
          {/* <Flow fromChain={fromChain} toChain={toChain} token={token} /> */}
        </AutoColumn>
      </Wrapper>
      {account ? (
        <ButtonLight
          onClick={() => {
            send();
          }}
          disabled={!tx}
        >
          {quotes?.success ? 'Send Transaction' : 'No routes available'}
        </ButtonLight>
      ) : (
        <ButtonLight onClick={toggleWalletModal}>Connect Wallet</ButtonLight>
      )}
    </AppBody>
  );
};
export default Bridge;
