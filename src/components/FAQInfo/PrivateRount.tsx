import React from 'react';
import styled from 'styled-components/macro';

import YellowCircle from '../../assets/svg/FAQIcon/yellowCircle.svg';

const CardBlocks = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 16px 0;
`;

const CardInfo = styled.div`
  box-sizing: border-box;
  width: 210px;
  margin: 8px;
  padding: 24px;
  border: 1px solid #eaeeee;
  border-radius: 4px;
  background: #ffffff;
  box-shadow: 0px 9px 25px rgba(73, 73, 73, 0.07);
  
  @media screen and (max-width: 1000px) {
    padding: 16px;
  }
  
  @media screen and (max-width: 500px) {
    width: 100%;
    text-align: left;
  }
`;

const CardInfoHead = styled.span`
    position: relative;
    font-size: 20px !important;
`;

const CardInfoHeadCircle = styled.img`
    position: absolute;
    left: 0;
    top: 8px;
`;

const cardsInfo = [
  { head: '0.23 DAI', text: 'Price' },
  { head: '200,000,000 ESW', text: 'Total Supply' },
  { head: '6% or 12M ESW ', text: 'Private Round allocation' },
  { head: 'Vesting period', text: '15% instantly; 85% quarter unlock by equal shares' },
  { head: 'ERC20', text: 'Token Type' },
];

export const PrivateRound = () => {
  return (
    <CardBlocks>
      {cardsInfo.map(info => (
        <CardInfo key={info.head}>
          <div className="h4 mb16">
          <CardInfoHead>
            {info.head}
            <CardInfoHeadCircle className="card__YellowCircle" src={YellowCircle} alt="YellowCircle"/>
          </CardInfoHead>
          </div>
          <div className="card__description-text">{info.text}</div>
        </CardInfo>
      ))}
    </CardBlocks>
  );
};
