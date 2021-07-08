import React from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../../../../../../state';
import { CellProps, cellRenders, headRenders, Table } from '../Table';

export interface FeeCompensationHistoryProps {
  etherscanBaseUrl: string;
}

export const FeeCompensationHistory: React.FC<FeeCompensationHistoryProps> = ({
  etherscanBaseUrl,
}) => {
  const { compensation } = useSelector((state: AppState) => state?.cabinets?.balance?.details);

  const compensationHistoryFields: CellProps[] = React.useMemo(
    () => [
      { key: 'created_at', label: 'Timestamp', head: headRenders.date, cell: cellRenders.dateTime },
      { key: 'fee', label: 'Transaction fee', cell: cellRenders.dai },
      { key: 'amount', label: 'Received tokens', cell: cellRenders.cost },
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

  return (
    <Table
      title="Your Fee Compensation History"
      fields={compensationHistoryFields}
      desktopMaxHeight={414}
      data={compensation}
    />
  );
};
