import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components/macro';

import { AutoColumn } from '../Column';
import { Text } from 'rebass';

import { NETWORK_ICONS, NETWORK_LABELS } from '../../connectors'
// import { useActiveWeb3React } from '../../hooks'
import activeIcon from '../../assets/svg/active_network.svg'

const StyledMenuButton = styled.button`
  position: relative;
  // width: 100%;
  // height: 100%;
  min-height: 40px;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  background-color: ${({ theme }) => theme.green2};
  display: flex;
  align-items: center;
  transition: all 0.3s ease-in-out;

  padding: 0.15rem 0.625rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.green3};
  }
`;

const MenuBtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100px;
  margin-right: 8px;
  
`


const NetworkBtn = styled(StyledMenuButton)`
  &:not(:last-child) {
    margin-right: 10px;
  }
`

const NetworksOptions = styled.div`
  display: flex;
`;

const NetworkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
`;

const NetworkIcon = styled.div<{ active: boolean }>`
  &:after {
    display: ${({ active }) => (active ? 'block' : 'none')};
    content: url(${activeIcon});
    position: absolute;
    width: 12px;
    height: 12px;
    top: 42px;
    left: 50px;
  }
`;

const StyledMenu = styled.div`
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`;


const MenuFlyout = styled.span`
  // min-width: 20.125rem;
  background-color: ${({ theme }) => theme.bg1};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04),
    0px 16px 24px rgba(0, 0, 0, 0.04), 0px 24px 32px rgba(0, 0, 0, 0.01);

  border: 1px solid ${({ theme }) => theme.bg3};

  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: absolute;
  top: 3rem;
  right: 0rem;
  z-index: 100;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    min-width: 18.125rem;
    right: -46px;
  `};
`;




const ETH_CHAIN_ID = window['env'] ? window['env'].REACT_APP_CHAIN_ID : 1
const BNB_CHAIN_ID = 56

export default function Networks() {
  const node = useRef<HTMLDivElement>();
  const [isOpen, setIsOpen] = useState(true)
  const [appChainId, setAppChainId] = useState(ETH_CHAIN_ID)
  // const { chainId } = useActiveWeb3React()

  useEffect(() => {
    const handleClickOutside = e => {
      if (node.current?.contains(e.target)) {
        return;
      }
      setIsOpen(false)
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <StyledMenu ref={node}>
      <MenuBtnWrapper>
        <StyledMenuButton onClick={() => setIsOpen(!isOpen)}>
          <img src={NETWORK_ICONS[appChainId]} width={24} height={24} alt={'current_app_network_icon'}/>
          &nbsp;&nbsp;{NETWORK_LABELS[appChainId]}
        </StyledMenuButton>
      </MenuBtnWrapper>
      {isOpen && (
        <MenuFlyout>
          <AutoColumn gap="md" style={{ padding: '1rem' }}>
            <Text fontWeight={600} fontSize={14}>
              Switch Networks
            </Text>
            <NetworksOptions>
              <NetworkBtn onClick={() => setAppChainId(ETH_CHAIN_ID)}>
                <NetworkWrapper>
                  <NetworkIcon active={appChainId === ETH_CHAIN_ID}>
                    <img src={NETWORK_ICONS[1]} width={45} height={45} alt={'etherium_network_icon'}/>
                  </NetworkIcon>
                  Etherium
                </NetworkWrapper>
              </NetworkBtn>
              <StyledMenuButton>
                <NetworkWrapper onClick={() => setAppChainId(BNB_CHAIN_ID)}>
                  <NetworkIcon active={appChainId === BNB_CHAIN_ID} >
                   <img src={NETWORK_ICONS[56]} width={45} height={45} alt={'binance_network_icon'}/>
                  </NetworkIcon>
                   Binance
                </NetworkWrapper>
              </StyledMenuButton>
            </NetworksOptions>


          </AutoColumn>
        </MenuFlyout>
      )}
    </StyledMenu>
  );
}
