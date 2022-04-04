import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { color, typography } from 'styled-system';
import { Text } from 'ThemeProvider';

interface HeaderInterface {
  columns?: Array<string>;
}

const TH = styled.th`
  ${typography};
  ${color};
`;

const Header = ({ columns }: HeaderInterface): ReactElement => {
  return (
    <tr>
      {columns.map((column, index) => {
        const isLeftest = index === 0;
        const isRightest = index === columns.length - 1;
        const textAlign = isLeftest ? 'left' : isRightest ? 'right' : 'center';
        return (
          <TH textAlign={textAlign}>
            <Text variant="smallRubik" color="disabled">
              {column}
            </Text>
          </TH>
        );
      })}
    </tr>
  );
};

export default Header;
