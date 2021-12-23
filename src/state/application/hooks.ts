import { useCallback, useMemo } from 'react';
import { useActiveWeb3React } from '../../hooks';
import {
  addPopup,
  PopupContent,
  removePopup,
  showWalletModal,
  toggleBridgeModal,
  toggleConfirmSwitchModal,
  toggleNetworkSwitchModal,
  toggleSettingsMenu,
  toggleWalletModal,
} from './actions';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../index';

export function useBlockNumber(): number | undefined {
  const { chainId } = useActiveWeb3React();

  return useSelector((state: AppState) => state.application.blockNumber[chainId ?? -1]);
}

export function useWalletModalOpen(): boolean {
  return useSelector((state: AppState) => state.application.walletModalOpen);
}

export function useWalletModalShow(): () => void {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(showWalletModal()), [dispatch]);
}

export function useWalletModalToggle(): () => void {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(toggleWalletModal());
  }, [dispatch]);
}

export function useNetworkSwitchModalOpen(): boolean {
  return useSelector((state: AppState) => state.application.networkSwitchModalOpen);
}

export function useBridgeModalOpen(): boolean {
  return useSelector((state: AppState) => state.application.bridgeModalOpen);
}

export function useNetworkSwitchModalToggle(): () => void {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(toggleNetworkSwitchModal()), [dispatch]);
}

export function useBridgeModalToggle(): () => void {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(toggleBridgeModal()), [dispatch]);
}

export function useConfirmSwitchModalToggle(): () => void {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(toggleConfirmSwitchModal()), [dispatch]);
}

export function useSettingsMenuOpen(): boolean {
  return useSelector((state: AppState) => state.application.settingsMenuOpen);
}

export function useToggleSettingsMenu(): () => void {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(toggleSettingsMenu()), [dispatch]);
}

// returns a function that allows adding a popup
export function useAddPopup(): (content: PopupContent, key?: string) => void {
  const dispatch = useDispatch();

  return useCallback(
    (content: PopupContent, key?: string) => {
      dispatch(addPopup({ content, key }));
    },
    [dispatch],
  );
}

// returns a function that allows removing a popup via its key
export function useRemovePopup(): (key: string) => void {
  const dispatch = useDispatch();
  return useCallback(
    (key: string) => {
      dispatch(removePopup({ key }));
    },
    [dispatch],
  );
}

// get the list of active popups
export function useActivePopups(): AppState['application']['popupList'] {
  const list = useSelector((state: AppState) => state.application.popupList);
  return useMemo(() => list.filter(item => item.show), [list]);
}
