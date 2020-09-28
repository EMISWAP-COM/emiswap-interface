import styled from 'styled-components';
import { FixedSizeList } from 'react-window';

import { RowBetween } from '../Row';

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
    width: 4px;
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
