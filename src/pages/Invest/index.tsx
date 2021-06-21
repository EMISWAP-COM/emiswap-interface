import { TokenAmount } from '@uniswap/sdk';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { Text } from 'rebass';
import { ThemeContext } from 'styled-components';
import { useSelector } from 'react-redux';
import { ButtonError, ButtonLight, ButtonPrimary } from '../../components/Button';
import { AutoColumn } from '../../components/Column';
import ConfirmationModal from '../../components/ConfirmationModal';
import CurrencyInputPanel from '../../components/CurrencyInputPanel';
import { RowBetween } from '../../components/Row';
import { BottomGrouping, Dots, Wrapper } from '../../components/invest/styleds';
import InvestModalFooter from '../../components/invest/InvestModalFooter';
import InvestModalHeader from '../../components/invest/InvestModalHeader';
import TradePrice from '../../components/invest/TradePrice';
import { TokenWarningCards } from '../../components/TokenWarningCard';
import { useActiveWeb3React } from '../../hooks';
import { ApprovalState, useApproveCallback } from '../../hooks/useApproveCallback';
import { useInvest } from '../../hooks/useInvestCallback';
import { useWalletModalToggle } from '../../state/application/hooks';
import { Field } from '../../state/invest/actions';
import {
  useDefaultsFromURLSearch,
  useDerivedInvestInfo,
  useInvestActionHandlers,
  useInvestState,
} from '../../state/invest/hooks';
import { useExpertModeManager, useTokenWarningDismissal } from '../../state/user/hooks';
import { maxAmountSpendInvest } from '../../utils/maxAmountSpend';
import AppBody from '../AppBody';
import { SwapPoolTabs, TabNames } from '../../components/NavigationTabs';
import { EMISWAP_CROWDSALE_ADDRESS } from '../../constants/abis/crowdsale';
import { tokenAmountToString } from '../../utils/formats';
import { AppState } from '../../state';
import { UserRoles } from '../../components/WalletModal';
import { useTransactionPrice } from '../../hooks/useTransactionPrice';
import { ErrorText } from '../../components/swap/styleds';
import { EmiCardsBlock } from './EmiCardsBlock';
import { InvestRules } from './InvestRules';
import { InvestRequestStatus } from '../../state/user/reducer';
import Loader from '../../components/Loader';
import ReferralLink from '../../components/RefferalLink';

