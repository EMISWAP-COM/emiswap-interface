import React from 'react';
import styled from 'styled-components/macro';
import UnknownMythic from '../../assets/svg/FAQIcon/unknownMythic.svg';

import { Wrapper, Block, BlockLong, Text } from './styleds';

const BlockWithCards = styled(BlockLong)`
  display: flex;
  justify-content: space-between;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardLabel = styled.span`
  font-size: 14px;
  max-width: 130px;
  text-align: center;
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
          EmiSwap plans to reach a $100 million TVL soon and conquer the market, thus we want to
          encourage our users to help us achieve this goal so that everyone benefits from the
          growing ESW price.
        </Text>
      </BlockLong>
      <BlockLong>
        <Text>
          We divided the path to reach $100 million TVL (total value locked in = liquidity locked)
          into 1000 milestones, e.g. $100,000 TVL, $200,000 TVL, $300,000 TVL, etc., plus one extra
          milestone that will grant you a Mythic Card.
          <br />
          The people who provide liquidity and cross every milestone will be rewarded with our
          limited-edition NFT Magic Cards issued specifically for this campaign. There will be:
        </Text>
      </BlockLong>
      <BlockWithCards>
        {cardLabels.map(label => (
          <Card key={label}>
            <img src={UnknownMythic} alt={''} />
            <CardLabel>{label}</CardLabel>
          </Card>
        ))}
      </BlockWithCards>
      <Block>
        <Text>
          100 cards (1 Legendary, 4 Epic, 15 Rare, 30 Uncommon, and 50 Ordinary) will be released in
          a limited collection after each big 10 million milestone is reached. They are never
          reissued and are thus incredibly valuable for the holders.
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
