import React from 'react';
import styled from 'styled-components/macro';

import YellowCircle from '../../assets/svg/FAQIcon/yellowCircle.svg';
import { ESW_PER_USD } from '../../constants/invest';

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
  border-radius: 4px;
  background: ${({ theme }) => theme.darkGrey};

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
  z-index: 0;

  margin-bottom: 16px;

  font-family: 'IBM Plex Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
  letter-spacing: -0.01em;
  color: ${({theme}) => theme.white};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    font-size: 16px;
  `};
`;

const CardInfoHeadCircle = styled.img`
  position: absolute;
  left: 0;
  top: 8px;
  z-index: -1;
`;

const CardDescriptionText = styled.div`
  color: ${({ theme }) => theme.darkText};
`;

const cardsInfo = [
  { head: `${ESW_PER_USD} DAI`, text: 'Price' },
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
            <CardInfoHead>
              {info.head}
              <CardInfoHeadCircle
                className="card__YellowCircle"
                src={YellowCircle}
                alt="YellowCircle"
              />
            </CardInfoHead>
          <CardDescriptionText>{info.text}</CardDescriptionText>
        </CardInfo>
      ))}
    </CardBlocks>
  );
};
