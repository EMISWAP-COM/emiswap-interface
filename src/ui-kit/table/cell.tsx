import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import { Flex } from '../../ThemeProvider';
import { border } from 'styled-system';

interface CellInterface {
  ariaLabel?: string;
  children?: ReactNode;
}

export const CellWrapper = styled(Flex)`
  ${border};
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
  return <CellWrapper>{children}</CellWrapper>;
};

export default Cell;
