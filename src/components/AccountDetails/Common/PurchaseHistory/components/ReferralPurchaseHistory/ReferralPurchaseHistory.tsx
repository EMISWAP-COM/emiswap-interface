import { CellProps, cellRenders, headRenders, Table } from '../Table';
import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../../state';

export interface ReferralPurchaseHistoryProps {
  etherscanBaseUrl: string;
}

export const ReferralPurchaseHistory: React.FC<ReferralPurchaseHistoryProps> = ({
  etherscanBaseUrl,
}) => {
  const { referrals } = useSelector((state: AppState) => state?.cabinets?.performance);

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

  const referralPurchaseFields: CellProps[] = React.useMemo(
    () => [
      { key: 'created_at', label: 'Timestamp', head: headRenders.date, cell: cellRenders.dateTime },
      { key: 'amount', label: 'Purchased tokens' },
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
    <Table title="Referral Purchase History" fields={referralPurchaseFields} data={referralsData} />
  );
};
