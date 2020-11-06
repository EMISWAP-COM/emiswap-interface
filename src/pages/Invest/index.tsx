import { TokenAmount, JSBI } from '@uniswap/sdk';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { Text } from 'rebass';
import styled, { ThemeContext } from 'styled-components';
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
import OrdinaryIcon from '../../assets/svg/CardIcon/ordinary.svg';
import CommonIcon from '../../assets/svg/CardIcon/common.svg';
import UnusualIcon from '../../assets/svg/CardIcon/unusual.svg';
import RareIcon from '../../assets/svg/CardIcon/rare.svg';
import LegendaryIcon from '../../assets/svg/CardIcon/legendary.svg';
import Question from '../../assets/svg/FAQIcon/question.svg';
import FAQInfo from '../../components/FAQInfo';

const EmiCard = styled.div`
  .block-with-cards {
    position: absolute;
    width: 440px;
    height: 553px;
    background: #ffffff;
    border-radius: 24px;
    padding: 32px 40px;
    left: 0;
    top: 120px;
    bottom: 0;
    right: -210%;
    margin: auto;
    border: 1px solid #ecceff;

    .arrow-left {
      width: 0;
      height: 0;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-right: 10px solid #ecceff;
      position: absolute;
      left: -10px;
      top: 185px;
    }

    &__header {
      font-family: IBM Plex Sans;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 26px;
      display: flex;
      align-items: center;
      color: #24272c;
      margin-bottom: 24px;
    }

    &__cards {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .block-with-current-cards {
        width: 100%;
        display: flex;
        margin-bottom: 32px;
        padding-bottom: 32px;
        border-bottom: 1px solid #eaeeee;

        &__img {
          width: 80px;
          margin-right: 24px;
        }

        &__info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }

        &__title {
          font-family: IBM Plex Sans;
          font-style: normal;
          font-weight: 600;
          font-size: 36px;
          line-height: 47px;
          display: flex;
          align-items: center;
          text-align: center;
          color: #11b382;
        }

        &__text {
          font-family: IBM Plex Sans;
          font-style: normal;
          font-weight: 500;
          font-size: 20px;
          line-height: 32px;
          display: flex;
          align-items: center;
          text-align: center;
          letter-spacing: -0.01em;
          color: #24272c;
        }
      }

      .emicard {
        width: 100%;
        display: flex;
        margin-bottom: 16px;

        &__info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        &__img {
          margin-right: 24px;
        }

        &__title {
          font-family: IBM Plex Sans;
          font-style: normal;
          font-weight: 500;
          font-size: 18px;
          line-height: 23px;
          display: flex;
          align-items: center;
          letter-spacing: -0.01em;
          color: #24272c;
        }

        &__description {
          font-family: IBM Plex Sans;
          font-style: normal;
          font-weight: normal;
          font-size: 13px;
          line-height: 17px;
          display: flex;
          align-items: center;
          letter-spacing: -0.01em;
          color: #89919a;
        }

        &__description-card {
          font-family: IBM Plex Sans;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 160%;
          display: flex;
          align-items: center;
          color: #24272c;
        }

        .green-color {
          color: #11b382;
        }

        .ml-5 {
          margin-left: 5px;
        }

        .mr-5 {
          margin-right: 5px;
        }
      }
    }

    &__footer {
      font-family: IBM Plex Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 170%;
      display: flex;
      align-items: center;
      color: #24272c;
      margin-top: 20px;
    }

    &__btn {
      background: #e8f8f3;
      border-radius: 8px;
      margin-top: 16px;
      width: 360px;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      cursor: pointer;
      text-decoration: none;

      font-family: IBM Plex Sans;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 170%;
      display: flex;
      align-items: center;
      text-align: center;
      color: #11b382;
    }

    &__btn-img {
      position: absolute;
      left: 60px;
    }
  }

  .elem2 {
    height: 520px;
    top: 86px;
  }

  .elem1 {
    height: 460px;
    top: 26px;
  }
`;

