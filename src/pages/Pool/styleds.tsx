import { Text } from 'rebass';
import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
`;

export const ClickableText = styled(Text)`
  :hover {
    cursor: pointer;
  }
  color: ${({ theme }) => theme.blue};
`;

export const MaxButton = styled.button<{ width: string }>`
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.purple};
  border: 0;
  border-radius: 0.5rem;
  font-size: 1rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 0.25rem 0.5rem;
  `};
  font-weight: 500;
  cursor: pointer;
  margin: 0.25rem;
  overflow: hidden;
  color: ${({ theme }) => theme.darkWhite};
  :hover,
  :focus {
    box-shadow: ${({ theme }) => theme.purpleBoxShadow};
    outline: none;
  }
`;

export const Dots = styled.span`
  &::after {
    display: inline-block;
    animation: ellipsis 1.25s infinite;
    content: '.';
    width: 1em;
    text-align: left;
  }
  @keyframes ellipsis {
    0% {
      content: '.';
    }
    33% {
      content: '..';
    }
    66% {
      content: '...';
    }
  }
`;

export const StyledHr = styled.hr`
  width: 100%;
  background: ${({ theme }) => theme.lightGrey};
  border: none;
  height: 1px;
`;

export const GasFeeText = styled.div`
  color: ${({ theme }) => theme.darkText};
`;
