import React from 'react';
import styled from 'styled-components';
import Accordion from '../Accordion';
import Board from '../../assets/svg/FAQIcon/board.svg';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const BlockWithIcon = styled.div`
  display: flex;
  align-items: flex-start;
`;

//   .last-block {
//   display: flex;
//
// &__block {
//     display: flex;
//     align-items: flex-start;
//
//   .text-block {
//       margin-left: 20px;
//
//     &__text {
//         font-family: Roboto;
//         font-style: normal;
//         font-weight: 300;
//         font-size: 18px;
//         line-height: 32px;
//         letter-spacing: 0.01em;
//         color: #555959;
//         margin-bottom: 20px;
//
//       @media screen and (max-width: 1000px) {
//           font-size: 14px;
//         }
//       }
//     }
//   }

export const EarlyBird = () => {
  return (
    <Accordion
      header="Early bird bonuses for Liquidity Providers"
      openClass="isOpen4"
      // headerClass="blink1-text"
    >
      <Wrapper>
        <BlockWithIcon>
          <img src={Board} alt="" />
          <div className="text-block">
            <div className="h4 mb16">Rewards for Liquidity Providers</div>
            <div className="text-block__text">
              From the 11th to the 100th day after the launch <b>30,000 ESW</b> will be
              proportionally distributed among LP’s for <b>1 million DAI</b> trading volume.
            </div>
            <div className="text-block__text">
              From the 11th to the 40th day after the launch <b>6,150 ESW</b> will be issued
              additionally every 1000 blocks and will be distributed among LP’s in proportion to the
              amount of liquidity provided.
            </div>
          </div>
        </BlockWithIcon>
        <h1>здесь может быть ваша реклама</h1>
      </Wrapper>
    </Accordion>
  );
};
