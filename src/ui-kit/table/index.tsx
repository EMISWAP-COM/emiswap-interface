import React, { ReactElement, ReactNode } from 'react';
import Header from './header';
import { Box, Flex } from '../../ThemeProvider';

interface TableInterface {
  children?: ReactNode;
  ariaLabel?: string;
  columns: Array<string>;
}

const Table = ({ children, ariaLabel, columns }: TableInterface): ReactElement => {
  return (
    <Flex
      flexDirection="column"
      aria-Label={ariaLabel}
    >
      <Header
        columns={columns}
      />
      <Box>
        {children}
      </Box>
    </Flex>
  );
};

export default Table;
