import React from 'react';
import styled from 'styled-components';
import Accordion from '../Accordion';
import Colon from '../../assets/svg/FAQIcon/colon.svg';
import Board from '../../assets/svg/FAQIcon/board.svg';
import Coins from '../../assets/svg/FAQIcon/coins.svg';
import YellowCircle from '../../assets/svg/FAQIcon/yellowCircle.svg';
import PieChart from '../../assets/svg/pie_chart.svg';
import { EarlyBird } from './EarlyBird';
import { NFTCards } from './NFTCards';
import { PrivateRound } from './PrivateRount';

const Body = styled.div`
  .title {
    font-family: Roboto;
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 160%;
    letter-spacing: 0.01em;
    color: ${({theme}) => theme.white};
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
    color: ${({theme}) => theme.white};

    @media screen and (max-width: 1000px) {
      font-size: 16px;
    }
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
        color: ${({theme}) => theme.darkText};
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
      background: ${({theme}) => theme.darkGrey};
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
        color: ${({theme}) => theme.darkText};
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
        right: -13px;
        top: 7px;
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
    color: ${({theme}) => theme.darkWhite};

    @media screen and (max-width: 1300px) {
      font-size: 14px;
    }
  }

  .grey-text-bold {
    color: ${({theme}) => theme.white};
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

    &__color0 {
      background: #D4D3FF;
    }

    &__color1 {
      background: #47FF37;
    }
    &__color2 {
      background: #37FFDB;
    }

    &__color3 {
      background: #A973FF;
    }

    &__color4 {
      background: #147AF1;
    }

    &__color5 {
      background: #5D09E1;
    }

    &__color6 {
      background: #E478FF;
    }

    &__color7 {
      background: #57D7FF;
    }

    &__color8 {
      background: #8479FF;
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
          color: ${({theme}) => theme.darkText};
          margin-bottom: 20px;

          @media screen and (max-width: 1000px) {
            font-size: 14px;
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
    color: ${({theme}) => theme.darkWhite};
    margin-bottom: 20px;

    @media screen and (max-width: 1000px) {
      font-size: 16px;
    }

    @media screen and (max-width: 500px) {
      font-size: 14px;
      margin-top: 20px;
    }
  }
`;

