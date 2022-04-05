import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import { Flex } from '../../ThemeProvider';

interface CellInterface {
  ariaLabel?: string;
  children?: ReactNode;
}

const CellWrapper = styled(Flex)`
  & > * {
    flex: 1;
    justify-content: center;
    &:first-child {
      justify-content: start;
    }
    &:last-child {
      justify-content: end;
    }
  }
`;

const Cell = ({ children }: CellInterface): ReactElement => {
  return (
    <CellWrapper>
      { children }
    </CellWrapper>
  );
};

export default Cell;
