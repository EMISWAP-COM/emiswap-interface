import React, { useEffect, useMemo, useState } from 'react';
import { SwapPoolTabs, TabNames } from '../../components/NavigationTabs';

import AppBody from '../AppBody';
import { useActiveWeb3React } from '../../hooks';
import LogoIcon from '../../assets/svg/logo-icon.svg';
import { useIsFarm365Active, useIsPolygonActive, useIsShidenActive } from '../../hooks/Coins';
import { useHistory } from 'react-router-dom';
import Farm365Item from './Farm365Item';
import { Contract } from '@ethersproject/contracts';
import { getFarming365Contracts } from '../../utils';
import styled from 'styled-components/macro';
import Button from '../../base/ui/Button';
import { useWalletModalToggle } from '../../state/application/hooks';
import Tabs from '../../base/ui/Tabs';

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
  // const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  const { library, account, chainId } = useActiveWeb3React();

  const isFarm365Active = useIsFarm365Active();

  const toggleWalletModal = useWalletModalToggle();

  // const [loading, setLoading] = useState<boolean>(Boolean(account) && false);
  const [selectedFilterTab, setSelectedFilterTab] = useState<'active' | 'finished'>('active');

  const farming365Contracts: Contract[] = useMemo(() => {
    if (!isFarm365Active) {
      return [];
    }
    return getFarming365Contracts(library, account, chainId);
  }, [library, account, chainId, isFarm365Active]);

  useEffect(() => {
    if (!isFarm365Active) {
      history.push(`swap`);
    }
  }, [isFarm365Active, history]);

  if (!isFarm365Active) {
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
              Stake LP token in pair with ESW into the farming pools and win a 365% or 180% APR
              airdrop if LP includes EmiSwap token + Additional % AIR for Farming. Farming rewards
              are allocated to your EmiSwap account for every block.
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
