import React, { useState } from 'react';
import { Props } from '../ThemeProvider';
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

const SidebarWrapper = styled.div<Props>`
  ${color}
  ${layout}
  ${width}
  padding: 24px 12px;
  color: white;
  background: radial-gradient(237.61% 114.78% at 152.56% 43.16%, #2D2030 0%, #0F0F13 36.59%);
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
      background: radial-gradient(281.25% 870.12% at 2.78% -76.56%, #32a9ff 0%, #8128cc 100%);
      color: white;
    `}
`;

const SidebarNavIcon = styled.img`
  margin-bottom: 4px;
  padding-right: 16px;
`;

const SidebarAudited = styled.div<Props>`
  padding: 0 12px;
  margin-top: 48px;
  margin-bottom: 24px;
`;

const SidebarEsw = styled.div<Props>`
  padding: 0 12px;
`;

const sidebarItems = [
  {
    icon: homeSvg,
    label: 'Home',
  },
  {
    icon: refreshSvg,
    label: 'Swap',
  },
  {
    icon: circleSvg,
    label: 'Liquidity pools',
  },
  {
    icon: databaseSvg,
    label: 'Farm',
  },
  {
    icon: deskSvg,
    label: 'Dashboard',
  },
  {
    icon: chartSvg,
    label: 'Analytics',
  },
  {
    icon: linkSvg,
    label: 'Bridge Multichain',
  },
  {
    icon: userAddSvg,
    label: 'Referral program',
  },
  {
    icon: chatAddSvg,
    label: 'More',
  },
];

const Sidebar = () => {
  const [activeNav, setActiveNav] = useState<string>('Home');

  return (
    <SidebarWrapper minWidth={230}>
      <SidebarMenuBtn>
        <img src={menuSvg} alt="" />
      </SidebarMenuBtn>
      {sidebarItems.map(item => (
        <SidebarNavItem active={activeNav === item.label} onClick={() => setActiveNav(item.label)}>
          <SidebarNavIcon src={item.icon} alt="" />
          {item.label}
        </SidebarNavItem>
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
        <SidebarEsw>ESW price: $0.025</SidebarEsw>
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;
