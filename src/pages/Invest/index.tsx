import { TokenAmount, JSBI } from '@uniswap/sdk';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Text } from 'rebass';
import { ThemeContext } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ButtonError, ButtonLight, ButtonPrimary } from '../../components/Button';
import Card, { GreyCard } from '../../components/Card';
import { AutoColumn } from '../../components/Column';
import ConfirmationModal from '../../components/ConfirmationModal';
import CurrencyInputPanel from '../../components/CurrencyInputPanel';
import { RowBetween } from '../../components/Row';
import AdvancedInvestDetailsDropdown from '../../components/invest/AdvancedInvestDetailsDropdown';
import confirmPriceImpactWithoutFee from '../../components/invest/confirmPriceImpactWithoutFee';
import { BottomGrouping, Dots, Wrapper } from '../../components/invest/styleds';
import InvestModalFooter from '../../components/invest/InvestModalFooter';
import InvestModalHeader from '../../components/invest/InvestModalHeader';
import TradePrice from '../../components/invest/TradePrice';
import { TokenWarningCards } from '../../components/TokenWarningCard';
import { INITIAL_ALLOWED_SLIPPAGE } from '../../constants';
import { useActiveWeb3React } from '../../hooks';
import { ApprovalState, useApproveCallbackFromTrade } from '../../hooks/useApproveCallback';
import { useInvest } from '../../hooks/useInvestCallback';
import useToggledVersion, { Version } from '../../hooks/useToggledVersion';
import { useToggleSettingsMenu, useWalletModalToggle } from '../../state/application/hooks';
import { Field } from '../../state/invest/actions';
import {
  useDefaultsFromURLSearch,
  useDerivedInvestInfo,
  useInvestActionHandlers,
  useInvestState,
} from '../../state/invest/hooks';
import {
  useExpertModeManager,
  useUserSlippageTolerance,
  useTokenWarningDismissal,
} from '../../state/user/hooks';
import { maxAmountSpend } from '../../utils/maxAmountSpend';
import {
  computeSlippageAdjustedAmounts,
  computeTradePriceBreakdown,
  warningSeverity,
} from '../../utils/prices';
import AppBody from '../AppBody';
import { ClickableText } from '../Pool/styleds';
import ReferralLink from '../../components/RefferalLink';
import { Tabs, TabsTitle } from './styleds';
import { useCurrencyBalance } from '../../state/wallet/hooks';