export default () => {
  const btnClick1 = () => {
    const win = window.open('https://crowdsale.emidao.org/whitepaper', '_blank');
    win.focus();
  };
  const btnClick3 = () => {
    const win = window.open('https://crowdsale.emidao.org/presentation', '_blank');
    win.focus();
  };

  /* TODO removed Invest tab until further notice.
  const handleLiquidityCLick = () => {
    history.push('/invest');
    window.scroll({
      top: 200,
      behavior: 'smooth',
    });
  };*/

  const handleLeanMoreLiquidityClick = () => {
    window.open(
      'https://emiswap.medium.com/why-are-liquidity-providers-rushing-to-emiswap-496801dc846f',
      '_blank',
    );
  };

  //TODO перевести на styleds components блоки как EarlyBird and NFTCards
  return (
    <div className="for-scroll-faq">
      <Accordion
        header="Early bird bonuses for Liquidity Providers"
        /* TODO removed Invest tab until further notice.
        btnText="Provide Liquidity"
        btnClick={handleLiquidityCLick}*/
        btnSecondText="Learn More"
        btnSecondClick={handleLeanMoreLiquidityClick}
      >
        <EarlyBird />
      </Accordion>
      <Accordion
        header="Early bird bonuses for Swappers"
        /* TODO removed Invest tab until further notice.
        btnText="Provide Liquidity"
        btnClick={handleLiquidityCLick}*/
      >
        <Body>
          <div className="last-block">
            <div className="last-block__block">
              <img className="last-block__img" src={Board} alt="" />
              <div className="text-block">
                <div className="h4 mb16">Rewards for Liquidity Providers</div>
                <div className="text-block__text">
                  From the <b>11th to the 40th day</b> after the launch <b>6,150 ESW</b> will be
                  issued additionally every 1000 blocks and will be distributed among LP in
                  proportion to the amount of liquidity
                </div>
              </div>
            </div>
            <div className="last-block__block">
              <img className="last-block__img" src={Coins} alt="" />
              <div className="text-block">
                <div className="h4 mb16">Rewards for Swappers</div>
                <div className="text-block__text">
                  From the <b>11th to the 100th day</b> after the launch swappers are rewarded with{' '}
                  <b>16 ESW</b> for personal turnover of <b>1,000 DAI</b>
                </div>
              </div>
            </div>
          </div>
          <div className="h4 mb16">Gas fees refund</div>
          <div className="last-string">
            <b>EmiSwap</b> compensates <b>for 100% of the Ethereum</b> fees paid for any operation
            on the exchange in its native <b>ESW tokens.</b>
          </div>
          <div className="last-string">
            The EmiSwap early liquidity provider and swap allocation fund is capped at{' '}
            <b>6,000,000 ESW</b>
          </div>
        </Body>
      </Accordion>
      <Accordion
        header="NFT Magic Cards for Liquidity Providers"
        /* TODO removed Invest tab until further notice.
        btnText="Provide Liquidity"
        btnClick={handleLiquidityCLick}*/
      >
        <NFTCards />
      </Accordion>
      <Accordion
        header="Introduction to EmiSwap"
        btnText="Read White Paper"
        btnClick={btnClick1}
      >
        <Body>
          <div className="title">
            EmiSwap is an automated market maker exchange with an ESW voting token as well as
            yield-increasing NFT Magic Cards mechanics. EmiSwap is the first project in the EmiDAO
            ecosystem.
          </div>
          <div className="InfoBlock">
            <div className="InfoBlock__block">
              <img className="InfoBlock__img" src={Colon} alt="" />
              <div className="InfoBlockBody">
                <div className="InfoBlockBody__header h4">ESW</div>
                <div className="InfoBlockBody__description">
                  is a governance token that gives holders a right to receive a share of project’s
                  profit proportionate to the share of token ownership and gives a right to
                  participate in voting on the development of the project.
                </div>
              </div>
            </div>
          </div>
          <div className="h4 mb40">
            EmiSwap is an open-source, decentralized platform, a fork of Uniswap V2 and Mooniswap
            with increased performance and supplemented functionality.
          </div>
          <div className="card-blocks">
            <div className="card width1_3">
              <div className="h4 mb16">
                <span>
                  0.3%
                  <img className="card__YellowCircle" src={YellowCircle} alt="YellowCircle" />
                </span>
              </div>
              <div className="card__description-text">Trading commission in any pool is 0.3%</div>
            </div>
            <div className="card width1_3">
              <div className="h4 mb16">
                <span>
                  0.25%
                  <img className="card__YellowCircle" src={YellowCircle} alt="YellowCircle" />
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
                  <img className="card__YellowCircle" src={YellowCircle} alt="YellowCircle" />
                </span>
              </div>
              <div className="card__description-text">
                Remaining 0.05% is distributed among ESW token holders
              </div>
            </div>
          </div>
        </Body>
      </Accordion>
      <Accordion header="Private Round details" isContentFullWidth={true}>
        <PrivateRound />
      </Accordion>
      <Accordion
        header="Token Allocation Schedule"
        btnText="Read White Paper"
        btnClick={btnClick3}
      >
        <Body>
          <div className="chart-block">
            <div className="chart-block__info">
              <div className="chart-block__text-line">
                <div className="chart-block__color-block chart-block__color0" />
                <div className="grey-text chart-block__item-name">Pre-Seed (completed)</div>
                <div className="grey-text chart-block__item-value">3M</div>
                <div className="grey-text chart-block__item-value chart-block__item-value--mobile">
                  3,000,000
                </div>
                <div className="grey-text grey-text-bold chart-block__item-percent">1.5%</div>
              </div>
              <div className="chart-block__text-line">
                <div className="chart-block__color-block chart-block__color1" />
                <div className="grey-text chart-block__item-name">Seed (completed)</div>
                <div className="grey-text chart-block__item-value">9M</div>
                <div className="grey-text chart-block__item-value chart-block__item-value--mobile">
                  9,000,000
                </div>
                <div className="grey-text grey-text-bold chart-block__item-percent">4.5%</div>
              </div>
              <div className="chart-block__text-line">
                <div className="chart-block__color-block chart-block__color2" />
                <div className="grey-text chart-block__item-name">Private</div>
                <div className="grey-text chart-block__item-value">12M</div>
                <div className="grey-text chart-block__item-value chart-block__item-value--mobile">
                  12,000,000
                </div>
                <div className="grey-text grey-text-bold chart-block__item-percent">6%</div>
              </div>
              <div className="chart-block__text-line">
                <div className="chart-block__color-block chart-block__color3" />
                <div className="grey-text chart-block__item-name">Launchpad Sales</div>
                <div className="grey-text chart-block__item-value">16M</div>
                <div className="grey-text chart-block__item-value chart-block__item-value--mobile">
                  16,000,000
                </div>
                <div className="grey-text grey-text-bold chart-block__item-percent">8%</div>
              </div>
              <div className="chart-block__text-line">
                <div className="chart-block__color-block chart-block__color4" />
                <div className="grey-text chart-block__item-name">
                  Early Liquidity Providers & Swappersors
                </div>
                <div className="grey-text chart-block__item-value">6M</div>
                <div className="grey-text chart-block__item-value chart-block__item-value--mobile">
                  6,000,000
                </div>
                <div className="grey-text grey-text-bold chart-block__item-percent">3%</div>
              </div>
              <div className="chart-block__text-line">
                <div className="chart-block__color-block chart-block__color5" />
                <div className="grey-text chart-block__item-name">
                  Protocol Security & Maintenance
                </div>
                <div className="grey-text chart-block__item-value">60M</div>
                <div className="grey-text chart-block__item-value chart-block__item-value--mobile">
                  60,000,000
                </div>
                <div className="grey-text grey-text-bold chart-block__item-percent">30%</div>
              </div>
              <div className="chart-block__text-line">
                <div className="chart-block__color-block chart-block__color6" />
                <div className="grey-text chart-block__item-name">
                  Ecosystem Growth & Community Extension
                </div>
                <div className="grey-text chart-block__item-value">44M</div>
                <div className="grey-text chart-block__item-value chart-block__item-value--mobile">
                  44,000,000
                </div>
                <div className="grey-text grey-text-bold chart-block__item-percent">22%</div>
              </div>
              <div className="chart-block__text-line">
                <div className="chart-block__color-block chart-block__color7" />
                <div className="grey-text chart-block__item-name">
                  EmiSwap Decentralized Developers Community
                </div>
                <div className="grey-text chart-block__item-value">40M</div>
                <div className="grey-text chart-block__item-value chart-block__item-value--mobile">
                  40,000,000
                </div>
                <div className="grey-text grey-text-bold chart-block__item-percent">20%</div>
              </div>
              <div className="chart-block__text-line">
                <div className="chart-block__color-block chart-block__color8" />
                <div className="grey-text chart-block__item-name">
                  Advisors, Ambassadors & Community Building
                </div>
                <div className="grey-text chart-block__item-value">10M</div>
                <div className="grey-text chart-block__item-value chart-block__item-value--mobile">
                  10,000,000
                </div>
                <div className="grey-text grey-text-bold chart-block__item-percent">5%</div>
              </div>
            </div>
            <div className="chart-pie">
              <img className="chart-pie__img" src={PieChart} alt="PieChart" />
            </div>
          </div>
        </Body>
      </Accordion>
    </div>
  );
};
