import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import {
  border,
  color,
  BordersProps,
  MinHeightProps,
  ColorProps,
  layout,
} from 'styled-system';
import { Flex, Text } from 'ThemeProvider';

interface RowInterface {
  children: ReactNode;
}

const TableRow = styled(Flex)<BordersProps & ColorProps & MinHeightProps>`
  ${border};
  ${color};
  ${layout};
  & > * {
    flex: 1;
    align-items: center;
    justify-content: center;
    &:first-child {
      justify-content: start;
    }
    &:last-child {
      justify-content: end;
    }
  }
`;

const Row = ({ children }: RowInterface): ReactElement => {
  return (
    <TableRow
      borderRadius="0.875rem"
      bg="almostNoWhite"
      minHeight="3rem"
      pl="0.5rem"
      pr="0.5rem"
      color="text"
    >
      { children }
    </TableRow>
  );
};

export default Row;
