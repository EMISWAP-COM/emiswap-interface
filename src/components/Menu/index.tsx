import React, { useRef, useEffect } from 'react';
// import { Info, BookOpen, Code, PieChart, MessageCircle } from 'react-feather'
import { BookOpen, Code, Info, MessageCircle } from 'react-feather';
import styled from 'styled-components';
import { ReactComponent as MenuIcon } from '../../assets/images/menu.svg';
import useToggle from '../../hooks/useToggle';
import { ExternalLink } from '../../theme';

const StyledMenuIcon = styled(MenuIcon)`
  path {
    stroke: ${({ theme }) => theme.green4};
  }
`;

const StyledMenuButton = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 40px;
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
  min-width: 10.025rem;
  background-color: ${({ theme }) => theme.bg3};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04),
    0px 16px 24px rgba(0, 0, 0, 0.04), 0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 0.5rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: absolute;
  top: 3rem;
  right: 0rem;
  z-index: 100;
`;


const MenuItem = styled(ExternalLink)`
  flex: 1;
  padding: 0.5rem 0.5rem;
  color: ${({ theme }) => theme.text2};
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
  > svg {
    margin-right: 8px;
  }
`;

export default function Menu() {
  const node = useRef<HTMLDivElement>();
  const [open, toggle] = useToggle(false);

  useEffect(() => {
    const handleClickOutside = e => {
      if (node.current?.contains(e.target) ?? false) {
        return;
      }
      toggle();
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, toggle]);

  return (
    <StyledMenu ref={node}>
      <StyledMenuButton onClick={toggle}>
        <StyledMenuIcon />
      </StyledMenuButton>
      {open && (
        <MenuFlyout>
          <MenuItem id="link" href="https://emiswap.medium.com/emiswap-amm-exchange-to-perfect-the-defi-market-d13e74dc6e14">
            <Info size={14} />
            About
          </MenuItem>
          <MenuItem id="link" href={process.env.REACT_APP_CODE_LINK}>
            <Code size={14} />
            Code
          </MenuItem>
          <MenuItem id="link" href="https://crowdsale.emidao.org">
            <BookOpen size={14} />
            Crowdsale Info
          </MenuItem>
          <MenuItem id="link" href="https://discord.gg/vUGBEun">
            <MessageCircle size={14} />
            Discord
          </MenuItem>
          <MenuItem id="link" href={process.env.PUBLIC_URL + '/docs/EmiSwap_WP_EN_v2.0.pdf'}>
            <BookOpen size={14} />
            Whitepaper
          </MenuItem>
        </MenuFlyout>
      )}
    </StyledMenu>
  );
}
