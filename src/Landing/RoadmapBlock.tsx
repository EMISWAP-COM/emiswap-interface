import React from 'react';
import { Flex, Image, StyledHead, Text } from '../ThemeProvider';
import GreenToPurpleRectangle from '../assets/svg/Rectangles/GreenToPurple.svg';
import RoadmapLineXL from '../assets/svg/Lines/RoadmapLineXL.svg';
import styled from 'styled-components';

const QuartalBlock = styled(Flex)`
`;



const RoadmapBlock = () => (
  <Flex flexDirection="column">
    <header>
      <StyledHead>
        Emiswap Roadmap
      </StyledHead>
      <Text variant="largeRubik" color="white" mt="1.86rem">
        Emiswap is building cross-chain ecosystem <br />
        by integrating various blockchains and NFT components
      </Text>
    </header>
    <Flex marginTop="2.5rem">
      <QuartalBlock>
        <Flex alignItems="center">
          <Text color="text">Q1</Text>
          <Image
            marginLeft="0.75rem"
            backgroundImage={`url(${GreenToPurpleRectangle})`}
            backgroundSize="cover"
            width="12.1875rem"
            height="0.3125rem"
          />
        </Flex>
        <Flex>
          <Image
            backgroundImage={`url(${RoadmapLineXL}`}
            backgroundSize="cover"
            width="0.5625rem"
            height="10rem"
          />
        </Flex>
      </QuartalBlock>
      <QuartalBlock marginLeft="0.75rem">
        <Flex alignItems="center">
          <Text>Q2</Text>
          <Image
            backgroundImage={`url(${GreenToPurpleRectangle})`}
            backgroundSize="cover"
            width="12.1875rem"
            height="0.3125rem"
          />
        </Flex>
      </QuartalBlock>
      <QuartalBlock marginLeft="0.75rem">
        <Flex alignItems="center">
          <Text>Q3</Text>
          <Image
            backgroundImage={`url(${GreenToPurpleRectangle})`}
            backgroundSize="cover"
            width="12.1875rem"
            height="0.3125rem"
          />
        </Flex>
        <Flex>
        </Flex>
      </QuartalBlock>
      <QuartalBlock marginLeft="0.75rem">
        <Flex alignItems="center">
          <Text>Q4</Text>
          <Image
            backgroundImage={`url(${GreenToPurpleRectangle})`}
            backgroundSize="cover"
            width="12.1875rem"
            height="0.3125rem"
          />
        </Flex>
      </QuartalBlock>
    </Flex>
  </Flex>
);

export default RoadmapBlock;
