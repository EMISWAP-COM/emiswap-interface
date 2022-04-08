import React from 'react';
import { ReactNode } from 'react';
import { Box, Flex } from '../../ThemeProvider';
import { CloseIcon } from '../icons';

interface DropInterface {
  children?: ReactNode;
  headerText: string;
}

const Drop = ({ children, headerText }: DropInterface) => {
  const BORDER_WIDTH = '0.0625rem';
  return (
    <Box
      minWidth={12}
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
        <p>{headerText}</p>
        <CloseIcon />
      </Flex>
      {children}
    </Box>
  );
};

export default Drop;
