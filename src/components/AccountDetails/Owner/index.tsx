import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { PurchaseHistory } from '../Common/PurchaseHistory';
import { ReferralPerformance } from '../Common/ReferralPerformance';

import {
  loadBalance,
  loadPerformance,
  loadPurchaseHistory,
  loadReferralPurchaseHistory,
} from '../../../state/cabinets/actions';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../../state';
import { ESWStats } from '../Common/ESWStats';
import { Connection } from '../Common/Connection';
import { ESWRewards } from '../Common/ESWRewards';
import { ESWLocked } from '../Common/ESWLocked';

const Wrapper = styled.div`
  padding: 1rem;
  width: 100%;
`;

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileStatus = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  text-transform: capitalize;
  padding: 0 1rem 1rem 1rem;
  flex-wrap: wrap;
  align-items:
  background: lightgreen;
  gap: 12px;

  @media screen and (max-width: 1200px) {
    padding: 0 0 1rem 0;
  }

  span {
    color: #000000;
    font-weight: 700;
    text-transform: uppercase;
  }
`;

interface Props {
  // toggleWalletModal: () => void;
  // pendingTransad
  ENSName?: string;
  openOptions: () => void;
}

const Owner: React.FC<Props> = ({ openOptions, ENSName }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { id: userId } = useSelector((state: AppState) => state.user.info);
  // const balance = useSelector((state: AppState) => state.cabinets.balance);
  // const { reward } = useSelector((state: AppState) => state.cabinets.performance);

  useEffect(() => {
    dispatch(loadPerformance(userId) as any);
    dispatch(loadPurchaseHistory(userId) as any);
    dispatch(loadReferralPurchaseHistory(userId) as any);
    dispatch(loadBalance(userId) as any);
  }, [dispatch, userId]);

  return (
    <Wrapper>
      <ProfileStatus>
        <div>
          Status: <span>ESW OWNER</span>
        </div>
      </ProfileStatus>

      <Connection openOptions={() => console.log('')} />
      <ESWRewards />
      <ESWLocked />
      <TableWrapper>
        <ReferralPerformance />
        <PurchaseHistory />
        {/* <ESWPerformance/> */}
        <ESWStats />
      </TableWrapper>
    </Wrapper>
  );
};

export { Owner };
