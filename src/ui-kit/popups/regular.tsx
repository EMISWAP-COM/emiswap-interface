import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { color, variant } from 'styled-system';
import { HeaderStyleTypes } from 'ThemeProvider/fonts';
import { Box, Flex, Head, Text } from '../../ThemeProvider';

interface HeaderStyleInterface {
  variant: HeaderStyleTypes;
}

interface FontInterface {
  headerStyle: HeaderStyleTypes;
  children: ReactNode;
  color?: string;
}
const Font = styled.h1<HeaderStyleInterface>`
  ${color}
  ${variant({
    scale: 'headerStyles',
  })}
`;

const RegularPopUp = ({ headerText }: FontInterface) => (
  <Box bg="drop">
    <Flex p={4}>
      <Text>{headerText}</Text>
    </Flex>
  </Box>
);

export default RegularPopUp;
