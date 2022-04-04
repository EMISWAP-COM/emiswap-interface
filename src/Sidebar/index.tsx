import React, { useState } from 'react';
import { Props } from '../ThemeProvider/components';
import styled, { css } from 'styled-components';
import { color, layout, width } from 'styled-system';

import menuSvg from '../assets/sidebar/menu.svg';
import chartSvg from '../assets/sidebar/chart.svg';
import chatAddSvg from '../assets/sidebar/chat_add.svg';
import circleSvg from '../assets/sidebar/circle.svg';
import databaseSvg from '../assets/sidebar/database.svg';
import deskSvg from '../assets/sidebar/desk.svg';
import homeSvg from '../assets/sidebar/home.svg';
import linkSvg from '../assets/sidebar/link.svg';
import refreshSvg from '../assets/sidebar/refresh.svg';
import userAddSvg from '../assets/sidebar/user_add.svg';
import hackenSvg from '../assets/sidebar/hacken.svg';
import blueSwarmSvg from '../assets/sidebar/blue_swarm.svg';
import arrowDown from '../assets/sidebar/arrow_down.svg';

import eswLogo from '../assets/currencies/ESW.png';

const SidebarWrapper = styled.div<Props>`
  ${color}
  ${layout}
  ${width}
  padding: 24px 12px;
  background: radial-gradient(237.61% 114.78% at 152.56% 43.16%, #2D2030 0%, #0F0F13 36.59%);
  color: white;
`;

const SidebarMenuBtn = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  margin-bottom: 34px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.15);
  cursor: pointer;
`;

const SidebarNavItem = styled.div<Props & { active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 12px;
  // font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: left;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;

  ${({ active }) =>
    active &&
    css`
      background: linear-gradient(0deg, #7a2df4, #7a2df4), rgba(255, 255, 255, 0.15);
      color: white;
    `}
`;

const SidebarNavIcon = styled.img`
  margin-bottom: 4px;
  padding-right: 16px;
`;

const SidebarNavArrowIcon = styled.img`
  margin-left: auto;
`;

const SidebarNavSub = styled.div<Props>`
  z-index: 10;
  position: relative;
`;

const SidebarNavSubBackground = styled.div`
  display: block;
  z-index: -1;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  border-radius: 12px;
  background: radial-gradient(281.25% 870.12% at 2.78% -76.56%, #32a9ff 0%, #8128cc 100%);
  opacity: 0.2;
  transform: rotate(-180deg);
`;

const SidebarNavSubItem = styled(SidebarNavItem)<Props & { active?: boolean }>`
  &::before {
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    margin: 0 24px 0 10px;
    border-radius: 50%;
    background: white;
  }
`;

const SidebarAudited = styled.div<Props>`
  padding: 0 12px;
  margin-top: 48px;
  margin-bottom: 24px;
`;

const SidebarEsw = styled.div<Props>`
  display: flex;
  align-items: center;
  padding: 0 12px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
`;

const SidebarEswLogo = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const SidebarEswPriceValue = styled.div<Props>`
  margin-left: 8px;
  font-size: 16px;
  font-weight: 500;
  color: white;
`;

const sidebarItems = [
  {
    icon: homeSvg,
    label: 'Home',
    url: '',
  },
  {
    icon: refreshSvg,
    label: 'Swap',
    url: '',
  },
  {
    icon: circleSvg,
    label: 'Liquidity pools',
    url: '',
  },
  {
    icon: databaseSvg,
    label: 'Farm',
    url: '',
  },
  {
    icon: deskSvg,
    label: 'Dashboard',
    url: '',
  },
  {
    icon: chartSvg,
    label: 'Analytics',
    url: '',
  },
  {
    icon: linkSvg,
    label: 'Bridge Multichain',
    url: '',
  },
  {
    icon: userAddSvg,
    label: 'Referral program',
    url: '',
  },
  {
    icon: chatAddSvg,
    label: 'More',
    items: [
      {
        label: 'Code',
        url: '',
      },
      {
        label: 'Audit',
        url: '',
      },
      {
        label: 'Support',
        url: '',
      },
      {
        label: 'Wiki',
        url: '',
      },
    ],
  },
];

const Sidebar = () => {
  const [activeNav, setActiveNav] = useState<string>('Home');
  const [openedGroup, setOpenedGroup] = useState<string | null>(null);

  const handleClickNavItem = item => {
    if (item.items) {
      if (openedGroup === item.label) {
        setOpenedGroup(null);
      } else {
        setOpenedGroup(item.label);
      }
    } else {
      setActiveNav(item.label);
    }
  };

  return (
    <SidebarWrapper minWidth={230}>
      <SidebarMenuBtn>
        <img src={menuSvg} alt="" />
      </SidebarMenuBtn>
      {sidebarItems.map(item => (
        <>
          <SidebarNavItem
            active={activeNav === item.label}
            onClick={() => handleClickNavItem(item)}
          >
            <SidebarNavIcon src={item.icon} alt="" />
            <span>{item.label}</span>
            {item.items?.length > 0 && <SidebarNavArrowIcon src={arrowDown} alt="" />}
          </SidebarNavItem>
          {item.items?.length > 0 && openedGroup === item.label && (
            <SidebarNavSub>
              {item.items.map(subItem => (
                <SidebarNavSubItem
                  active={activeNav === subItem.label}
                  onClick={() => setActiveNav(subItem.label)}
                >
                  {subItem.label}
                </SidebarNavSubItem>
              ))}
              <SidebarNavSubBackground />
            </SidebarNavSub>
          )}
        </>
      ))}
      <div>
        <SidebarAudited>
          <div>
            <span>Audited by:</span>
            <img style={{ marginLeft: 8 }} src={hackenSvg} alt="" />
            <img style={{ marginLeft: -4 }} src={blueSwarmSvg} alt="" />
          </div>
          <div>Hacken & BlueSwarm</div>
        </SidebarAudited>
        <SidebarEsw>
          <SidebarEswLogo src={eswLogo} />
          <span>ESW price: </span>
          <SidebarEswPriceValue>$0.025</SidebarEswPriceValue>
        </SidebarEsw>
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;
