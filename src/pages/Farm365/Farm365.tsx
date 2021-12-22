import React, { useEffect, useMemo, useState } from 'react';
import { SwapPoolTabs, TabNames } from '../../components/NavigationTabs';

import AppBody from '../AppBody';
import { useActiveWeb3React } from '../../hooks';
import LogoIcon from '../../assets/svg/logo-icon.svg';
import { useIsPolygonActive } from '../../hooks/Coins';
import { useHistory } from 'react-router-dom';
import Farm365Item from './Farm365Item';
import { Contract } from '@ethersproject/contracts';
import { getFarming365Contracts } from '../../utils';
import styled from 'styled-components/macro';
import Button from '../../base/ui/Button';
import { useWalletModalToggle } from '../../state/application/hooks';
import Tabs from '../../base/ui/Tabs';
import { loadFarmingBonuses } from '../../state/user/actions';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../state';

const StyledTabs = styled.div`
  display: flex;
  justify-content: flex-start;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    margin-bottom: 32px;
  `};
`;

const FarmingInfo = styled.div`
  margin: 16px 0 32px 0;
  color: white;
  max-width: 500px;
  text-align: left;
`;

const Info = styled.div`
  color: ${({ theme }) => theme.darkWhite};
`;

const filterItems: Array<{ id: 'active' | 'finished'; title: string }> = [
  {
    id: 'active',
    title: 'Active',
  },
  {
    id: 'finished',
    title: 'Finished',
  },
];

export default function Farm365() {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  const { library, account, chainId } = useActiveWeb3React();
  const isPolygonActive = useIsPolygonActive();

  const { id: userId } = useSelector((state: AppState) => state.user.info);

  const toggleWalletModal = useWalletModalToggle();

  // const [loading, setLoading] = useState<boolean>(Boolean(account) && false);
  const [selectedFilterTab, setSelectedFilterTab] = useState<'active' | 'finished'>('active');

  const farming365Contracts: Contract[] = useMemo(() => {
    if (!isPolygonActive) {
      return [];
    }
    return getFarming365Contracts(library, account, chainId);
  }, [library, account, chainId, isPolygonActive]);

  useEffect(() => {
    if (userId) {
      dispatch(loadFarmingBonuses({ userId }) as any);
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (!isPolygonActive) {
      history.push(`swap`);
    }
  }, [isPolygonActive, history]);

  if (!isPolygonActive) {
    return (
      <div>
        <div>
          <img src={LogoIcon} alt="logo" />
        </div>
      </div>
    );
  }

  return (
    <>
      <AppBody>
        <SwapPoolTabs active={TabNames.FARM_365} />

        {account ? (
          <>
            <StyledTabs>
              <Tabs
                items={filterItems}
                selectedItemId={selectedFilterTab}
                onChange={setSelectedFilterTab as any}
              />
            </StyledTabs>
            <FarmingInfo>
              Stake LP tokens in pair with ESW into the farming pools and win a 365% APR airdrop per
              provided liquidity + Additional % APR for Farming. Farming rewards are allocated to
              your EmiSwap account for every block.
            </FarmingInfo>

            {farming365Contracts.map(contract => (
              <Farm365Item
                key={contract.address}
                contract={contract}
                selectedFilterTab={selectedFilterTab}
              />
            ))}
          </>
        ) : (
          <>
            <Info>
              Please connect your wallet to see all available farms
              <br />
              <br />
              <Button onClick={toggleWalletModal}>Connect to a wallet</Button>
            </Info>
          </>
        )}
      </AppBody>
    </>
  );
}
