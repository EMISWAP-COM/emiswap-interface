import React, { useState } from 'react';
import { Box, Flex, Img, Props } from '../ThemeProvider/components';
import styled, { css } from 'styled-components';

import hackenSvg from '../assets/sidebar/hacken.svg';
import blueSwarmSvg from '../assets/sidebar/blue_swarm.svg';

import eswLogo from '../assets/currencies/ESW.png';
import { MenuIcon } from '../ui-kit/icons/menu';
import {
  ArrowDownIcon,
  ChartAddIcon,
  ChartIcon,
  CircleIcon,
  DatabaseIcon,
  DeskIcon,
  HomeIcon,
  LinkIcon,
  RefreshIcon,
  UserAddIcon,
} from '../ui-kit/icons';

const SidebarWrapper = styled(Box)`
  background: radial-gradient(237.61% 114.78% at 152.56% 43.16%, #2d2030 0%, #0f0f13 36.59%);
  color: white;
`;

const SidebarMenuBtn = styled(Flex)`
  background: rgba(255, 255, 255, 0.15);
  cursor: pointer;
`;

const SidebarNavItem = styled(Flex)<{ active?: boolean }>`
  border-radius: 12px;
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

const SidebarNavSubBackground = styled(Box)`
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

const SidebarEsw = styled(Flex)`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
`;

const SidebarEswLogo = styled(Img)`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const SidebarEswPriceValue = styled(Box)`
  font-size: 16px;
  font-weight: 500;
  color: white;
`;

const sidebarItems = [
  {
    icon: <HomeIcon />,
    label: 'Home',
    url: '',
  },
  {
    icon: <RefreshIcon />,
    label: 'Swap',
    url: '',
  },
  {
    icon: <CircleIcon />,
    label: 'Liquidity pools',
    url: '',
  },
  {
    icon: <DatabaseIcon />,
    label: 'Farm',
    url: '',
  },
  {
    icon: <DeskIcon />,
    label: 'Dashboard',
    url: '',
  },
  {
    icon: <ChartIcon />,
    label: 'Analytics',
    url: '',
  },
  {
    icon: <LinkIcon />,
    label: 'Bridge Multichain',
    url: '',
  },
  {
    icon: <UserAddIcon width="24" height="18" />,
    label: 'Referral program',
    url: '',
  },
  {
    icon: <ChartAddIcon />,
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
    <SidebarWrapper minWidth={230} px={1} py={3}>
      <SidebarMenuBtn
        justifyContent="center"
        alignItems="center"
        width={32}
        height={32}
        mb={5}
        borderRadius={10}
      >
        <MenuIcon />
      </SidebarMenuBtn>
      {sidebarItems.map(item => (
        <>
          <SidebarNavItem
            alignItems="center"
            py="12px"
            px="12px"
            borderRadius={12}
            active={activeNav === item.label}
            onClick={() => handleClickNavItem(item)}
          >
            <Box mr={2} mb={0.5}>
              {item.icon}
            </Box>
            <span>{item.label}</span>
            {item.items?.length > 0 && (
              <Box ml="auto">
                <ArrowDownIcon />
              </Box>
            )}
          </SidebarNavItem>
          {item.items?.length > 0 && openedGroup === item.label && (
            <Box zIndex={10} position="relative">
              {item.items.map(subItem => (
                <SidebarNavSubItem
                  active={activeNav === subItem.label}
                  onClick={() => setActiveNav(subItem.label)}
                >
                  {subItem.label}
                </SidebarNavSubItem>
              ))}
              <SidebarNavSubBackground />
            </Box>
          )}
        </>
      ))}
      <Box mt={5}>
        <Box px={2} mb={3}>
          <Box>
            <span>Audited by:</span>
            <img style={{ marginLeft: 8 }} src={hackenSvg} alt="" />
            <img style={{ marginLeft: -4 }} src={blueSwarmSvg} alt="" />
          </Box>
          <Box mt={1}>Hacken & BlueSwarm</Box>
        </Box>
        <SidebarEsw alignItems="center" px={1}>
          <SidebarEswLogo src={eswLogo} />
          <span>ESW price: </span>
          <SidebarEswPriceValue ml={1}>$0.025</SidebarEswPriceValue>
        </SidebarEsw>
      </Box>
    </SidebarWrapper>
  );
};

export default Sidebar;
