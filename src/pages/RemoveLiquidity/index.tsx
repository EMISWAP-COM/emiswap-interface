import { TransactionResponse, Web3Provider } from '@ethersproject/providers';
import { currencyEquals, Percent, Token } from '@uniswap/sdk';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { ArrowDown, Plus } from 'react-feather';
import ReactGA from 'react-ga';
import { RouteComponentProps } from 'react-router';
import { Text } from 'rebass';
import { ThemeContext } from 'styled-components';
import { ButtonConfirmed, ButtonError, ButtonLight, ButtonPrimary } from '../../components/Button';
import { OutlineCard } from '../../components/Card';
import { AutoColumn, ColumnCenter } from '../../components/Column';
import ConfirmationModal from '../../components/ConfirmationModal';
import CurrencyInputPanel from '../../components/CurrencyInputPanel';
import DoubleCurrencyLogo from '../../components/DoubleLogo';
import { AddRemoveTabs } from '../../components/NavigationTabs';
import { MinimalPositionCard } from '../../components/PositionCard';
import Row, { RowBetween, RowFixed } from '../../components/Row';

import Slider from '../../components/Slider';
import CurrencyLogo from '../../components/CurrencyLogo';
import { useActiveWeb3React } from '../../hooks';
import { useCurrency } from '../../hooks/Tokens';
import { useSwapEmiRouter } from '../../hooks/useContract';

import { useTransactionAdder } from '../../state/transactions/hooks';
import { StyledButtonNavigation, StyledInternalLink, TYPE } from '../../theme';
import { calculateGasMargin, calculateSlippageAmount } from '../../utils';
import { currencyId } from '../../utils/currencyId';
import AppBody from '../AppBody';
import { ClickableText, Dots, MaxButton, Wrapper } from '../Pool/styleds';
import { useBurnActionHandlers, useBurnState, useDerivedBurnInfo } from '../../state/burn/hooks';
import { Field } from '../../state/burn/actions';
import { useWalletModalToggle } from '../../state/application/hooks';
import { useUserSlippageTolerance } from '../../state/user/hooks';
import { BigNumber } from '@ethersproject/bignumber';
import { tokenAmountToString } from '../../utils/formats';
import defaultCoins from '../../constants/defaultCoins';
import { KOVAN_WETH } from '../../constants';
import { ZERO_ADDRESS } from '../../constants/one-split';
import { ApprovalState, useApproveCallback } from '../../hooks/useApproveCallback';
import { useNetworkData } from '../../hooks/Coins';

