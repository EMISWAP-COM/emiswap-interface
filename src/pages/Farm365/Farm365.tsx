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

const FarmingInfo = styled.div`
    margin: 16px 0 32px 0;
    color: white;
    max-width: 500px;
    text-align: left;
`;

export default function Farm365() {
  // const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  const { library, account, chainId } = useActiveWeb3React();
  const isPolygonActive = useIsPolygonActive();

  const [loading, /*setLoading*/] = useState<boolean>(Boolean(account) && false);

  const farming365Contracts: Contract[] = useMemo(() => {
    if (!isPolygonActive) {
      return [];
    }
    return getFarming365Contracts(library, account, chainId);
  }, [library, account, chainId, isPolygonActive]);

  useEffect(() => {
    if (!isPolygonActive) {
      history.push(`swap`);
    }
  }, [isPolygonActive, history]);

  if (!isPolygonActive) {
    return (
      <div>
        <div>
          <img src={LogoIcon} alt="logo"/>
        </div>
      </div>
    );
  }

  return (
    <>
      <AppBody>
        <SwapPoolTabs active={TabNames.FARM_365}/>

        <FarmingInfo>
          Stake LP tokens in pair with ESW into the farming pools and win a 365% APR airdrop per provided liquidity +
          Additional % APR for Farming. Farming rewards are allocated to your EmiSwap account for every block.
        </FarmingInfo>

        {farming365Contracts.map(contract =>
          <Farm365Item
            key={contract.address}
            contract={contract}
          />,
        )}

        {account && loading && (
          <div>
          </div>
        )}

        {account && !loading && (
          <>
          </>
        )}

        {!account && (
          <></>
        )}
      </AppBody>
    </>
  );
}