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
import { useWalletModalToggle } from '../../../state/application/hooks';
import { useHistory } from 'react-router';
import { Connection } from '../Common/Connection';
import { ESWLocked } from '../Common/ESWLocked';

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
  background: lightgreen;
  gap: 12px;

  @media screen and (max-width: 1200px) {
    padding: 0 0 1rem 0;
  }
`;

const ProfileText = styled.span`
  color: #000000;
  font-weight: 700;
  text-transform: uppercase;
`;

const Package = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 300px;
  width: 100%;
`;

const UpgradeBtn = styled.span`
  display: block;
  border-radius: 5px;
  background: #bb26c7;
  color: #ffffff;
  text-transform: uppercase;
  text-align: center;
  padding: 10px 15px;
  font-family: 'IBM Plex Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  cursor: pointer;
`;

const OptionsPromo = styled.div`
  color: ${({ theme }) => theme.red3};
  max-width: 340px;
`;

interface Props {
  ENSName?: string;
  openOptions: () => void;
}

const Distributor: React.FC<Props> = ({ openOptions, ENSName }) => {
  const dispatch = useDispatch<AppDispatch>();
  const toggleWalletModal = useWalletModalToggle();
  const history = useHistory();
  const { id: userId, bonus_role_name = '' } = useSelector((state: AppState) => state.user.info);
  const balance = useSelector((state: AppState) => state.cabinets.balance);
  const { change_level_info } = balance;

  useEffect(() => {
    dispatch(loadPerformance(userId) as any);
    dispatch(loadPurchaseHistory(userId) as any);
    dispatch(loadReferralPurchaseHistory(userId) as any);
    dispatch(loadBalance(userId) as any);
  }, [dispatch, userId]);

  function scrollIntoInvest() {
    const investForm = document.querySelector('#invest-page');
    const headerOffset = 150;
    const elementPosition = investForm.getBoundingClientRect().top;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }

  const handlePackageUpgrade = () => {
    toggleWalletModal();
    history.push('/invest');
    setTimeout(scrollIntoInvest, 300);
  };

  return (
    <Wrapper>
      <ProfileStatus>
        <div>
          Status: <ProfileText>Distributor</ProfileText>
        </div>
        <Package>
          <div>
            Package: <ProfileText>{packageNames[bonus_role_name]}</ProfileText>
          </div>
          <UpgradeBtn onClick={handlePackageUpgrade}>Upgrade</UpgradeBtn>
        </Package>
      </ProfileStatus>

      <Connection openOptions={openOptions}>
        {change_level_info && (
          <OptionsPromo>
            Buy {convertBigDecimal(change_level_info.amount)} ESW to gain next Package!
          </OptionsPromo>
        )}
      </Connection>
      <ESWLocked />

      <ReferralPerformance />
      <PurchaseHistory />
    </Wrapper>
  );
};

export { Distributor };
