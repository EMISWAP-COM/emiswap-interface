import React from 'react';
import styled from 'styled-components';
import Accordion from '../Accordion';
import Colon from '../../assets/svg/FAQIcon/colon.svg';
import Board from '../../assets/svg/FAQIcon/board.svg';
import Coins from '../../assets/svg/FAQIcon/coins.svg';
import YellowCircle from '../../assets/svg/FAQIcon/yellowCircle.svg';
import PieChart from '../../assets/svg/pie_chart.svg';

const Body = styled.div`
  .title {
    font-family: Roboto;
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 160%;
    letter-spacing: 0.01em;
    color: #555959;
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
    color: #000000;

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
        color: #555959;
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
      background: #ffffff;
      border: 1px solid #eaeeee;
      box-sizing: border-box;
      box-shadow: 0px 9px 25px rgba(73, 73, 73, 0.07);
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
        color: #89919a;
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
      }

      &__YellowCircle {
        position: absolute;
        right: -13px;
        top: 7px;
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
    color: #555959;

    @media screen and (max-width: 1300px) {
      font-size: 14px;
    }
  }

  .grey-text-bold {
    color: #24272c;
    font-weight: 500;
  }

  .chart-block {
    display: flex;

    .chart-pie {
      margin-top: 50px;
      margin-left: auto;

      &__img {
        width: 400px;
        max-width: 100%;
      }
    }

    &__color-block {
      border-radius: 10px;
      width: 32px;
      height: 32px;
    }

    &__color0 {
      background: #a5da6f;
    }

    &__color1 {
      background: #074223;
    }
    &__color2 {
      background: #006450;
    }

    &__color3 {
      background: #09ce95;
    }

    &__color4 {
      background: #58ae00;
    }

    &__color5 {
      background: #7bbbdf;
    }

    &__color6 {
      background: #ffac7d;
    }

    &__color7 {
      background: #ffd541;
    }

    &__color8 {
      background: #8096e3;
    }

    &__text-line {
      display: flex;
      margin-bottom: 21px;
    }

    &__item-name {
      margin-right: 80px;
    }

    &__item-value {
      margin-left: auto !important;
    }

    .grey-text {
      margin-left: 10px;
    }

    @media screen and (max-width: 1300px) {
      &__item-name {
        margin-right: 10px;
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

    @media screen and (max-width: 500px) {
      .chart-block__info {
        // margin: 0 20px 0 15px;
      }

      &__text-line {
        flex-wrap: wrap;
        justify-content: center;

        .grey-text {
          width: 100%;
          margin-left: 5px;
        }
      }
    }
  }

  .chart-description {
    margin-top: 38px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 160%;
    letter-spacing: 0.01em;
    color: #555959;

    @media screen and (max-width: 1000px) {
      margin-top: 16px;
      text-align: center;
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
          line-height: 32px;
          letter-spacing: 0.01em;
          color: #555959;
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
    color: #555959;

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
  return (
    <div className="for-scroll-faq">
      <Accordion
        header="Early Swappers and Liquidity Providers Rewards"
        openClass="isOpen4"
        headerClass="blink1-text"
      >
        <Body>
          <div className="last-block">
            <div className="last-block__block">
              <img className="last-block__img" src={Board} alt="" />
              <div className="text-block">
                <div className="h4 mb16">Rewards for Liquidity Providers</div>
                <div className="text-block__text">
                  From the 11th to the 100th day after the launch <b>30,000 ESW</b> will be
                  proportionally distributed among LP’s for <b>1 million DAI</b> trading volume.
                </div>
                <div className="text-block__text">
                  From the 11th to the 40th day after the launch <b>6,150 ESW</b> will be issued
                  additionally every 1000 blocks and will be distributed among LP’s in proportion to
                  the amount of liquidity provided.
                </div>
              </div>
            </div>
            <div className="last-block__block">
              <img className="last-block__img" src={Coins} alt="" />
              <div className="text-block">
                <div className="h4 mb16">Rewards for Swappers</div>
                <div className="text-block__text">
                  From the 11th to the 100th day after the launch Swappers are rewarded with{' '}
                  <b>16 ESW</b> for every <b>1,000 DAI</b> of personal trading volume.
                </div>
              </div>
            </div>
          </div>
          <div className="last-string">
            The EmiSwap early liquidity provider and swap allocation fund is capped at{' '}
            <b>6,000,000 ESW</b>
          </div>
        </Body>
      </Accordion>
      <Accordion
        header="Introduction to EmiSwap"
        btnText="Read White Paper"
        btnClick={btnClick1}
        openClass="isOpen1"
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
      <Accordion
        header="Token Allocation Schedule"
        btnText="Read White Paper"
        btnClick={btnClick3}
        openClass="isOpen3"
      >
        <Body>
          <div className="chart-block">
            <div className="chart-block__info">
              <div className="chart-block__text-line">
                <div className="chart-block__color-block chart-block__color0" />
                <div className="grey-text chart-block__item-name">Pre-Seed</div>
                <div className="grey-text grey-text-bold chart-block__item-value">1.5%</div>
              </div>
              <div className="chart-block__text-line">
                <div className="chart-block__color-block chart-block__color1" />
                <div className="grey-text chart-block__item-name">Seed</div>
                <div className="grey-text grey-text-bold chart-block__item-value">4.5%</div>
              </div>
              <div className="chart-block__text-line">
                <div className="chart-block__color-block chart-block__color2" />
                <div className="grey-text chart-block__item-name">Private A</div>
                <div className="grey-text grey-text-bold chart-block__item-value">6%</div>
              </div>
              <div className="chart-block__text-line">
                <div className="chart-block__color-block chart-block__color3" />
                <div className="grey-text chart-block__item-name">Launchpad Sales</div>
                <div className="grey-text grey-text-bold chart-block__item-value">8%</div>
              </div>
              <div className="chart-block__text-line">
                <div className="chart-block__color-block chart-block__color4" />
                <div className="grey-text chart-block__item-name">
                  Early Liquidity Providers & Swappersors
                </div>
                <div className="grey-text grey-text-bold chart-block__item-value">3%</div>
              </div>
              <div className="chart-block__text-line">
                <div className="chart-block__color-block chart-block__color5" />
                <div className="grey-text chart-block__item-name">
                  Protocol Security & Maintenance
                </div>
                <div className="grey-text grey-text-bold chart-block__item-value">30%</div>
              </div>
              <div className="chart-block__text-line">
                <div className="chart-block__color-block chart-block__color6" />
                <div className="grey-text chart-block__item-name">
                  Ecosystem Growth & Community Extension
                </div>
                <div className="grey-text grey-text-bold chart-block__item-value">22%</div>
              </div>
              <div className="chart-block__text-line">
                <div className="chart-block__color-block chart-block__color7" />
                <div className="grey-text chart-block__item-name">
                  EmiSwap Decentralized Developers Community
                </div>
                <div className="grey-text grey-text-bold chart-block__item-value">20%</div>
              </div>
              <div className="chart-block__text-line">
                <div className="chart-block__color-block chart-block__color8" />
                <div className="grey-text chart-block__item-name">
                  Advisors, Ambassadors & Community Building
                </div>
                <div className="grey-text grey-text-bold chart-block__item-value">5%</div>
              </div>
            </div>
            <div className="chart-pie">
              <img className="chart-pie__img" src={PieChart} alt="PieChart" />
            </div>
          </div>
          <div className="chart-description">To know more about ESW tokens vesting.</div>
        </Body>
      </Accordion>
    </div>
  );
};
