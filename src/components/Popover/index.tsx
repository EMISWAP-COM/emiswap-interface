import { Placement } from '@popperjs/core';
import React, { useCallback, useState } from 'react';
import { usePopper } from 'react-popper';
import styled from 'styled-components';
import useInterval from '../../hooks/useInterval';
import Portal from '@reach/portal';
import { isMobile } from 'react-device-detect';

const PopoverContainer = styled.div<{ show: boolean }>`
  z-index: 9999;

  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  opacity: ${props => (props.show ? 1 : 0)};
  transition: visibility 150ms linear, opacity 150ms linear;

  background: ${({ theme }) => theme.dark1};
  border: 1px solid ${({ theme }) => theme.border1};
  box-shadow: ${({ theme }) => theme.dark1BoxShadow};
  color: ${({ theme }) => theme.darkWhite};
  border-radius: 8px;
`;

const ReferenceElement = styled.div`
  display: inline-block;
`;

const Arrow = styled.div`
  width: 8px;
  height: 8px;
  z-index: 9998;

  ::before {
    position: absolute;
    width: 8px;
    height: 8px;
    z-index: 9998;

    content: '';
    border: 1px solid ${({ theme }) => theme.border1};
    transform: rotate(45deg);
    background: ${({ theme }) => theme.dark1};
  }

  &.arrow-top {
    bottom: -5px;
    ::before {
      border-top: none;
      border-left: none;
    }
  }

  &.arrow-bottom {
    top: -5px;
    ::before {
      border-bottom: none;
      border-right: none;
    }
  }

  &.arrow-left {
    right: -5px;

    ::before {
      border-bottom: none;
      border-left: none;
    }
  }

  &.arrow-right {
    left: -5px;
    ::before {
      border-right: none;
      border-top: none;
    }
  }
`;

const Inner = styled.div``;

export interface PopoverProps {
  content: React.ReactNode;
  show: boolean;
  children: React.ReactNode;
  placement?: Placement;
  withPortal?: boolean;
}

export default function Popover({
  content,
  show,
  children,
  placement = 'auto',
  withPortal = true,
}: PopoverProps) {
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement>(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement>(null);
  const { styles, update, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    strategy: 'fixed',
    modifiers: [
      { name: 'offset', options: { offset: [8, 8] } },
      { name: 'arrow', options: { element: arrowElement } },
      {
        name: 'preventOverflow',
        options: { boundary: 'clippingParents', rootBoundary: 'viewport' },
      },
    ],
  });
  useInterval(update, show ? 100 : null);

  const PortalComponent = withPortal ? Portal : Inner;

  return (
    <>
      <ReferenceElement ref={setReferenceElement}>{children}</ReferenceElement>
      <PortalComponent>
        <PopoverContainer
          show={show}
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          {content}
          <Arrow
            className={`arrow-${attributes.popper?.['data-popper-placement'] ?? ''}`}
            ref={setArrowElement}
            style={styles.arrow}
            {...attributes.arrow}
          />
        </PopoverContainer>
      </PortalComponent>
    </>
  );
}

export function MouseoverPopover({ children, ...rest }: Omit<PopoverProps, 'show'>) {
  const [show, setShow] = useState(false);
  const open = useCallback(() => setShow(true), [setShow]);
  const close = useCallback(() => setShow(false), [setShow]);

  if (isMobile) {
    return <div>{children}</div>;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }} onMouseEnter={open} onMouseLeave={close}>
      <Popover {...rest} show={show} withPortal={false}>
        {children}
      </Popover>
    </div>
  );
}
