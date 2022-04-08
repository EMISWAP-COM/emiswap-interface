import React from 'react';
import { ReactNode } from 'react';
import { Box, Flex, Text } from '../../ThemeProvider';
import { CloseIcon } from '../icons';

interface DropInterface {
  children?: ReactNode;
  headerText: string;
  width?: number | string;
}

const Drop = ({ children, headerText, width }: DropInterface) => {
  const BORDER_WIDTH = '0.0625rem';
  return (
    <Box
      width={width}
      borderColor="inactiveDrop"
      borderStyle="solid"
      borderWidth={BORDER_WIDTH}
      borderRadius="1.5rem"
      bg="drop"
    >
      <Flex
        borderColor="inactiveDrop"
        borderBottomStyle="solid"
        borderBottomWidth={BORDER_WIDTH}
        p={4}
        justifyContent="space-between"
      >
        <Text variant="normalRubikRegular" color="text">
          {headerText}
        </Text>
        <CloseIcon />
      </Flex>
      {children}
    </Box>
  );
};

export default Drop;
