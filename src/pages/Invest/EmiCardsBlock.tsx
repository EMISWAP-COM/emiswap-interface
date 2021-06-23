import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Field } from '../../state/invest/actions';
import OrdinaryIcon from '../../assets/svg/CardIcon/ordinary.svg';
import UncommonIcon from '../../assets/svg/CardIcon/common.svg';
import RareIcon from '../../assets/svg/CardIcon/unusual.svg';
import EpicIcon from '../../assets/svg/CardIcon/rare.svg';
import LegendaryIcon from '../../assets/svg/CardIcon/legendary.svg';
import Question from '../../assets/svg/FAQIcon/question.svg';
import { AppState } from '../../state';
import { UserRoles } from '../../components/WalletModal';
import { getPriceToNextStep } from './utils';
import { accountAmounts, investMaxESW } from '../../constants/invest';
import { EmiCard, EmiCardHeader } from './EmiCard';
import { distributorCardList } from './constants';

interface Props {
  outputNum: number;
  formattedAmounts: {
    [Field.INPUT]: string | undefined;
    [Field.OUTPUT]: string | undefined;
  };
  handleTypeInputOUTPUT: (value: string) => void;
}

export const EmiCardsBlock = ({ outputNum, formattedAmounts, handleTypeInputOUTPUT }: Props) => {

  const [selectedCardRole, setSelectedCardRole] = useState<number>(0);

  const role: UserRoles | null = useSelector((state: AppState) => state.user.info?.role);
  const bonusRoleName = useSelector((state: AppState) => state.user.info?.bonus_role_name);

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

  const ESW = Number(outputNum.toFixed(3));
  const ordinaryCount = 500;
  const uncommonCount = 2500;
  const rareCount = 7500;
  const epicCount = 20000;
  const legendaryCount = 50000;

  let NunOfCard = 0;
  let rare = '';
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

  const getClassToEmiCard = (ESW: Number) => {
    if (ESW >= legendaryCount || NunOfCard === 4) {
      return 'block-with-cards elem1';
    }
    if (ESW > 0 && ESW < legendaryCount) {
      return 'block-with-cards elem2';
    }

    return 'block-with-cards';
  };

  const getHeader = (role: UserRoles | null, ESW: Number): React.ReactFragment => {
    if (role === UserRoles.distributor) {
      return <>Choose your Package</>;
    } else {
      return (
        <p>
          {ESW > 0 ? (
            <EmiCardHeader>
              Please, &nbsp;
              <span>Register in the Whitelist</span>
              &nbsp; to Get:
            </EmiCardHeader>
          ) : (
            <>Buy ESW to get Magic NFT EmiCards</>
          )}
        </p>
      );
    }
  };

  const getBody = () => {
    let bodyNode;

    if (role === UserRoles.distributor) {
      bodyNode = (
        <div className="block-with-cards__cards">
          {distributorCardList.map(el => {
            let isDisabled = bonusRoleName ? el.value <= accountAmounts[bonusRoleName] : false;
            if (el.value > investMaxESW) {
              isDisabled = true;
            }
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
            <img className="emicard__img" src={OrdinaryIcon} alt="Ordinary"/>
            <div className="emicard__info">
              <div className="emicard__title">Ordinary</div>
              <div className="emicard__description">Non less than {ordinaryCount} ESW</div>
            </div>
          </div>
          <div className="emicard">
            <img className="emicard__img" src={UncommonIcon} alt="Uncommon"/>
            <div className="emicard__info">
              <div className="emicard__title">Uncommon</div>
              <div className="emicard__description">Non less than {uncommonCount} ESW</div>
            </div>
          </div>
          <div className="emicard">
            <img className="emicard__img" src={RareIcon} alt="Rare"/>
            <div className="emicard__info">
              <div className="emicard__title">Rare</div>
              <div className="emicard__description">Non less than {rareCount} ESW</div>
            </div>
          </div>
          <div className="emicard">
            <img className="emicard__img" src={EpicIcon} alt="Epic"/>
            <div className="emicard__info">
              <div className="emicard__title">Epic</div>
              <div className="emicard__description">Non less than {epicCount} ESW</div>
            </div>
          </div>
          <div className="emicard">
            <img className="emicard__img" src={LegendaryIcon} alt="Legendary"/>
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
              <img className="block-with-current-cards__img" src={OrdinaryIcon} alt="Ordinary"/>
              <div className="block-with-current-cards__info">
                <div className="block-with-current-cards__title">
                  {NunOfCard} {'Ordinary'}
                </div>
                <div className="block-with-current-cards__text">Card</div>
              </div>
            </div>
            {NunOfCard < 4 && (
              <div className="emicard">
                <img className="emicard__img" src={OrdinaryIcon} alt="Ordinary"/>
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
              <img className="emicard__img" src={UncommonIcon} alt="Uncommon"/>
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
              <img className="block-with-current-cards__img" src={UncommonIcon} alt="Uncommon"/>
              <div className="block-with-current-cards__info">
                <div className="block-with-current-cards__title">
                  {NunOfCard} {'Uncommon'}
                </div>
                <div className="block-with-current-cards__text">Card</div>
              </div>
            </div>
            {NunOfCard < 4 && (
              <div className="emicard">
                <img className="emicard__img" src={UncommonIcon} alt="Uncommon"/>
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
              <img className="emicard__img" src={RareIcon} alt="Rare"/>
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
              <img className="block-with-current-cards__img" src={RareIcon} alt="Rare"/>
              <div className="block-with-current-cards__info">
                <div className="block-with-current-cards__title">
                  {NunOfCard} {'Rare'}
                </div>
                <div className="block-with-current-cards__text">Card</div>
              </div>
            </div>
            {NunOfCard < 4 && (
              <div className="emicard">
                <img className="emicard__img" src={RareIcon} alt="Ordinary"/>
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
              <img className="emicard__img" src={EpicIcon} alt="Epic"/>
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
              <img className="block-with-current-cards__img" src={EpicIcon} alt="Epic"/>
              <div className="block-with-current-cards__info">
                <div className="block-with-current-cards__title">
                  {NunOfCard} {'Epic'}
                </div>
                <div className="block-with-current-cards__text">Card</div>
              </div>
            </div>
            {NunOfCard < 4 && (
              <div className="emicard">
                <img className="emicard__img" src={EpicIcon} alt="Ordinary"/>
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
              <img className="emicard__img" src={LegendaryIcon} alt="Legendary"/>
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
              <img className="block-with-current-cards__img" src={LegendaryIcon} alt="Legendary"/>
              <div className="block-with-current-cards__info">
                <div className="block-with-current-cards__title">
                  {NunOfCard} {'Legendary'}
                </div>
                <div className="block-with-current-cards__text">Card</div>
              </div>
            </div>
            <div className="emicard">
              <img className="emicard__img" src={LegendaryIcon} alt="Ordinary"/>
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

    return bodyNode;
  };

  const getFooter = (role: UserRoles | null) => {
    if (role === UserRoles.distributor) {
      return (
        <>
          <div className="arrow-left arrow-position-1"/>
          <div className="arrow-left-white arrow-position-1"/>
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
            <img className="block-with-cards__btn-img" src={Question} alt="Question"/>
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
    <EmiCard className={getClassToEmiCard(ESW)}>
      <div className="block-with-cards__header">{getHeader(role, ESW)}</div>
      {getBody()}
      {getFooter(role)}
    </EmiCard>
  );

};
