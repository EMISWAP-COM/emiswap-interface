import React, { ReactNode } from 'react';
import { Flex, Image, StyledHead, Text, Box } from '../ThemeProvider';
import GreenToPurpleRectangle from '../assets/svg/Rectangles/GreenToPurple.svg';
import PurpleToGreenRectangle from '../assets/svg/Rectangles/PurpleToGreen.svg';
import RoadmapLineXL from '../assets/svg/Lines/RoadmapLineXL.svg';
import RoadmapLineMedium from '../assets/svg/Lines/RoadmapLineMedium.svg';
import RoadmapLineSmall from '../assets/svg/Lines/RoadmapLineSmall.svg';
import RoadmapLineXS from '../assets/svg/Lines/RoadmapLineXS.svg';
import { ImageEmpty } from '../ui-kit/icons/imageEmpty';
import { VolumeFull } from '../ui-kit/icons/volumeFull';
import styled from 'styled-components';
import { ShidenIcon } from '../ui-kit/icons/networks/shiden';
import { NearAuroraIcon } from '../ui-kit/icons/networks/nearAurora';
import theme from 'ThemeProvider/theme';
import { AvalancheTransparentIcon } from '../ui-kit/icons/networks/avalancheTransparent';
import { GateChainIcon } from '../ui-kit/icons/networks/gateChain';
import { ChainIcon } from '../ui-kit/icons/chain';
import { BSCIcon } from '../ui-kit/icons/networks/bsc';
import { SolanaICON } from '../ui-kit/icons/networks/solana';
import { HecoICON } from '../ui-kit/icons/networks/heco';
import { PencilWritingIcon } from '../ui-kit/icons/pencilWriting';
import { OKEXIcon } from '../ui-kit/icons/networks/okex';
import { TronIcon } from '../ui-kit/icons/networks/tron';
import { system } from 'styled-system';
import { FlexGapType } from '../ThemeProvider/customTypes';

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

const SVG_ICONS_SIZE = theme.sizes[2];

const Q1 = {
  name: 'Q1',
  progressIcon: GreenToPurpleRectangle,
  roadmapStepsIcon: RoadmapLineXL,
  isActive: true,
  steps: [
    {
      name: 'Shiden',
      icon: <ShidenIcon width={SVG_ICONS_SIZE} height={SVG_ICONS_SIZE} />,
    },
    {
      name: 'Near/Aurora',
      icon: <NearAuroraIcon width="2.5rem" height={SVG_ICONS_SIZE} />,
      width: '2.5rem',
    },
    {
      name: 'Avalanche',
      icon: <AvalancheTransparentIcon
        width={SVG_ICONS_SIZE}
        height={SVG_ICONS_SIZE}
      />,
    },
    {
      name: 'Gate Chain',
      icon: <GateChainIcon width={SVG_ICONS_SIZE} height={SVG_ICONS_SIZE} />,
    },
    {
      name: 'Cross-chain bridge',
      description: 'Stage 01',
      icon: <ChainIcon width={SVG_ICONS_SIZE} height={SVG_ICONS_SIZE} />,
    },
    {
      name: 'Cross-chain bridge',
      description: 'Stage 02',
      icon: <ChainIcon width={SVG_ICONS_SIZE} height={SVG_ICONS_SIZE} />,
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
      icon: <BSCIcon width={SVG_ICONS_SIZE} height={SVG_ICONS_SIZE} />,
    },
    {
      name: 'Solana',
      icon: <SolanaICON width={SVG_ICONS_SIZE} height={SVG_ICONS_SIZE} />,
    },
    {
      name: 'Heco',
      icon: <HecoICON width={SVG_ICONS_SIZE} height={SVG_ICONS_SIZE} />,
    },
    {
      name: 'Platform Redesign',
      icon: <PencilWritingIcon width={SVG_ICONS_SIZE} height={SVG_ICONS_SIZE} />,
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
      icon: <OKEXIcon width={SVG_ICONS_SIZE} height={SVG_ICONS_SIZE} />,
    },
    {
      name: 'Tron',
      icon: <TronIcon width={SVG_ICONS_SIZE} height={SVG_ICONS_SIZE} />,
      marginTop: '1.25rem',
    },
    {
      name: 'NFT magic hall',
      description: 'Stage 01',
      icon: <ImageEmpty width={SVG_ICONS_SIZE} height={SVG_ICONS_SIZE} />,
      marginTop: '1.25rem',
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
      icon: <VolumeFull width={SVG_ICONS_SIZE} height={SVG_ICONS_SIZE} />,
      marginTop: '1.25rem',
    },
    {
      name: 'NFT magic hall',
      description: 'Stage 02',
      icon: <ImageEmpty width={SVG_ICONS_SIZE} height={SVG_ICONS_SIZE} />,
      marginTop: 2,
    }
  ]
};

