import React from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../../../../../../state';
import { CellProps, cellRenders, headRenders, Table } from '../Table';
import { TruncatedTextWithTooltip } from '../../../../../../base/ui/TruncatedTextWithTooltip';

export interface HoldingRewardHistoryProps {}

export const HoldingRewardHistory: React.FC<HoldingRewardHistoryProps> = () => {
  const { depositsEswHistory } = useSelector((state: AppState) => state.cabinets);

  const holdingRewardFields: CellProps[] = React.useMemo(
    () => [
      { key: 'date', label: 'Date', head: headRenders.date, cell: cellRenders.date },
      { key: 'total_system_reward', label: 'Total System Reward in DAI*', cell: cellRenders.dai },
      {
        key: 'share',
        label: 'Your Share',
        cell: cellRenders.percent,
        wrapper: {
          component: TruncatedTextWithTooltip,
          mapToProps: row => ({
            title: `${!row?.share ? '0' : parseFloat(row?.share)}%`,
            children: `${!row?.share ? '0' : parseFloat(row?.share).toFixed(6)}...`,
          }),
        },
      },
      { key: 'reward', label: 'Your Reward in DAI*', cell: cellRenders.dai },
    ],
    [],
  );

  return (
    <Table
      title="ESW Holding Reward History"
      fields={holdingRewardFields}
      data={depositsEswHistory}
    />
  );
};
