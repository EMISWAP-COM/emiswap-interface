import React, { ReactNode } from 'react';
import { Flex, Image, Text, Box, Head } from '../ThemeProvider';
import GreenToPurpleRectangle from '../assets/svg/Rectangles/GreenToPurple.svg';
import PurpleToGreenRectangle from '../assets/svg/Rectangles/PurpleToGreen.svg';
import RoadmapLineXL from '../assets/svg/Lines/RoadmapLineXL.svg';
import RoadmapLineMedium from '../assets/svg/Lines/RoadmapLineMedium.svg';
import RoadmapLineSmall from '../assets/svg/Lines/RoadmapLineSmall.svg';
import RoadmapLineXS from '../assets/svg/Lines/RoadmapLineXS.svg';
import { ImageEmpty } from '../ui-kit/icons/imageEmpty';
import { VolumeFull } from '../ui-kit/icons/volumeFull';
import styled from 'styled-components';
import { system } from 'styled-system';
import { FlexGapType } from '../ThemeProvider';
import { AvalancheIcon, ChainIcon } from 'ui-kit/icons';
import {
  BSCIcon,
  GateChainIcon,
  HecoICON,
  NearAuroraIcon,
  OKEXIcon,
  ShidenIcon,
  SolanaICON,
  TronIcon,
} from 'ui-kit/icons/networks';
import { PencilWritingIcon } from 'ui-kit/icons/pencilWriting';
import { SwipeIcon } from 'assets/svg/swipe';

type RoadmapStepsIconType = string;

interface IStep {
  name: string;
  icon: ReactNode;
  description?: string;
  width?: string | number;
  marginTop?: string | number;
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
      icon: <ShidenIcon />,
    },
    {
      name: 'Near/Aurora',
      icon: <NearAuroraIcon />,
      width: '2.5rem',
    },
    {
      name: 'Avalanche',
      icon: <AvalancheIcon />,
    },
    {
      name: 'Gate Chain',
      icon: <GateChainIcon />,
    },
    {
      name: 'Cross-chain bridge',
      description: 'Stage 01',
      icon: <ChainIcon />,
    },
    {
      name: 'Cross-chain bridge',
      description: 'Stage 02',
      icon: <ChainIcon />,
    },
  ],
};
const Q2 = {
  name: 'Q2',
  progressIcon: PurpleToGreenRectangle,
  roadmapStepsIcon: RoadmapLineMedium,
  steps: [
    {
      name: 'Binance Smart Chain',
      icon: <BSCIcon />,
    },
    {
      name: 'Solana',
      icon: <SolanaICON />,
    },
    {
      name: 'Heco',
      icon: <HecoICON />,
    },
    {
      name: 'Platform Redesign',
      icon: <PencilWritingIcon />,
    },
  ],
};
const Q3 = {
  name: 'Q3',
  progressIcon: GreenToPurpleRectangle,
  roadmapStepsIcon: RoadmapLineSmall,
  steps: [
    {
      name: 'OKEX',
      icon: <OKEXIcon />,
    },
    {
      name: 'Tron',
      icon: <TronIcon />,
      marginTop: '1.25rem',
    },
    {
      name: 'NFT magic hall',
      description: 'Stage 01',
      icon: <ImageEmpty />,
      marginTop: '1.25rem',
    },
  ],
};
const Q4 = {
  name: 'Q4',
  progressIcon: PurpleToGreenRectangle,
  roadmapStepsIcon: RoadmapLineXS,
  steps: [
    {
      name: 'To be announced',
      icon: <VolumeFull />,
      marginTop: '1.25rem',
    },
    {
      name: 'NFT magic hall',
      description: 'Stage 02',
      icon: <ImageEmpty />,
      marginTop: 3,
    },
  ],
};

const QUARTALS_INFO: IQuartalsInfo = {
  q1: Q1,
  q2: Q2,
  q3: Q3,
  q4: Q4,
};

const QuartalBlocksWrapper = styled(Flex)<{ gap: FlexGapType }>`
  ${system({
    gap: {
      property: 'gap',
      scale: 'space',
    },
  })}
`;
QuartalBlocksWrapper.defaultProps = {
  mt: 3,
};

const PROGRESS_BLOCK_WIDTH = 4;

const StepBlock = ({ step }: { step: IStep }) => (
  <Flex mt={step.marginTop || 4}>
    {step.icon}
    <Flex flexDirection="column" justifyContent="center" pl={2}>
      <Text color="paper" variant="normalRubikRegular">
        {step.name}
      </Text>
      <Text color="almostDisabled" variant="normalRubikRegular">
        {step.description}
      </Text>
    </Flex>
  </Flex>
);

const ProgressBlock = ({
  steps,
  roadmapStepsIcon,
}: {
  steps: Array<IStep>;
  roadmapStepsIcon: RoadmapStepsIconType;
}) => (
  <Flex>
    <Image
      backgroundImage={`url(${roadmapStepsIcon})`}
      backgroundSize="cover"
      backgroundPosition="center"
      width={PROGRESS_BLOCK_WIDTH}
      height={`${steps.length * 2.5 + steps.length * 1.5 - 2}rem`}
    />
    <Box mt="-0.25rem">
      {steps.map(step => (
        <StepBlock step={step} />
      ))}
    </Box>
  </Flex>
);

const QuartalBlock = ({ quartal }: { quartal: IQuartal }) => (
  <Flex flexDirection="column">
    <Flex alignItems="center" mb={3}>
      <Text
        width={PROGRESS_BLOCK_WIDTH}
        color={quartal.isActive ? 'paper' : 'almostDisabled'}
        variant="normalRubikMedium"
      >
        {quartal.name}
      </Text>
      <Image
        backgroundImage={`url(${quartal.progressIcon})`}
        backgroundSize="cover"
        width="12.2rem"
        height={1}
      />
    </Flex>
    <ProgressBlock steps={quartal.steps} roadmapStepsIcon={quartal.roadmapStepsIcon} />
  </Flex>
);

const RoadmapBlock = () => (
  <Flex
    flexDirection="column"
    pl={{ default: 4, laptop: '3.75rem' }}
    pr={{ default: 0, laptop: '3.75rem' }}
    alignItems="center"
  >
    <Flex flexDirection="column" alignItems="flex-start">
      <Head variant="default">Emiswap Roadmap</Head>
      <Text variant="xLargeRubikRegular" color="paper" mt={5} mb="2rem">
        Emiswap is building cross-chain ecosystem <br />
        by integrating various blockchains and NFT components
      </Text>
    </Flex>
    <Flex mb={{ default: 4, mobileL: 6 }} display={{ default: '', laptop: 'none' }}>
      <SwipeIcon />
    </Flex>
    <QuartalBlocksWrapper width="100%" overflowX={{ default: 'auto' }} gap="0.75rem">
      {Object.keys(QUARTALS_INFO).map(QUARTAL_INFO_KEY => (
        <QuartalBlock quartal={QUARTALS_INFO[QUARTAL_INFO_KEY]} />
      ))}
    </QuartalBlocksWrapper>
  </Flex>
);

export default RoadmapBlock;
