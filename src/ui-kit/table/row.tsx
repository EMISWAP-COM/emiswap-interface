import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import { border, color, BordersProps, MinHeightProps, ColorProps, layout } from 'styled-system';
import { Flex } from 'ThemeProvider';

interface RowInterface {
  children: ReactNode;
}

const TableRow = styled(Flex)<BordersProps & ColorProps & MinHeightProps>`
  ${border};
  ${color};
  ${layout};
  & > *:first-child {
    text-align: left;
  }
  & > *:last-child {
    text-align: left;
  }
`;

const Row = ({ children }: RowInterface): ReactElement => {
  return (
    <TableRow
      borderRadius="0.875rem"
      bg="almostNoWhite"
      minHeight="3rem"
    >
      { children }
    </TableRow>
  );
};

export default Row;
