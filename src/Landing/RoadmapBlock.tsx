import React from 'react';
import { Flex, Image, StyledHead, Text } from '../ThemeProvider';
import GreenToPurpleRectangle from '../assets/svg/Rectangles/GreenToPurple.svg';
import PurpleToGreenRectangle from '../assets/svg/Rectangles/PurpleToGreen.svg';
import RoadmapLineXL from '../assets/svg/Lines/RoadmapLineXL.svg';
import styled from 'styled-components';

interface IStep {
  name: string;
  icon: string;
  description?: string;
}

interface IQuartal {
  name: string;
  progressIcon: string;
  roadmapStepsIcon: string;
  steps: Array<IStep>;
  isActive?: Boolean;
}

interface IQuartalsInfo {
  [index: string]: IQuartal;
}

const Q1 = {
  name: 'Q1',
  progressIcon: GreenToPurpleRectangle,
  roadmapStepsIcon: '#',
  isActive: true,
  steps: [
    {
      name: 'Shiden',
      icon: '#',
    },
    {
      name: 'Near/Aurora',
      icon: '#',
    },
    {
      name: 'Avalanche',
      icon: '#',
    },
    {
      name: 'Gate Chain',
      icon: '#',
    },
    {
      name: 'Cross-chain bridge',
      description: 'Stage 01',
      icon: '#',
    },
    {
      name: 'Cross-chain bridge',
      description: 'Stage 02',
      icon: '#',
    }
  ],
};
const Q2 = {
  name: 'Q2',
  progressIcon: PurpleToGreenRectangle,
  roadmapStepsIcon: '#',
  steps: [
    {
      name: 'Binance Smart Chain',
      icon: '#',
    },
    {
      name: 'Solana',
      icon: '#',
    },
    {
      name: 'Heco',
      icon: '#',
    },
    {
      name: 'Platform Redesign',
      icon: '#',
    }
  ]
};
const Q3 = {
  name: 'Q3',
  progressIcon: GreenToPurpleRectangle,
  roadmapStepsIcon: '#',
  steps: [
    {
      name: 'OKEX',
      icon: '#',
    },
    {
      name: 'Tron',
      icon: '#',
    },
    {
      name: 'NFT magic hall',
      description: 'Stage 01',
      icon: '#',
    }
  ]
};
const Q4 = {
  name: 'Q4',
  progressIcon: PurpleToGreenRectangle,
  roadmapStepsIcon: '#',
  steps: [
    {
      name: 'To be announced',
      icon: '#',
    },
    {
      name: 'NFT magic hall',
      description: 'Stage 02',
      icon: '#',
    }
  ]
};

const QUARTALS_INFO: IQuartalsInfo = {
  'q1': Q1,
  'q2': Q2,
  'q3': Q3,
  'q4': Q4,
};

const QuartalBlock = ({ quartal } : {quartal: IQuartal}) => (
  <div>
    <Flex alignItems="center">
      <Text>{quartal.name}</Text>
      <Image
        backgroundImage={`url(${quartal.progressIcon})`}
        backgroundSize="cover"
        width="12.1875rem"
        height="0.3125rem"
      />
    </Flex>
  </div>
);

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
      {Object.keys(QUARTALS_INFO).map((QUARTAL_INFO_KEY) => (
        <QuartalBlock quartal={QUARTALS_INFO[QUARTAL_INFO_KEY]} />
      ))}
    </Flex>
  </Flex>
);

export default RoadmapBlock;