const FAQWrapper = styled.div`
  max-width: 1200px;
  margin-top: 70px;

  @media screen and (max-width: 1300px) {
    max-width: 960px;
  }

  @media screen and (max-width: 1000px) {
    max-width: calc(100% - 20px);
  }

  @media screen and (max-width: 600px) {
    max-width: 100%;
  }
`;

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
    [onUserInput, currencies],
  );

  // modal and loading
  const [showConfirm, setShowConfirm] = useState<boolean>(false); // show confirmation modal
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false); // waiting for user confirmaion/rejection
  const [txHash, setTxHash] = useState<string>('');

  const formattedAmounts = {
    [Field.INPUT]: typedValue,
    [Field.OUTPUT]: tokenAmountToString(parsedAmounts[Field.OUTPUT], MAX_NUM_DECIMALS) ?? '',
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
        ReactGA.event({
          category: 'Crowdsale',
          action: 'Invest',
          label: 'buy',
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

  const generateEmiCardBlock = (num: Number) => {
    const ESWc = Number(num.toFixed(3));
    let rare = '';
    let NunOfCard = 0;
    if (ESWc > 0 && ESWc < 2500) {
      rare = 'Ordinary';
      NunOfCard = Math.floor(ESWc / 500);
    }
    if (ESWc >= 2500 && ESWc < 12500) {
      rare = 'Common';
      NunOfCard = Math.floor(ESWc / 2500);
    }
    if (ESWc >= 12500 && ESWc < 62500) {
      rare = 'Unusual';
      NunOfCard = Math.floor(ESWc / 12500);
    }
    if (ESWc >= 62500 && ESWc < 312500) {
      rare = 'Rare';
      NunOfCard = Math.floor(ESWc / 62500);
    }
    if (ESWc >= 312500) {
      rare = 'Legendary';
      NunOfCard = Math.floor(ESWc / 312500);
    }

    let bodyNode = (
      <div className="block-with-cards__cards">
        <div className="emicard">
          <img className="emicard__img" src={OrdinaryIcon} alt="Ordinary" />
          <div className="emicard__info">
            <div className="emicard__title">Ordinary</div>
            <div className="emicard__description">Non less than 500 ESW</div>
          </div>
        </div>
        <div className="emicard">
          <img className="emicard__img" src={CommonIcon} alt="Common" />
          <div className="emicard__info">
            <div className="emicard__title">Common</div>
            <div className="emicard__description">Non less than 2 500 ESW</div>
          </div>
        </div>
        <div className="emicard">
          <img className="emicard__img" src={UnusualIcon} alt="Unusual" />
          <div className="emicard__info">
            <div className="emicard__title">Unusual</div>
            <div className="emicard__description">Non less than 12 500 ESW</div>
          </div>
        </div>
        <div className="emicard">
          <img className="emicard__img" src={RareIcon} alt="Rare" />
          <div className="emicard__info">
            <div className="emicard__title">Rare</div>
            <div className="emicard__description">Non less than 62 500 ESW</div>
          </div>
        </div>
        <div className="emicard">
          <img className="emicard__img" src={LegendaryIcon} alt="Legendary" />
          <div className="emicard__info">
            <div className="emicard__title">Legendary</div>
            <div className="emicard__description">Non less than 312 500 ESW</div>
          </div>
        </div>
      </div>
    );

    if (rare === 'Ordinary') {
      const NumByGetMoreCard = (NunOfCard + 1) * 500;
      bodyNode = (
        <div className="block-with-cards__cards">
          <div className="block-with-current-cards">
            <img className="block-with-current-cards__img" src={OrdinaryIcon} alt="Ordinary" />
            <div className="block-with-current-cards__info">
              <div className="block-with-current-cards__title">
                {NunOfCard} {'Ordinary'}
              </div>
              <div className="block-with-current-cards__text">Card</div>
            </div>
          </div>
          {NunOfCard < 4 && (
            <div className="emicard">
              <img className="emicard__img" src={OrdinaryIcon} alt="Ordinary" />
              <div className="emicard__info">
                <div className="emicard__description-card">
                  Make purchase of <b className="green-color ml-5">{NumByGetMoreCard} ESWc</b>
                </div>
                <div className="emicard__description-card">
                  to get <b className="ml-5 mr-5">1</b> more <b className="ml-5">Ordinary card</b>
                </div>
              </div>
            </div>
          )}
          <div className="emicard">
            <img className="emicard__img" src={CommonIcon} alt="Common" />
            <div className="emicard__info">
              <div className="emicard__description-card">
                Make purchase of <b className="green-color ml-5">2500 ESWc</b>
              </div>
              <div className="emicard__description-card">
                to get <b className="ml-5">a Common card</b>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (rare === 'Common') {
      const NumByGetMoreCard = (NunOfCard + 1) * 2500;
      bodyNode = (
        <div className="block-with-cards__cards">
          <div className="block-with-current-cards">
            <img className="block-with-current-cards__img" src={CommonIcon} alt="Common" />
            <div className="block-with-current-cards__info">
              <div className="block-with-current-cards__title">
                {NunOfCard} {'Common'}
              </div>
              <div className="block-with-current-cards__text">Card</div>
            </div>
          </div>
          {NunOfCard < 4 && (
            <div className="emicard">
              <img className="emicard__img" src={CommonIcon} alt="Common" />
              <div className="emicard__info">
                <div className="emicard__description-card">
                  Make purchase of <b className="green-color ml-5">{NumByGetMoreCard} ESWc</b>
                </div>
                <div className="emicard__description-card">
                  to get <b className="ml-5 mr-5">1</b> more <b className="ml-5">Common card</b>
                </div>
              </div>
            </div>
          )}
          <div className="emicard">
            <img className="emicard__img" src={UnusualIcon} alt="Unusual" />
            <div className="emicard__info">
              <div className="emicard__description-card">
                Make purchase of <b className="green-color ml-5">12500 ESWc</b>
              </div>
              <div className="emicard__description-card">
                to get <b className="ml-5">a Unusual card</b>
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (rare === 'Unusual') {
      const NumByGetMoreCard = (NunOfCard + 1) * 12500;
      bodyNode = (
        <div className="block-with-cards__cards">
          <div className="block-with-current-cards">
            <img className="block-with-current-cards__img" src={UnusualIcon} alt="Unusual" />
            <div className="block-with-current-cards__info">
              <div className="block-with-current-cards__title">
                {NunOfCard} {'Unusual'}
              </div>
              <div className="block-with-current-cards__text">Card</div>
            </div>
          </div>
          {NunOfCard < 4 && (
            <div className="emicard">
              <img className="emicard__img" src={UnusualIcon} alt="Ordinary" />
              <div className="emicard__info">
                <div className="emicard__description-card">
                  Make purchase of <b className="green-color ml-5">{NumByGetMoreCard} ESWc</b>
                </div>
                <div className="emicard__description-card">
                  to get <b className="ml-5 mr-5">1</b> more <b className="ml-5">Unusual card</b>
                </div>
              </div>
            </div>
          )}
          <div className="emicard">
            <img className="emicard__img" src={RareIcon} alt="Rare" />
            <div className="emicard__info">
              <div className="emicard__description-card">
                Make purchase of <b className="green-color ml-5">62500 ESWc</b>
              </div>
              <div className="emicard__description-card">
                to get <b className="ml-5">a Rare card</b>
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (rare === 'Rare') {
      const NumByGetMoreCard = (NunOfCard + 1) * 62500;
      bodyNode = (
        <div className="block-with-cards__cards">
          <div className="block-with-current-cards">
            <img className="block-with-current-cards__img" src={RareIcon} alt="Rare" />
            <div className="block-with-current-cards__info">
              <div className="block-with-current-cards__title">
                {NunOfCard} {'Rare'}
              </div>
              <div className="block-with-current-cards__text">Card</div>
            </div>
          </div>
          {NunOfCard < 4 && (
            <div className="emicard">
              <img className="emicard__img" src={RareIcon} alt="Ordinary" />
              <div className="emicard__info">
                <div className="emicard__description-card">
                  Make purchase of <b className="green-color ml-5">{NumByGetMoreCard} ESWc</b>
                </div>
                <div className="emicard__description-card">
                  to get <b className="ml-5 mr-5">1</b> more <b className="ml-5">Rare card</b>
                </div>
              </div>
            </div>
          )}
          <div className="emicard">
            <img className="emicard__img" src={LegendaryIcon} alt="Legendary" />
            <div className="emicard__info">
              <div className="emicard__description-card">
                Make purchase of <b className="green-color ml-5">312500 ESWc</b>
              </div>
              <div className="emicard__description-card">
                to get <b className="ml-5">a Legendary card</b>
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (rare === 'Legendary') {
      const NumByGetMoreCard = (NunOfCard + 1) * 312500;
      bodyNode = (
        <div className="block-with-cards__cards">
          <div className="block-with-current-cards">
            <img className="block-with-current-cards__img" src={LegendaryIcon} alt="Legendary" />
            <div className="block-with-current-cards__info">
              <div className="block-with-current-cards__title">
                {NunOfCard} {'Legendary'}
              </div>
              <div className="block-with-current-cards__text">Card</div>
            </div>
          </div>
          <div className="emicard">
            <img className="emicard__img" src={LegendaryIcon} alt="Ordinary" />
            <div className="emicard__info">
              <div className="emicard__description-card">
                Make purchase of <b className="green-color ml-5">{NumByGetMoreCard} ESWc</b>
              </div>
              <div className="emicard__description-card">
                to get <b className="ml-5 mr-5">1</b> more <b className="ml-5">Legendary card</b>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const getClassToEmiCardsBlock = (ESWc: Number) => {
      if (ESWc >= 312500 || NunOfCard === 4) {
        return 'block-with-cards elem1';
      }
      if (ESWc > 0 && ESWc < 312500) {
        return 'block-with-cards elem2';
      }

      return 'block-with-cards';
    };

    return (
      <div className={getClassToEmiCardsBlock(ESWc)}>
        <div className="block-with-cards__header">
          {ESWc > 0 ? 'You will get:' : 'Buy ESWc to get Magic NFT EmiCards'}
        </div>
        {bodyNode}
        <div className="block-with-cards__footer">
          Fill the amount of ESWc for purchase to see the NFT cards you will get
        </div>
        <a
          href="https://crowdsale.emidao.org/magic-nft"
          target="_blank"
          rel="noopener noreferrer"
          className="block-with-cards__btn"
        >
          <img className="block-with-cards__btn-img" src={Question} alt="Question" />
          What is NFT Magic Card?
        </a>
        <div className="arrow-left" />
      </div>
    );
  };

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
        <EmiCard>{generateEmiCardBlock(Number(formattedAmounts[Field.OUTPUT]))}</EmiCard>
      </AppBody>
      <FAQWrapper>
        <FAQInfo />
      </FAQWrapper>
    </>
  );
};

export default Invest;
