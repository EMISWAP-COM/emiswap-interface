import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { layout, LayoutProps, system } from 'styled-system';
import FloatingBlurredCircle from '../assets/svg/floatingBlurredCircle.svg';
import { PolygonLogo, ShidenLogo, TimerLogo } from '../ui-kit/icons/landing';

import { Flex, Grid, ButtonGradientType, BackdropFilterType, Head, Text } from 'ThemeProvider';
import { SwipeIcon } from 'assets/svg/swipe';
import { Button } from 'ui-kit';

interface INetworkInformation {
  name: string;
  logo?: ReactElement;
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
    logo: <PolygonLogo />,
    description: '365% APR \n Farming opportunity',
    link: '#',
  },
  Shiden: {
    name: 'Shiden',
    logo: <ShidenLogo />,
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
const ACTIVE_BLOCK_WIDTH_DEFAULT = '14rem';
const ACTIVE_BLOCK_HEIGHT_DEFAULT = '13rem';
const circlesDisplay = { default: 'none', laptop: 'block' };

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

const FloatingCircle = styled.img<LayoutProps>`
  ${layout}
  position: absolute;
  border-radius: 50%;
`;

const TopLeftFloatingCircle = styled(FloatingCircle)`
  left: calc(50% - ${ACTIVE_BLOCK_SIZE} - ${ACTIVE_BLOCK_SIZE});
  top: -2rem;
`;

const BottomLeftFloatingCircle = styled(FloatingCircle)`
  left: calc(50% - ${ACTIVE_BLOCK_SIZE});
  transform: translate(40%, -15%);
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

const ActiveBlock = ({ network }: { network: INetworkInformation }) => (
  <ActiveBlockWrapper
    flexDirection="column"
    width={{ default: ACTIVE_BLOCK_WIDTH_DEFAULT, laptop: ACTIVE_BLOCK_SIZE }}
    height={{ default: ACTIVE_BLOCK_HEIGHT_DEFAULT, laptop: ACTIVE_BLOCK_SIZE }}
    p="3"
    bg="rgba(255, 255, 255, 0.05)"
    boxShadow="landingBox"
    borderRadius="1.25rem"
    border="0.0625rem solid"
    color="text"
    zIndex={network.zIndex}
    backdropFilter="default"
    borderImageSource="border"
  >
    <Text
      variant={{ default: 'largeRubikMedium', laptop: 'xLargeRubikMedium' } as any}
      color="paper"
    >
      {network.name}
    </Text>
    <Flex mt={3} mb={{ default: 3, laptop: 5 }}>
      <Flex>{network.logo ? network.logo : <TimerLogo />}</Flex>
      <Text variant="mediumRubikRegular" color="paper" ml={3} flex={1}>
        {network.description}
      </Text>
    </Flex>
    <Button color="paper" disabled={!network.link && true}>
      {network.link ? 'Farm Now' : 'Coming soon'}
    </Button>
  </ActiveBlockWrapper>
);

const ActiveBlocks = () => (
  <Grid
    position="relative"
    gridTemplateColumns="1fr 1fr 1fr"
    gridTemplateRows="1fr 1fr"
    gridColumnGap="2rem"
    gridRowGap="2rem"
    color="text"
    justifyContent={{ default: 'flex-left', laptop: 'center' }}
  >
    <TopLeftFloatingCircle display={circlesDisplay} src={FloatingBlurredCircle} alt="" />
    <BottomLeftFloatingCircle display={circlesDisplay} src={FloatingBlurredCircle} alt="" />
    <RightMiddleFloatingCircle display={circlesDisplay} src={FloatingBlurredCircle} alt="" />
    <RightBottomFloatingCircle display={circlesDisplay} src={FloatingBlurredCircle} alt="" />
    {Object.keys(NETWORKS).map(NetworkInfo => {
      return <ActiveBlock network={NETWORKS[NetworkInfo]} />;
    })}
  </Grid>
);

const ActivePoolsBlock = () => (
  <Flex
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    my={{ default: 7, mobile: 8 }}
  >
    <Head
      variant={{ default: 'defaultMobile', mobileL: 'default' } as any}
      mb={{ default: 0, mobile: 5 }}
    >
      Active Farming pools
    </Head>
    <Flex mb={{ default: 4, mobileL: 6 }} display={{ default: '', laptop: 'none' }}>
      <SwipeIcon />
    </Flex>
    <Flex justifyContent="center" width="100%" overflowX="auto">
      <ActiveBlocks />
    </Flex>
  </Flex>
);

export default ActivePoolsBlock;
