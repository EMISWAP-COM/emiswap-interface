import React from 'react';
import styled from 'styled-components';
import Accordion, { AccordionButton, AccordionButtonsWrapper } from '../Accordion';
import YellowCircle from '../../assets/svg/FAQIcon/yellowCircle.svg';

const Body = styled.div`
  .title {
    font-family: Roboto;
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 160%;
    letter-spacing: 0.01em;
    color: ${({ theme }) => theme.white};
    margin-bottom: 40px;

    @media screen and (max-width: 1000px) {
      font-size: 16px;
    }
  }

  .h4 {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 32px;
    letter-spacing: -0.01em;
    color: ${({ theme }) => theme.white};

    @media screen and (max-width: 1000px) {
      font-size: 16px;
    }
  }
  
  .f16 {
    line-height: 21px;
    font-size: 16px;
  }

  .mb16 {
    margin-bottom: 16px;
  }

  .mb24 {
    margin-bottom: 24px;
  }

  .mb40 {
    margin-bottom: 40px;
  }

  .mt46 {
    margin-top: 46px;
  }

  .InfoBlock {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    margin-bottom: 40px;
    
    &__block {
      width: 50%;
      display: flex;
      align-items: flex-start;

      &:nth-child(2n-1) {
        padding-right: 45px;
      }
    }

    &__img {
      margin-right: 20px;
    }

    .InfoBlockBody {
      &__header {
        margin-bottom: 16px;
      }

      &__description {
        font-family: 'IBM Plex Sans';
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 32px;
        letter-spacing: -0.01em;
        color: ${({ theme }) => theme.darkText};
      }
    }

    @media screen and (max-width: 1000px) {
      &__img {
        margin-right: 0;
      }
      &__block {
        flex-direction: column;
        align-items: center;
        width: 100%;
        display: flex;
        .InfoBlockBody {
          &__header {
            text-align: center;
          }
        }
        &:nth-child(2n-1) {
          padding-right: 0;
          margin-bottom: 20px;
        }
      }

      .InfoBlockBody {
        &__header {
          margin-bottom: 5px;
          font-size: 16px;
        }
      }
    }

    @media screen and (max-width: 600px) {
      &__img {
        margin-right: 0;
      }
      &__block {
        flex-direction: column;
        align-items: center;
        width: 100%;

        .InfoBlockBody {
          &__header {
            text-align: center;
          }

          &__description {
            font-size: 15px;
          }
        }
      }
    }
  }

  .card-blocks {
    display: flex;
    justify-content: space-between;

    .card {
      background: ${({ theme }) => theme.darkGrey};
      box-sizing: border-box;
      border-radius: 4px;

      .card-title {
        font-family: 'IBM Plex Sans';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 21px;
        letter-spacing: -0.01em;
        color: #24272c;
        position: relative;

        .card__YellowCircle {
          position: absolute;
          left: 0px;
          top: 7px;
        }
      }

      &__description-text {
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 21px;
        color: ${({ theme }) => theme.darkText};
      }

      .card-description {
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 21px;
        color: #89919a;
        flex: none;
        order: 1;
        align-self: flex-start;
        flex-grow: 0;
        margin-top: 16px;
      }

      span {
        position: relative;
        z-index: 0;
      }

      &__YellowCircle {
        position: absolute;
        left: 0;
        top: 4px;
        z-index: -1;
      }
    }

    .width1_3 {
      width: 342px;
      height: 149px;
      padding: 32px;

      @media screen and (max-width: 1300px) {
        width: calc((100% / 3) - 20px);
        margin: 0 10px 20px;
      }

      @media screen and (max-width: 1000px) {
        width: 100%;
        margin: 0 10px 20px;
      }

      @media screen and (max-width: 500px) {
        padding: 20px;
      }
    }

    .width1_5 {
      width: 206px;
      height: 119px;
      padding: 24px;

      @media screen and (max-width: 1300px) {
        width: calc((100% / 3) - 20px);
        margin: 0 10px 20px;
      }

      @media screen and (max-width: 1000px) {
        width: calc((100% / 2) - 20px);
        margin: 0 10px 20px;
      }

      @media screen and (max-width: 500px) {
        width: 100%;
        padding: 20px;

        .card__YellowCircle {
          display: none;
        }
      }
    }
    @media screen and (max-width: 1300px) {
      flex-wrap: wrap;
      justify-content: flex-start;
    }
  }

  .grey-text {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 32px;
    letter-spacing: -0.01em;
    color: ${({ theme }) => theme.darkWhite};

    @media screen and (max-width: 1300px) {
      font-size: 14px;
    }
  }

  .grey-text-bold {
    color: ${({ theme }) => theme.white};
    font-weight: 500;
  }

  .chart-block {
    display: flex;

    .chart-pie {
      margin-top: 80px;
      margin-left: auto;

      &__img {
        width: 330px;
        max-width: 100%;
      }
    }

    &__color-block {
      border-radius: 10px;
      width: 32px;
      height: 32px;
    }
    
          
      /*color 5
      color 6
      color 7
      color 3
      color 8
      color 4*/
      
    &__color5 {
      background: #5D09E1;
    }
    
    &__color6 {
      background: #8479FF;
    }
    
    &__color7 {
      background: #E478FF;
    }
    
    &__color3 {
      background: #57D7FF;
    }
    
    &__color8 {
      background: #A973FF;
    }
    
    &__color4 {
      background: #37FFDB;
    }

    &__color0 {
      background: #D4D3FF;
    }

    &__color1 {
      background: #47FF37;
    }
    &__color2 {
      background: #37FFDB;
    }

    &__text-line {
      display: flex;
      position: relative;
      margin-bottom: 21px;
    }

    &__item-name {
      margin-right: 80px;
      text-align: left;
    }

    &__item-value {
      margin-left: auto !important;
      margin-right: 80px;
      text-align: left;

      &--mobile {
        display: none;
      }
    }

    &__item-percent {
      position: absolute;
      right: 0;
    }

    .grey-text {
      margin-left: 10px;
      line-height: 1.4;
    }

    @media screen and (max-width: 1300px) {
      &__item-name {
        margin-right: 30px;
      }

      &__item-value {
        margin-right: 50px;
      }
    }

    @media screen and (max-width: 1000px) {
      flex-direction: column-reverse;

      .chart-pie {
        width: 80%;
        max-width: 300px;
        margin: 0 auto 30px;
        img {
          width: 100%;
        }
      }

      .chart-block__info {
        max-width: 400px;
        margin: auto;
      }
    }

    @media screen and (max-width: 450px) {
      .chart-block__info {
        // margin: 0 20px 0 15px;
      }

      &__text-line {
        flex-wrap: wrap;
        justify-content: flex-start;

        .grey-text {
          // width: 100%;
          margin-left: 5px;
        }
      }

      &__item-name {
        width: 70%;
        max-width: 70%;
        margin-left: 10px !important;
      }

      &__item-value {
        display: none;
        width: 60%;
        margin-top: 4px;
        margin-left: 42px !important;
        margin-right: 0;

        &--mobile {
          display: block !important;
        }
      }

      &__item-percent {
        position: relative;
        margin-left: auto !important;
        margin-right: 10px;
      }
    }
  }

  .last-block {
    display: flex;

    &__block {
      display: flex;
      align-items: flex-start;

      .text-block {
        margin-left: 20px;

        &__text {
          font-family: Roboto;
          font-style: normal;
          font-weight: 300;
          font-size: 18px;
          line-height: 26px;
          letter-spacing: 0.01em;
          color: ${({ theme }) => theme.darkText};
          margin-bottom: 20px;

          @media screen and (max-width: 1000px) {
            font-size: 14px;
          }
          
          b {
            color: white;
          }
        }
      }
    }

    @media screen and (max-width: 500px) {
      font-size: 14px;
      flex-direction: column;
      align-items: center;

      &__block {
        flex-direction: column;
        align-items: center;
        margin-bottom: 32px;

        .text-block {
          margin-left: 0;

          &__text {
            font-size: 14px;
            margin-bottom: 5px;
          }
        }
      }
    }
  }

  .last-string {
    font-family: Roboto;
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 160%;
    letter-spacing: 0.01em;
    margin-bottom: 20px;
    margin-top: 50px;
    color: #B7B7CA;

    @media screen and (max-width: 1000px) {
      font-size: 16px;
    }

    @media screen and (max-width: 500px) {
      font-size: 14px;
      margin-top: 20px;
    }
    
    b {
      color: white;
    }
  }
  
  .list-wrapper {
    display: flex;
    justify-content: space-between;
    
    @media screen and (max-width: 500px) {
      display: block;
    }
    
    ul {
      list-style: none;
    }
    
    li {
      margin-bottom: 16px;
      color: white;
      font-weight: 300;
      font-family: Roboto;
      font-style: normal;
      
      &::before {
        content: "\\2022";
        color: #E478FF;
        font-weight: bold;
        display: inline-block;
        width: 1em;
        margin-left: -1em;
      }
    }
    
  }
`;

