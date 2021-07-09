import { JSBI, TokenAmount } from '@uniswap/sdk';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ArrowDown, ArrowUp } from 'react-feather';
import { Text } from 'rebass';
import styled, { ThemeContext } from 'styled-components';
import { ButtonError, ButtonLight, ButtonPrimary } from '../../components/Button';
import Card, { GreyCard } from '../../components/Card';
import { AutoColumn } from '../../components/Column';
import ConfirmationModal from '../../components/ConfirmationModal';
import CurrencyInputPanel from '../../components/CurrencyInputPanel';
import { SwapPoolTabs, TabNames } from '../../components/NavigationTabs';
import { AutoRow, RowBetween } from '../../components/Row';
import BetterTradeLink from '../../components/swap/BetterTradeLink';
import confirmPriceImpactWithoutFee from '../../components/swap/confirmPriceImpactWithoutFee';
import { ArrowWrapper, BottomGrouping, Dots, ErrorText, Wrapper } from '../../components/swap/styleds';
import SwapModalFooter from '../../components/swap/SwapModalFooter';
import SwapModalHeader from '../../components/swap/SwapModalHeader';
import TradePrice from '../../components/swap/TradePrice';
import { TokenWarningCards } from '../../components/TokenWarningCard';
import { BETTER_TRADE_LINK_THRESHOLD, INITIAL_ALLOWED_SLIPPAGE } from '../../constants';
import { isTradeBetter } from '../../data/V1';
import { useActiveWeb3React } from '../../hooks';
import { ApprovalState, useApproveCallbackFromTrade } from '../../hooks/useApproveCallback';
import { useSwap } from '../../hooks/useSwapCallback';
import useToggledVersion, { Version } from '../../hooks/useToggledVersion';
import useWrapCallback, { WrapType } from '../../hooks/useWrapCallback';
// import { useTradeExactIn } from '../../hooks/Trades';
import { useToggleSettingsMenu, useWalletModalToggle } from '../../state/application/hooks';
import { Field } from '../../state/swap/actions';
import {
  useDefaultsFromURLSearch,
  useDerivedSwapInfo,
  useSwapActionHandlers,
  useSwapState,
} from '../../state/swap/hooks';
import { useExpertModeManager, useTokenWarningDismissal, useUserSlippageTolerance } from '../../state/user/hooks';
import { CursorPointer, ExternalGreenLink, StyledButtonNavigation, TYPE } from '../../theme';
import { maxAmountSpend } from '../../utils/maxAmountSpend';
import { computeSlippageAdjustedAmounts, computeTradePriceBreakdown, warningSeverity } from '../../utils/prices';
import AppBody from '../AppBody';
import { ClickableText } from '../Pool/styleds';
import { isUseOneSplitContract } from '../../utils';
import GasConsumption from '../../components/swap/GasConsumption';
import { BigNumber } from '@ethersproject/bignumber';
import { AdvancedSwapDetails } from '../../components/swap/AdvancedSwapDetails';
import { useTransactionPrice } from '../../hooks/useTransactionPrice';
import ReferralLink from '../../components/RefferalLink';

const GasFeeText = styled.div`
  margin-top: 8px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.darkText};
`;

