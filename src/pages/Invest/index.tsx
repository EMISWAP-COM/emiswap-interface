import { JSBI, TokenAmount } from '@uniswap/sdk';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { Text } from 'rebass';
import styled, { ThemeContext } from 'styled-components';
import { useSelector } from 'react-redux';
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
import { SwapPoolTabs } from '../../components/NavigationTabs';
import { EMISWAP_CROWDSALE_ADDRESS } from '../../constants/abis/crowdsale';
import { Redirect, RouteComponentProps } from 'react-router-dom';
// import { MAX_NUM_DECIMALS } from '../../constants';
import { tokenAmountToString } from '../../utils/formats';
import OrdinaryIcon from '../../assets/svg/CardIcon/ordinary.svg';
import UncommonIcon from '../../assets/svg/CardIcon/common.svg';
import RareIcon from '../../assets/svg/CardIcon/unusual.svg';
import EpicIcon from '../../assets/svg/CardIcon/rare.svg';
import LegendaryIcon from '../../assets/svg/CardIcon/legendary.svg';
import Basic from '../../assets/svg/CardIcon/basic.svg';
import Partner from '../../assets/svg/CardIcon/partner.svg';
import BasicPlus from '../../assets/svg/CardIcon/basic_plus.svg';
import Diamond from '../../assets/svg/CardIcon/diamond.svg';
import Enterprise from '../../assets/svg/CardIcon/enterprise.svg';
import Gold from '../../assets/svg/CardIcon/gold.svg';
import Silver from '../../assets/svg/CardIcon/silver.svg';
import Question from '../../assets/svg/FAQIcon/question.svg';
import EmiMagicBackground from '../../assets/svg/EmiMagicBackground.svg';
import EmiMagicCardModal from '../../components/EmiMagicCardModal';
import WarningBlock, { StyledButton } from '../../components/Warning/WarningBlock';
import useParsedQueryString from '../../hooks/useParsedQueryString';
import ReferralLink from '../../components/RefferalLink';
import { AppState } from '../../state';
import { UserRoles } from '../../components/WalletModal';
import { getPriceToNextStep } from './utils';
import {
  accountAmounts,
  basicCount,
  basicPlusCount,
  diamondCount,
  enterpriseCount,
  goldCount,
  PackageNames,
  partnerCount,
  silverCount,
} from '../../constants/invest';
import { useMockEstimate } from '../../hooks/useMockEstimate';
import { ErrorText } from '../../components/swap/styleds';

const EmiCard = styled.div`
  position: absolute;
  width: 440px;
  background: #ffffff;
  border-radius: 24px;
  padding: 32px 40px 20px;
  left: 0;
  top: 0;
  right: -210%;
  margin: 0 auto;
  border: 1px solid #ecceff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .arrow-left {
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid #ecceff;
    position: absolute;
    left: -10px;
    z-index: 100;
  }
  .arrow-left-white {
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid #fff;
    position: absolute;
    left: -9px;
    z-index: 110;
  }

  .arrow-position {
    &-1 {
      top: 130px;
    }
    &-2 {
      top: 225px;
    }
  }
  .block-with-cards {
    &__header {
      font-family: 'IBM Plex Sans', Arial, sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 26px;
      display: flex;
      align-items: center;
      color: #24272c;
      margin-bottom: 14px;
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
          font-family: 'IBM Plex Sans', Arial, sans-serif;
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
          font-family: 'IBM Plex Sans', Arial, sans-serif;
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
        margin-bottom: 10px;
        padding: 9px;
        border: 1px solid #ffffff;
        &__info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        &__img {
          margin-right: 24px;
        }

        &__title {
          font-family: 'IBM Plex Sans', Arial, sans-serif;
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
          font-family: 'IBM Plex Sans', Arial, sans-serif;
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
          font-family: 'IBM Plex Sans', Arial, sans-serif;
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
      font-family: 'IBM Plex Sans', Arial, sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 170%;
      display: flex;
      align-items: center;
      color: #24272c;
      margin-top: 10px;
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

      font-family: 'IBM Plex Sans', Arial, sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 170%;
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

  .active {
    border: ${({ theme }) => `1px solid ${theme.primary1}`}!important;
    border-radius: 24px;
  }

  .grey {
    color: ${({ theme }) => theme.grey6}!important;
    filter: grayscale(100%) !important;
    opacity: 0.5;
  }

  .grey-text {
    color: ${({ theme }) => theme.grey6}!important;
    opacity: 0.4;
  }

  @media screen and (max-width: 1400px) {
    width: 340px;
    right: -185%;
    padding: 20px;

    .block-with-cards {
      &__btn {
        width: 100%;
      }

      &__btn-img {
        left: 20px;
      }
    }
  }

  @media screen and (max-width: 1200px) {
    width: 100%;
    right: 0;
    top: 103%;

    .block-with-cards {
      &__btn {
        width: 100%;
      }

      &__btn-img {
        left: 20px;
      }
    }
    .arrow-left {
      border-right: 10px solid transparent;
      border-left: 10px solid transparent;
      border-bottom: 10px solid #ecceff;
      border-top: 0;
      position: absolute;
      left: 0;
      z-index: 100;
      right: 0;
      margin: auto;
      top: -10px;
    }
    .arrow-left-white {
      border-right: 10px solid transparent;
      border-left: 10px solid transparent;
      border-bottom: 10px solid #fff;
      border-top: 0;
      position: absolute;
      left: 0;
      z-index: 100;
      right: 0;
      margin: auto;
      top: -9px;
    }
  }
`;

