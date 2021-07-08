import React from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../../../../../../state';
import { CellProps, cellRenders, headRenders, Table } from '../Table';

export interface SwappingRewardHistoryProps {
  etherscanBaseUrl: string;
}

export const SwappingRewardHistory: React.FC<SwappingRewardHistoryProps> = ({
  etherscanBaseUrl,
}) => {
  const { swap_bonus_10x, swap_bonus } = useSelector(
    (state: AppState) => state?.cabinets?.balance?.details,
  );

  const swapping = React.useMemo(() => {
    const bonuses = { swap_bonus_10x, swap_bonus };
    return Object.entries(bonuses)
      .flatMap(([bonusName, bonuses]) => {
        return bonuses.map(bonus => ({ ...bonus, bonusName }));
      })
      .sort((transactionA, transactionB) => {
        const dateA = new Date(transactionA.created_at).getTime();
        const dateB = new Date(transactionB.created_at).getTime();

        if (dateA && dateB) {
          return dateA - dateB;
        }

        return 0;
      });
  }, [swap_bonus_10x, swap_bonus]);

  const swappingRewardFields: CellProps[] = React.useMemo(
    () => [
      { key: 'created_at', label: 'Timestamp', head: headRenders.date, cell: cellRenders.dateTime },
      { key: 'swapped', label: 'Swapped tokens', cell: cellRenders.cost },
      { key: 'amount_dai', label: 'DAI Equivalent', cell: cellRenders.dai },
      { key: 'amount', label: 'Reward', cell: cellRenders.cost },
      { key: 'bonusName', label: 'Bonus program', cell: cellRenders.bonus },
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
      title="Your Swapping Reward History"
      fields={swappingRewardFields}
      desktopMaxHeight={474}
      data={swapping}
    />
  );
};
