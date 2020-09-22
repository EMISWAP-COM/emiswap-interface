import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../index';
import { getCoinList } from './actions';
import { useActiveWeb3React } from '../../hooks';

export default function Updater(): null {
  const dispatch = useDispatch<AppDispatch>();
  const { chainId, account, library } = useActiveWeb3React();
  const list = useSelector<AppState, AppState['invest']['coins']>(state => state.invest.coins);

  // we should always fetch the default token list, so add it
  useEffect(() => {
    if (!list) dispatch(getCoinList({ chainId, account, library }) as any);
  }, [chainId, dispatch, list]);

  return null;
}
