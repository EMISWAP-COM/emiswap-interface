import React, { useState } from 'react';

import { noop, Noop } from '../../../utils';

import * as Styled from './styled';

export interface Position {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

export interface MessageTooltipProps {
  children: React.ReactNode;
  text: string;
  position: Position;
  onClick?: Noop;
  onMouseEnter?: Noop;
  onClose?: Noop;
  disableTooltip?: boolean;
  buttonText?: string;
}

export const MessageTooltip: React.FC<MessageTooltipProps> = ({
  children,
  text,
  position,
  onClick = noop,
  onMouseEnter = noop,
  onClose = noop,
  disableTooltip = false,
  buttonText = 'OK',
}) => {
  const [active, setActive] = useState(false);

  const tooltipTimeout = React.useRef(null);

  const handleClick = React.useCallback(() => {
    const fn = async () => {
      if (disableTooltip) {
        return;
      }
      if (tooltipTimeout?.current) {
        clearTimeout(tooltipTimeout?.current);
      }
      setActive(true);

      onClick();
    };

    fn().catch(console.error);
  }, [disableTooltip, onClick, tooltipTimeout]);

  const handleMouseEnter = React.useCallback(() => {
    const fn = async () => {
      if (disableTooltip) {
        return;
      }
      if (tooltipTimeout) {
        clearTimeout(tooltipTimeout?.current);
      }
      setActive(true);

      onMouseEnter();
    };

    fn().catch(console.error);
  }, [disableTooltip, onMouseEnter, tooltipTimeout]);

  const handleMouseLeave = React.useCallback(() => {
    const fn = async () => {
      if (disableTooltip) {
        return;
      }
      if (tooltipTimeout) {
        clearTimeout(tooltipTimeout?.current);
      }
      tooltipTimeout.current = setTimeout(() => {
        setActive(false);
      }, 500);

      onClose();
    };

    fn().catch(console.error);
  }, [tooltipTimeout, disableTooltip, onClose]);

  const handleCloseClick = React.useCallback(() => {
    const fn = async () => {
      if (tooltipTimeout) {
        clearTimeout(tooltipTimeout?.current);
      }
      setActive(false);

      onClose();
    };

    fn().catch(console.error);
  }, [onClose, tooltipTimeout]);

  return (
    <>
      {active && (
        <Styled.MessageBlock style={position}>
          <Styled.MessageText>{text}</Styled.MessageText>
          <Styled.ButtonClose onClick={handleCloseClick}>{buttonText}</Styled.ButtonClose>
        </Styled.MessageBlock>
      )}
      <Styled.Container
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </Styled.Container>
    </>
  );
};
