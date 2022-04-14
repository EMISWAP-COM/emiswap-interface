import React, { ReactElement, ReactNode } from 'react';
import Header from './header';
import { Flex } from '../../ThemeProvider';
import Loader from '../loaders/Loader';
import Row from './row';
import Cell from './cell';

export enum TABLE_STATUSES {
  loading = 'loading',
  ready = 'ready',
}

interface TableInterface {
  children?: ReactNode;
  ariaLabel?: string;
  columns: Array<string>;
  status?: TABLE_STATUSES;
}

const Table = ({
  children,
  ariaLabel,
  columns,
  status = TABLE_STATUSES.ready,
}: TableInterface): ReactElement => {
  const LoadingLines = columns.slice(0, columns.length - 1).map((_, index) => {
    return (
      <Cell>
        <Loader width={125} height={15} borderRadius="0.25rem" />
      </Cell>
    );
  });
  const LoadingRow = (
    <>
      <Cell>
        <Loader width={32} height={32} />
      </Cell>
      {LoadingLines}
    </>
  );
  return (
    <Flex flexDirection="column" aria-Label={ariaLabel}>
      <Header columns={columns} />
      {status === TABLE_STATUSES.ready && children}
      {status === TABLE_STATUSES.loading && (
        <>
          <Row>{LoadingRow}</Row>
          <Row>{LoadingRow}</Row>
          <Row>{LoadingRow}</Row>
          <Row>{LoadingRow}</Row>
          <Row>{LoadingRow}</Row>
        </>
      )}
    </Flex>
  );
};

export default Table;
