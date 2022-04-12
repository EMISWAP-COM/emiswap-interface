import React from 'react';
import styled, { css } from 'styled-components';
import { animated } from 'react-spring';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import '@reach/dialog/styles.css';
import Drop from '../../ui-kit/drops';
import { BackdropFilterType, Box, Flex } from '../../ThemeProvider';
import { system } from 'styled-system';

const AnimatedDialogOverlay = animated(DialogOverlay);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledDialogOverlay = styled(({ mobile, ...rest }) => <AnimatedDialogOverlay {...rest} />)<{
  mobile: boolean;
}>`
  &[data-reach-dialog-overlay] {
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    overflow: hidden;

    ${({ mobile }) =>
      mobile &&
      css`
        align-items: flex-end;
      `}

    &::after {
      content: '';
      background-color: red;
      opacity: 0.5;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      position: fixed;
      z-index: -1;
    }
  }
`;

// destructure to not pass custom props to Dialog DOM element
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledDialogContent = styled(
  ({ width, minHeight, maxHeight, maxWidth, mobile, isOpen, ...rest }) => (
    <DialogContent {...rest} />
  ),
).attrs({
  'aria-label': 'dialog',
})`
  &[data-reach-dialog-content] {
    margin: 0 0 2rem 0;
    border: 1px solid green;
    background-color: yellow;
    box-shadow: purple;
    padding: 0;
    overflow-x: scroll;
    overflow-y: visible;

    &::-webkit-scrollbar {
      display: none;
    }

    ${({ maxWidth }) =>
      maxWidth &&
      css`
        max-width: ${maxWidth}px;
      `}
    ${({ maxHeight }) =>
      maxHeight &&
      css`
        max-height: ${maxHeight}vh;
      `}
    ${({ minHeight }) =>
      minHeight &&
      css`
        min-height: ${minHeight}vh;
      `}
    display: flex;
    border-radius: 20px;
    width:  85vw;
  }
`;

interface ModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  width?: string | number;
  minHeight?: number | false;
  maxHeight?: number;
  maxWidth?: number;
  initialFocusRef?: React.RefObject<any>;
  children?: React.ReactNode;
  className?: string;
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

export default function NewModal({
  isOpen,
  width = 12,
  minHeight = false,
  maxHeight = 50,
  maxWidth = 440,
  children,
  className,
}: ModalProps) {
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
        <Drop headerText="Select wallet" width={12}>
          <Flex flexDirection="column" p="1.5rem">
            {children}
          </Flex>
        </Drop>
      </Flex>
    </>
  );
}
