import React from 'react';
import { useSelector } from 'react-redux';

import {
  CellProps,
  cellRenders,
  Cost,
  headRenders,
  Label,
  LevelWrapper,
  PoolCostWrapper,
  Table,
  TabProps,
  Tabs,
} from '..';
import { AppState } from '../../../../../../state';

export interface LiquidityRewardHistoryProps {}

const tabs: Record<string, TabProps> = {
  airdrops: { value: 'airdrops', label: 'LP Airdrops' },
  x10: { value: '10x', label: '10X Early Bird Refund' },
};

const tabsValues = Object.values(tabs);

export const LiquidityRewardHistory: React.FC<LiquidityRewardHistoryProps> = () => {
  const {
    bonusDetails: { pool_block_bonuses, pool_bonuses },
  } = useSelector((state: AppState) => state.cabinets);

  const [liquidityTabActive, setLiquidityTabActive] = React.useState<string>(tabs.x10.value);

  const poolBonusDisplayData = React.useMemo(() => {
    if (liquidityTabActive === 'airdrops') {
      return pool_block_bonuses;
    } else {
      return pool_bonuses;
    }
  }, [liquidityTabActive, pool_block_bonuses, pool_bonuses]);

  const liquidityRewardFields: CellProps[] = React.useMemo(
    () =>
      [
        { key: 'date', label: 'Date', head: headRenders.date, cell: cellRenders.dateTime },
        liquidityTabActive === tabs.x10.value && {
          key: 'swapped',
          label: 'Swapped tokens',
          cell: cellRenders.cost,
          flex: liquidityTabActive === tabs.x10.value ? 1.5 : 1,
        },
        {
          key: 'name',
          label: 'Pool',
          flex: liquidityTabActive === tabs.x10.value ? 2 : 1.5,
          head: props => (
            <LevelWrapper flex={props.flex} style={{ justifyContent: 'center' }}>
              {props.label}
            </LevelWrapper>
          ),
          cell: props => (
            <>
              <Label>{props.label}</Label>
              <PoolCostWrapper tabActive={liquidityTabActive}>
                <Cost>
                  <div style={{ maxWidth: liquidityTabActive === tabs.x10.value ? 140 : 200 }}>
                    <span>{props.children}</span>
                  </div>
                </Cost>
              </PoolCostWrapper>
            </>
          ),
        },
        { key: 'pool_part', label: 'Part in Pool', cell: cellRenders.cost },
        liquidityTabActive === tabs.x10.value && {
          key: 'esw_price',
          label: 'ESW Price',
          cell: cellRenders.dai,
        },
        { key: 'esw_reward', label: 'Reward, ESW', cell: cellRenders.esw },
      ].filter(Boolean),
    [liquidityTabActive],
  );

  return (
    <Table
      title="Your Liquidity Reward History"
      fields={liquidityRewardFields}
      data={poolBonusDisplayData}
      rightTitle={
        <Tabs tabs={tabsValues} value={liquidityTabActive} onChange={setLiquidityTabActive} />
      }
    />
  );
};
