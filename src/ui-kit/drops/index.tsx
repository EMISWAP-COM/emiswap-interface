import React from 'react';
import { ReactNode } from 'react';
import { Box, Flex, Text } from '../../ThemeProvider';
import { CloseIcon } from '../icons';

interface DropInterface {
  children?: ReactNode;
  headerText: string;
  width?: number | string;
  onClose?: () => void;
}

const Drop = ({ children, headerText, width, onClose }: DropInterface) => {
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
        alignItems="center"
      >
        <Text variant="xlRubikMedium" color="paper">
          {headerText}
        </Text>
        <Box onClick={onClose} cursor="pointer">
          <CloseIcon width="1.125rem" height="1.125rem" />
        </Box>
      </Flex>
      {children}
    </Box>
  );
};

export default Drop;
