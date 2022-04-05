import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { color, typography, TypographyProps } from 'styled-system';
import { Flex, Text } from 'ThemeProvider';

interface HeaderInterface {
  columns?: Array<string>;
}

const TableHeader = styled(Flex)<TypographyProps>`
  ${typography};
  ${color};
`;

const Header = ({ columns }: HeaderInterface): ReactElement => {
  return (
    <Flex mb="0.5rem">
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
    </Flex>
  );
};

export default Header;
