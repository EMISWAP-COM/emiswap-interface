import { Placement } from '@popperjs/core';
import React, { useState } from 'react';
import { usePopper } from 'react-popper';
import styled from 'styled-components';
import useInterval from '../../hooks/useInterval';
import Portal from '@reach/portal';
import { Box, Props } from '../../ThemeProvider';
import { border, color, layout, position, variant } from 'styled-system';
import { TextStyleTypes } from '../../ThemeProvider/fonts';

const PopoverContainer = styled.div<Props & { show: boolean } & { variant?: TextStyleTypes }>`
  z-index: 9999;
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  opacity: ${props => (props.show ? 1 : 0)};
  transition: visibility 150ms linear, opacity 150ms linear;
  border-radius: 0.75rem;
  & > div:first-child {
    padding: 1rem;
  }
  ${color};
  ${border};
  ${variant({
    scale: 'textStyles',
  })};
`;

PopoverContainer.defaultProps = {
  variant: 'smallRubikRegular',
  backgroundColor: 'popoverGray',
  color: 'disabled',
  border: '1px solid rgba(255, 255, 255, 0.2)',
};

const NewArrow = styled.div<Props>`
  clip-path: polygon(0% 0%, 100% 100%, 0% 100%);
  transform: rotate(-45deg);
  ${layout};
  ${color};
  ${border};
  ${position};
  &.arrow-bottom {
    top: -5px;
  }
  &.arrow-left {
    right: -5px;
  }
  &.arrow-right {
    left: -10px;
  }
  &[data-hide] {
    visibility: hidden;
  }
`;

NewArrow.defaultProps = {
  display: 'block',
  width: 3,
  height: 3,
  backgroundColor: 'inherit',
  border: 'inherit',
  borderRadius: '0 0 0 0.25em',
  position: 'absolute',
  bottom: '-0.625rem',
};

export interface PopoverProps {
  content: React.ReactNode;
  show: boolean;
  children: React.ReactNode;
  placement?: Placement;
}

function updateArrowStyles(styles, attributes) {
  const copyOfStyles = Object.assign({}, styles);
  let newTransform = 'scale(0.55)';
  const placement = attributes['data-popper-placement'];
  if (placement === 'right') {
    newTransform += 'rotate(45deg)';
  }
  if (placement === 'top') {
    newTransform += 'rotate(-45deg)';
  }
  copyOfStyles.transform = `${styles.transform} ${newTransform}`;
  return copyOfStyles;
}

export default function NewPopover({ content, show, children, placement = 'auto' }: PopoverProps) {
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement>(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement>(null);
  const { styles, update, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    strategy: 'fixed',
    modifiers: [
      { name: 'offset', options: { offset: [0, 0] } },
      {
        name: 'arrow',
        options: {
          element: arrowElement,
        },
      },
      {
        name: 'preventOverflow',
        options: { boundary: 'clippingParents', rootBoundary: 'viewport' },
      },
    ],
  });
  useInterval(update, show ? 100 : null);
  const newArrowStyles = styles.arrow
    ? updateArrowStyles(styles.arrow, attributes.popper)
    : styles.arrow;
  return (
    <>
      <Box display="inline-block" ref={setReferenceElement}>
        {children}
      </Box>
      <Portal>
        <PopoverContainer
          show={show}
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          {content}
          <NewArrow
            className={`arrow-${attributes.popper?.['data-popper-placement'] ?? ''}`}
            ref={setArrowElement}
            style={newArrowStyles}
            {...attributes.arrow}
          />
        </PopoverContainer>
      </Portal>
    </>
  );
}
