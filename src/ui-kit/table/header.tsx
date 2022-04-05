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

HeaderWrapper.defaultProps = {
  mb: '0.5rem',
  px: '0.5rem',
}

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
