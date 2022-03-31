import React from 'react';
import { Flex, Image, StyledHead, Text, Box } from '../ThemeProvider';
import GreenToPurpleRectangle from '../assets/svg/Rectangles/GreenToPurple.svg';
import PurpleToGreenRectangle from '../assets/svg/Rectangles/PurpleToGreen.svg';
import RoadmapLineXL from '../assets/svg/Lines/RoadmapLineXL.svg';
import RoadmapLineMedium from '../assets/svg/Lines/RoadmapLineMedium.svg';
import RoadmapLineSmall from '../assets/svg/Lines/RoadmapLineSmall.svg';
import RoadmapLineXS from '../assets/svg/Lines/RoadmapLineXS.svg';
import styled from 'styled-components';

type RoadmapStepsIconType = string;

interface IStep {
  name: string;
  icon: string;
  description?: string;
}

interface IQuartal {
  name: string;
  progressIcon: string;
  roadmapStepsIcon: RoadmapStepsIconType;
  steps: Array<IStep>;
  isActive?: boolean;
}

interface IQuartalsInfo {
  [index: string]: IQuartal;
}

const Q1 = {
  name: 'Q1',
  progressIcon: GreenToPurpleRectangle,
  roadmapStepsIcon: RoadmapLineXL,
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
  roadmapStepsIcon: RoadmapLineMedium,
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
  roadmapStepsIcon: RoadmapLineSmall,
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
  roadmapStepsIcon: RoadmapLineXS,
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

const QuartalBlocksWrapper = styled(Flex)`
  margin-top: 2.5rem;
  gap: 0.75rem;
`;

const PROGRESS_BLOCK_WIDTH = '2rem';

const StepBlock = ({ step }: {step: IStep}) => (
  <Flex>
    <Flex
      width="2rem"
      height="2rem"
      justifyContent="center"
      alignItems="center"
      borderRadius="0.625rem"
      backgroundColor="red"
    >
      <Image
        backgroundImage={`url(${step.icon})`}
        backgroundSize="cover"
        width="1.25rem"
        height="1.25rem"
      />
    </Flex>
    <Text color="text">
      { step.name }
    </Text>
  </Flex>
);

const ProgressBlock = ({ steps, roadmapStepsIcon }: { steps: Array<IStep>, roadmapStepsIcon: RoadmapStepsIconType }) => (
  <Flex>
    <Image
      backgroundImage={`url(${roadmapStepsIcon})`}
      backgroundSize="cover"
      width={PROGRESS_BLOCK_WIDTH}
      height="10rem"
    />
    <Box>
      {steps.map((step) => (
        <StepBlock step={step} />
      ))}
    </Box>
  </Flex>
);

const QuartalBlockHeader = styled.header<{ isActive: boolean }>`
  width: ${PROGRESS_BLOCK_WIDTH};
  text-align: center;
  color: ${props => props.isActive ? '#FFFFFF' : 'rgba(255,255,255,0.6)'};
`;

const QuartalBlock = ({ quartal } : {quartal: IQuartal }) => (
  <Box>
    <Flex alignItems="center" marginBottom="1rem">
      <QuartalBlockHeader isActive={quartal.isActive}>{quartal.name}</QuartalBlockHeader>
      <Image
        backgroundImage={`url(${quartal.progressIcon})`}
        backgroundSize="cover"
        width="12.1875rem"
        height="0.3125rem"
      />
    </Flex>
    <ProgressBlock
      steps={quartal.steps}
      roadmapStepsIcon={quartal.roadmapStepsIcon}
    />
  </Box>
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
    <QuartalBlocksWrapper>
      {Object.keys(QUARTALS_INFO).map((QUARTAL_INFO_KEY) => (
        <QuartalBlock quartal={QUARTALS_INFO[QUARTAL_INFO_KEY]} />
      ))}
    </QuartalBlocksWrapper>
  </Flex>
);

export default RoadmapBlock;
