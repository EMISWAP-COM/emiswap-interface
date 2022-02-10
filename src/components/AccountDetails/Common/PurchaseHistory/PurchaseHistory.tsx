import { useSelector } from 'react-redux';
import React, { useMemo, useState } from 'react';

import { AppState } from '../../../../state';
import { useActiveWeb3React } from '../../../../hooks';
import { useIsEthActive, useIsPolygonActive } from '../../../../hooks/Coins';
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
} from './components';

import { TruncatedTextWithTooltip } from '../../../../base/ui/TruncatedTextWithTooltip';

const MAGIC_CHAIN_ID = 42; // todo: what it is?
const ETHERSCAN_URL = 'https://etherscan.io';
const KOVAN_ETHERSCAN_URL = 'https://kovan.etherscan.io';

const tabs: Record<string, TabProps> = {
  airdrops: { value: 'airdrops', label: 'LP Airdrops' },
  x10: { value: '10x', label: '10X Early Bird Refund' },
};
const tabsValues = Object.values(tabs);

const getTableItem = forWhat => (item: { available_at: string; amount: string }) => ({
  unlockDate: item.available_at,
  amount: item.amount,
  forWhat,
});

export const PurchaseHistory = () => {
  const isEthActive = useIsEthActive();
  const isPolygonActive = useIsPolygonActive();
  const { chainId } = useActiveWeb3React();
  const { referrals } = useSelector((state: AppState) => state.cabinets.performance);
  const { histories, details } = useSelector((state: AppState) => state.cabinets.balance);
  const { pool_block_bonuses, pool_bonuses } = useSelector(
    (state: AppState) => state.cabinets.bonusDetails,
  );
  const { depositsEswHistory } = useSelector((state: AppState) => state.cabinets);
  const { details: polygonDetails } = useSelector(
    (state: AppState) => state.polygonCabinet.balance,
  );
  const [liquidityTabActive, setLiquidityTabActive] = useState<string>(tabs.x10.value);

  const deposit = histories?.deposits;
  const { compensation = [], swap_bonus_10x = [], swap_bonus = [] } = details;

  const ETHERSCAN_BASE_URL = chainId === MAGIC_CHAIN_ID ? KOVAN_ETHERSCAN_URL : ETHERSCAN_URL;

  const swapping = useMemo(() => {
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

  const poolBonusDisplayData = useMemo(() => {
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

  const purchaseFields: CellProps[] = React.useMemo(
    () => [
      { key: 'created_at', label: 'Timestamp', head: headRenders.date, cell: cellRenders.dateTime },
      { key: 'amount', label: 'Purchased tokens', cell: cellRenders.cost },
      {
        key: 'transaction_hash',
        label: 'Txhash',
        head: headRenders.wallet,
        cell: cellRenders.wallet,
        url: ETHERSCAN_BASE_URL,
      },
    ],
    [ETHERSCAN_BASE_URL],
  );

  const referralPurchaseFields: CellProps[] = React.useMemo(
    () => [
      { key: 'created_at', label: 'Timestamp', head: headRenders.date, cell: cellRenders.dateTime },
      { key: 'amount', label: 'Purchased tokens' },
      {
        key: 'transaction_hash',
        label: 'Txhash',
        head: headRenders.wallet,
        cell: cellRenders.wallet,
        url: ETHERSCAN_BASE_URL,
      },
    ],
    [ETHERSCAN_BASE_URL],
  );

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
        url: ETHERSCAN_BASE_URL,
      },
    ],
    [ETHERSCAN_BASE_URL],
  );

  const holdingRewardFields: CellProps[] = React.useMemo(
    () => [
      { key: 'date', label: 'Date', head: headRenders.date, cell: cellRenders.date },
      {
        key: 'total_system_reward',
        label: 'Total System Reward in DAI*',
        cell: cellRenders.dai,
        wrapper: {
          component: TruncatedTextWithTooltip,
          mapToProps: row => ({
            title: `${!row?.total_system_reward ? '0' : parseFloat(row?.total_system_reward)}`,
            children: `${
              !row?.total_system_reward ? '0' : parseFloat(row?.total_system_reward).toFixed(6)
            }...`,
          }),
        },
      },
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
      {
        key: 'reward',
        label: 'Your Reward in DAI*',
        cell: cellRenders.dai,
        wrapper: {
          component: TruncatedTextWithTooltip,
          mapToProps: row => ({
            title: `${!row?.reward ? '0' : parseFloat(row?.reward)}`,
            children: `${!row?.reward ? '0' : parseFloat(row?.reward).toFixed(6)}...`,
          }),
        },
      },
    ],
    [],
  );

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
        url: ETHERSCAN_BASE_URL,
      },
    ],
    [ETHERSCAN_BASE_URL],
  );

  const referralsData = React.useMemo(
    () =>
      referrals
        .map(({ deposits, level }) =>
          deposits?.map(({ transaction_hash, amount, token, created_at }) => ({
            created_at,
            amount,
            transaction_hash,
            token,
            level,
          })),
        )
        .flat(),
    [referrals],
  );

  const myRewardHistoryFields: CellProps[] = React.useMemo(
    () => [
      { key: 'forWhat', label: 'For What' },
      { key: 'amount', label: 'ESW' },
      { key: 'unlockDate', label: 'Unlock Date', cell: cellRenders.date },
    ],
    [],
  );

  const myRewardHistory = [
    ...polygonDetails.pool_bonus.map(getTableItem('Providing liquidity')),
    ...polygonDetails.farming_bonus.map(getTableItem('Farming 365+')),
    ...polygonDetails.pool_referral_bonus.map(getTableItem('Total Referral Reward')),
  ];

  return (
    <>
      {isEthActive && (
        <>
          <Table
            title={'Your Liquidity Reward History'}
            fields={liquidityRewardFields}
            data={poolBonusDisplayData}
            headerWrapperMarginTop={36}
            headerMarginTop={0}
            headerMarginBottom={24}
            rightTitle={
              <Tabs tabs={tabsValues} value={liquidityTabActive} onChange={setLiquidityTabActive} />
            }
          />
          <Table title="Your Purchase History" fields={purchaseFields} data={deposit} />
          <Table
            title="Referral Purchase History"
            fields={referralPurchaseFields}
            data={referralsData}
          />
          <Table
            title="Your Fee Compensation History"
            fields={compensationHistoryFields}
            desktopMaxHeight={414}
            data={compensation}
          />
          <Table
            title="ESW Holding Reward History"
            fields={holdingRewardFields}
            data={depositsEswHistory}
            truncate
          />
          <Table
            title="Your Swapping Reward History"
            fields={swappingRewardFields}
            desktopMaxHeight={474}
            data={swapping}
          />
        </>
      )}
      {isPolygonActive && (
        <Table title="My Reward History" fields={myRewardHistoryFields} data={myRewardHistory} />
      )}
    </>
  );
};
