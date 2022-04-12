import React from 'react';
import styled, { css } from 'styled-components';
import '@reach/dialog/styles.css';
import Drop from '../../ui-kit/drops';
import { BackdropFilterType, Box, Flex } from '../../ThemeProvider';
import { system } from 'styled-system';

interface ModalProps {
  onClose?: () => void;
  children?: React.ReactNode;
}

const ModalBgWrapper = styled(Box)<{
  backdropFilter: BackdropFilterType;
}>`
  ${system({
    backdropFilter: {
      property: 'backdropFilter',
      scale: 'backdropFilter',
    },
  })}
`;

export default function NewModal({ children, onClose }: ModalProps) {
  return (
    <>
      <ModalBgWrapper
        position="fixed"
        left="0"
        width="100%"
        height="100%"
        bg="fadedToBlur"
        backdropFilter="kindaBlurred"
      />
      <Flex
        position="fixed"
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
        left="0"
      >
        <Drop headerText="Select wallet" width={12} onClose={onClose}>
          <Flex flexDirection="column" p="1.5rem">
            {children}
          </Flex>
        </Drop>
      </Flex>
    </>
  );
}
