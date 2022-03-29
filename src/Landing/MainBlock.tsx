import React from 'react';
import { Flex, Grid, Head, Text, Image } from 'ThemeProvider';
import mainLogo from 'assets/landing/main-block.png';

const MainBlock = () => (
  <Grid height={480} width={1084} alignItems="center" gridTemplateColumns="600px auto">
    <Flex flexDirection="column" justifyContent="center">
      <Head variant="largeSora" color="white">
        Next-Gen DeFi Matrix with 365% Cross-Chain APR & DAO Governance
      </Head>
      <Text color="white" variant="largeRubik" width={495}>
        Extract the highest daily yields from liquidity mining and farming
      </Text>
    </Flex>
    <Flex>
      <Image backgroundImage={`url(${mainLogo})`} backgroundSize="cover" width={470} height={480} />
    </Flex>
  </Grid>
);

export default MainBlock;
