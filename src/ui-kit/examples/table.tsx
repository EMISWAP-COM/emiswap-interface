import React from 'react';
import Wrapper from './wrapper';
import Table, { TABLE_STATUSES } from '../table';
import { Head, Text } from '../../ThemeProvider';
import Row from '../table/row';
import Cell from '../table/cell';

const TableLoaderExample = () => {
  return (
    <Table
      columns={['Balance', 'Available to collect', 'Conversion to USDT', 'Time before collect']}
      status={TABLE_STATUSES.loading}
    />
  );
};

const TableReadyExample = () => {
  return (
    <Table
      columns={['Balance', 'Available to collect', 'Conversion to USDT', 'Time before collect']}
    >
      <Row>
        <Cell>
          <Text variant="mediumRubikMedium" color="paper">
            Place
          </Text>
        </Cell>
        <Cell>
          <Text variant="mediumRubikMedium" color="paper">
            Your
          </Text>
        </Cell>
        <Cell>
          <Text variant="mediumRubikMedium" color="paper">
            Data
          </Text>
        </Cell>
        <Cell>
          <Text variant="mediumRubikMedium" color="paper">
            Here
          </Text>
        </Cell>
      </Row>
    </Table>
  );
};

const TablesExample = () => (
  <Wrapper>
    <Head variant="smallRubikMedium" color="paper">
      Loading...
    </Head>
    <TableLoaderExample />
    <Head variant="smallRubikMedium" color="paper">
      Ready!
    </Head>
    <TableReadyExample />
  </Wrapper>
);

export default TablesExample;