const Invest = () => {
  useDefaultsFromURLSearch();

  // const dispatch = useDispatch<AppDispatch>();

  const { account, chainId } = useActiveWeb3React();
  const theme = useContext(ThemeContext);

  const [isTransactionFeeCovered] = useTransactionPrice('invest');

  // toggle wallet when disconnected
  const toggleWalletModal = useWalletModalToggle();

  // for expert mode
  const [expertMode] = useExpertModeManager();

  // invest state
  const { independentField, typedValue, outputAmount } = useInvestState();

  const { onCurrencySelection, onUserInput } = useInvestActionHandlers();
  const {
    currencyBalances,
    parsedAmount,
    parsedOutputAmount,
    currencies,
    error,
  } = useDerivedInvestInfo();

  const role: UserRoles | null = useSelector((state: AppState) => state.user.info?.role);
  const investRequestStatus = useSelector((state: AppState) => state.user.info?.invest_request_state);
  const launchpadState = useSelector((state: AppState) => state.launchpad);

  const investGranted = investRequestStatus === InvestRequestStatus.ACCEPTED;

  const parsedAmounts = {
    [Field.INPUT]: parsedAmount,
    [Field.OUTPUT]: parsedOutputAmount,
  };

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value, currencies[Field.INPUT]);
    },
    [onUserInput, currencies],
  );

  const handleTypeInputOUTPUT = useCallback(
    (value: string) => {
      onUserInput(Field.OUTPUT, value, currencies[Field.INPUT]);
    },
    [onUserInput, currencies],
  );

  // modal and loading
  const [showConfirm, setShowConfirm] = useState<boolean>(false); // show confirmation modal
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false); // waiting for user confirmaion/rejection
  const [txHash, setTxHash] = useState<string>('');

  const returnFormattedAmount = (bool: boolean) => {
    if (bool) {
      return typedValue;
    } else {
      return outputAmount;
    }
  };

  const formattedAmounts = {
    [Field.INPUT]: returnFormattedAmount(independentField === Field.INPUT),
    [Field.OUTPUT]: returnFormattedAmount(independentField === Field.OUTPUT),
  };

  // check whether the user has approved the router on the input token
  const [approval, approveCallback] = useApproveCallback(parsedAmount, EMISWAP_CROWDSALE_ADDRESS);

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false);

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true);
    }
  }, [approval, approvalSubmitted]);

  /*useEffect(() => {
    dispatch(loadLaunchpadStatus(account) as any);
  }, [dispatch, account]);*/

  // the callback to execute the invest
  const [investCallback] = useInvest(
    chainId,
    currencies,
    parsedAmounts,
    independentField === Field.OUTPUT,
  );

  const maxAmountInput: TokenAmount | undefined = maxAmountSpendInvest(
    currencyBalances[Field.INPUT],
  );


  const atMaxAmountInput = Boolean(
    maxAmountInput && parsedAmounts[Field.INPUT]?.equalTo(maxAmountInput),
  );

  function onInvest() {
    if (!investCallback) {
      return;
    }
    setAttemptingTxn(true);
    investCallback()
      .then((hash: string) => {
        const isBuyESW = independentField === Field.OUTPUT;
        setAttemptingTxn(false);
        setTxHash(hash);
        ReactGA.event({
          category: 'Crowdsale',
          action: 'Invest',
          label: `buy ${formattedAmounts[Field[isBuyESW ? 'OUTPUT' : 'INPUT']]} ${
            currencies[Field[isBuyESW ? 'OUTPUT' : 'INPUT']]?.symbol
          }`,
        });
        ReactGA.event({
          category: 'purchase',
          action: 'invest',
          value: Number(parsedAmounts[Field.OUTPUT]?.toExact()),
        });
      })
      .catch((error: any) => {
        setAttemptingTxn(false);
        // we only care if the error is something _other_ than the user rejected the tx
        if (error?.code !== 4001) {
          console.error(error);
        }
      });
  }

  // errors
  const [showInverted, setShowInverted] = useState<boolean>(false);

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow = investGranted &&
    !error &&
    (approval === ApprovalState.NOT_APPROVED ||
      approval === ApprovalState.PENDING ||
      (approvalSubmitted && approval === ApprovalState.APPROVED));

  function modalHeader() {
    return (
      <InvestModalHeader
        currencies={currencies}
        formattedAmounts={formattedAmounts}
        independentField={independentField}
        recipient={account as string | null}
      />
    );
  }

  function modalBottom() {
    return (
      <InvestModalFooter
        confirmText={'Confirm Invest'}
        showInverted={showInverted}
        setShowInverted={setShowInverted}
        onInvest={onInvest}
        parsedAmounts={parsedAmounts}
        currencies={currencies}
      />
    );
  }

  const generateInvestButtonGroup = () => {
    return (
      <>
        <RowBetween>
          {showApproveFlow && (
            <ButtonPrimary
              onClick={approveCallback}
              disabled={approval !== ApprovalState.NOT_APPROVED || approvalSubmitted}
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
          )
          }
          <ButtonError
            onClick={() => {
              expertMode ? onInvest() : setShowConfirm(true);
            }}
            id="invest-button"
            disabled={true /*!!error || approval !== ApprovalState.APPROVED*/}
            error={investGranted && !!error}
          >
            <Text fontSize={16} fontWeight={450}>
              {investGranted && error ? error : `Invest`}
            </Text>
          </ButtonError>

        </RowBetween>
        {!error && !isTransactionFeeCovered && (
          <ErrorText style={{ marginTop: 4 }} fontWeight={500} fontSize="11pt" severity={3}>
            Probably insufficient ETH for transaction fee
          </ErrorText>
        )}
      </>

    );
  };

  // text to show while loading
  const pendingText = `Investing ${tokenAmountToString(parsedAmounts[Field.INPUT])} ${
    currencies[Field.INPUT]?.symbol
  } for ${tokenAmountToString(parsedAmounts[Field.OUTPUT])} ${currencies[Field.OUTPUT]?.symbol}`;

  const [dismissedToken0] = useTokenWarningDismissal(chainId, currencies[Field.INPUT]);
  const [dismissedToken1] = useTokenWarningDismissal(chainId, currencies[Field.OUTPUT]);
  const showWarning = (!dismissedToken0 && !!currencies[Field.INPUT]) ||
    (!dismissedToken1 && !!currencies[Field.OUTPUT]);

  return (
    <>
      {showWarning && <TokenWarningCards currencies={currencies}/>}
      <AppBody
        disabled={showWarning}
        className={`invest-mobile ${role === UserRoles.distributor ? 'mb650' : ''}`}
      >
        <SwapPoolTabs active={TabNames.INVEST}/>
        <Wrapper id="invest-page">
          <ConfirmationModal
            isOpen={showConfirm}
            title="Confirm Invest"
            onDismiss={() => {
              setShowConfirm(false);
              // if there was a tx hash, we want to clear the input
              if (txHash) {
                onUserInput(Field.INPUT, '', currencies[Field.INPUT]);
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
              disabled={role === UserRoles.distributor}
              onMax={() => {
                maxAmountInput &&
                onUserInput(Field.INPUT, maxAmountInput.toExact(), currencies[Field.INPUT]);
              }}
              onCurrencySelect={currency => {
                setApprovalSubmitted(false); // reset 2 step UI for approvals
                onCurrencySelection(Field.INPUT, currency, formattedAmounts[Field.INPUT]);
              }}
              otherCurrency={currencies[Field.OUTPUT]}
              id="invest-currency-input"
              isCrowdsale
            />
            <CurrencyInputPanel
              disabled={role === UserRoles.distributor}
              value={formattedAmounts[Field.OUTPUT]}
              onUserInput={handleTypeInputOUTPUT}
              label={independentField === Field.INPUT ? 'To (estimated)' : 'To'}
              showMaxButton={false}
              currency={currencies[Field.OUTPUT]}
              id="swap-currency-output"
              isCrowdsale
              disableCurrencySelect
            />

            <AutoColumn gap="4px">
              <RowBetween align="center">
                <Text fontWeight={500} fontSize={16} color={theme.text1}>
                  Price
                </Text>
                <TradePrice
                  parsedAmounts={parsedAmounts}
                  inputCurrency={currencies[Field.INPUT]}
                  outputCurrency={currencies[Field.OUTPUT]}
                  showInverted={showInverted}
                  setShowInverted={setShowInverted}
                />
              </RowBetween>
            </AutoColumn>
          </AutoColumn>

          {!launchpadState.loaded ? (
            <div style={{ paddingTop: 24 }}>
              <Loader size="100px"/>
            </div>
          ) : (
            <>
              <AutoColumn gap={'md'}>
                <BottomGrouping>
                  {!account ? (
                    <ButtonLight onClick={toggleWalletModal}>Connect Wallet</ButtonLight>
                  ) : (
                    generateInvestButtonGroup()
                  )}
                </BottomGrouping>
              </AutoColumn>

              <InvestRules/>

              <ReferralLink/>
            </>
          )}

        </Wrapper>
        {role === UserRoles.distributor &&
        <EmiCardsBlock
          outputNum={Number(formattedAmounts[Field.OUTPUT])}
          formattedAmounts={formattedAmounts}
          handleTypeInputOUTPUT={handleTypeInputOUTPUT}
        />
        }
      </AppBody>
    </>
  );
};

export default Invest;
