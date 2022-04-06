import React from 'react';
import { Grid, Flex, StyledHead, Image, Box } from 'ThemeProvider';
import Text from 'ui-kit/Text';
import holdIcon from 'assets/landing/hold.png';
import exIcon from 'assets/landing/ex.png';
import mantraIcon from 'assets/landing/mantra.png';
import masterIcon from 'assets/landing/master.png';
import rcIcon from 'assets/landing/rc.png';
import theme from 'ThemeProvider/theme';

export const IconWrapper = ({ iconUrl }) => (
  <Flex
    justifyContent="center"
    alignItems="center"
    width="6.875rem"
    height="6.875rem"
    bg="silver"
    borderRadius="2rem"
  >
    <Image backgroundImage={`url(${iconUrl})`} backgroundSize="cover" width="100%" height="100%" />
  </Flex>
);

const Card = ({ head, text, icon }: { head: string; text: string; icon: any }) => (
  <Flex
    width="21rem"
    height="10rem"
    alignItems="center"
    bg="#2e3033"
    borderRadius={theme.space[4]}
    pr={4}
    pl={5}
  >
    <Flex>
      <IconWrapper iconUrl={icon}></IconWrapper>
    </Flex>
    <Grid ml={4} mt={4} gridTemplateRows="25% auto">
      <Text textStyle="mediumRubikBold">{head}</Text>
      <Text textStyle="mediumRubikRegular">{text}</Text>
    </Grid>
  </Flex>
);

const InvestorsBlock = () => (
  <Grid
    width="67rem"
    height="30rem"
    gridTemplateRows="21% auto auto"
    justifyContent="center"
    mt={7}
    ml="auto"
    mr="auto"
  >
    <Flex justifyContent="center">
      <StyledHead>Investors</StyledHead>
    </Flex>
    <Flex justifyContent="space-between">
      <Card head="Hodl.global" text="Сrypto and token fund" icon={holdIcon} />
      <Card head="ExNetwork fund" text="Fund, idea lab & an incubator" icon={exIcon} />
      <Card head="MantraDAO" text="DeFi platform focused on Staking" icon={mantraIcon} />
    </Flex>
    <Flex justifyContent="space-between" pl={8} pr="13rem" mt={2}>
      <Card
        head="MasterVentures"
        text="Blockchain focused Venture Studio building"
        icon={masterIcon}
      />
      <Card head="4RC fund" text="Fund investing in DeFi. NFT and Web 3.0 projects" icon={rcIcon} />
    </Flex>
  </Grid>
);

export default InvestorsBlock;
