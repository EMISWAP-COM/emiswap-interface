import React, { ReactElement } from 'react';
import { Text } from 'ThemeProvider';
import Cell from './cell';
import Row from './row';

interface HeaderInterface {
  columns?: Array<string>;
}

const Header = ({ columns }: HeaderInterface): ReactElement => {
  return (
    <Row backgroundColor="transparent">
      {columns.map((column, index) => {
        const isLeftest = index === 0;
        const isRightest = index === columns.length - 1;
        const textAlign = isLeftest ? 'left' : isRightest ? 'right' : 'center';
        return (
          <Cell>
            <Text variant="smallRubikRegular" color="disabled" textAlign={textAlign}>
              {column}
            </Text>
          </Cell>
        );
      })}
    </Row>
  );
};

export default Header;
