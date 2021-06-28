import React, { useEffect } from 'react';
import styled from 'styled-components/macro';

import { loadBalance, loadPerformance } from '../../../state/cabinets/actions';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, AppState } from '../../../state';

import { ExternalLink } from '../../../theme';

import {
  Connection,
  EswHoldingRewards,
  ESWLocked,
  ESWRewards,
  FarmingRewards,
  PurchaseHistory,
  ReferralPerformance,
} from '../Common';

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
  color: ${({ theme }) => theme.darkText};

  @media screen and (max-width: 1200px) {
    padding: 0 0 1rem 0;
  }

  span {
    color: ${({ theme }) => theme.white};
    font-weight: 700;
    text-transform: uppercase;
  }
`;

const OptionsPromo = styled.div`
  max-width: 340px;
`;

interface OwnerProps {
  ENSName?: string;
  openOptions: () => void;
}

export const Owner: React.FC<OwnerProps> = ({ openOptions }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { id: userId } = useSelector((state: AppState) => state.user.info);

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

      <EswHoldingRewards />

      <ESWLocked />

      <FarmingRewards />

      <ReferralPerformance />

      <PurchaseHistory />
    </Wrapper>
  );
};