const QUARTALS_INFO: IQuartalsInfo = {
  'q1': Q1,
  'q2': Q2,
  'q3': Q3,
  'q4': Q4,
};

const QuartalBlocksWrapper = styled(Flex)<FlexGapType>`
  ${system({
    gap: {
      property: 'gap',
      scale: 'space',
    },
  })}
`;
QuartalBlocksWrapper.defaultProps = {
  mt: 2,
}

const PROGRESS_BLOCK_WIDTH = 3;

const StepBlock = ({ step }: {step: IStep}) => (
  <Flex alignItems="center" mt={step.marginTop || 3}>
    <Flex
      width={step.width ? `calc(${step.width} + 0.5rem)` : 3}
      height={3}
      justifyContent="center"
      alignItems="center"
      borderRadius="0.625rem"
      backgroundColor="inactive"
    >
      {step.icon}
    </Flex>
    <Flex flexDirection="column" justifyContent="center" pl={1}>
      <Text color="text" variant="mediumRubik">
        { step.name }
      </Text>
      <Text color="inactive" variant="mediumRubik">
        { step.description }
      </Text>
    </Flex>
  </Flex>
);

const ProgressBlock = ({ steps, roadmapStepsIcon }: { steps: Array<IStep>, roadmapStepsIcon: RoadmapStepsIconType }) => (
  <Flex>
    <Image
      backgroundImage={`url(${roadmapStepsIcon})`}
      backgroundSize="cover"
      backgroundPosition="center"
      width={PROGRESS_BLOCK_WIDTH}
      height={`${steps.length * 2.5 + steps.length * 1.5 - 2}rem`}
    />
    <Box mt="-0.25rem">
      {steps.map((step) => (
        <StepBlock step={step} />
      ))}
    </Box>
  </Flex>
);

const QuartalBlock = ({ quartal } : {quartal: IQuartal }) => (
  <Box>
    <Flex alignItems="center" mb={2}>
      <Text
        width={PROGRESS_BLOCK_WIDTH}
        color={quartal.isActive ? 'text' : 'almostDisabled'}
      >
        {quartal.name}
      </Text>
      <Image
        backgroundImage={`url(${quartal.progressIcon})`}
        backgroundSize="cover"
        width="12.2rem"
        height={0}
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
    <Text>
      <StyledHead>
        Emiswap Roadmap
      </StyledHead>
      <Text variant="largeRubik" color="white" mt={4}>
        Emiswap is building cross-chain ecosystem <br />
        by integrating various blockchains and NFT components
      </Text>
    </Text>
    <QuartalBlocksWrapper gap="0.75rem">
      {Object.keys(QUARTALS_INFO).map((QUARTAL_INFO_KEY) => (
        <QuartalBlock quartal={QUARTALS_INFO[QUARTAL_INFO_KEY]} />
      ))}
    </QuartalBlocksWrapper>
  </Flex>
);

export default RoadmapBlock;
