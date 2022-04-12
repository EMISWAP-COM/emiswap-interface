import { createReducer, nanoid } from '@reduxjs/toolkit';
import {
  addPopup,
  PopupContent,
  removePopup,
  showWalletModal,
  toggleBridgeModal,
  toggleConfirmSwitchModal,
  toggleNetworkSwitchModal,
  toggleNewWalletModal,
  toggleSettingsMenu,
  toggleWalletModal,
  updateBlockNumber,
} from './actions';

type PopupList = Array<{ key: string; show: boolean; content: PopupContent }>;

export interface ApplicationState {
  blockNumber: { [chainId: number]: number };
  popupList: PopupList;
  walletModalOpen: boolean;
  walletNewModalOpen: boolean;
  confirmSwitchModalOpen: boolean;
  networkSwitchModalOpen: boolean;
  bridgeModalOpen: boolean;
  settingsMenuOpen: boolean;
}

// for reopen modal after change address see: src/components/AccountDetails/Common/ChangeAddress.tsx changeAddress()
const walletModalOpen = localStorage.getItem('showWalletModal') === 'true';
if (walletModalOpen) {
  localStorage.setItem('showWalletModal', 'false');
}

const initialState: ApplicationState = {
  blockNumber: {},
  popupList: [],
  walletModalOpen,
  walletNewModalOpen: false,
  confirmSwitchModalOpen: false,
  networkSwitchModalOpen: false,
  bridgeModalOpen: false,
  settingsMenuOpen: false,
};

export default createReducer(initialState, builder =>
  builder
    .addCase(updateBlockNumber, (state, action) => {
      const { chainId, blockNumber } = action.payload;
      if (typeof state.blockNumber[chainId] !== 'number') {
        state.blockNumber[chainId] = blockNumber;
      } else {
        state.blockNumber[chainId] = Math.max(blockNumber, state.blockNumber[chainId]);
      }
    })
    .addCase(showWalletModal, state => {
      state.walletModalOpen = true;
    })
    .addCase(toggleWalletModal, state => {
      state.walletModalOpen = !state.walletModalOpen;
    })
    .addCase(toggleNewWalletModal, state => {
      state.walletNewModalOpen = !state.walletNewModalOpen;
    })
    .addCase(toggleNetworkSwitchModal, state => {
      state.networkSwitchModalOpen = !state.networkSwitchModalOpen;
    })
    .addCase(toggleConfirmSwitchModal, state => {
      state.confirmSwitchModalOpen = !state.confirmSwitchModalOpen;
    })
    .addCase(toggleBridgeModal, state => {
      state.bridgeModalOpen = !state.bridgeModalOpen;
    })
    .addCase(toggleSettingsMenu, state => {
      state.settingsMenuOpen = !state.settingsMenuOpen;
    })
    .addCase(addPopup, (state, { payload: { content, key } }) => {
      state.popupList = (key
        ? state.popupList.filter(popup => popup.key !== key)
        : state.popupList
      ).concat([
        {
          key: key || nanoid(),
          show: true,
          content,
        },
      ]);
    })
    .addCase(removePopup, (state, { payload: { key } }) => {
      state.popupList.forEach(p => {
        if (p.key === key) {
          p.show = false;
        }
      });
    }),
);
