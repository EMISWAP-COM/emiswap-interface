import React from 'react';
import styled from 'styled-components';
import Accordion from '../Accordion';
import Colon from '../../assets/svg/FAQIcon/colon.svg';
import Pig from '../../assets/svg/FAQIcon/pig.svg';
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
    justify-content: space-between;
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
      flex-direction: column;

      &__block {
        width: 100%;
        display: flex;
        align-items: flex-start;

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

    &__color-block {
      border-radius: 10px;
      width: 32px;
      height: 32px;
    }
    &__color0 {
      background: #c79d6a;
    }
    &__color1 {
      background: #074223;
    }
    &__color2 {
      background: #006450;
    }
    &__color3 {
      background: #ffc925;
    }
    &__color4 {
      background: #58ae00;
    }
    &__color5 {
      background: #09ce95;
    }

    &__text-line {
      display: flex;
      margin-bottom: 21px;
    }

    .grey-text {
      margin-left: 10px;
    }

    @media screen and (max-width: 1000px) {
      flex-direction: column-reverse;
      .chart-pie {
        width: 200px;
        margin: 0 auto 30px;
        img {
          width: 100%;
        }
      }
    }

    @media screen and (max-width: 500px) {
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
    font-family: Roboto;
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 160%;
    letter-spacing: 0.01em;
    color: #555959;
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

const defaultLabelStyle = {
  fontFamily: 'IBM Plex Sans',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '7px',
  lineHeight: '32px',
  letterSpacing: '-0.01em',
  fill: '#FFF',
};
const shiftSize = 7;

export default () => {
  const btnClick1 = () => {
    const win = window.open('https://crowdsale.emidao.org/whitepaper', '_blank');
    win.focus();
  };
  const btnClick2 = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const btnClick3 = () => {
    const win = window.open('https://crowdsale.emidao.org/presentation', '_blank');
    win.focus();
  };
  return (
    <div className="for-scroll-faq">
      <Accordion
        header="Introduction to EmiSwap"
        btnText="Read White Paper"
        btnClick={btnClick1}
        openClass="isOpen1"
      >
        <Body>
          <div className="title">
            EmiSwap (EmiDAO) is an open source, decentralized autonomous organization. The main
            elements of the ecosystem are the EmiSwap decentralized exchange and the ecosystem's
            internal tokens - ESW and ESD.
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
            <div className="InfoBlock__block">
              <img className="InfoBlock__img" src={Pig} alt="" />
              <div className="InfoBlockBody">
                <div className="InfoBlockBody__header h4">ESD</div>
                <div className="InfoBlockBody__description">
                  is an internal token that gives the ESW holders a right to receive assets in the
                  basket of the yield pool denominated in DAI proportionate to the share of ESW
                  ownership.
                </div>
              </div>
            </div>
          </div>
          <div className="h4 mb40">
            EmiSwap is a fork of the decentralized AMM exchange Mooniswap and was created to solve
            current problems of the DeFi industry.
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
        header="Crowdsale Information"
        btnText="Participate in crowdsale"
        btnClick={btnClick2}
        openClass="isOpen2"
      >
        <Body>
          <div className="card-blocks">
            <div className="card width1_5">
              <div className="card-title">
                Price
                <img className="card__YellowCircle" src={YellowCircle} alt="YellowCircle" />
              </div>
              <div className="card-description">0.11 DAI</div>
            </div>
            <div className="card width1_5">
              <div className="card-title">
                Total Supply
                <img className="card__YellowCircle" src={YellowCircle} alt="YellowCircle" />
              </div>
              <div className="card-description">200,000,000 ESW</div>
            </div>
            <div className="card width1_5">
              <div className="card-title">
                Crowdsale Allocation
                <img className="card__YellowCircle" src={YellowCircle} alt="YellowCircle" />
              </div>
              <div className="card-description">Crowdsale Allocation 20% or 40,000,000 ESW</div>
            </div>
            <div className="card width1_5">
              <div className="card-title">
                Vesting
                <img className="card__YellowCircle" src={YellowCircle} alt="YellowCircle" />
              </div>
              <div className="card-description">1 year with quarterly unlock by equal shares</div>
            </div>
            <div className="card width1_5">
              <div className="card-title">
                Token Type
                <img className="card__YellowCircle" src={YellowCircle} alt="YellowCircle" />
              </div>
              <div className="card-description">ERC-20</div>
            </div>
          </div>
          <div className="h4 mt46">
            Users will be able to buy ESW tokens using following cryptocurrencies: DAI, USDT, USDC,
            USDB, ETH, EMRX, WETH, WBTC, renBTC.{' '}
          </div>
        </Body>
      </Accordion>
      <Accordion
        header="Token Allocation Schedule"
        btnText="Vesting Schedule"
        btnClick={btnClick3}
        openClass="isOpen3"
      >
        <Body>
          <div className="grey-text mb24">Total Supply - 200,000,000 ESW</div>
          <div className="chart-block">
            <div className="chart-block__info">
              <div className="chart-block__text-line">
                <div className="chart-block__color-block chart-block__color0" />
                <div className="grey-text">- Protocol Security and Maintenance -</div>
                <div className="grey-text grey-text-bold"> 30% (60,000,000 ESW)</div>
              </div>
              <div className="chart-block__text-line">
                <div className="chart-block__color-block chart-block__color1" />
                <div className="grey-text">- EmiSwap Decentralized Developers Community -</div>
                <div className="grey-text grey-text-bold"> 20% (40,000,000 ESW)</div>
              </div>
              <div className="chart-block__text-line">
                <div className="chart-block__color-block chart-block__color2" />
                <div className="grey-text">- Ecosystem Growth and Community Building -</div>
                <div className="grey-text grey-text-bold"> 22% (44,000,000 ESW)</div>
              </div>
              <div className="chart-block__text-line">
                <div className="chart-block__color-block chart-block__color3" />
                <div className="grey-text">- Crowdsale Participants -</div>
                <div className="grey-text grey-text-bold"> 20% (40,000,000 ESW)</div>
              </div>
              <div className="chart-block__text-line">
                <div className="chart-block__color-block chart-block__color4" />
                <div className="grey-text">- Advisers and Ambassadors -</div>
                <div className="grey-text grey-text-bold"> 5% (10,000,000 ESW)</div>
              </div>
              <div className="chart-block__text-line">
                <div className="chart-block__color-block chart-block__color5" />
                <div className="grey-text">- Early Liquidity Providers -</div>
                <div className="grey-text grey-text-bold"> 3% (6,000,000 ESW)</div>
              </div>
            </div>
            <div className="chart-pie">
              <img src={PieChart} alt="PieChart" />
            </div>
          </div>
          <div className="chart-description">Learn more about ESW tokens vesting.</div>
        </Body>
      </Accordion>
      <Accordion header="Early Swappers and Liquidity Providers Rewards" openClass="isOpen4">
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
    </div>
  );
};
