import React from 'react';
import Wordmark from '../components/Wordmark';
import Logo from '../components/Logo';
import styled from 'styled-components';
import PolygonSvg from '../assets/images/polygon.svg';
import BonusProgram from '../components/BonusProgram';

export const HeadersPlusBodyWrapper = styled.div<{ disabled?: boolean }>`
  position: relative;
  max-width: 440px;
  width: 100%;
  text-align: center;

  :after {
    content: '';
    background: center / contain no-repeat url('${PolygonSvg}');
    position: absolute;
    top: -5px;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, 0%);
    width: 875px;
    height: 857px;
    z-index: -1;

    ${({ theme }) => theme.mediaWidth.upToSmall`
      display: none;
    `};
  }
`;

export const BodyWrapper = styled.div<{ disabled?: boolean }>`
  position: relative;
  max-width: 440px;
  width: 100%;
  background: ${({ theme }) => theme.bg1};
  box-shadow: 0px 0px 10px -2px rgba(231, 215, 175, 0.9),
    0px 21px 20px -15px rgba(140, 125, 85, 0.15);
  border-radius: 24px;
  padding: 34px 30px 40px;
  opacity: ${({ disabled }) => (disabled ? '0.4' : '1')};
  pointer-events: ${({ disabled }) => disabled && 'none'};
  bottom: 7px;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 1rem;
  `};
`;

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({
  children,
  disabled
}: {
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <HeadersPlusBodyWrapper>
      <div className="onlyDesktop">
        <Logo />
        <Wordmark />
      </div>
      <BodyWrapper disabled={disabled}>{children}</BodyWrapper>
      <BonusProgram />
    </HeadersPlusBodyWrapper>
  );
}
