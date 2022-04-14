import React from 'react';
import { Flex, Image as BaseImage, Head } from 'ThemeProvider';
import bitmartLogo from 'assets/landing/bitmart-logo.png';
import digfinexLogo from 'assets/landing/digfinex-logo.png';
import everestLogo from 'assets/landing/everest-logo.png';
import emirexLogo from 'assets/landing/emirex-logo.png';
import bigbrainLogo from 'assets/landing/bigbrain-logo.png';
import alphaLogo from 'assets/landing/alpha-logo.png';
import etexchangeLogo from 'assets/landing/etexchange-logo.png';
import mahdaoLogo from 'assets/landing/mahdao-logo.png';
import jpycLogo from 'assets/landing/jpyc-logo.png';
import holaLogo from 'assets/landing/holla-logo.png';
import transformLogo from 'assets/landing/transform-group-logo.png';
import styled from 'styled-components';

const Image = styled(BaseImage)`
  background-size: cover;
`;

Image.defaultProps = {
  mx: { mobileL: '3.125rem', default: '1.25rem' },
  my: { mobileL: '1.3125rem', default: '0.875rem' },
};

const PartnersBlock = () => (
  <Flex flexDirection="column" my={{ default: 4, mobile: 8 }}>
    <Flex justifyContent="center" mb={{ default: 4, mobileL: 6 }}>
      <Head variant={{ default: 'defaultMobile', mobileL: 'default' } as any}>Partners</Head>
    </Flex>
    <Flex flexWrap="wrap" justifyContent="center" alignItems="center">
      <Image backgroundImage={`url(${bitmartLogo})`} width="7.809rem" height="2.146rem" />
      <Image backgroundImage={`url(${digfinexLogo})`} width="8.438rem" height="1.625rem" />
      <Image backgroundImage={`url(${everestLogo})`} width="8.1885rem" height="1.625rem" />
      <Image backgroundImage={`url(${emirexLogo})`} width="7.75rem" height="2.15rem" />
      <Image backgroundImage={`url(${bigbrainLogo})`} width="8rem" height="2.1rem" />
      <Image backgroundImage={`url(${alphaLogo})`} width="12.694rem" height="2.139rem" />
      <Image backgroundImage={`url(${etexchangeLogo})`} width="10.938rem" height="1rem" />
      <Image backgroundImage={`url(${mahdaoLogo})`} width="9.875rem" height="2.125rem" />
      <Image backgroundImage={`url(${jpycLogo})`} width="6.495rem" height="2.146rem" />
      <Image backgroundImage={`url(${holaLogo})`} width="6.813rem" height="2.125rem" />
      <Image backgroundImage={`url(${transformLogo})`} width="8.25rem" height="2.875rem" />
    </Flex>
  </Flex>
);

export default PartnersBlock;
