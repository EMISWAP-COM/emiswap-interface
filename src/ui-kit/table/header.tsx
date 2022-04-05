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

CellWrapper.defaultProps = {
  mb: 1,
  px: 1,
}

const Header = ({ columns }: HeaderInterface): ReactElement => {
  return (
    <CellWrapper>
      {columns.map((column, index) => {
        const isLeftest = index === 0;
        const isRightest = index === columns.length - 1;
        const textAlign = isLeftest ? 'left' : isRightest ? 'right' : 'center';
        return (
          <TableHeader textAlign={textAlign}>
            <Text variant="smallRubik" color="disabled">
              {column}
            </Text>
          </TableHeader>
        );
      })}
    </CellWrapper>
  );
};

export default Header;
