import styled from 'styled-components/macro';
import { ButtonPrimary } from '../../../components/Button';

export const Container = styled.div`
  position: relative;
`;

export const MessageBlock = styled.div`
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

export const MessageText = styled.span`
  white-space: nowrap;

  @media screen and (max-width: 600px) {
    white-space: normal;
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
