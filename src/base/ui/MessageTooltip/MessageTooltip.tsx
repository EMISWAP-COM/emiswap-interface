import styled from 'styled-components';
import React from 'react';
import { ButtonPrimary } from '../../../components/Button';

export const MessageBlock = styled.div`
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

export const ButtonClose = styled(ButtonPrimary)`
  display: none;
  
  @media screen and (max-width: 600px) {
    display: block;
    width: 100%;
    margin-top: 24px;
    padding: 15px 16px;
  }
`;

interface Props {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
  buttonText?: string;
}

export const MessageTooltip: React.FC<Props> = ({ children, onClose, className, buttonText = 'OK' }) => {
  return (
    <MessageBlock className={className}>
      {children}
      <ButtonClose onClick={onClose}>{buttonText}</ButtonClose>
    </MessageBlock>
  );
};
