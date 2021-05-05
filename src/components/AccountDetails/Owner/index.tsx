import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { PurchaseHistory } from '../Common/PurchaseHistory';
import { ReferralPerformance } from '../Common/ReferralPerformance';

import { loadBalance, loadPerformance } from '../../../state/cabinets/actions';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../../state';
import { Connection } from '../Common/Connection';
import { ESWRewards } from '../Common/ESWRewards';
import { ESWLocked } from '../Common/ESWLocked';
import { ExternalLink } from '../../../theme';

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

  span {
  color: ${({ theme }) => theme.grey3};
    font-weight: 700;
    text-transform: uppercase;
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
  const dispatch = useDispatch<AppDispatch>();

  const { id: userId } = useSelector((state: AppState) => state.user.info);
  // const balance = useSelector((state: AppState) => state.cabinets.balance);
  // const { reward } = useSelector((state: AppState) => state.cabinets.performance);

  useEffect(() => {
    dispatch(loadPerformance(userId) as any);
    dispatch(loadBalance(userId) as any);
  }, [dispatch, userId]);

  return (
    <Wrapper>
      <ProfileStatus>
        <div>
          Status: <span>ESW OWNER</span>
        </div>
      </ProfileStatus>

      <Connection openOptions={openOptions}>
        <OptionsPromo>
          To boost your ESW Profit use our&nbsp;
          <ExternalLink
            href={
              'https://emiswap.medium.com/your-guide-to-the-emiswap-referral-program-f142a4170d1'
            }
          >
            Referral Program
          </ExternalLink>
          , become an&nbsp;
          <ExternalLink href={'https://crowdsale.emidao.org/en#rec240950289'}>
            Ambassador
          </ExternalLink>
          &nbsp;or farm your&nbsp;
          <ExternalLink href={'https://crowdsale.emidao.org/magic-nft'}>Magic Cards!</ExternalLink>
        </OptionsPromo>
      </Connection>
      <ESWRewards />
      <ESWLocked />
      <ReferralPerformance />

      <PurchaseHistory />
    </Wrapper>
  );
};

export { Owner };
