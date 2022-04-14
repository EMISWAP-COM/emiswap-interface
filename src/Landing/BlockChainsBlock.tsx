import React from 'react';
import { Flex, Image as BaseImage, Head } from 'ThemeProvider';
import avalancheLogo from 'assets/landing/avalanche-logo.png';
import auroraLogo from 'assets/landing/aurora-logo.png';
import astarLogo from 'assets/landing/astar-logo.png';
import gateLogo from 'assets/landing/gate-logo.png';
import nearLogo from 'assets/landing/near-logo.png';
import shidenLogo from 'assets/landing/shiden-logo.png';
import kccLogo from 'assets/landing/kcc-logo.png';
import styled from 'styled-components';

const Image = styled(BaseImage)`
  background-size: cover;
`;

Image.defaultProps = {
  mx: { mobileL: '2.25rem', default: '1.25rem' },
  my: { mobileL: '1.3125rem', default: '0.875rem' },
};

const BlockChainsBlock = () => (
  <Flex flexDirection="column" py={{ default: 4, mobileL: 8 }}>
    <Flex justifyContent="center" mb={{ default: 4, mobileL: 6 }}>
      <Head variant={{ default: 'defaultMobile', mobileL: 'default' } as any}>Blockchains</Head>
    </Flex>
    <Flex flexDirection="column">
      <Flex flexWrap="wrap" justifyContent="center" alignItems="center">
        <Image backgroundImage={`url(${gateLogo})`} width="11.015rem" height="2.243rem" />
        <Image backgroundImage={`url(${avalancheLogo})`} width="11.063rem" height="2.25rem" />
        <Image backgroundImage={`url(${auroraLogo})`} width="9.313rem" height="2.063rem" />
        <Image backgroundImage={`url(${shidenLogo})`} width="7.063rem" height="2.25rem" />
        <Image backgroundImage={`url(${nearLogo})`} width="8.438rem" height="2.25rem" />
        <Image backgroundImage={`url(${astarLogo})`} width="7.514rem" height="2.236rem" />
        <Image backgroundImage={`url(${kccLogo})`} width="6.707rem" height="2.236rem" />
      </Flex>
    </Flex>
  </Flex>
);

export default BlockChainsBlock;
