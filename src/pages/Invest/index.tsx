import { TokenAmount, JSBI } from '@uniswap/sdk';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Text } from 'rebass';
import { ThemeContext } from 'styled-components';
import { ButtonError, ButtonLight, ButtonPrimary } from '../../components/Button';
import Card from '../../components/Card';
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
import ReferralLink from '../../components/RefferalLink';
import { SwapPoolTabs } from '../../components/NavigationTabs';
import { EMISWAP_CROWDSALE_ADDRESS } from '../../constants/abis/crowdsale';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { MAX_NUM_DECIMALS } from '../../constants';
import { tokenAmountToString } from '../../utils/formats';

export function RedirectPathToInvestOnly({ location }: RouteComponentProps) {
  return <Redirect to={{ ...location, pathname: '/invest' }} />;
}


const Invest = () => {
  useDefaultsFromURLSearch();

  const { account, chainId } = useActiveWeb3React();
  const theme = useContext(ThemeContext);

  // toggle wallet when disconnected
  const toggleWalletModal = useWalletModalToggle();

  // for expert mode
  const [expertMode] = useExpertModeManager();

  // invest state
  const { independentField, typedValue } = useInvestState();

  const { onCurrencySelection, onUserInput } = useInvestActionHandlers();
  const {
    currencyBalances,
    parsedAmount,
    parsedOutputAmount,
    currencies,
    error,
  } = useDerivedInvestInfo();

  const parsedAmounts = {
    [Field.INPUT]: parsedAmount,
    [Field.OUTPUT]: parsedOutputAmount,
  };

  const isValid = !error;

  const handleNothing = () => {};

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value, currencies[Field.INPUT]);
    },
    [
      onUserInput, 
      currencies, 
    ],
  );

  // modal and loading
  const [showConfirm, setShowConfirm] = useState<boolean>(false); // show confirmation modal
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false); // waiting for user confirmaion/rejection
  const [txHash, setTxHash] = useState<string>('');

  const formattedAmounts = {
    [Field.INPUT]: typedValue,
    [Field.OUTPUT]: tokenAmountToString(parsedAmounts[Field.OUTPUT], MAX_NUM_DECIMALS) ?? '',
  };

  console.info("EMISWAP_CROWDSALE_ADDRESS: ", EMISWAP_CROWDSALE_ADDRESS);
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

  // the callback to execute the invest
  const [investCallback] = useInvest(chainId, currencies, parsedAmounts);

  const maxAmountInput: TokenAmount | undefined = maxAmountSpendInvest(currencyBalances[Field.INPUT]);
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
        setAttemptingTxn(false);
        setTxHash(hash);
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
  const showApproveFlow =
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

  // text to show while loading
  const pendingText = `Investing ${tokenAmountToString(parsedAmounts[Field.INPUT])} ${
    currencies[Field.INPUT]?.symbol
  } for ${tokenAmountToString(parsedAmounts[Field.OUTPUT])} ${currencies[Field.OUTPUT]?.symbol}`;

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
        <SwapPoolTabs active={'invest'} />
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
              value={formattedAmounts[Field.OUTPUT]}
              onUserInput={handleNothing}
              label={independentField === Field.INPUT ? 'To (estimated)' : 'To'}
              showMaxButton={false}
              currency={currencies[Field.OUTPUT]}
              id="swap-currency-output"
              disableCurrencySelect
              isCrowdsale
            />

            <Card padding={'.25rem .75rem 0 .75rem'} borderRadius={'20px'}>
              <AutoColumn gap="4px">
                <RowBetween align="center">
                  <Text fontWeight={500} fontSize={14} color={theme.text2}>
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
                    disabled={!isValid || approval !== ApprovalState.APPROVED || notEnoughBalance}
                    error={!isValid || notEnoughBalance}
                  >
                    <Text fontSize={16} fontWeight={450}>
                      {notEnoughBalance ? `Not enough balance` : `Invest`}
                    </Text>
                  </ButtonError>
                </RowBetween>
              ) : (
                <ButtonError
                  onClick={() => {
                    expertMode ? onInvest() : setShowConfirm(true);
                  }}
                  id="invest-button"
                  disabled={!isValid || notEnoughBalance}
                  error={!!error}
                >
                  <Text fontSize={16} fontWeight={450}>
                    {error ? error : notEnoughBalance ? `Not enough balance` : `Invest`}
                  </Text>
                </ButtonError>
              )}
            </BottomGrouping>
          </AutoColumn>
          {account ? <ReferralLink /> : ''}
        </Wrapper>
      </AppBody>
    </>
  );
};

export default Invest;