export default function Swap() {
  useDefaultsFromURLSearch();

  const { account, chainId } = useActiveWeb3React();
  const theme = useContext(ThemeContext);

  // toggle wallet when disconnected
  const toggleWalletModal = useWalletModalToggle();

  // for expert mode
  const toggleSettings = useToggleSettingsMenu();
  const [expertMode] = useExpertModeManager();

  // get custom setting values for user
  const [allowedSlippage] = useUserSlippageTolerance();

  // swap state
  const { independentField, typedValue } = useSwapState();

  const { onSwitchTokens, onCurrencySelection, onUserInput } = useSwapActionHandlers();
  const {
    v1Trade,
    v2Trade,
    mooniswapTrade,
    currencyBalances,
    parsedAmount,
    currencies,
    error,
  } = useDerivedSwapInfo();

  let distribution: any[] = [];
  // mcck distibution
  if (mooniswapTrade?.[1]) {
    distribution = mooniswapTrade[1];
  } else {
    for (let i = 0; i < 35; i++) {
      distribution.push(BigNumber.from(i === 11 ? '100000000000000' : '000000000000000'));
    }
  }

  const { wrapType, execute: onWrap, error: wrapError } = useWrapCallback();
  // currencies[Field.INPUT],
  // currencies[Field.OUTPUT],
  // typedValue
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE;
  const toggledVersion = useToggledVersion();
  // const trade = showWrap
  //   ? undefined
  //   : {
  //       [Version.v1]: v1Trade,
  //       [Version.v2]: v2Trade,
  //       [Version.v3]: mooniswapTrade?.[0],
  //     }[toggledVersion];
  const trade = v2Trade;
  const betterTradeLinkVersion: Version | undefined =
    toggledVersion === Version.v2 && isTradeBetter(v2Trade, v1Trade, BETTER_TRADE_LINK_THRESHOLD)
      ? Version.v1
      : toggledVersion === Version.v1 && isTradeBetter(v1Trade, v2Trade)
      ? Version.v2
      : undefined;

  const parsedAmounts = showWrap
    ? {
      [Field.INPUT]: parsedAmount,
      [Field.OUTPUT]: parsedAmount,
    }
    : {
      [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
      [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
    };

  const isValid = !error;
  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT;

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value);
    },
    [onUserInput],
  );

  const handleTypeOutput = useCallback(
    (value: string) => {
      onUserInput(Field.OUTPUT, value);
    },
    [onUserInput],
  );

  // modal and loading
  const [showConfirm, setShowConfirm] = useState<boolean>(false); // show confirmation modal
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false); // waiting for user confirmaion/rejection
  const [txHash, setTxHash] = useState<string>('');
  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: showWrap
      ? parsedAmounts[independentField]?.toExact() ?? ''
      : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  };

  const [isEnough] = useTransactionPrice('swap');

  const route = trade?.route;
  const userHasSpecifiedInputOutput = Boolean(
    currencies[Field.INPUT] &&
    currencies[Field.OUTPUT] &&
    parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0)),
  );
  const noRoute = !route;

  // check whether the user has approved the router on the input token
  const [approval, approveCallback] = useApproveCallbackFromTrade(
    trade,
    distribution,
    allowedSlippage,
  );

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false);

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true);
    }
  }, [approval, approvalSubmitted]);

  const [gas, setGas] = useState(0);
  const [gasWhenUseChi, setGasWhenUseChi] = useState(0);

  const onReject = () => {
    setSwapErrorMessage('Transaction rejected.');
  };

  // the callback to execute the swap
  const [isChiApplied, swapCallback, estimate] = useSwap(
    chainId,
    parsedAmount,
    trade,
    distribution,
    allowedSlippage,
    formattedAmounts,
    onReject,
  );

  const srcAmount = trade?.inputAmount?.toExact();

  // TODO: for sure should be more elegant solution for estimation calls
  useEffect(() => {
    let unmounted = false;

    function handleStatusChange(result: number[]) {
      if (unmounted || !result || !result[1]) {
        return;
      }

      const gasWithoutChi = result[0];
      const gasWithChi = result[1];

      // As base gas amount on UI show the same amount of gas that metamask would show (red one)
      const gas = Math.round(gasWithChi / 1000);

      // Chi allow to safe up to 43% from original transaction (the one without CHI burn) green
      const gasWhenUseChi = Math.round((gasWithoutChi * 0.57) / 1000);
      //
      setGas(gas);
      setGasWhenUseChi(gasWhenUseChi);
    }

    srcAmount &&
    estimate &&
    estimate().then(result => {
      handleStatusChange(result);
    });

    // Specify how to clean up after this effect:
    return function cleanup() {
      unmounted = true;
    };

    // eslint-disable-next-line
  }, [srcAmount]);

  const maxAmountInput: TokenAmount | undefined = maxAmountSpend(currencyBalances[Field.INPUT]);
  const atMaxAmountInput = Boolean(
    maxAmountInput && parsedAmounts[Field.INPUT]?.equalTo(maxAmountInput),
  );

  const slippageAdjustedAmounts = computeSlippageAdjustedAmounts(trade, allowedSlippage);

  const { priceImpactWithoutFee, realizedLPFee } = computeTradePriceBreakdown(trade);

  function onSwap() {
    if (priceImpactWithoutFee && !confirmPriceImpactWithoutFee(priceImpactWithoutFee)) {
      return;
    }
    if (!swapCallback) {
      return;
    }
    setAttemptingTxn(true);
    swapCallback()
      .then(hash => {
        setAttemptingTxn(false);
        setTxHash(hash);

        // ReactGA.event({
        //   category: 'Swap',
        //   action: account
        //   label: [
        //     trade?.inputAmount?.token?.symbol,
        //     trade?.outputAmount?.token?.symbol,
        //     getTradeVersion(trade)
        //   ].join('/')
        // })
      })
      .catch(error => {
        setAttemptingTxn(false);
        // we only care if the error is something _other_ than the user rejected the tx
        if (error?.code !== 4001) {
          console.error(error);
        }
      });
  }

  // errors
  const [showInverted, setShowInverted] = useState<boolean>(false);

  const [swapErrorMessage, setSwapErrorMessage] = useState('');
  // warnings on slippage
  const priceImpactSeverity = warningSeverity(priceImpactWithoutFee);
  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode

  const showApproveFlow =
    (approval === ApprovalState.UNKNOWN ||
      approval === ApprovalState.NOT_APPROVED ||
      approval === ApprovalState.PENDING ||
      (approvalSubmitted && approval === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3 && !expertMode);

  function modalHeader() {
    return (
      <SwapModalHeader
        currencies={currencies}
        formattedAmounts={formattedAmounts}
        slippageAdjustedAmounts={slippageAdjustedAmounts}
        priceImpactSeverity={priceImpactSeverity}
        independentField={independentField}
        recipient={account as string | null}
      />
    );
  }

  function modalBottom() {
    return (
      <SwapModalFooter
        confirmText={priceImpactSeverity > 2 ? 'Swap Anyway' : 'Confirm Swap'}
        showInverted={showInverted}
        severity={priceImpactSeverity}
        setShowInverted={setShowInverted}
        onSwap={onSwap}
        realizedLPFee={realizedLPFee}
        parsedAmounts={parsedAmounts}
        priceImpactWithoutFee={priceImpactWithoutFee}
        slippageAdjustedAmounts={slippageAdjustedAmounts}
        trade={trade}
      />
    );
  }

  // text to show while loading
  const pendingText = `Swapping ${parsedAmounts[Field.INPUT]?.toSignificant(6)} ${
    currencies[Field.INPUT]?.symbol
  } for ${parsedAmounts[Field.OUTPUT]?.toSignificant(6)} ${currencies[Field.OUTPUT]?.symbol}`;

  const [dismissedToken0] = useTokenWarningDismissal(chainId, currencies[Field.INPUT]);
  const [dismissedToken1] = useTokenWarningDismissal(chainId, currencies[Field.OUTPUT]);
  const showWarning =
    (!dismissedToken0 && !!currencies[Field.INPUT]) ||
    (!dismissedToken1 && !!currencies[Field.OUTPUT]);

  const notEnoughBalance =
    maxAmountInput?.raw && parsedAmounts[Field.INPUT]?.raw && JSBI.lessThan(maxAmountInput.raw, parsedAmounts[Field.INPUT]!.raw);

  return (
    <>
      {showWarning && <TokenWarningCards currencies={currencies}/>}
      <AppBody disabled={showWarning}>
        <SwapPoolTabs active={TabNames.SWAP}/>
        <Wrapper id="swap-page">
          <ConfirmationModal
            isOpen={showConfirm}
            title="Confirm Swap"
            onDismiss={() => {
              setShowConfirm(false);
              setSwapErrorMessage('');
              // if there was a tx hash, we want to clear the input
              if (txHash) {
                onUserInput(Field.INPUT, '');
              }
              setTxHash('');
            }}
            attemptingTxn={attemptingTxn}
            hash={txHash}
            topContent={modalHeader}
            bottomContent={modalBottom}
            pendingText={pendingText}
            swapErrorMessage={swapErrorMessage}
          />

          <AutoColumn gap={'md'}>
            <CurrencyInputPanel
              label={independentField === Field.OUTPUT && !showWrap ? 'From (estimated)' : 'From'}
              value={formattedAmounts[Field.INPUT]}
              showMaxButton={!atMaxAmountInput}
              currency={currencies[Field.INPUT]}
              onUserInput={handleTypeInput}
              onMax={() => {
                maxAmountInput && onUserInput(Field.INPUT, maxAmountInput.toExact());
              }}
              onCurrencySelect={currency => {
                setApprovalSubmitted(false); // reset 2 step UI for approvals
                onCurrencySelection(Field.INPUT, currency);
              }}
              otherCurrency={currencies[Field.OUTPUT]}
              id="swap-currency-input"
              currencyBalance={currencyBalances[Field.INPUT]}
              isDepended={dependentField === Field.INPUT}
              showMaxError
            />

            <CursorPointer>
              <StyledButtonNavigation
                onClick={() => {
                  setApprovalSubmitted(false); // reset 2 step UI for approvals
                  onSwitchTokens(formattedAmounts[Field.OUTPUT]);
                }}
              >
                <AutoColumn justify="space-between">
                  <AutoRow justify="space-between" style={{ padding: '0 1rem' }}>
                    <ArrowWrapper clickable>
                      <ArrowDown
                        size="16"
                        color={
                          currencies[Field.INPUT] && currencies[Field.OUTPUT]
                            ? theme.green
                            : theme.darkWhite
                        }
                      />
                      <span style={{ marginLeft: '-3px' }}>
                        <ArrowUp
                          size="16"
                          color={
                            currencies[Field.INPUT] && currencies[Field.OUTPUT]
                              ? theme.red
                              : theme.darkWhite
                          }
                        />
                      </span>
                    </ArrowWrapper>
                  </AutoRow>
                </AutoColumn>
              </StyledButtonNavigation>
            </CursorPointer>
            <CurrencyInputPanel
              value={formattedAmounts[Field.OUTPUT]}
              onUserInput={handleTypeOutput}
              label={independentField === Field.INPUT && !showWrap ? 'To (estimated)' : 'To'}
              showMaxButton={false}
              currency={currencies[Field.OUTPUT]}
              onCurrencySelect={address => onCurrencySelection(Field.OUTPUT, address)}
              otherCurrency={currencies[Field.INPUT]}
              id="swap-currency-output"
              currencyBalance={currencyBalances[Field.OUTPUT]}
              isDepended={dependentField === Field.OUTPUT}
            />

            {showWrap ? null : (
              <Card padding={'.25rem .75rem 0 .75rem'} borderRadius={'20px'}>
                <AutoColumn gap="4px">
                  <RowBetween align="center">
                    <Text fontWeight={500} fontSize={14} color={theme.text2}>
                      Price
                    </Text>
                    <TradePrice
                      inputCurrency={currencies[Field.INPUT]}
                      outputCurrency={currencies[Field.OUTPUT]}
                      price={trade?.executionPrice}
                      showInverted={showInverted}
                      setShowInverted={setShowInverted}
                    />
                  </RowBetween>

                  {isChiApplied && gas ? (
                    <RowBetween align="center">
                      <Text fontWeight={500} fontSize={14} color={theme.text2}>
                        Gas consumption
                      </Text>
                      {<GasConsumption gas={gas} gasWhenUseChi={gasWhenUseChi}/>}
                    </RowBetween>
                  ) : (
                    ''
                  )}

                  {allowedSlippage !== INITIAL_ALLOWED_SLIPPAGE && (
                    <RowBetween align="center">
                      <ClickableText
                        fontWeight={500}
                        fontSize={14}
                        color={theme.text2}
                        onClick={toggleSettings}
                      >
                        Slippage Tolerance
                      </ClickableText>
                      <ClickableText
                        fontWeight={500}
                        fontSize={14}
                        color={theme.text2}
                        onClick={toggleSettings}
                      >
                        {allowedSlippage ? allowedSlippage / 100 : '-'}%
                      </ClickableText>
                    </RowBetween>
                  )}
                </AutoColumn>
              </Card>
            )}
          </AutoColumn>
          <BottomGrouping>
            {!account ? (
              <ButtonLight onClick={toggleWalletModal}>Connect Wallet</ButtonLight>
            ) : showWrap ? (
              <ButtonPrimary disabled={Boolean(wrapError)} onClick={onWrap}>
                {wrapError ??
                (wrapType === WrapType.WRAP
                  ? 'Wrap'
                  : wrapType === WrapType.UNWRAP
                    ? 'Unwrap'
                    : null)}
              </ButtonPrimary>
            ) : noRoute && userHasSpecifiedInputOutput && !isUseOneSplitContract(distribution) ? (
              <GreyCard style={{ textAlign: 'center' }}>
                <TYPE.main mb="4px">Insufficient liquidity for this trade.</TYPE.main>
              </GreyCard>
            ) : showApproveFlow ? (
              <RowBetween>
                <ButtonPrimary
                  onClick={approveCallback}
                  disabled={approval !== ApprovalState.NOT_APPROVED || approvalSubmitted}
                  width="48%"
                  altDisbaledStyle={approval === ApprovalState.PENDING} // show solid button while waiting
                >
                  {approval === ApprovalState.PENDING ? (
                    <Dots>Approving</Dots>
                  ) : approvalSubmitted && approval === ApprovalState.APPROVED ? (
                    'Approved'
                  ) : approval === ApprovalState.UNKNOWN ? (
                    <Dots>Approve checking</Dots>
                  ) : (
                    'Approve ' + currencies[Field.INPUT]?.symbol
                  )}
                </ButtonPrimary>
                <ButtonError
                  onClick={() => {
                    expertMode ? onSwap() : setShowConfirm(true);
                  }}
                  width="48%"
                  id="swap-button"
                  disabled={
                    !isValid ||
                    approval !== ApprovalState.APPROVED ||
                    (priceImpactSeverity > 3 && !expertMode) ||
                    notEnoughBalance
                  }
                  error={isValid && priceImpactSeverity > 2}
                >
                  <Text fontSize={16} fontWeight={450}>
                    {notEnoughBalance
                      ? `Not enough balance`
                      : priceImpactSeverity > 3 && !expertMode
                        ? `Price Impact High`
                        : `Swap${priceImpactSeverity > 2 ? ' Anyway' : ''}`}
                  </Text>
                </ButtonError>
              </RowBetween>
            ) : (
              <ButtonError
                onClick={() => {
                  expertMode ? onSwap() : setShowConfirm(true);
                }}
                id="swap-button"
                disabled={!isValid || (priceImpactSeverity > 3 && !expertMode) || notEnoughBalance}
                error={isValid && priceImpactSeverity > 2}
              >
                <Text fontSize={16} fontWeight={450}>
                  {error
                    ? error
                    : notEnoughBalance
                      ? `Not enough balance`
                      : priceImpactSeverity > 3 && !expertMode
                        ? `Price Impact Too High`
                        : `Swap${priceImpactSeverity > 2 ? ' Anyway' : ''}`}
                </Text>
              </ButtonError>
            )}
            {betterTradeLinkVersion && <BetterTradeLink version={betterTradeLinkVersion}/>}
            {!isEnough && (
              <ErrorText fontWeight={500} fontSize="11pt" severity={3}>
                Probably insufficient ETH balance
              </ErrorText>
            )}
          </BottomGrouping>
          <GasFeeText>100% gas fee refund</GasFeeText>
          <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
            <ExternalGreenLink href="https://wiki.emiswap.com/user-guide/how-to-make-swaps">
              Wiki How to make swaps?
            </ExternalGreenLink>
          </TYPE.black>
          <ReferralLink/>
        </Wrapper>
        <AdvancedSwapDetails trade={trade}/>
      </AppBody>
    </>
  );
}
