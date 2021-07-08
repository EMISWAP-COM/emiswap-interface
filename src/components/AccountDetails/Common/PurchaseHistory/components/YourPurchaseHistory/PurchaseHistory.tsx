import React from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../../../../../../state';
import { CellProps, cellRenders, headRenders, Table } from '../Table';

export interface YourPurchaseHistoryProps {
  etherscanBaseUrl: string;
}

export const YourPurchaseHistory: React.FC<YourPurchaseHistoryProps> = ({ etherscanBaseUrl }) => {
  const { deposits } = useSelector((state: AppState) => state.cabinets?.balance?.histories);

  const purchaseFields: CellProps[] = React.useMemo(
    () => [
      { key: 'created_at', label: 'Timestamp', head: headRenders.date, cell: cellRenders.dateTime },
      { key: 'amount', label: 'Purchased tokens', cell: cellRenders.cost },
      {
        key: 'transaction_hash',
        label: 'Txhash',
        head: headRenders.wallet,
        cell: cellRenders.wallet,
        url: etherscanBaseUrl,
      },
    ],
    [etherscanBaseUrl],
  );

  return <Table title="Your Purchase History" fields={purchaseFields} data={deposits} />;
};
