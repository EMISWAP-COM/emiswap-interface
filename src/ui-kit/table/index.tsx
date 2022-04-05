import React, { ReactElement, ReactNode } from 'react';
import Header from './header';
import { Box, Flex } from '../../ThemeProvider';
import styled from 'styled-components';

interface TableInterface {
  children?: ReactNode;
  ariaLabel?: string;
  columns: Array<string>;
}

const RowsWrapper = styled(Box)`
  & > *:nth-child(n + 1) {
    margin-top: 0.5rem;
  }
`;

const Table = ({ children, ariaLabel, columns }: TableInterface): ReactElement => {
  return (
    <Flex
      flexDirection="column"
      aria-Label={ariaLabel}
    >
      <Header
        columns={columns}
      />
      <RowsWrapper>
        {children}
      </RowsWrapper>
    </Flex>
  );
};

export default Table;
