import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { Connection } from '../Common/Connection';
import { ExternalLink } from '../../../theme';
import {
  loadBalance,
  loadDepositsEswHistory,
  loadPerformance,
} from '../../../state/cabinets/actions';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../../state';
import { useActiveWeb3React } from '../../../hooks';
import { ESWRewards } from '../Common/ESWRewards';
import { ESWHoldingRewards } from '../Common/ESWHoldingRewards';
import { ESWLocked } from '../Common/ESWLocked';
import { ReferralPerformance } from '../Common/ReferralPerformance';
import { PurchaseHistory } from '../Common/PurchaseHistory';
import FarmingRewards from '../Common/FarmingRewards';
import { useIsEthActive, useIsPolygonActive } from '../../../hooks/Coins';
import RequestCollect from './RequestCollect';
import CollectToMyWallet from './CollectToMyWallet';

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
  gap: 12px;
  font-size: 16px;
  color: ${({ theme }) => theme.darkText};

  @media screen and (max-width: 1200px) {
    padding: 0 0 1rem 0;
  }

  span {
    color: ${({ theme }) => theme.white};
    font-weight: 700;
    // text-transform: uppercase;
  }
`;

const OptionsPromo = styled.div`
  max-width: 340px;
`;

interface Props {
  // toggleWalletModal: () => void;
  // pendingTransad
  ENSName?: string;
  openOptions: () => void;
}

const Owner: React.FC<Props> = ({ openOptions, ENSName }) => {
  const { chainId } = useActiveWeb3React();

  const dispatch = useDispatch<AppDispatch>();
  const { id: userId } = useSelector((state: AppState) => state.user.info);

  const [collectButtonState, changeCollectButtonState] = useState<string | null>(null);

  const isEthActive = useIsEthActive();
  const isPolygonActive = useIsPolygonActive();
  /*const isKCCActive = useIsKCCActive();
  const isShidenActive = useIsShidenActive();
  const isAvalanceActive = useIsAvalancheActive();*/

  useEffect(() => {
    if (isEthActive) {
      dispatch(loadPerformance(userId) as any);
      dispatch(loadBalance(userId) as any);
      dispatch(loadDepositsEswHistory(userId) as any);
    }
  }, [dispatch, chainId, userId, isEthActive]);

  return (
    <>
      <Wrapper>
        <ProfileStatus>
          <div>
            Status: <span>ESW Owner</span>
          </div>
        </ProfileStatus>

        <Connection openOptions={openOptions} changeCollectButtonState={changeCollectButtonState}>
          <OptionsPromo>
            To boost your ESW Profit use our&nbsp;
            <ExternalLink
              href={
                'https://emiswap.medium.com/your-guide-to-the-emiswap-referral-program-f142a4170d1'
              }
            >
              Referral Program.
            </ExternalLink>
          </OptionsPromo>
        </Connection>
        {(isEthActive || isPolygonActive) && (
          <div style={{ padding: '0 16px' }}>
            <ESWRewards />
            {isEthActive && <ESWHoldingRewards />}
            <ESWLocked />
            {isEthActive && <FarmingRewards />}
            <ReferralPerformance />
            <PurchaseHistory />
          </div>
        )}
      </Wrapper>
      {collectButtonState === 'request' && (
        <RequestCollect closeWindow={() => changeCollectButtonState('wallet')} />
      )}
      {collectButtonState === 'wallet' && (
        <CollectToMyWallet
          closeWindow={() => changeCollectButtonState('')}
          openRequestCollect={() => {
            changeCollectButtonState('request');
          }}
        />
      )}
    </>
  );
};

export { Owner };
