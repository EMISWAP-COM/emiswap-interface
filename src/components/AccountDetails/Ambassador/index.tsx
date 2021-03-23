import React, { useEffect } from 'react';
import styled from 'styled-components';
import { convertBigDecimal } from '../uitls';
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
import { packageNames } from '../constant';
import { Connection } from '../Common/Connection';
import { ESWLocked } from '../Common/ESWLocked';
import { ESWRewards } from '../Common/ESWRewards';

const Wrapper = styled.div`
  padding: 1rem;
  width: 100%;
`;

const ProfileStatus = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  text-transform: capitalize;
  padding: 0 1rem 1rem 1rem;
  flex-wrap: wrap;
  align-items:
  gap: 12px;

  @media screen and (max-width: 1200px) {
    padding: 0 0 1rem 0;
  }

  span {
  color: ${({ theme }) => theme.grey3};
    font-weight: 700;
    text-transform: uppercase;
  }
`;

const Package = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 1200px) {
    width: 100%;
  }
`;

const UpperCase = styled.span`
  text-transform: uppercase;
`;

const OptionsPromo = styled.div`
  color: ${({ theme }) => theme.red3};
  max-width: 340px;
`;

interface Props {
  // toggleWalletModal: () => void;
  // pendingTransad
  ENSName?: string;
  openOptions: () => void;
}

const Ambassador: React.FC<Props> = ({ openOptions, ENSName }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { id: userId, bonus_role_name = '' } = useSelector((state: AppState) => state.user.info);
  const balance = useSelector((state: AppState) => state.cabinets.balance);
  const { change_level_info } = balance;

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
          Status: <span>Ambassador</span>
        </div>
        <Package>
          <div>
            Level: <span>{packageNames[bonus_role_name]}</span>
          </div>
        </Package>
      </ProfileStatus>

      <Connection openOptions={openOptions}>
        <OptionsPromo>
          {change_level_info && bonus_role_name === packageNames.rookie && (
            <span>
              You need {convertBigDecimal(change_level_info.amount)}
              DAI purchase from your Ref’s to change level to&nbsp;
              <UpperCase>{change_level_info.next_level}</UpperCase>
            </span>
          )}
        </OptionsPromo>
      </Connection>
      <ESWRewards />

      <ESWLocked />

      <ReferralPerformance />
      <PurchaseHistory />
    </Wrapper>
  );
};

export { Ambassador };
