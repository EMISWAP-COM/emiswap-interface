import styled from 'styled-components/macro';
import React, { useState } from 'react';
import { ButtonPrimary } from '../../../components/Button';

const Container = styled.div`
  position: relative;
`;

const MessageBlock = styled.div`
  z-index: 10000;
  position: absolute;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.lightGrey};
  border-radius: 8px;
  background: ${({ theme }) => theme.darkGrey};

  &:before {
    content: '';
    display: block;
    position: absolute;
    left: 50%;
    top: 39px;
    width: 9px;
    height: 9px;
    border: 1px solid ${({ theme }) => theme.lightGrey};
    border-top: none;
    border-right: none;
    background: ${({ theme }) => theme.darkGrey};
    transform: rotate(-45deg);
  }

  @media screen and (max-width: 600px) {
    position: fixed !important;
    top: inherit !important;
    bottom: 0 !important;
    right: 0 !important;
    left: 0 !important;
    width: 100%;
    padding: 24px 32px;
    font-size: 20px;
    border-radius: 24px 24px 0 0;

    &:before {
      display: none;
    }
  }
`;

const MessageText = styled.span<{ whiteSpace?: string }>`
  white-space: ${({ whiteSpace }) => (whiteSpace ? whiteSpace : 'nowrap')};
  color: white;

  @media screen and (max-width: 600px) {
    white-space: normal;
  }
`;

const ButtonClose = styled(ButtonPrimary)`
  display: none;

  @media screen and (max-width: 600px) {
    display: block;
    width: 100%;
    margin-top: 24px;
    padding: 15px 16px;
  }
`;

export interface MessageTooltipProps {
  children: React.ReactNode;
  text: string;
  position: { top?: string; right?: string; bottom?: string; left?: string };
  onClick?: () => void;
  onMouseEnter?: () => void;
  onClose?: () => void;
  disableTooltip?: boolean;
  buttonText?: string;
  whiteSpace?: string;
  className?: string;
}

export const MessageTooltip: React.FC<MessageTooltipProps> = ({
  children,
  text,
  position,
  onClick = () => void 0,
  onMouseEnter = () => void 0,
  onClose = () => void 0,
  disableTooltip = false,
  buttonText = 'OK',
  whiteSpace = 'white-space',
  className,
}) => {
  const [active, setActive] = useState(false);

  let tooltipTimeout = null;

  const handleClick = async () => {
    if (disableTooltip) {
      return;
    }
    if (tooltipTimeout) {
      clearTimeout(tooltipTimeout);
    }
    setActive(true);

    onClick();
  };

  const handleMouseEnter = async () => {
    if (disableTooltip) {
      return;
    }
    if (tooltipTimeout) {
      clearTimeout(tooltipTimeout);
    }
    setActive(true);

    onMouseEnter();
  };

  const handleMouseLeave = async () => {
    if (disableTooltip) {
      return;
    }
    if (tooltipTimeout) {
      clearTimeout(tooltipTimeout);
    }
    tooltipTimeout = setTimeout(() => {
      setActive(false);
    }, 500);

    onClose();
  };

  const handleCloseClick = async () => {
    if (tooltipTimeout) {
      clearTimeout(tooltipTimeout);
    }
    setActive(false);

    onClose();
  };

  return (
    <>
      {active && (
        <MessageBlock className={className} style={position}>
          <MessageText whiteSpace={whiteSpace}>{text}</MessageText>
          <ButtonClose onClick={handleCloseClick}>{buttonText}</ButtonClose>
        </MessageBlock>
      )}
      <Container
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </Container>
    </>
  );
};
