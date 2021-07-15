import React, { useEffect } from 'react';
import styled from 'styled-components/macro';

import { convertBigDecimal } from '../uitls';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../../state';
import { packageNames } from '../constant';
import { Connection } from '../Common/Connection';
import { ESWRewards } from '../Common/ESWRewards';
import { ESWHoldingRewards } from '../Common/ESWHoldingRewards';
import { ESWLocked } from '../Common/ESWLocked';
import { ReferralPerformance } from '../Common/ReferralPerformance';
import { PurchaseHistory } from '../Common/PurchaseHistory';
import { useActiveWeb3React } from '../../../hooks';
import { loadBalance, loadPerformance } from '../../../state/cabinets/actions';
import chainIds from '../../../constants/chainIds';

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

  @media screen and (max-width: 1200px) {
    padding: 0 0 1rem 0;
    flex-wrap: wrap;
  }
`;

const ProfileText = styled.span`
  color: ${({ theme }) => theme.grey3};
  font-weight: 700;
  text-transform: uppercase;
`;

const Package = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 300px;

  @media screen and (max-width: 1200px) {
    justify-content: space-between;
    width: 100%;
  }
`;

/* TODO removed Invest tab until further notice.
const UpgradeBtn = styled.span`
  display: block;
  border-radius: 5px;
  background: ${({ theme }) => 'rgba(154, 86, 209, 0.1)'};
  color: ${({ theme }) => theme.grey6};
  text-transform: uppercase;
  text-align: center;
  padding: 10px 15px;
  font-family: 'IBM Plex Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  cursor: pointer;
  margin-left: 10px;
  margin-right: 1rem;

  @media screen and (max-width: 1200px) {
    margin-right: 0;
  }
`;*/

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

  const { chainId } = useActiveWeb3React();

  /* TODO removed Invest tab until further notice.
  const toggleWalletModal = useWalletModalToggle();*/

  const { id: userId, bonus_role_name = '', next_bonus_role } = useSelector(
    (state: AppState) => state.user.info,
  );

  useEffect(() => {
    if ((chainId as any) !== chainIds.KUCOIN) {
      dispatch(loadPerformance(userId) as any);
      dispatch(loadBalance(userId) as any);
    }
  }, [dispatch, chainId, userId]);

  /* TODO removed Invest tab until further notice.
  function scrollIntoInvest() {
    const investForm = document.querySelector('#invest-page');
    const headerOffset = 150;
    const elementPosition = investForm.getBoundingClientRect().top;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }*/

  /* TODO removed Invest tab until further notice.
  const handlePackageUpgrade = () => {
    toggleWalletModal();
    history.push('/invest');
    setTimeout(scrollIntoInvest, 300);
  };*/

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
          {/* TODO removed Invest tab until further notice.
          <UpgradeBtn onClick={handlePackageUpgrade}>Upgrade</UpgradeBtn>*/}
        </Package>
      </ProfileStatus>

      <Connection openOptions={openOptions}>
        {next_bonus_role && (
          <OptionsPromo>
            Buy {convertBigDecimal(next_bonus_role.amount)} ESW to gain next Package!
          </OptionsPromo>
        )}
      </Connection>

      {(chainId as any) !== chainIds.KUCOIN && (
        <>
          <ESWRewards />
          <ESWHoldingRewards/>
          <ESWLocked />

          <ReferralPerformance />
          <PurchaseHistory />
        </>
      )}
    </Wrapper>
  );
};

export { Distributor };
