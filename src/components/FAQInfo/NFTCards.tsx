import React from 'react';
import styled from 'styled-components/macro';
import UnknownMythic from '../../assets/svg/FAQIcon/unknownMythic.svg';

import { Block, BlockLong, Text, Wrapper } from './styleds';

const BlockWithCardsDesktop = styled(BlockLong)`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  margin-bottom: 35px;

  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

const BlockWithCardsMobile = styled(BlockLong)`
  display: none;
  justify-content: center;

  @media screen and (max-width: 1000px) {
    display: flex;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 15%;

  @media screen and (max-width: 1000px) {
    width: 30%;
    max-width: 200px;
    min-width: 130px;
  }
`;

const CardImg = styled.img`
  width: 100%;
`;

const CardLabel = styled.span`
  margin-top: 15px;
  font-size: 14px;
  max-width: 130px;
  text-align: center;
  color: #555959;

  @media screen and (max-width: 1000px) {
    display: block;
    max-width: 100%;
    margin-top: 8px;
    margin-left: 16px;
    text-align: left;
  }
`;
const cardLabels = [
  '1 Mythic Card',
  '10 Legendary Cards',
  '40 Epic Cards',
  '150 Rare Cards',
  '300 Uncommon Cards',
  'And 500 Ordinary Cards',
];

export const NFTCards = () => {
  return (
    <Wrapper>
      <BlockLong>
        <Text>
          EmiSwap plans to reach a <strong>$100 million TVL</strong> soon and conquer the market,
          thus we want to encourage our users to help us achieve this goal so that everyone benefits
          from the growing ESW price.
        </Text>
      </BlockLong>
      <BlockLong>
        <Text>
          We divided the path to reach <strong>$100 million TVL</strong> (total value locked in =
          liquidity locked) into 1000 milestones, e.g.{' '}
          <strong>$100,000 TVL, $200,000 TVL, $300,000 TVL</strong>, etc., plus one extra milestone
          that will grant you a Mythic Card.
          <br />
          The people who provide liquidity and cross every milestone{' '}
          <strong>will be rewarded with our limited-edition NFT Magic Cards</strong> issued
          specifically for this campaign. There will be:
        </Text>
      </BlockLong>
      <BlockWithCardsDesktop>
        {cardLabels.map(label => (
          <Card key={label}>
            <CardImg src={UnknownMythic} alt={''} />
            <CardLabel>{label}</CardLabel>
          </Card>
        ))}
      </BlockWithCardsDesktop>
      <BlockWithCardsMobile>
        <Card>
          <CardImg src={UnknownMythic} alt={''} />
        </Card>
        <div>
          {cardLabels.map(label => (
            <CardLabel key={label}>{label}</CardLabel>
          ))}
        </div>
      </BlockWithCardsMobile>
      <Block>
        <Text>
          <strong>
            100 cards (1 Legendary, 4 Epic, 15 Rare, 30 Uncommon, and 50 Ordinary) will be released
            in a limited collection after each big 10 million milestone is reached.
          </strong>{' '}
          They are never reissued and are thus incredibly valuable for the holders.
        </Text>
      </Block>
      <Block>
        <Text>
          The tier of the card you get will depend on how far you were from the milestone when you
          added liquidity and crossed it.
        </Text>
      </Block>
    </Wrapper>
  );
};