const Invest = () => {
  useDefaultsFromURLSearch();

  const { t } = useTranslation();
  const { account, chainId } = useActiveWeb3React();
  const theme = useContext(ThemeContext);

  // toggle wallet when disconnected
  const toggleWalletModal = useWalletModalToggle();

  // for expert mode
  const toggleSettings = useToggleSettingsMenu();
  const [expertMode] = useExpertModeManager();

  // get custom setting values for user
  const [allowedSlippage] = useUserSlippageTolerance();

  // invest state
  const { independentField, typedValue } = useInvestState();

  const { onCurrencySelection, onUserInput } = useInvestActionHandlers();
  const {
    v1Trade,
    v2Trade,
    mooniswapTrade,
    currencyBalances,
    parsedAmount,
    currencies,
    error,
  } = useDerivedInvestInfo();
  const selectedCurrencyBalance = useCurrencyBalance(account, currencies[Field.OUTPUT]);

  const distribution = mooniswapTrade?.[1];

  const toggledVersion = useToggledVersion();
  const trade = {
    [Version.v1]: v1Trade,
    [Version.v2]: v2Trade,
    [Version.v3]: mooniswapTrade?.[0],
  }[toggledVersion];

  const parsedAmounts = {
    [Field.INPUT]: parsedAmount,
    [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
  };

  const isValid = !error;
  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT;

  const handleNothing = () => {};

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value);
    },
    [onUserInput],
  );

  // modal and loading
  const [showConfirm, setShowConfirm] = useState<boolean>(false); // show confirmation modal
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false); // waiting for user confirmaion/rejection
  const [txHash, setTxHash] = useState<string>('');

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  };

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

  // the callback to execute the invest
  const [investCallback, estimate] = useInvest(
    chainId,
    parsedAmount,
    trade,
    distribution,
    allowedSlippage,
  );

  const srcAmount = trade?.inputAmount?.toExact();

  // TODO: for sure should be more elegant solution for estimation calls
  useEffect(() => {
    let unmounted = false;

    function handleStatusChange(result: Array<number | undefined> | undefined) {
      if (unmounted || !result || !result[1]) {
        return;
      }
    }

    srcAmount && estimate && estimate().then(result => handleStatusChange(result));

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

  function onInvest() {
    if (priceImpactWithoutFee && !confirmPriceImpactWithoutFee(priceImpactWithoutFee)) {
      return;
    }
    if (!investCallback) {
      return;
    }
    setAttemptingTxn(true);
    investCallback()
      .then(hash => {
        setAttemptingTxn(false);
        setTxHash(hash);
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

  // warnings on slippage
  const priceImpactSeverity = warningSeverity(priceImpactWithoutFee);

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    !error &&
    (approval === ApprovalState.NOT_APPROVED ||
      approval === ApprovalState.PENDING ||
      (approvalSubmitted && approval === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3 && !expertMode);

  function modalHeader() {
    return (
      <InvestModalHeader
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
      <InvestModalFooter
        confirmText={priceImpactSeverity > 2 ? 'Invest Anyway' : 'Confirm Invest'}
        showInverted={showInverted}
        severity={priceImpactSeverity}
        setShowInverted={setShowInverted}
        onInvest={onInvest}
        realizedLPFee={realizedLPFee}
        parsedAmounts={parsedAmounts}
        priceImpactWithoutFee={priceImpactWithoutFee}
        slippageAdjustedAmounts={slippageAdjustedAmounts}
        trade={trade}
      />
    );
  }

  // text to show while loading
  const pendingText = `Investing ${parsedAmounts[Field.INPUT]?.toSignificant(6)} ${
    currencies[Field.INPUT]?.symbol
  } for ${parsedAmounts[Field.OUTPUT]?.toSignificant(6)} ${currencies[Field.OUTPUT]?.symbol}`;

  const [dismissedToken0] = useTokenWarningDismissal(chainId, currencies[Field.INPUT]);
  const [dismissedToken1] = useTokenWarningDismissal(chainId, currencies[Field.OUTPUT]);
  const showWarning =
    (!dismissedToken0 && !!currencies[Field.INPUT]) ||
    (!dismissedToken1 && !!currencies[Field.OUTPUT]);

  const notEnoughBalance =
    maxAmountInput && parsedAmount && JSBI.lessThan(maxAmountInput.raw, parsedAmount.raw);

  return (
    <>
      {showWarning && <TokenWarningCards currencies={currencies} />}
      <AppBody disabled={!!showWarning}>
        <Tabs style={{ marginBottom: '24px' }}>
          <TabsTitle>{t('invest')}</TabsTitle>
        </Tabs>
        <Wrapper id="invest-page">
          <ConfirmationModal
            isOpen={showConfirm}
            title="Confirm Invest"
            onDismiss={() => {
              setShowConfirm(false);
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
          />

          <AutoColumn gap={'md'}>
            <CurrencyInputPanel
              label={independentField === Field.OUTPUT ? 'From (estimated)' : 'From'}
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
              id="invest-currency-input"
              isCrowdsale
            />

            <CurrencyInputPanel
              value={formattedAmounts[Field.OUTPUT]}
              onUserInput={handleNothing}
              label={independentField === Field.INPUT ? 'To (estimated)' : 'To'}
              showMaxButton={false}
              currency={currencies[Field.OUTPUT]}
              id="swap-currency-output"
              disableCurrencySelect
              hideBalance
              isCrowdsale
            />

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
          </AutoColumn>

          <AutoColumn gap={'md'}>
            <BottomGrouping>
              {!account ? (
                <ButtonLight onClick={toggleWalletModal}>Connect Wallet</ButtonLight>
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
                    ) : (
                      'Approve ' + currencies[Field.INPUT]?.symbol
                    )}
                  </ButtonPrimary>
                  <ButtonError
                    onClick={() => {
                      expertMode ? onInvest() : setShowConfirm(true);
                    }}
                    width="48%"
                    id="invest-button"
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
                        : `Invest${priceImpactSeverity > 2 ? ' Anyway' : ''}`}
                    </Text>
                  </ButtonError>
                </RowBetween>
              ) : (
                <ButtonError
                  onClick={() => {
                    expertMode ? onInvest() : setShowConfirm(true);
                  }}
                  id="invest-button"
                  disabled={
                    !isValid || (priceImpactSeverity > 3 && !expertMode) || notEnoughBalance
                  }
                  error={isValid && priceImpactSeverity > 2}
                >
                  <Text fontSize={16} fontWeight={450}>
                    {error
                      ? error
                      : notEnoughBalance
                      ? `Not enough balance`
                      : priceImpactSeverity > 3 && !expertMode
                      ? `Price Impact Too High`
                      : `Invest${priceImpactSeverity > 2 ? ' Anyway' : ''}`}
                  </Text>
                </ButtonError>
              )}
            </BottomGrouping>

            {account && (
              <CurrencyInputPanel
                value={selectedCurrencyBalance?.toSignificant(6)}
                onUserInput={handleNothing}
                label={'Current balance'}
                showMaxButton={false}
                currency={currencies[Field.OUTPUT]}
                id="invest-currency-balance"
                disableCurrencySelect
                hideBalance
                isCrowdsale
              />
            )}
          </AutoColumn>
          {account ? <ReferralLink /> : ''}
        </Wrapper>
      </AppBody>
      <AdvancedInvestDetailsDropdown trade={trade} />
    </>
  );
};

export default Invest;
