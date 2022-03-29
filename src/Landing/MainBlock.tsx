import React from 'react';
import { Flex, Grid, Head, Text, Image } from 'ThemeProvider';
import mainLogo from '../assets/landing/main-block.png';

const MainBlock = () => (
  <Grid height={512} gridTemplateColumns="660px auto" gridColumnGap={40} bg="bg">
    <Flex flexDirection="column" justifyContent="flex-end" pl={60}>
      <Head variant="largeSora" color="white">
        Next-Gen DeFi Matrix with 365% Cross-Chain APR & DAO Governance
      </Head>
      <Text color="white" variant="largeRubik" width={495}>
        Extract the highest daily yields from liquidity mining and farming
      </Text>
    </Flex>
    <Flex flexDirection="column" justifyContent="flex-end">
      <Image backgroundImage={`url(${mainLogo})`} backgroundSize="cover" width={470} height={480} />
    </Flex>
  </Grid>
);

export default MainBlock;
