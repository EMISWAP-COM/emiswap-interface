import React from 'react';
import Flex from 'ThemeProvider';
import styled from 'styled-components';
import { color } from 'styled-system';

interface INetworkInformation {
  name: string;
  logo: string;
  description: string;
  link?: string;
}

interface INetworkType {
  [index: string]: INetworkInformation;
}

const NETWORKS: INetworkType = {
  'Polygon': {
    name: 'Polygon',
    logo: '#',
    description: '#',
    link: '#',
  },
  'Shiden': {
    name: 'Shiden',
    logo: '#',
    description: '#',
    link: '#',
  },
  'Avalanche': {
    name: 'Avalanche',
    logo: '#',
    description: '#',
  },
  'Aurora': {
    name: 'Aurora',
    logo: '#',
    description: '#',
  },
  'Gate Chain': {
    name: 'Gate Chain',
    logo: '#',
    description: '#',
  },
  'Solana': {
    name: 'Solana',
    logo: '#',
    description: '#',
  }
}

const ACTIVE_BLOCK_SIZE = '16rem';

const ActiveBlockWrapper = styled.div`
  display: flex;
  width: ${ACTIVE_BLOCK_SIZE};
  height: ${ACTIVE_BLOCK_SIZE};
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: inset 18px 20px 78px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(3.5rem);
  border-radius: 1.25rem;
  ${color};
`;

const ActiveBlocksWrapper = styled.div`
  display: grid;
  grid-template-columns: ${ACTIVE_BLOCK_SIZE} ${ACTIVE_BLOCK_SIZE} ${ACTIVE_BLOCK_SIZE};
  grid-template-rows: 1fr 1fr;
  column-gap: 2rem;
  row-gap: 2rem;
`;

const ActivePoolsBlockWrapper = styled.div`
  background: black;
`;

const GoButton = styled.div<{isActive: boolean}>`
  background: ${props => props.isActive
    ? `background: radial-gradient(175.28% 356.67% at 86.32% 100%, rgba(123, 63, 228, 0) 14.55%, #B185FF 83.34%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;`
    : 'red'};
`;

const ActiveBlock = ({network} : {network: INetworkInformation}) => {
  return (
    <ActiveBlockWrapper>
      <header color="text">
        { network.name }
      </header>
      <Flex>
        <img src={network.logo} alt={network.name} />
        <p>
          {network.description}
        </p>
      </Flex>
      <GoButton isActive={Boolean(network.link)}>
        {network.link ? 'Farm Now' : 'Coming soon'}
      </GoButton>
    </ActiveBlockWrapper>
  );
};

const ActiveBlocks = () => (
  <ActiveBlocksWrapper>
    {Object.keys(NETWORKS).map(NetworkInfo => {
      return <ActiveBlock network={NETWORKS[NetworkInfo]} />;
    })}
  </ActiveBlocksWrapper>
);

const ActivePoolsBlock = () => (
  <ActivePoolsBlockWrapper>
    <ActiveBlocks />
  </ActivePoolsBlockWrapper>
);

export default ActivePoolsBlock;
