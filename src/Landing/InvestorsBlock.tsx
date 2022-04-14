import React from 'react';
import { Grid, Flex, Text, Image, Head } from 'ThemeProvider';
import holdIcon from 'assets/landing/hold.png';
import exIcon from 'assets/landing/ex.png';
import mantraIcon from 'assets/landing/mantra.png';
import masterIcon from 'assets/landing/master.png';
import rcIcon from 'assets/landing/rc.png';

export const IconWrapper = ({ iconUrl }) => (
  <Flex
    justifyContent="center"
    alignItems="center"
    width={{ defaul: '4.75rem', mobileL: '6.875rem' }}
    height={{ defaul: '4.75rem', mobileL: '6.875rem' }}
    boxShadow="0 0 0 1 silver"
  >
    <Image backgroundImage={`url(${iconUrl})`} backgroundSize="cover" width="100%" height="100%" />
  </Flex>
);

const Card = ({ head, text, icon }: { head: string; text: string; icon: any }) => (
  <Flex
    width={{ defaul: '100%', mobileL: '20rem' }}
    height={{ defaul: '6.75rem', mobileL: '10rem' }}
    alignItems="center"
    bg="#2e3033"
    borderRadius="1rem"
    pr="2rem"
    pl="1.5rem"
    mx={{ defaul: '0', mobileL: '3' }}
    mt={{ defaul: '0.375rem', mobileL: '3' }}
    boxShadow="landingBox"
  >
    <Flex>
      <IconWrapper iconUrl={icon}></IconWrapper>
    </Flex>
    <Flex flexDirection="column" ml="1.25rem">
      <Text variant="mediumRubikMedium" color="paper">
        {head}
      </Text>
      <Text variant="smallRubikRegular" color="paper" mt="2">
        {text}
      </Text>
    </Flex>
  </Flex>
);

const InvestorsBlock = () => (
  <Flex flexDirection="column" px={{ default: 4, laptop: 0 }}>
    <Flex justifyContent="center" mb={{ default: 4, mobileL: 5 }}>
      <Head variant={{ default: 'defaultMobile', mobileL: 'default' } as any}>Investors</Head>
    </Flex>
    <Flex justifyContent="center" flexWrap="wrap" alignItems="center">
      <Card head="Hodl.global" text="Сrypto and token fund" icon={holdIcon} />
      <Card head="ExNetwork fund" text="Fund, idea lab & an incubator" icon={exIcon} />
      <Card head="MantraDAO" text="DeFi platform focused on Staking" icon={mantraIcon} />
      <Card
        head="MasterVentures"
        text="Blockchain focused Venture Studio building"
        icon={masterIcon}
      />
      <Card head="4RC fund" text="Fund investing in DeFi. NFT and Web 3.0 projects" icon={rcIcon} />
    </Flex>
  </Flex>
);

export default InvestorsBlock;
