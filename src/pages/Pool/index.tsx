import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { SwapPoolTabs } from '../../components/NavigationTabs';

import { Text } from 'rebass';

import AppBody from '../AppBody';

export default function Pool() {
  const theme = useContext(ThemeContext);




  // fetch the reserves for all V2 pools in which the user has a balance



  return (
    <>
      <AppBody>
        <SwapPoolTabs active={'pool'} />
        <Text fontWeight={500} fontSize={20} color={theme.text2}>
          Coming soon!
        </Text>
      </AppBody>
    </>
  );
}
