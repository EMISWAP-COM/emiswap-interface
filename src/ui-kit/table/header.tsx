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

const HeaderWrapper = styled(Flex)`
  margin-bottom: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
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

const Header = ({ columns }: HeaderInterface): ReactElement => {
  return (
    <HeaderWrapper>
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
    </HeaderWrapper>
  );
};

export default Header;
