import React from 'react';
import styled from 'styled-components';
import { color, position } from 'styled-system';
import PolygonLogo from '../assets/svg/ChainsLogos/polygon.svg';
import ShidenLogo from '../assets/svg/ChainsLogos/shiden.svg';
import Timer from '../assets/svg/timer.svg';
import FloatingBlurredCircle from '../assets/svg/floatingBlurredCircle.svg';

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
  'Polygon': {
    name: 'Polygon',
    logo: PolygonLogo,
    description: '365% APR \n Farming opportunity',
    link: '#',
  },
  'Shiden': {
    name: 'Shiden',
    logo: ShidenLogo,
    description: '365% APR \n Farming opportunity',
    link: '#',
  },
  'Avalanche': {
    name: 'Avalanche',
    description: '365% APR \n Farming opportunity',
  },
  'Aurora': {
    name: 'Aurora',
    description: '365% APR \n Farming opportunity',
  },
  'Gate Chain': {
    name: 'Gate Chain',
    description: '365% APR \n Farming opportunity',
  },
  'Solana': {
    name: 'Solana',
    description: '365% APR \n Farming opportunity',
    zIndex: 11,
  }
}

const ACTIVE_BLOCK_SIZE = '16rem';

const ActiveBlockWrapper = styled.div<{zIndex: number}>`
  display: flex;
  flex-direction: column;
  width: ${ACTIVE_BLOCK_SIZE};
  height: ${ACTIVE_BLOCK_SIZE};
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: inset 18px 20px 78px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(3.5rem);
  border-radius: 1.25rem;
  border: 1px solid;
  border-image-source: radial-gradient(184.37% 184.37% at -60.94% -46.88%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 61%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
  ${color};
  ${position};
`;

const ActiveBlocksWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: ${ACTIVE_BLOCK_SIZE} ${ACTIVE_BLOCK_SIZE} ${ACTIVE_BLOCK_SIZE};
  grid-template-rows: 1fr 1fr;
  column-gap: 2rem;
  row-gap: 2rem;
`;

const ActivePoolsBlockWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: black;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  margin-top: 1.25rem;
`;

const NetworkImageWrapper = styled.div<{isLogo: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
  border-radius: 1.25rem;
  background: ${props => props.isLogo
    ? `radial-gradient(107.5% 107.5% at 104.37% 101.87%, #7B3FE4 14.55%, #B185FF 83.34%)`
    : `rgba(255, 255, 255, 0.05)`};
`;

const DescriptionText = styled.p`
  ${color};
  flex: 1;
  margin-top: 0;
  margin-left: 1rem;
  white-space: pre-line;
`;

const GoButton = styled.div<{isActive: boolean}>`
  margin-top: 1.25rem;
  border-radius: 0.6875rem;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  text-align: center;
  cursor: pointer;
  border: ${props => props.isActive ? '1px solid #9C69F4' : '1px solid rgba(255, 255, 255, 0.4)'};
  color: ${props => props.isActive ? 'white' : 'rgba(255, 255, 255, 0.4)'};
  background: ${props => props.isActive
    ? `radial-gradient(175.28% 356.67% at 86.32% 100%, rgba(123, 63, 228, 0) 14.55%, #B185FF 83.34%)`
    : 'transparent'};
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
  background: radial-gradient(575.57% 4609.05% at 2.78% -76.56%, #B7E1FF 0%, #8128CC 25%), #FFFFFF;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 40px;
`;

const ActiveBlock = ({network} : {network: INetworkInformation}) => {
  return (
    <ActiveBlockWrapper color="text" zIndex={network.zIndex}>
      <header>
        { network.name }
      </header>
      <DescriptionWrapper>
        <NetworkImageWrapper isLogo={Boolean(network.logo)}>
          <img src={network.logo || Timer} alt={network.name} />
        </NetworkImageWrapper>
        <DescriptionText>
          {network.description}
        </DescriptionText>
      </DescriptionWrapper>
      <GoButton isActive={Boolean(network.link)}>
        {network.link ? 'Farm Now' : 'Coming soon'}
      </GoButton>
    </ActiveBlockWrapper>
  );
};

const ActiveBlocks = () => (
  <ActiveBlocksWrapper>
    <TopLeftFloatingCircle src={FloatingBlurredCircle} alt="" />
    <BottomLeftFloatingCircle src={FloatingBlurredCircle} alt="" />
    <RightMiddleFloatingCircle src={FloatingBlurredCircle} alt="" />
    <RightBottomFloatingCircle src={FloatingBlurredCircle} alt="" />
    {Object.keys(NETWORKS).map(NetworkInfo => {
      return <ActiveBlock network={NETWORKS[NetworkInfo]} />;
    })}
  </ActiveBlocksWrapper>
);

const ActivePoolsBlock = () => (
  <ActivePoolsBlockWrapper>
    <HeaderText>Active Farming pools</HeaderText>
    <ActiveBlocks />
  </ActivePoolsBlockWrapper>
);

export default ActivePoolsBlock;