export default function RemoveLiquidity({
  history,
  match: {
    params: { currencyIdA, currencyIdB },
  },
}: RouteComponentProps<{ currencyIdA: string; currencyIdB: string }>) {
  const [currencyA, currencyB] = [
    useCurrency(currencyIdA) ?? undefined,
    useCurrency(currencyIdB) ?? undefined,
  ];
  const { account, chainId, library } = useActiveWeb3React();
  const [tokenA, tokenB] = useMemo(() => [currencyA, currencyB], [currencyA, currencyB]);

  // const isKuCoinActive = useIsKuCoinActive();
  const {currencySymbolWrap, value: network} = useNetworkData();

  const theme = useContext(ThemeContext);

  // toggle wallet when disconnected
  const toggleWalletModal = useWalletModalToggle();

  // burn state
  const { independentField, typedValue } = useBurnState();
  const { pair, parsedAmounts, error } = useDerivedBurnInfo(
    currencyA ?? undefined,
    currencyB ?? undefined,
  );
  const { onUserInput: _onUserInput } = useBurnActionHandlers();
  const isValid = !error;
  // modal and loading
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [showDetailed, setShowDetailed] = useState<boolean>(false);
  const [attemptingTxn, setAttemptingTxn] = useState(false); // clicked confirm

  // txn values
  const [txHash, setTxHash] = useState<string>('');
  const [allowedSlippage] = useUserSlippageTolerance();
  const wethTokenInfo = defaultCoins.tokens.find(
    token =>
      token.symbol === currencySymbolWrap &&
      token.chainId === chainId,
  );
  const WETH: Token =
    wethTokenInfo && chainId
      ? new Token(
          chainId,
          wethTokenInfo.address,
          wethTokenInfo.decimals,
          wethTokenInfo.symbol,
          wethTokenInfo.name,
        )
      : KOVAN_WETH;
  const oneCurrencyIsWETH = Boolean(
    chainId &&
      ((currencyA && currencyEquals(WETH, currencyA)) ||
        (currencyB && currencyEquals(WETH, currencyB))),
  );

  const formattedAmounts = {
    [Field.LIQUIDITY_PERCENT]: parsedAmounts[Field.LIQUIDITY_PERCENT].equalTo('0')
      ? '0'
      : parsedAmounts[Field.LIQUIDITY_PERCENT].lessThan(new Percent('1', '100'))
      ? '<1'
      : parsedAmounts[Field.LIQUIDITY_PERCENT].toFixed(0),
    [Field.LIQUIDITY]:
      independentField === Field.LIQUIDITY
        ? typedValue
        : tokenAmountToString(parsedAmounts[Field.LIQUIDITY]) ?? '',
    [Field.CURRENCY_A]:
      independentField === Field.CURRENCY_A
        ? typedValue
        : tokenAmountToString(parsedAmounts[Field.CURRENCY_A]) ?? '',
    [Field.CURRENCY_B]:
      independentField === Field.CURRENCY_B
        ? typedValue
        : tokenAmountToString(parsedAmounts[Field.CURRENCY_B]) ?? '',
  };

  const atMaxAmount = parsedAmounts[Field.LIQUIDITY_PERCENT]?.equalTo(new Percent('1'));

  // pair contract
  // const pairContract: Contract | null = usePairContract(pair?.liquidityToken?.address);
  const emiRouter = useSwapEmiRouter(library as Web3Provider, account as string | undefined);
  // allowance handling
  const [signatureData, setSignatureData] = useState<{
    v: number;
    r: string;
    s: string;
    deadline: number;
  } | null>(null);
  const [approval, approveCallback] = useApproveCallback(
    parsedAmounts[Field.LIQUIDITY],
    emiRouter?.address,
    true,
  );
  // async function onAttemptToApprove() {
  //   if (!emiRouter || !pair || !library) throw new Error('missing dependencies');
  //   const liquidityAmount = parsedAmounts[Field.LIQUIDITY];
  //   if (!liquidityAmount) throw new Error('missing liquidity amount');
  //   // try to gather a signature for permission
  //   // const nonce = await pairContract.nonces(account);
  //
  //   // const deadlineForSignature: number = Math.ceil(Date.now() / 1000) + deadline;
  //
  //   // const EIP712Domain = [
  //   //   { name: 'name', type: 'string' },
  //   //   { name: 'version', type: 'string' },
  //   //   { name: 'chainId', type: 'uint256' },
  //   //   { name: 'verifyingContract', type: 'address' },
  //   // ];
  //   // const domain = {
  //   //   name: 'Mooniswap',
  //   //   version: '1',
  //   //   chainId: chainId,
  //   //   verifyingContract: pair.liquidityToken.address,
  //   // };
  //   // const Permit = [
  //   //   { name: 'owner', type: 'address' },
  //   //   { name: 'spender', type: 'address' },
  //   //   { name: 'value', type: 'uint256' },
  //   //   { name: 'nonce', type: 'uint256' },
  //   //   { name: 'deadline', type: 'uint256' },
  //   // ];
  //   // const message = {
  //   //   owner: account,
  //   //   spender: pairContract.address,
  //   //   value: liquidityAmount.raw.toString(),
  //   //   nonce: nonce.toHexString(),
  //   //   deadline: deadlineForSignature,
  //   // };
  //   // const data = JSON.stringify({
  //   //   types: {
  //   //     EIP712Domain,
  //   //     Permit,
  //   //   },
  //   //   domain,
  //   //   primaryType: 'Permit',
  //   //   message,
  //   // });
  //
  //   // library
  //   //   .send('eth_signTypedData_v4', [account, data])
  //   //   .then(splitSignature)
  //   //   .then(signature => {
  //   //     setSignatureData({
  //   //       v: signature.v,
  //   //       r: signature.r,
  //   //       s: signature.s,
  //   //       deadline: deadlineForSignature,
  //   //     });
  //   //   })
  //   //   .catch(error => {
  //   //     // for all errors other than 4001 (EIP-1193 user rejected request), fall back to manual approve
  //   //     if (error?.code !== 4001) {
  //   //       approveCallback();
  //   //     }
  //   //   });
  // }

  // wrapped onUserInput to clear signatures
  const onUserInput = useCallback(
    (field: Field, typedValue: string) => {
      setSignatureData(null);
      return _onUserInput(field, typedValue);
    },
    [_onUserInput],
  );

  const onLiquidityInput = useCallback(
    (typedValue: string): void => onUserInput(Field.LIQUIDITY, typedValue),
    [onUserInput],
  );
  const onCurrencyAInput = useCallback(
    (typedValue: string): void => onUserInput(Field.CURRENCY_A, typedValue),
    [onUserInput],
  );
  const onCurrencyBInput = useCallback(
    (typedValue: string): void => onUserInput(Field.CURRENCY_B, typedValue),
    [onUserInput],
  );

  // tx sending
  const addTransaction = useTransactionAdder();

  async function onRemove() {
    if (!chainId || !library || !account) throw new Error('missing dependencies');
    const {
      [Field.CURRENCY_A]: currencyAmountA,
      [Field.CURRENCY_B]: currencyAmountB,
    } = parsedAmounts;
    if (!currencyAmountA || !currencyAmountB || !emiRouter) {
      throw new Error('missing currency amounts');
    }

    const amountsMin = {
      [Field.CURRENCY_A]: calculateSlippageAmount(currencyAmountA, allowedSlippage)[0],
      [Field.CURRENCY_B]: calculateSlippageAmount(currencyAmountB, allowedSlippage)[0],
    };

    if (!currencyA || !currencyB) throw new Error('missing tokens');
    const liquidityAmount = parsedAmounts[Field.LIQUIDITY];
    if (!liquidityAmount) throw new Error('missing liquidity amount');

    if (!tokenA || !tokenB) throw new Error('could not wrap');
    let args: any[] = [];
    let methodNames: string[] = [];
    if (currencyA.isEther || currencyB.isEther) {
      methodNames.push('removeLiquidityETH');
      args = [
        currencyA.isEther ? currencyAmountB.token.address : currencyAmountA.token.address,
        liquidityAmount.raw.toString(),
        ...(currencyA.isEther
          ? [amountsMin[Field.CURRENCY_B].toString(), amountsMin[Field.CURRENCY_A].toString()]
          : [amountsMin[Field.CURRENCY_A].toString(), amountsMin[Field.CURRENCY_B].toString()]),
      ];
    } else {
      methodNames.push('removeLiquidity');
      args = [
        currencyAmountA.token.address,
        currencyAmountB.token.address,
        liquidityAmount.raw.toString(),
        amountsMin[Field.CURRENCY_A].toString(),
        amountsMin[Field.CURRENCY_B].toString(),
      ];
    }
    // let args: Array<string | string[] | number | boolean> = [
    //   liquidityAmount.raw.toString(),
    //   [amountsMin[Field.CURRENCY_A].toString(), amountsMin[Field.CURRENCY_B].toString()],
    // ];
    const safeGasEstimates = await Promise.all(
      methodNames.map(methodName =>
        emiRouter?.estimateGas[methodName](...args)
          .then(calculateGasMargin)
          .catch((error: any) => {
            console.error(`estimateGas failed for ${methodName}`, error);
          }),
      ),
    );

    const indexOfSuccessfulEstimation = safeGasEstimates.findIndex(safeGasEstimate =>
      BigNumber.isBigNumber(safeGasEstimate),
    );

    // all estimations failed...
    if (indexOfSuccessfulEstimation === -1) {
      console.error('This transaction would fail. Please contact support.');
    } else {
      const methodName = methodNames[indexOfSuccessfulEstimation];
      const safeGasEstimate = safeGasEstimates[indexOfSuccessfulEstimation];
      setAttemptingTxn(true);
      await emiRouter[methodName](...args, {
        gasLimit: safeGasEstimate,
      })
        .then((response: TransactionResponse) => {
          setAttemptingTxn(false);

          addTransaction(response, {
            summary:
              'Remove ' +
              tokenAmountToString(parsedAmounts[Field.CURRENCY_A], 3) +
              ' ' +
              currencyA?.symbol +
              ' and ' +
              tokenAmountToString(parsedAmounts[Field.CURRENCY_B], 3) +
              ' ' +
              currencyB?.symbol,
          });

          setTxHash(response.hash);

          ReactGA.set({
            dimension4: response.hash,
            dimension1: currencyA?.symbol,
            dimension2: currencyB?.symbol,
            metric1: parsedAmounts[Field.CURRENCY_A]?.toFixed(),
            metric2: parsedAmounts[Field.CURRENCY_B]?.toFixed(),
            dimension3: account,
            dimension5: network
          });

          ReactGA.event({
            category: 'Transaction',
            action: 'new',
            label: 'unpool',
            value:  Math.round(parseFloat(parsedAmounts[Field.CURRENCY_A]?.toFixed() || '')),
          });
        })
        .catch((error: Error) => {
          setAttemptingTxn(false);
          ReactGA.set({
            dimension1: currencyA?.symbol,
            dimension2: currencyB?.symbol,
            metric1: parsedAmounts[Field.CURRENCY_A]?.toFixed(),
            metric2: parsedAmounts[Field.CURRENCY_B]?.toFixed(),
            dimension3: account,
            dimension5: network
          });

          ReactGA.event({
            category: 'Transaction',
            action: 'cancel',
            label: 'unpool',
            value:  Math.round(parseFloat(parsedAmounts[Field.CURRENCY_A]?.toFixed() || '')),
          });
          // we only care if the error is something _other_ than the user rejected the tx
          console.error(error);
        });
    }
  }

  function modalHeader() {
    return (
      <AutoColumn gap={'md'} style={{ marginTop: '20px' }}>
        <RowBetween align="flex-end">
          <Text color={theme.darkWhite} fontSize={24} fontWeight={500}>
            {tokenAmountToString(parsedAmounts[Field.CURRENCY_A])}
          </Text>
          <RowFixed gap="4px">
            <CurrencyLogo currency={currencyA} size={'24px'} />
            <Text
              color={theme.darkWhite}
              fontSize={24}
              fontWeight={500}
              style={{ marginLeft: '10px' }}
            >
              {currencyA?.symbol}
            </Text>
          </RowFixed>
        </RowBetween>
        <RowFixed>
          <Plus size="16" color={theme.darkWhite} />
        </RowFixed>
        <RowBetween align="flex-end">
          <Text color={theme.darkWhite} fontSize={24} fontWeight={500}>
            {tokenAmountToString(parsedAmounts[Field.CURRENCY_B])}
          </Text>
          <RowFixed gap="4px">
            <CurrencyLogo currency={currencyB} size={'24px'} />
            <Text
              color={theme.darkWhite}
              fontSize={24}
              fontWeight={500}
              style={{ marginLeft: '10px' }}
            >
              {currencyB?.symbol}
            </Text>
          </RowFixed>
        </RowBetween>

        <TYPE.italic fontSize={12} color={theme.darkWhite} textAlign="left" padding={'12px 0 0 0'}>
          {`Output is estimated. If the price changes by more than ${allowedSlippage /
            100}% your transaction will revert.`}
        </TYPE.italic>
      </AutoColumn>
    );
  }

  function modalBottom() {
    return (
      <>
        <RowBetween>
          <Text color={theme.darkWhite} fontWeight={500} fontSize={16}>
            {'Emi ' + currencyA?.symbol + '/' + currencyB?.symbol} Burned
          </Text>
          <RowFixed>
            <DoubleCurrencyLogo currency0={currencyA} currency1={currencyB} margin={true} />
            <Text fontWeight={500} fontSize={16}>
              {tokenAmountToString(parsedAmounts[Field.LIQUIDITY])}
            </Text>
          </RowFixed>
        </RowBetween>
        {pair && (
          <>
            <RowBetween>
              <Text color={theme.darkWhite} fontWeight={500} fontSize={16}>
                Price
              </Text>
              <Text fontWeight={500} fontSize={16} color={theme.darkWhite}>
                1 {currencyA?.symbol} = {tokenA ? tokenAmountToString(pair.priceOf(tokenA)) : '-'}{' '}
                {currencyB?.symbol}
              </Text>
            </RowBetween>
            <RowBetween>
              <div />
              <Text fontWeight={500} fontSize={16} color={theme.darkWhite}>
                1 {currencyB?.symbol} = {tokenB ? tokenAmountToString(pair.priceOf(tokenB)) : '-'}{' '}
                {currencyA?.symbol}
              </Text>
            </RowBetween>
          </>
        )}
        {/*<ButtonPrimary disabled={ !(approval === ApprovalState.APPROVED || signatureData !== null) }*/}
        <ButtonPrimary disabled={false} onClick={onRemove}>
          <Text fontWeight={500} fontSize={20}>
            Confirm
          </Text>
        </ButtonPrimary>
      </>
    );
  }

  const pendingText = `Removing ${tokenAmountToString(parsedAmounts[Field.CURRENCY_A])} ${
    currencyA?.symbol
  } and ${tokenAmountToString(parsedAmounts[Field.CURRENCY_B])} ${currencyB?.symbol}`;

  const liquidityPercentChangeCallback = useCallback(
    (value: number) => {
      onUserInput(Field.LIQUIDITY_PERCENT, value.toString());
    },
    [onUserInput],
  );
  const oneCurrencyIsETH = currencyA?.isEther || currencyB?.isEther;

  const handleSelectCurrencyA = useCallback(
    (currency: Token) => {
      if (currencyIdB && currencyId(currency) === currencyIdB) {
        history.push(`/remove/${currencyId(currency)}/${currencyIdA}`);
      } else {
        history.push(`/remove/${currencyId(currency)}/${currencyIdB}`);
      }
    },
    [currencyIdA, currencyIdB, history],
  );
  const handleSelectCurrencyB = useCallback(
    (currency: Token) => {
      if (currencyIdA && currencyId(currency) === currencyIdA) {
        history.push(`/remove/${currencyIdB}/${currencyId(currency)}`);
      } else {
        history.push(`/remove/${currencyIdA}/${currencyId(currency)}`);
      }
    },
    [currencyIdA, currencyIdB, history],
  );

  return (
    <>
      <AppBody>
        <AddRemoveTabs adding={false} />
        <Wrapper>
          <ConfirmationModal
            isOpen={showConfirm}
            onDismiss={() => {
              setShowConfirm(false);
              setSignatureData(null); // important that we clear signature data to avoid bad sigs
              // if there was a tx hash, we want to clear the input
              if (txHash) {
                onUserInput(Field.LIQUIDITY_PERCENT, '0');
              }
              setTxHash('');
            }}
            attemptingTxn={attemptingTxn}
            hash={txHash ? txHash : ''}
            topContent={modalHeader}
            bottomContent={modalBottom}
            pendingText={pendingText}
            title="You will receive"
          />
          <AutoColumn gap="md">
            <OutlineCard>
              <AutoColumn gap="20px">
                <RowBetween>
                  <Text fontWeight={500} color={theme.darkWhite}>
                    Amount
                  </Text>
                  <ClickableText
                    fontWeight={500}
                    onClick={() => {
                      setShowDetailed(!showDetailed);
                    }}
                  >
                    {showDetailed ? 'Simple' : 'Detailed'}
                  </ClickableText>
                </RowBetween>
                <Row style={{ alignItems: 'flex-end' }}>
                  <Text fontSize={72} fontWeight={500} color={theme.darkWhite}>
                    {formattedAmounts[Field.LIQUIDITY_PERCENT]}%
                  </Text>
                </Row>
                {!showDetailed && (
                  <>
                    <Slider
                      value={Number.parseInt(parsedAmounts[Field.LIQUIDITY_PERCENT].toFixed(0))}
                      onChange={liquidityPercentChangeCallback}
                    />
                    <RowBetween>
                      <MaxButton
                        onClick={() => onUserInput(Field.LIQUIDITY_PERCENT, '25')}
                        width="20%"
                      >
                        25%
                      </MaxButton>
                      <MaxButton
                        onClick={() => onUserInput(Field.LIQUIDITY_PERCENT, '50')}
                        width="20%"
                      >
                        50%
                      </MaxButton>
                      <MaxButton
                        onClick={() => onUserInput(Field.LIQUIDITY_PERCENT, '75')}
                        width="20%"
                      >
                        75%
                      </MaxButton>
                      <MaxButton
                        onClick={() => onUserInput(Field.LIQUIDITY_PERCENT, '100')}
                        width="20%"
                      >
                        Max
                      </MaxButton>
                    </RowBetween>
                  </>
                )}
              </AutoColumn>
            </OutlineCard>
            {!showDetailed && (
              <>
                <ColumnCenter>
                  <ArrowDown size="16" color={theme.darkWhite} />
                </ColumnCenter>
                <OutlineCard>
                  <AutoColumn gap="10px">
                    <RowBetween>
                      <Text fontSize={24} fontWeight={500} color={theme.darkWhite}>
                        {formattedAmounts[Field.CURRENCY_A] || '-'}
                      </Text>
                      <RowFixed>
                        <CurrencyLogo currency={currencyA} style={{ marginRight: '12px' }} />
                        <Text
                          fontSize={24}
                          fontWeight={500}
                          color={theme.darkWhite}
                          id="remove-liquidity-tokena-symbol"
                        >
                          {currencyA?.symbol}
                        </Text>
                      </RowFixed>
                    </RowBetween>
                    <RowBetween>
                      <Text fontSize={24} fontWeight={500} color={theme.darkWhite}>
                        {formattedAmounts[Field.CURRENCY_B] || '-'}
                      </Text>
                      <RowFixed>
                        <CurrencyLogo currency={currencyB} style={{ marginRight: '12px' }} />
                        <Text
                          fontSize={24}
                          fontWeight={500}
                          color={theme.darkWhite}
                          id="remove-liquidity-tokenb-symbol"
                        >
                          {currencyB?.symbol}
                        </Text>
                      </RowFixed>
                    </RowBetween>
                    {chainId && (oneCurrencyIsWETH || oneCurrencyIsETH) ? (
                      <RowBetween style={{ justifyContent: 'flex-end' }}>
                        {oneCurrencyIsETH ? (
                          <StyledInternalLink
                            to={`/remove/${currencyA?.isEther ? WETH.address : currencyIdA}/${
                              currencyB?.isEther ? WETH.address : currencyIdB
                            }`}
                          >
                            Receive {currencySymbolWrap}
                          </StyledInternalLink>
                        ) : oneCurrencyIsWETH ? (
                          <StyledInternalLink
                            to={`/remove/${
                              currencyA && currencyEquals(currencyA, WETH)
                                ? ZERO_ADDRESS
                                : currencyIdA
                            }/${
                              currencyB && currencyEquals(currencyB, WETH)
                                ? ZERO_ADDRESS
                                : currencyIdB
                            }`}
                          >
                            Receive {currencySymbolWrap}
                          </StyledInternalLink>
                        ) : null}
                      </RowBetween>
                    ) : null}
                    {/*{chainId && false ? (*/}
                    {/*  <RowBetween style={{ justifyContent: 'flex-end' }}>*/}
                    {/*    {oneCurrencyIsETH ? (*/}
                    {/*      <StyledInternalLink to={`/remove/${currencyIdA}/${currencyIdB}`}>*/}
                    {/*        Receive WETH*/}
                    {/*      </StyledInternalLink>*/}
                    {/*    ) : null}*/}
                    {/*  </RowBetween>*/}
                    {/*) : null}*/}
                  </AutoColumn>
                </OutlineCard>
              </>
            )}

            {showDetailed && (
              <>
                <CurrencyInputPanel
                  value={formattedAmounts[Field.LIQUIDITY]}
                  onUserInput={onLiquidityInput}
                  onMax={() => {
                    onUserInput(Field.LIQUIDITY_PERCENT, '100');
                  }}
                  showMaxButton={!atMaxAmount}
                  disableCurrencySelect
                  currency={pair?.liquidityToken}
                  pair={pair}
                  id="liquidity-amount"
                />
                <ColumnCenter>
                  <ArrowDown size="16" color={theme.text2} />
                </ColumnCenter>
                <CurrencyInputPanel
                  hideBalance={true}
                  value={formattedAmounts[Field.CURRENCY_A]}
                  onUserInput={onCurrencyAInput}
                  onMax={() => onUserInput(Field.LIQUIDITY_PERCENT, '100')}
                  showMaxButton={!atMaxAmount}
                  currency={currencyA}
                  label={'Output'}
                  onCurrencySelect={handleSelectCurrencyA}
                  id="remove-liquidity-tokena"
                />
                <StyledButtonNavigation>
                  <ColumnCenter>
                    <Plus size="16" color={theme.text2} />
                  </ColumnCenter>
                </StyledButtonNavigation>
                <CurrencyInputPanel
                  hideBalance={true}
                  value={formattedAmounts[Field.CURRENCY_B]}
                  onUserInput={onCurrencyBInput}
                  onMax={() => onUserInput(Field.LIQUIDITY_PERCENT, '100')}
                  showMaxButton={!atMaxAmount}
                  currency={currencyB}
                  label={'Output'}
                  onCurrencySelect={handleSelectCurrencyB}
                  id="remove-liquidity-tokenb"
                />
              </>
            )}
            {pair && (
              <div style={{ padding: '10px 20px' }}>
                <RowBetween>
                  Price:
                  <div>
                    1 {currencyA?.symbol} ={' '}
                    {tokenA ? tokenAmountToString(pair.priceOf(tokenA)) : '-'} {currencyB?.symbol}
                  </div>
                </RowBetween>
                <RowBetween>
                  <div />
                  <div>
                    1 {currencyB?.symbol} ={' '}
                    {tokenB ? tokenAmountToString(pair.priceOf(tokenB)) : '-'} {currencyA?.symbol}
                  </div>
                </RowBetween>
              </div>
            )}

            <div style={{ position: 'relative' }}>
              {!account ? (
                <ButtonLight onClick={toggleWalletModal}>Connect Wallet</ButtonLight>
              ) : (
                <RowBetween>
                  <ButtonConfirmed
                    onClick={approveCallback}
                    confirmed={approval === ApprovalState.APPROVED || signatureData !== null}
                    disabled={approval !== ApprovalState.NOT_APPROVED || signatureData !== null}
                    mr="0.5rem"
                    fontWeight={500}
                    fontSize={16}
                  >
                    {approval === ApprovalState.PENDING ? (
                      <Dots>Approving</Dots>
                    ) : approval === ApprovalState.APPROVED || signatureData !== null ? (
                      'Approved'
                    ) : (
                      'Approve'
                    )}
                  </ButtonConfirmed>
                  <ButtonError
                    onClick={() => {
                      setShowConfirm(true);
                    }}
                    // disabled={ !isValid || (signatureData === null) }
                    disabled={!isValid || approval !== ApprovalState.APPROVED}
                    error={
                      !isValid &&
                      !!parsedAmounts[Field.CURRENCY_A] &&
                      !!parsedAmounts[Field.CURRENCY_B]
                    }
                  >
                    <Text fontSize={16} fontWeight={500}>
                      {error || 'Remove'}
                    </Text>
                  </ButtonError>
                </RowBetween>
              )}
            </div>
          </AutoColumn>
        </Wrapper>
      </AppBody>

      {pair ? (
        <AutoColumn style={{ minWidth: '20rem', marginTop: '1rem' }}>
          <MinimalPositionCard showUnwrapped={false} pair={pair} />
        </AutoColumn>
      ) : null}
    </>
  );
}
