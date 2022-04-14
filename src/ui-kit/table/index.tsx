import React, { ReactElement, ReactNode } from 'react';
import Header from './header';
import { Flex, FlexItemBox } from '../../ThemeProvider';
import styled from 'styled-components';
import Loader from '../loaders/Loader';

export enum TABLE_STATUSES {
  loading = 'loading',
  ready = 'ready',
}

interface TableInterface {
  children?: ReactNode;
  ariaLabel?: string;
  columns: Array<string>;
  status: TABLE_STATUSES;
}

const RowsWrapper = styled(Flex)`
  & > *:nth-child(n + 1) {
    margin-top: 0.5rem;
  }
`;

const Table = ({
  children,
  ariaLabel,
  columns,
  status = TABLE_STATUSES.ready,
}: TableInterface): ReactElement => {
  return (
    <Flex flexDirection="column" aria-Label={ariaLabel}>
      <Header columns={columns} />
      {status === TABLE_STATUSES.ready && <RowsWrapper>{children}</RowsWrapper>}
      {status === TABLE_STATUSES.loading && (
        <RowsWrapper alignItems="center" px={1}>
          <FlexItemBox flex={1}>
            <Flex justifyContent="left">
              <Loader width={32} height={32} />
            </Flex>
          </FlexItemBox>
          {columns.slice(0, columns.length - 1).map((_, index) => (
            <FlexItemBox flex={1} justifyContent="center">
              <Flex justifyContent={index === columns.length - 2 ? 'right' : 'center'}>
                <Loader width={125} height={15} borderRadius="0.25rem" />
              </Flex>
            </FlexItemBox>
          ))}
        </RowsWrapper>
      )}
    </Flex>
  );
};

export default Table;
