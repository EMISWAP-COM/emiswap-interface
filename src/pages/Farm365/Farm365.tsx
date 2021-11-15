import React, { useEffect, useMemo, useState } from 'react';
import { SwapPoolTabs, TabNames } from '../../components/NavigationTabs';

import AppBody from '../AppBody';
import { useActiveWeb3React } from '../../hooks';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../state';
import LogoIcon from '../../assets/svg/logo-icon.svg';
import { useIsPolygonActive } from '../../hooks/Coins';
import { useHistory } from 'react-router-dom';
import Farm365Item from './Farm365Item';
import { Contract } from '@ethersproject/contracts';
import { getFarming365Contracts } from '../../utils';
import getEswPriceInDai from '../Farm/getEswPriceInDai';

export default function Farm365() {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  const { library, account, chainId } = useActiveWeb3React();
  const isPolygonActive = useIsPolygonActive();

  const [loading, setLoading] = useState<boolean>(Boolean(account) && false);

  const farming365Contracts: Contract[] = useMemo(() => {
    if (!isPolygonActive) {
      return [];
    }
    return getFarming365Contracts(library, account, chainId);
  }, [library, account, chainId, isPolygonActive]);

  const [eswPriceInDai, setEswPriceInDai] = useState('0');

  useEffect(() => {
    if (account && isPolygonActive) {
      getEswPriceInDai(library, account, chainId).then(value => {
        setEswPriceInDai(value);
      });
    }
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

        {farming365Contracts.map(contract =>
          <Farm365Item
            key={contract.address}
            contract={contract}
            eswPriceInDai={eswPriceInDai}
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
