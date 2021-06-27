import styled from 'styled-components/macro';
import React, { useState } from 'react';
import { ButtonPrimary } from '../../../components/Button';

const Container = styled.div`
  position: relative;
`;

const MessageBlock = styled.div`
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
    bottom: 0;
    width: 100%;
    top: inherit !important;
    right: 0 !important;
    padding: 24px 32px;
    font-size: 20px;
    border-radius: 24px 24px 0 0;

    &:before {
      display: none;
    }
  }
`;

const MessageText = styled.span`
  white-space: nowrap;

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

    console.log(active);

    onClose();
  };

  return (
    <>
      {active && (
        <MessageBlock style={position}>
          <MessageText>{text}</MessageText>
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