const EmiMagicBtn = styled.div`
  background: url('${EmiMagicBackground}');
  background-repeat: no-repeat;
  width: 100%;
  background-size: cover;
  border-radius: 8px;
  height: 56px;
  color: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  margin-top: 10px;
`;

const EmiCardHeader = styled.div`
  color: #e50606;
  font-size: 1rem;

  span {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export function RedirectPathToInvestOnly({ location }: RouteComponentProps) {
  return <Redirect to={{ ...location, pathname: '/invest' }} />;
}

const Invest = () => {
  const { bonusform } = useParsedQueryString();

  useDefaultsFromURLSearch();

  const { account, chainId } = useActiveWeb3React();
  const theme = useContext(ThemeContext);

  const [isEnough] = useMockEstimate('pool');

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

  const [selectedCardRole, setSelectedCardRole] = useState<number>(0);
  const role: UserRoles = useSelector((state: AppState) => state.user.info.role);
  const bonusRoleName = useSelector((state: AppState) => state.user.info.bonus_role_name);

  const parsedAmounts = {
    [Field.INPUT]: parsedAmount,
    [Field.OUTPUT]: parsedOutputAmount,
  };
  const isValid = !error;

  // const handleNothing = () => {};

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

  const handleSelectCard = useCallback(
    nextRole => {
      handleTypeInputOUTPUT(
        bonusRoleName
          ? getPriceToNextStep(bonusRoleName, nextRole)
          : String(accountAmounts[nextRole]),
      );
      setSelectedCardRole(nextRole);
    },
    [handleTypeInputOUTPUT, bonusRoleName],
  );

  // modal and loading
  const [showConfirm, setShowConfirm] = useState<boolean>(false); // show confirmation modal
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false); // waiting for user confirmaion/rejection
  const [txHash, setTxHash] = useState<string>('');

  const returnFormatedAmount = (bool: boolean) => {
    if (bool) {
      return typedValue;
    } else {
      return outputAmount;
    }
  };

  const formattedAmounts = {
    [Field.INPUT]: returnFormatedAmount(independentField === Field.INPUT),
    [Field.OUTPUT]: returnFormatedAmount(independentField === Field.OUTPUT),
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
  const [showEmiCardModal, setShowEmiCardModal] = useState<boolean>(bonusform === 'open');
  const openEmiCardModal = () => {
    ReactGA.event({
      category: 'Magic_NFT',
      action: 'click_MagicNFT',
    });
    setShowEmiCardModal(true);
  };
  const closeEmiCardModal = () => setShowEmiCardModal(false);
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
    const ESW = Number(num.toFixed(3));
    const ordinaryCount = 500;
    const uncommonCount = 2500;
    const rareCount = 7500;
    const epicCount = 20000;
    const legendaryCount = 50000;

    let rare = '';
    let NunOfCard = 0;
    if (ESW > 0 && ESW < uncommonCount) {
      rare = 'Ordinary';
      NunOfCard = Math.floor(ESW / ordinaryCount);
    }
    if (ESW >= uncommonCount && ESW < rareCount) {
      rare = 'Uncommon';
      NunOfCard = Math.floor(ESW / uncommonCount);
    }
    if (ESW >= rareCount && ESW < epicCount) {
      rare = 'Rare';
      NunOfCard = Math.floor(ESW / rareCount);
    }
    if (ESW >= epicCount && ESW < legendaryCount) {
      rare = 'Epic';
      NunOfCard = Math.floor(ESW / epicCount);
    }
    if (ESW >= legendaryCount) {
      rare = 'Legendary';
      NunOfCard = Math.floor(ESW / legendaryCount);
    }
    let bodyNode;
    const distributorCardList = [
      {
        img: Basic,
        title: 'Basic',
        description: `Non less than ${basicCount} ESW`,
        value: basicCount,
        role: PackageNames.basic,
      },
      {
        img: BasicPlus,
        title: 'Basic +',
        description: `Non less than ${basicPlusCount} ESW`,
        value: basicPlusCount,
        role: PackageNames.basic_plus,
      },
      {
        img: Silver,
        title: 'Silver',
        description: `Non less than ${silverCount} ESW`,
        value: silverCount,
        role: PackageNames.silver,
      },
      {
        img: Gold,
        title: 'Gold',
        description: `Non less than ${goldCount} ESW`,
        value: goldCount,
        role: PackageNames.gold,
      },
      {
        img: Diamond,
        title: 'Diamond',
        description: `Non less than ${diamondCount} ESW`,
        value: diamondCount,
        role: PackageNames.diamond,
      },
      {
        img: Partner,
        title: 'Partner',
        description: `Non less than ${partnerCount} ESW`,
        value: partnerCount,
        role: PackageNames.partner,
      },
      {
        img: Enterprise,
        title: 'Enterprise',
        description: `Non less than ${enterpriseCount} ESW`,
        value: enterpriseCount,
        role: PackageNames.enterprise,
      },
    ];
    if (role === UserRoles.distributor) {
      bodyNode = (
        <div className="block-with-cards__cards">
          {distributorCardList.map(el => {
            const isDisabled = bonusRoleName ? el.value <= accountAmounts[bonusRoleName] : false;
            return (
              <div
                className={`emicard ${
                  accountAmounts[selectedCardRole] === el.value ? 'active' : ''
                }`}
                key={el.title}
                onClick={() => (!isDisabled ? handleSelectCard(String(el.role)) : null)}
              >
                <img
                  className={`emicard__img ${isDisabled ? 'grey' : ''}`}
                  src={el.img}
                  alt="Ordinary"
                />
                <div className="emicard__info">
                  <div className={`emicard__title ${isDisabled ? 'grey' : ''}`}>{el.title}</div>
                  <div className={`emicard__description ${isDisabled ? 'grey-text' : ''}`}>
                    {el.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      bodyNode = (
        <div className="block-with-cards__cards">
          <div className="emicard">
            <img className="emicard__img" src={OrdinaryIcon} alt="Ordinary" />
            <div className="emicard__info">
              <div className="emicard__title">Ordinary</div>
              <div className="emicard__description">Non less than {ordinaryCount} ESW</div>
            </div>
          </div>
          <div className="emicard">
            <img className="emicard__img" src={UncommonIcon} alt="Uncommon" />
            <div className="emicard__info">
              <div className="emicard__title">Uncommon</div>
              <div className="emicard__description">Non less than {uncommonCount} ESW</div>
            </div>
          </div>
          <div className="emicard">
            <img className="emicard__img" src={RareIcon} alt="Rare" />
            <div className="emicard__info">
              <div className="emicard__title">Rare</div>
              <div className="emicard__description">Non less than {rareCount} ESW</div>
            </div>
          </div>
          <div className="emicard">
            <img className="emicard__img" src={EpicIcon} alt="Epic" />
            <div className="emicard__info">
              <div className="emicard__title">Epic</div>
              <div className="emicard__description">Non less than {epicCount} ESW</div>
            </div>
          </div>
          <div className="emicard">
            <img className="emicard__img" src={LegendaryIcon} alt="Legendary" />
            <div className="emicard__info">
              <div className="emicard__title">Legendary</div>
              <div className="emicard__description">Non less than {legendaryCount} ESW</div>
            </div>
          </div>
        </div>
      );

      if (rare === 'Ordinary') {
        const NumByGetMoreCard = (NunOfCard + 1) * ordinaryCount;
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
                    Make purchase of <b className="green-color ml-5">{NumByGetMoreCard} ESW</b>
                  </div>
                  <div className="emicard__description-card">
                    to get <b className="ml-5 mr-5">1</b> more <b className="ml-5">Ordinary card</b>
                  </div>
                </div>
              </div>
            )}
            <div className="emicard">
              <img className="emicard__img" src={UncommonIcon} alt="Uncommon" />
              <div className="emicard__info">
                <div className="emicard__description-card">
                  Make purchase of <b className="green-color ml-5">{uncommonCount} ESW</b>
                </div>
                <div className="emicard__description-card">
                  to get <b className="ml-5">a Uncommon card</b>
                </div>
              </div>
            </div>
          </div>
        );
      }
      if (rare === 'Uncommon') {
        const NumByGetMoreCard = (NunOfCard + 1) * uncommonCount;
        bodyNode = (
          <div className="block-with-cards__cards">
            <div className="block-with-current-cards">
              <img className="block-with-current-cards__img" src={UncommonIcon} alt="Uncommon" />
              <div className="block-with-current-cards__info">
                <div className="block-with-current-cards__title">
                  {NunOfCard} {'Uncommon'}
                </div>
                <div className="block-with-current-cards__text">Card</div>
              </div>
            </div>
            {NunOfCard < 4 && (
              <div className="emicard">
                <img className="emicard__img" src={UncommonIcon} alt="Uncommon" />
                <div className="emicard__info">
                  <div className="emicard__description-card">
                    Make purchase of <b className="green-color ml-5">{NumByGetMoreCard} ESW</b>
                  </div>
                  <div className="emicard__description-card">
                    to get <b className="ml-5 mr-5">1</b> more <b className="ml-5">Uncommon card</b>
                  </div>
                </div>
              </div>
            )}
            <div className="emicard">
              <img className="emicard__img" src={RareIcon} alt="Rare" />
              <div className="emicard__info">
                <div className="emicard__description-card">
                  Make purchase of <b className="green-color ml-5">{rareCount} ESW</b>
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
        const NumByGetMoreCard = (NunOfCard + 1) * rareCount;
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
                    Make purchase of <b className="green-color ml-5">{NumByGetMoreCard} ESW</b>
                  </div>
                  <div className="emicard__description-card">
                    to get <b className="ml-5 mr-5">1</b> more <b className="ml-5">Rare card</b>
                  </div>
                </div>
              </div>
            )}
            <div className="emicard">
              <img className="emicard__img" src={EpicIcon} alt="Epic" />
              <div className="emicard__info">
                <div className="emicard__description-card">
                  Make purchase of <b className="green-color ml-5">{epicCount} ESW</b>
                </div>
                <div className="emicard__description-card">
                  to get <b className="ml-5">a Epic card</b>
                </div>
              </div>
            </div>
          </div>
        );
      }
      if (rare === 'Epic') {
        const NumByGetMoreCard = (NunOfCard + 1) * epicCount;
        bodyNode = (
          <div className="block-with-cards__cards">
            <div className="block-with-current-cards">
              <img className="block-with-current-cards__img" src={EpicIcon} alt="Epic" />
              <div className="block-with-current-cards__info">
                <div className="block-with-current-cards__title">
                  {NunOfCard} {'Epic'}
                </div>
                <div className="block-with-current-cards__text">Card</div>
              </div>
            </div>
            {NunOfCard < 4 && (
              <div className="emicard">
                <img className="emicard__img" src={EpicIcon} alt="Ordinary" />
                <div className="emicard__info">
                  <div className="emicard__description-card">
                    Make purchase of <b className="green-color ml-5">{NumByGetMoreCard} ESW</b>
                  </div>
                  <div className="emicard__description-card">
                    to get <b className="ml-5 mr-5">1</b> more <b className="ml-5">Epic card</b>
                  </div>
                </div>
              </div>
            )}
            <div className="emicard">
              <img className="emicard__img" src={LegendaryIcon} alt="Legendary" />
              <div className="emicard__info">
                <div className="emicard__description-card">
                  Make purchase of <b className="green-color ml-5">{legendaryCount} ESW</b>
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
        const NumByGetMoreCard = (NunOfCard + 1) * legendaryCount;
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
                  Make purchase of <b className="green-color ml-5">{NumByGetMoreCard} ESW</b>
                </div>
                <div className="emicard__description-card">
                  to get <b className="ml-5 mr-5">1</b> more <b className="ml-5">Legendary card</b>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    const getClassToEmiCardsBlock = (ESW: Number) => {
      if (ESW >= legendaryCount || NunOfCard === 4) {
        return 'block-with-cards elem1';
      }
      if (ESW > 0 && ESW < legendaryCount) {
        return 'block-with-cards elem2';
      }

      return 'block-with-cards';
    };

    const getHeaderToEmiCardBlock = (role: UserRoles, ESW: Number): React.ReactFragment => {
      if (role === UserRoles.distributor) {
        return <>Choose your Package</>;
      } else {
        return (
          <p>
            {ESW > 0 ? (
              <EmiCardHeader>
                Please, &nbsp;
                <span onClick={() => setShowEmiCardModal(true)}>Register in the Whitelist</span>
                &nbsp; to Get:
              </EmiCardHeader>
            ) : (
              <>Buy ESW to get Magic NFT EmiCards</>
            )}
          </p>
        );
      }
    };

    const getFooterToEmiCardBlock = (role: UserRoles) => {
      if (role === UserRoles.distributor) {
        return (
          <>
            <div className="arrow-left arrow-position-1" />
            <div className="arrow-left-white arrow-position-1" />
          </>
        );
      } else {
        return (
          <>
            <div className="block-with-cards__footer">
              Fill the amount of ESW for purchase to see the NFT cards you will get
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
            <div
              className={`arrow-left arrow-position-${
                Number(formattedAmounts[Field.INPUT]) > 0 ? 2 : 1
              }`}
            />
            <div
              className={`arrow-left-white arrow-position-${
                Number(formattedAmounts[Field.INPUT]) > 0 ? 2 : 1
              }`}
            />
          </>
        );
      }
    };

    return (
      <EmiCard className={getClassToEmiCardsBlock(ESW)}>
        <div className="block-with-cards__header">{getHeaderToEmiCardBlock(role, ESW)}</div>
        {bodyNode}
        {getFooterToEmiCardBlock(role)}
      </EmiCard>
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
  const getErrorText = (error, notEnoughBalance, currencies) => {
    if (Object.values(currencies).includes(undefined)) {
      return 'Please choose a token';
    }
    if (Number(typedValue) > 0 && Number(outputAmount) === 0) {
      return 'Sorry, you are reaching the limits of our crowdsale. Please try to buy less ESW';
    }
    if (notEnoughBalance) {
      return `Not enough balance`;
    }
    return error;
  };

  const warningBottomContent = () => {
    return (
      <StyledButton href={'https://link.medium.com/gNa3ztuvkdb'} target="_blank">
        <span> READ MORE </span> {'>>'}
      </StyledButton>
    );
  };

  const warningContent = () => {
    return (
      <p>
        The beta testing runs for about 2 weeks, and the users who join us within this period will
        have 50,000 ESW distributed among them during the first week after the official launch.
      </p>
    );
  };

  return (
    <>
      {showWarning ? (
        <TokenWarningCards currencies={currencies} />
      ) : (
        <WarningBlock
          title="EMISWAP soft launch"
          content={warningContent}
          bottomContent={warningBottomContent}
        />
      )}
      <AppBody
        disabled={showWarning}
        className={`invest-mobile ${role === UserRoles.distributor ? 'mb650' : ''}`}
      >
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
                    {error || notEnoughBalance
                      ? getErrorText(error, notEnoughBalance, currencies)
                      : `Invest`}
                  </Text>
                </ButtonError>
              )}
              {!isEnough && (
                <ErrorText fontWeight={500} fontSize="11pt" severity={3}>
                  Probably insufficient ETH balance
                </ErrorText>
              )}
            </BottomGrouping>
          </AutoColumn>
          {account ? <ReferralLink /> : 'Please connect to get a referral link.'}
          <EmiMagicBtn onClick={openEmiCardModal}>Register here to Get Magic Cards</EmiMagicBtn>
          {showEmiCardModal && (
            <EmiMagicCardModal
              isOpen={showEmiCardModal}
              onDismiss={closeEmiCardModal}
              walletID={account}
            />
          )}
        </Wrapper>
        {generateEmiCardBlock(Number(formattedAmounts[Field.OUTPUT]))}
      </AppBody>
    </>
  );
};

export default Invest;
