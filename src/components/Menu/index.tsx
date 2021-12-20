import React, { useEffect, useRef } from 'react';
// import { Info, BookOpen, Code, PieChart, MessageCircle } from 'react-feather'
import { BookOpen, Code, MessageCircle, PieChart } from 'react-feather';
import WikiIcon from '../../assets/images/wiki.svg';
import styled from 'styled-components';
import { ReactComponent as MenuIcon } from '../../assets/images/menu.svg';
import useToggle from '../../hooks/useToggle';
import { ExternalLink } from '../../theme';
import { useNetworkData } from '../../hooks/Coins';

const StyledMenuIcon = styled(MenuIcon)`
  path {
    stroke: ${({ theme }) => theme.white};
  }
`;

const StyledMenuButton = styled.button`
  width: 100%;
  border: none;
  margin: 0;
  height: 40px;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.whiteTransparent};
  display: flex;
  align-items: center;
  transition: all 0.3s ease-in-out;

  padding: 0.15rem 0.625rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    border-color: ${({ theme }) => theme.purple};
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
  min-width: 14.025rem;
  background-color: ${({ theme }) => theme.dark1};
  box-shadow: ${({ theme }) => theme.dark1BoxShadow};
  border-radius: 0.5rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: absolute;
  top: 3rem;
  right: 0;
  z-index: 100;
`;

const MenuItem = styled(ExternalLink)`
  flex: 1;
  padding: 0.5rem 0.5rem;
  color: ${({ theme }) => theme.white};
  :hover {
    color: ${({ theme }) => theme.darkWhite};
    cursor: pointer;
    text-decoration: none;
  }
  > svg,
  > img {
    margin-right: 8px;
  }
`;

/*const MenuTextItem = styled.div`
  flex: 1;
  padding: 0.5rem 0.5rem;
  color: ${({ theme }) => theme.white};
  > svg,
  > img {
    margin-right: 8px;
  }
`;*/

export default function Menu() {
  const { analyticsUrl } = useNetworkData();

  const node = useRef<HTMLDivElement>();
  const [open, toggle] = useToggle(false);

  // const { chainId } = useActiveWeb3React();

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
        <StyledMenuIcon/>
      </StyledMenuButton>
      {open && (
        <MenuFlyout>
          {/* <MenuItem id="link" href="https://emiswap.com/main">
            <Info size={14}/>
            About
          </MenuItem> */}
          <MenuItem id="link" href="https://wiki.emiswap.com/">
            {/* TODO иконка не из react-feather нарушает единообразие*/}
            <img src={WikiIcon} width={14} height={14} alt=""/>
            Wiki
          </MenuItem>
          <MenuItem id="link" href={analyticsUrl}>
            <PieChart size={14}/>
            Analytics
          </MenuItem>
          <MenuItem
            id="link"
            href="https://emiswap.medium.com/all-you-need-to-know-about-nft-magic-cards-7c0ec9875800"
            target="_blank"
          >
            <MessageCircle size={14}/>
            NFT Magic Cards
          </MenuItem>
          <MenuItem id="link" href="https://about.emiswap.com/whitepaper" target="_blank">
            <BookOpen size={14}/>
            Whitepaper
          </MenuItem>
          {/* <MenuItem
            id="link"
            href={eswExplorerUrl}
            target="_blank"
          >
            <Info size={14}/>
            {eswExplorerName}
          </MenuItem> */}
          <MenuItem
            id="link"
            // href="https://hacken.io/wp-content/uploads/2021/02/18022021_Emiswap_SC_Audit_Report.pdf"
            href="/docs/06042021_Emiswap_SC_Audit_Report.pdf"
            target="_blank"
          >
            <BookOpen size={14}/>
            Smart Contract Audit
          </MenuItem>
          <MenuItem
            id="link"
            // href="https://hacken.io/wp-content/uploads/2021/02/18022021_Emiswap_SC_Audit_Report.pdf"
            href="/docs/12072021_Emiswap_SC_Audit_Report_V2.pdf"
            target="_blank"
          >
            <BookOpen size={14}/>
            Smart Contract Audit 2
          </MenuItem>
          <MenuItem id="link" href={window['env'].REACT_APP_CODE_LINK} target="_blank">
            <Code size={14}/>
            Code
          </MenuItem>
          <MenuItem id="link" href="https://about.emiswap.com/farming" target="_blank">
            <BookOpen size={14}/>
            Earn with EmiSwap
          </MenuItem>
        </MenuFlyout>
      )}
    </StyledMenu>
  );
}