const Tabs = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 24px;
    
    @media screen and (max-width: 500px) {
      margin: 0 -10px 24px -10px;
    }
`;

const Tab = styled.div<{active?: boolean}>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 34px;
    margin: 0 5px;
    padding: 0 16px;
    border: 1px solid #4A4757;
    border-radius: 8px;
    font-size: 14px;
    text-transform: uppercase;
    background: ${({active}) => active ? '#7A2DF4' : '#272530'};
    color: white;
    cursor: pointer;
    
    @media screen and (max-width: 500px) {
      margin: 0 3px;
      padding: 0 7px;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 10px;
    }
`;

export default () => {

  const btnClickIntro = () => {
    const win = window.open('https://about.emiswap.com/whitepaper', '_blank');
    win.focus();
  };

  const btnClickFarming = () => {
    const win = window.open('https://wiki.emiswap.com/user-guide/how-to-farm-usdesw', '_blank');
    win.focus();
  };

  const btnClickStaking = () => {
    const win = window.open('https://wiki.emiswap.com/user-guide/how-to-stake-usdesw', '_blank');
    win.focus();
  };

  const btnClickPresentation = () => {
    const win = window.open('https://about.emiswap.com/presentation', '_blank');
    win.focus();
  };

  const btnClickVesting = () => {
    const win = window.open('https://about.emiswap.com/onepage', '_blank');
    win.focus();
  };

  return (
    <div className="for-scroll-faq">
      <Tabs>
        <Tab active={true}>White Paper</Tab>
        <Tab onClick={btnClickPresentation}>Presentation</Tab>
        <Tab onClick={btnClickVesting}>Check Vesting Schedule</Tab>
      </Tabs>
      <Accordion
        header="Introduction to EmiSwap"
        btnText="Read White Paper"
        btnClick={btnClickIntro}
      >
        <Body>
          <div className="title">
            EmiSwap is an audited, high APR, and cross-chain AMM DEX that offers users a secure environment to extract
            daily high yields from liquidity mining and farming.
          </div>
          <div className="title">
            EmiSwap is the first project in the EmiDAO ecosystem, the world's first truly autonomous DAO with ESW native
            token.
          </div>
          <div className="title">
            ESW is a governance token that gives holders a right to receive a share of distributing fees proportionate
            to the share of token ownership and gives a right to participate in voting on the development of the
            project.
          </div>
          <div className="card-blocks">
            <div className="card width1_3">
              <div className="h4 mb16">
                <span>
                  0.3%
                  <img className="card__YellowCircle" src={YellowCircle} alt="YellowCircle"/>
                </span>
              </div>
              <div className="card__description-text">Trading commission in any pool is 0.3%</div>
            </div>
            <div className="card width1_3">
              <div className="h4 mb16">
                <span>
                  0.25%
                  <img className="card__YellowCircle" src={YellowCircle} alt="YellowCircle"/>
                </span>
              </div>
              <div className="card__description-text">
                0.25% of trading commission is distributed to active liquidity providers
              </div>
            </div>
            <div className="card width1_3">
              <div className="h4 mb16">
                <span>
                  0.05%
                  <img className="card__YellowCircle" src={YellowCircle} alt="YellowCircle"/>
                </span>
              </div>
              <div className="card__description-text">
                Remaining 0.05% is distributed among ESW token holders
              </div>
            </div>
          </div>
        </Body>
      </Accordion>

      <Accordion
        header="Farming & Staking"
        btnText="Guide to Farming"
        btnClick={btnClickFarming}
      >
        <Body>
          <div className="title">
            Staking allows users to deposit their tokens for any period of time into a smart contract (liquidity pool)
            to receive extra rewards. The longer the user keeps their tokens in a staking smart contract, the larger
            reward they receive.
          </div>
          <div style={{ marginBottom: '32px', marginTop: '-16px' }}>
            <AccordionButtonsWrapper>
              <AccordionButton onClick={btnClickStaking}>Guide to Staking</AccordionButton>
            </AccordionButtonsWrapper>
          </div>
          <div className="title">
            In some sense, farming can be paralleled with staking. Users deposit their LP tokens, which they received
            for providing liquidity on EmiSwap, into a smart contract and receive higher rewards. Thus, users first need
            to provide liquidity with a token which increases projects liquidity and boosts trading volumes.
          </div>
        </Body>
      </Accordion>

      <Accordion
        header="Ethereum gas fee compensations"
      >
        <Body>
          <div className="title">
            EmiSwap understands that operations on the Ethereum blockchain have become a nightmare for swappers and
            liquidity providers due to high gas prices. Making a single operation on a decentralized exchange can cost
            dozens of dollars in Ethereum equivalent.
          </div>
          <div className="title">
            Thus, EmiSwap compensates the gas price for all users who make Swaps or Provide Liquidity on EmiSwap DEX. As
            compensation, users receive an equal amount of ESW tokens that play an increasingly important role in the
            EmiDAO ecosystem.
          </div>
        </Body>
      </Accordion>

      <Accordion
        header="NFTs for Liquidity Providers"
        btnText="Guide to Staking"
        btnClick={btnClickStaking}
      >
        <Body>
          <div className="title">
            EmiSwap plans to reach a $100 million TVL and gives away 1001 yield boosting and rare NFT Magic Cards to
            Liquidity Providers.
          </div>
          <div className="title">
            Each time the Total Value Locked on EmiSwap DEX is increased by $10 million, the EmiSwap team will
            distribute 100 NFT Magic Cards to users who provided liquidity and crossed the milestones.
          </div>
          <div className="title">
            Every $100,000 of Total Value Locked on EmiSwap marks a milestone. The further the user is from the
            milestone as he crosses it, the better NFT Magic Card he will receive. In a nutshell, the user which adds
            the most liquidity will get the highest tier.
          </div>
          <div className="title">
            One powerful user who added the most liquidity will get a legendary card. The top 2 to 6 users get 5 Epic
            Cards and so on. In total, EmiSwap will issue 1001 limited edition NFTs for this campaign divided into:
          </div>
          <div className="list-wrapper" style={{ maxWidth: 700 }}>
            <ul>
              <li>1 Mythic Card</li>
              <li>10 Legendary Cards</li>
            </ul>
            <ul>
              <li>40 Epic Cards</li>
              <li>150 Rare Cards</li>
            </ul>
            <ul>
              <li>300 Uncommon Cards</li>
              <li>500 Ordinary Cards</li>
            </ul>
          </div>
        </Body>
      </Accordion>

      <Accordion
        header="NFT Magic Cards"
        btnText="Guide to Staking"
        btnClick={btnClickStaking}
      >
        <Body>
          <div className="title">
            NFT Magic Cards are cutting-edge loyalty items that increase users' benefits on the EmiSwap DEX. Offering
            much more than usual NFT units, they are playable, tradable, and yield-boosting NFT collectibles that are
            available for EmiSwap users only.
          </div>
          <div className="title">
            There are 6 tiers of NFT Magic Cards.
          </div>
          <div className="title">
            The higher the tier, the larger the bonus they contain. Though, the higher the tier of NFT Magic Card, the
            better the bonus users receive. The list includes:
          </div>
          <div className="list-wrapper">
            <ul>
              <li>Extra ESW tokens</li>
              <li>Yield-boosting bonuses for providing liquidity</li>
              <li>Yield-boosting bonuses for swapping</li>
            </ul>
            <ul>
              <li>Yield-boosting bonuses for ESW staking</li>
              <li>NFT Card farm-speeding powers</li>
              <li>Multiplying Cards</li>
            </ul>
            <ul>
              <li>Battle Cards for participating in Card Wars</li>
              <li>Extra rare Collectible Cards</li>
            </ul>
          </div>
          <div className="title">
            The bonus users get is determined randomly, but all of them increase their yield on the platform.
          </div>
        </Body>
      </Accordion>

    </div>
  );
};
