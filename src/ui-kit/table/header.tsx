import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { color, typography, TypographyProps } from 'styled-system';
import { Flex, Text } from 'ThemeProvider';
import { CellWrapper } from './cell';

interface HeaderInterface {
  columns?: Array<string>;
}

const TableHeader = styled(Flex)<TypographyProps>`
  ${typography};
  ${color};
`;

const Header = ({ columns }: HeaderInterface): ReactElement => {
  return (
    <CellWrapper px={1} mb={1}>
      {columns.map((column, index) => {
        const isLeftest = index === 0;
        const isRightest = index === columns.length - 1;
        const textAlign = isLeftest ? 'left' : isRightest ? 'right' : 'center';
        return (
          <TableHeader textAlign={textAlign}>
            <Text variant="smallRubikRegular" color="disabled" mr={isRightest ? 3 : ''}>
              {column}
            </Text>
          </TableHeader>
        );
      })}
    </CellWrapper>
  );
};

export default Header;
