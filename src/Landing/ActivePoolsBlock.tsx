import React from 'react';
import styled from 'styled-components';
import { color, position, system } from 'styled-system';
import PolygonLogo from '../assets/svg/ChainsLogos/polygon.svg';
import ShidenLogo from '../assets/svg/ChainsLogos/shiden.svg';
import Timer from '../assets/svg/timer.svg';
import FloatingBlurredCircle from '../assets/svg/floatingBlurredCircle.svg';
import { Flex, Grid, Button, ButtonGradientType, BackdropFilterType } from '../ThemeProvider';

interface INetworkInformation {
  name: string;
  logo?: string;
  description: string;
  link?: string;
  zIndex?: number;
}

interface INetworkType {
  [index: string]: INetworkInformation;
}

const NETWORKS: INetworkType = {
  Polygon: {
    name: 'Polygon',
    logo: PolygonLogo,
    description: '365% APR \n Farming opportunity',
    link: '#',
  },
  Shiden: {
    name: 'Shiden',
    logo: ShidenLogo,
    description: '365% APR \n Farming opportunity',
    link: '#',
  },
  Avalanche: {
    name: 'Avalanche',
    description: '365% APR \n Farming opportunity',
  },
  Aurora: {
    name: 'Aurora',
    description: '365% APR \n Farming opportunity',
  },
  'Gate Chain': {
    name: 'Gate Chain',
    description: '365% APR \n Farming opportunity',
  },
  Solana: {
    name: 'Solana',
    description: '365% APR \n Farming opportunity',
    zIndex: 11,
  },
};

const ACTIVE_BLOCK_SIZE = '16rem';

const ActiveBlockWrapper = styled(Flex)<{
  borderImageSource: ButtonGradientType;
  backdropFilter: BackdropFilterType;
}>`
  ${system({
    backdropFilter: {
      property: 'backdropFilter',
      scale: 'backdropFilter',
    },
    borderImageSource: {
      property: 'borderImageSource',
      scale: 'gradients',
    },
  })}
`;

const DescriptionText = styled.p`
  ${color};
  flex: 1;
  margin-top: 0;
  margin-left: 1rem;
  white-space: pre-line;
`;

const FloatingCircle = styled.img`
  position: absolute;
  border-radius: 50%;
`;

const TopLeftFloatingCircle = styled(FloatingCircle)`
  left: calc(50% - ${ACTIVE_BLOCK_SIZE} - ${ACTIVE_BLOCK_SIZE});
  top: -2rem;
`;

const BottomLeftFloatingCircle = styled(FloatingCircle)`
  left: calc(50% - ${ACTIVE_BLOCK_SIZE});
  transform: translate(50%, -15%);
  top: 50%;
  z-index: 10;
  width: 6.25rem;
`;

const RightMiddleFloatingCircle = styled(FloatingCircle)`
  left: calc(50% + ${ACTIVE_BLOCK_SIZE});
  top: 50%;
  transform: translate(50%, -50%);
  z-index: 10;
  width: 8.5rem;
`;

const RightBottomFloatingCircle = styled(FloatingCircle)`
  left: calc(55% + ${ACTIVE_BLOCK_SIZE});
  top: 55%;
  transform: translateX(80%);
  z-index: 12;
  width: 5.5rem;
`;

const HeaderText = styled['h2']`
  background: radial-gradient(575.57% 4609.05% at 2.78% -76.56%, #b7e1ff 0%, #8128cc 25%), #ffffff;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2.5rem;
`;

const ActiveBlock = ({ network }: { network: INetworkInformation }) => (
  <ActiveBlockWrapper
    flexDirection="column"
    width={ACTIVE_BLOCK_SIZE}
    height={ACTIVE_BLOCK_SIZE}
    p="3"
    bg="rgba(255, 255, 255, 0.05)"
    boxShadow="inset 1.125rem 1.25rem 4.875rem rgba(255, 255, 255, 0.1)"
    borderRadius="1.25rem"
    border="0.0625rem solid"
    color="text"
    zIndex={network.zIndex}
    backdropFilter="default"
    borderImageSource="border"
  >
    <header>{network.name}</header>
    <Flex marginTop="1.25rem">
      <Flex
        justifyContent="center"
        alignItems="center"
        width="5rem"
        height="5rem"
        borderRadius="1.25rem"
        bg={
          Boolean(network.logo)
            ? `radial-gradient(107.5% 107.5% at 104.37% 101.87%, #7B3FE4 14.55%, #B185FF 83.34%)`
            : `rgba(255, 255, 255, 0.05)`
        }
      >
        <img src={network.logo || Timer} alt={network.name} />
      </Flex>
      <DescriptionText>{network.description}</DescriptionText>
    </Flex>
    <Button
      marginTop="1.25rem"
      borderRadius="0.6875rem"
      paddingTop="0.625rem"
      paddingBottom="0.625rem"
      border={network.link ? '0.0625rem solid #9C69F4' : '0.0625rem solid rgba(255, 255, 255, 0.4)'}
      color={network.link ? 'white' : 'rgba(255, 255, 255, 0.4)'}
      backgroundImage={
        network.link
          ? 'radial-gradient(175.28% 356.67% at 86.32% 100%, rgba(123, 63, 228, 0) 14.55%, #B185FF 83.34%)'
          : ''
      }
      backgroundColor={network.link ? '' : 'transparent'}
    >
      {network.link ? 'Farm Now' : 'Coming soon'}
    </Button>
  </ActiveBlockWrapper>
);

const ActiveBlocks = () => (
  <Grid
    position="relative"
    gridTemplateColumns={`${ACTIVE_BLOCK_SIZE} ${ACTIVE_BLOCK_SIZE} ${ACTIVE_BLOCK_SIZE}`}
    gridTemplateRows="1fr 1fr"
    gridColumnGap="2rem"
    gridRowGap="2rem"
    color="text"
  >
    <TopLeftFloatingCircle src={FloatingBlurredCircle} alt="" />
    <BottomLeftFloatingCircle src={FloatingBlurredCircle} alt="" />
    <RightMiddleFloatingCircle src={FloatingBlurredCircle} alt="" />
    <RightBottomFloatingCircle src={FloatingBlurredCircle} alt="" />
    {Object.keys(NETWORKS).map(NetworkInfo => {
      return <ActiveBlock network={NETWORKS[NetworkInfo]} />;
    })}
  </Grid>
);

const ActivePoolsBlock = () => (
  <Flex flexDirection="column" alignItems="center" justifyContent="center">
    <HeaderText>Active Farming pools</HeaderText>
    <ActiveBlocks />
  </Flex>
);

export default ActivePoolsBlock;
