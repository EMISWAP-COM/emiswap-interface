import React from 'react';
import Wrapper from './wrapper';
import Table, { TABLE_STATUSES } from '../table';

const TableLoaderExample = () => {
  return (
    <Table
      columns={['Balance', 'Available to collect', 'Conversion to USDT', 'Time before collect']}
      status={TABLE_STATUSES.loading}
    />
  );
};

const TablesExample = () => (
  <Wrapper>
    <TableLoaderExample />
  </Wrapper>
);

export default TablesExample;
