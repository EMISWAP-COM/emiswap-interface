import React from 'react';
import { Flex, Text, Image, Head, Box } from 'ThemeProvider';
import infoBlock from 'assets/landing/info-block.png';

const InfoBlock = () => (
  <Flex
    justifyContent="center"
    flexDirection={{ default: 'column', tablet: 'row' }}
    py={{ default: 4, tablet: 8 }}
    px={{ default: 4, laptop: 0 }}
    background={{ default: 'infoDefault', tablet: 'infoTablet' }}
  >
    <Flex alignItems="center" justifyContent="center" mb="4">
      <Image
        backgroundImage={`url(${infoBlock})`}
        backgroundSize="cover"
        width={{
          default: '15rem',
          mobileM: '21rem',
          laptop: '32rem',
        }}
        height={{
          default: '15rem',
          mobileM: '20rem',
          laptop: '34rem',
        }}
      />
    </Flex>
    <Flex flexDirection="column" justifyContent="center" width={{ default: '100%', tablet: '45%' }}>
      <Head variant={{ default: 'defaultMobile', mobileL: 'default' } as any}>
        Meet the <br />
        EmiDAO Ecosystem
      </Head>
      <Text
        variant={{ default: 'largeRubikRegular', mobileL: 'xLargeRubikRegular' } as any}
        color="paper"
        mt="5"
      >
        EmiSwap is an AMM DEX and the first project in the EmiDAO ecosystem. 100% of the trading
        fees on the DEX are distributed between liquidity providers and ESW token holders.
      </Text>
    </Flex>
  </Flex>
);

export default InfoBlock;
