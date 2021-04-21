import styled from 'styled-components';
import { FixedSizeList } from 'react-window';

import { RowBetween } from '../Row';
import { ButtonSecondary } from '../Button';

export const Header = styled.div`
  margin-top: 36px;
  color: ${({ theme }) => theme.text1};

  @media screen and (max-width: 1200px) {
    margin-top: 24px;
  }
`;

export const Level = styled.div`
  width: 1.5rem;
  background: ${({ theme }) => theme.grey6};
  border-radius: 4px;
  color: #ffffff;
  font-size: 0.7rem;
  padding: 1px 3px 1px 2px;
  margin-right: 6px;
`;

export const MenuItem = styled(RowBetween)`
  padding: 4px 30px 4px 16px;
  height: 50px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  background-color: ${({ theme, selected }) => selected && theme.bg2};
  :hover {
    background-color: ${({ theme }) => theme.bg2};
  }
`;

export const StyledFixedSizeList = styled(FixedSizeList)`
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #7d979433;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: #11b382;
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  color: ${({ selected }) => (selected ? '#11b382' : '#555959')};
  transition: all 0.3s ease-in-out;

  img {
    filter: ${({ selected }) => (selected ? 'none' : 'grayscale(1)')};
    transition: all 0.3s ease-in-out;
  }

  :hover {
    color: #11b382;

    img {
      filter: none;
    }
  }
`;

export const WalletAction = styled(ButtonSecondary)`
  width: fit-content;
  font-weight: 400;
  margin-left: 8px;
  font-size: 0.825rem;
  padding: 4px 16px;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }

  @media screen and (max-width: 1200px) {
    margin-left: auto;
  }
`;
