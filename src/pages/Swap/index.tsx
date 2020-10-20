import { TokenAmount, JSBI } from '@uniswap/sdk';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ArrowDown, ArrowUp } from 'react-feather';
import { Text } from 'rebass';
import { ThemeContext } from 'styled-components';
import { ButtonError, ButtonLight, ButtonPrimary } from '../../components/Button';
import Card, { GreyCard } from '../../components/Card';
import { AutoColumn } from '../../components/Column';
import ConfirmationModal from '../../components/ConfirmationModal';
import CurrencyInputPanel from '../../components/CurrencyInputPanel';
import { SwapPoolTabs } from '../../components/NavigationTabs';
import { AutoRow, RowBetween } from '../../components/Row';
import AdvancedSwapDetailsDropdown from '../../components/swap/AdvancedSwapDetailsDropdown';
import BetterTradeLink from '../../components/swap/BetterTradeLink';
import confirmPriceImpactWithoutFee from '../../components/swap/confirmPriceImpactWithoutFee';
import { ArrowWrapper, BottomGrouping, Dots, Wrapper } from '../../components/swap/styleds';
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
import { useToggleSettingsMenu, useWalletModalToggle } from '../../state/application/hooks';
import { Field } from '../../state/swap/actions';
import {
  useDefaultsFromURLSearch,
  useDerivedSwapInfo,
  useSwapActionHandlers,
  useSwapState,
} from '../../state/swap/hooks';
import {
  useExpertModeManager,
  useUserSlippageTolerance,
  useTokenWarningDismissal,
} from '../../state/user/hooks';
import { CursorPointer, StyledButtonNavigation, TYPE } from '../../theme';
import { maxAmountSpend } from '../../utils/maxAmountSpend';
import {
  computeSlippageAdjustedAmounts,
  computeTradePriceBreakdown,
  warningSeverity,
} from '../../utils/prices';
import AppBody from '../AppBody';
import { ClickableText } from '../Pool/styleds';
import { isUseOneSplitContract } from '../../utils';
import ReferralLink from '../../components/RefferalLink';
import GasConsumption from '../../components/swap/GasConsumption';

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

  const distribution = mooniswapTrade?.[1];

  const { wrapType, execute: onWrap, error: wrapError } = useWrapCallback();
  // currencies[Field.INPUT],
  // currencies[Field.OUTPUT],
  // typedValue
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE;
  const toggledVersion = useToggledVersion();
  const trade = showWrap
    ? undefined
    : {
        [Version.v1]: v1Trade,
        [Version.v2]: v2Trade,
        [Version.v3]: mooniswapTrade?.[0],
      }[toggledVersion];

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
        [Field.INPUT]: parsedAmount,
        // [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
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

  const handleNothing = () => {};

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

  // the callback to execute the swap
  const [isChiApplied, swapCallback, estimate] = useSwap(
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
    maxAmountInput && parsedAmount && JSBI.lessThan(maxAmountInput.raw, parsedAmount.raw);

  return (
    <>
      {showWarning && <TokenWarningCards currencies={currencies} />}
      <AppBody disabled={!!showWarning}>
        <SwapPoolTabs active={'swap'} />
        <Wrapper id="swap-page">
          <Text fontWeight={500} fontSize={20} color={theme.text2}>
            Coming soon!
          </Text>
        </Wrapper>
      </AppBody>
      <AdvancedSwapDetailsDropdown trade={trade} />
    </>
  );
}
