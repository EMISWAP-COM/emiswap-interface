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
  &:nth-child(n + 1) {
    margin-top: 0.5rem;
  }
`;

RowsWrapper.defaultProps = {
  px: 2,
  pb: 2,
  bg: 'almostNoWhite',
  borderRadius: '0.875rem',
  alignItems: 'center',
};

const Table = ({
  children,
  ariaLabel,
  columns,
  status = TABLE_STATUSES.ready,
}: TableInterface): ReactElement => {
  const LoadingLines = columns.slice(0, columns.length - 1).map((_, index) => {
    const isTheRightest = index === columns.length - 2;
    return (
      <FlexItemBox flex={1} justifyContent="center" mr={isTheRightest ? 2 : ''}>
        <Flex justifyContent={isTheRightest ? 'right' : 'center'}>
          <Loader width={125} height={15} borderRadius="0.25rem" />
        </Flex>
      </FlexItemBox>
    );
  });
  const LoadingRow = (
    <>
      <FlexItemBox flex={1}>
        <Flex justifyContent="left">
          <Loader width={32} height={32} />
        </Flex>
      </FlexItemBox>
      {LoadingLines}
    </>
  );
  return (
    <Flex flexDirection="column" aria-Label={ariaLabel}>
      <Header columns={columns} />
      {status === TABLE_STATUSES.ready && <RowsWrapper>{children}</RowsWrapper>}
      {status === TABLE_STATUSES.loading && (
        <>
          <RowsWrapper>{LoadingRow}</RowsWrapper>
          <RowsWrapper>{LoadingRow}</RowsWrapper>
          <RowsWrapper>{LoadingRow}</RowsWrapper>
          <RowsWrapper>{LoadingRow}</RowsWrapper>
          <RowsWrapper>{LoadingRow}</RowsWrapper>
        </>
      )}
    </Flex>
  );
};

export default Table;
