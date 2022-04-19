import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Popover, { PopoverProps } from '../Popover';
import NewPopover from '../NewPopover';

const TooltipContainer = styled.div`
  width: 300px;
  padding: 0.6rem 1rem;
  line-height: 150%;
  font-weight: 400;
`;

export interface TooltipProps extends Omit<PopoverProps, 'content'> {
  text: string;
}

export function NewTooltip({ text, ...rest }: TooltipProps) {
  return <NewPopover content={<TooltipContainer>{text}</TooltipContainer>} {...rest} />;
}

export default function Tooltip({ text, ...rest }: TooltipProps) {
  return <Popover content={<TooltipContainer>{text}</TooltipContainer>} {...rest} />;
}

export function MouseoverTooltip({ children, ...rest }: Omit<TooltipProps, 'show'>) {
  const [show, setShow] = useState(false);
  const open = useCallback(() => setShow(true), [setShow]);
  const close = useCallback(() => setShow(false), [setShow]);
  return (
    <Tooltip {...rest} show={show}>
      <div onMouseEnter={open} onMouseLeave={close}>
        {children}
      </div>
    </Tooltip>
  );
}
