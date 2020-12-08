import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../index';
import { getCoinList } from './actions';
import { useActiveWeb3React } from '../../hooks';

export default function Updater(): null {
  const dispatch = useDispatch<AppDispatch>();
  const { chainId, account, library } = useActiveWeb3React();

  // we should always fetch the default token list, so add it
  useEffect(() => {
    dispatch(getCoinList({ chainId, account, library }) as any);
  }, [dispatch, chainId, account, library]);

  return null;
}
