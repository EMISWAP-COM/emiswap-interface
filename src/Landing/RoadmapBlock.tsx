import React from 'react';
import { Flex, Image, StyledHead, Text, Box } from '../ThemeProvider';
import GreenToPurpleRectangle from '../assets/svg/Rectangles/GreenToPurple.svg';
import PurpleToGreenRectangle from '../assets/svg/Rectangles/PurpleToGreen.svg';
import RoadmapLineXL from '../assets/svg/Lines/RoadmapLineXL.svg';
import RoadmapLineMedium from '../assets/svg/Lines/RoadmapLineMedium.svg';
import RoadmapLineSmall from '../assets/svg/Lines/RoadmapLineSmall.svg';
import RoadmapLineXS from '../assets/svg/Lines/RoadmapLineXS.svg';
import ShidenLogo from '../assets/svg/Networks/Shiden.svg';
import NearAuroraLogo from '../assets/png/Networks/NearAurora.png';
import GateChainLogo from '../assets/svg/Networks/GateChain.svg';
import AvalancheLogo from '../assets/svg/Networks/Avalanche.svg';
import ChainPart from '../assets/svg/chainPart.svg';
import BinanceSmartChainLogo from '../assets/svg/Networks/BinanceSmartChain.svg';
import SolanaLogo from '../assets/svg/Networks/Solana.svg';
import HecoLogo from '../assets/svg/Networks/Heco.svg';
import EditPencil from '../assets/svg/EditPencil.svg';
import OKEXLogo from '../assets/svg/Networks/OKEX.svg';
import TronLogo from '../assets/svg/Networks/TRON.svg';
import ImageEmpty from '../assets/svg/image.svg';
import VolumeFull from '../assets/svg/VolumeFull.svg';
import styled from 'styled-components';

type RoadmapStepsIconType = string;

interface IStep {
  name: string;
  icon: string;
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
      icon: ShidenLogo,
    },
    {
      name: 'Near/Aurora',
      icon: NearAuroraLogo,
      width: '2.5rem',
    },
    {
      name: 'Avalanche',
      icon: AvalancheLogo,
    },
    {
      name: 'Gate Chain',
      icon: GateChainLogo,
    },
    {
      name: 'Cross-chain bridge',
      description: 'Stage 01',
      icon: ChainPart,
    },
    {
      name: 'Cross-chain bridge',
      description: 'Stage 02',
      icon: ChainPart,
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
      icon: BinanceSmartChainLogo,
    },
    {
      name: 'Solana',
      icon: SolanaLogo,
    },
    {
      name: 'Heco',
      icon: HecoLogo,
    },
    {
      name: 'Platform Redesign',
      icon: EditPencil,
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
      icon: OKEXLogo,
    },
    {
      name: 'Tron',
      icon: TronLogo,
      marginTop: '1.25rem',
    },
    {
      name: 'NFT magic hall',
      description: 'Stage 01',
      icon: ImageEmpty,
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
      icon: VolumeFull,
      marginTop: '1.25rem',
    },
    {
      name: 'NFT magic hall',
      description: 'Stage 02',
      icon: ImageEmpty,
      marginTop: '1rem',
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
  <Flex alignItems="center" mt={step.marginTop || '1.5rem'}>
    <Flex
      width={step.width ? `calc(${step.width} + 0.5rem)` : "2rem"}
      height="2rem"
      justifyContent="center"
      alignItems="center"
      borderRadius="0.625rem"
      backgroundColor="inactive"
    >
      <Image
        backgroundImage={`url(${step.icon})`}
        backgroundSize="cover"
        width={step.width || "1.25rem"}
        height="1.25rem"
      />
    </Flex>
    <Flex flexDirection="column" justifyContent="center" pl="0.5rem">
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

const QuartalBlockHeader = styled.header<{ isActive: boolean }>`
  text-align: center;
`;

const QuartalBlock = ({ quartal } : {quartal: IQuartal }) => (
  <Box>
    <Flex alignItems="center" mb="1rem">
      <Text
        width={PROGRESS_BLOCK_WIDTH}
        color={quartal.isActive ? '#FFFFFF' : 'rgba(255,255,255,0.6)'}
      >
        {quartal.name}
      </Text>
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
    <Text>
      <StyledHead>
        Emiswap Roadmap
      </StyledHead>
      <Text variant="largeRubik" color="white" mt="1.86rem">
        Emiswap is building cross-chain ecosystem <br />
        by integrating various blockchains and NFT components
      </Text>
    </Text>
    <QuartalBlocksWrapper>
      {Object.keys(QUARTALS_INFO).map((QUARTAL_INFO_KEY) => (
        <QuartalBlock quartal={QUARTALS_INFO[QUARTAL_INFO_KEY]} />
      ))}
    </QuartalBlocksWrapper>
  </Flex>
);

export default RoadmapBlock;
