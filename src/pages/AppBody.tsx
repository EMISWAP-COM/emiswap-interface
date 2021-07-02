import React from 'react';
import Wordmark from '../components/Wordmark';
import styled from 'styled-components/macro';
import BonusProgram from '../components/BonusProgram';
import { ThemeProvider } from 'emotion-theming';
import theme from '@rebass/preset';
import FAQInfo from '../components/FAQInfo';
import { useRouteMatch } from 'react-router';

export const HeadersPlusBodyWrapper = styled.div<{ isLarge?: boolean }>`
  position: relative;
  max-width: ${({isLarge}) => isLarge ? '1200px' : '440px'};
  width: 100%;
  text-align: center;
`;

export const BodyWrapper = styled.div<{ disabled?: boolean; data?: string }>`
  position: relative;
  width: 100%;
  background: ${({ theme }) => theme.dark1};
  box-shadow: ${({ theme }) => theme.dark1BoxShadow};
  border-radius: 24px;
  padding: 34px 30px 40px;
  opacity: ${({ disabled }) => (disabled ? '0.4' : '1')};
  pointer-events: ${({ disabled }) => disabled && 'none'};
  bottom: 7px;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 1rem;
  `};

  &.invest-mobile {
    @media screen and (max-width: 1200px) {
      // margin-bottom: 650px;
    }
    @media screen and (max-width: 500px) {
      // margin-bottom: 600px;
    }
    @media screen and (max-width: 390px) {
      // margin-bottom: 630px;
    }
  }
  &.mb650 {
    @media screen and (max-width: 500px) {
      margin-bottom: 650px;
    }

    @media screen and (max-width: 320px) {
      margin-bottom: 670px;
    }

    @media screen and (max-width: 280px) {
      margin-bottom: 720px;
    }
  }
`;

const FAQWrapper = styled.div`
  max-width: 1200px;
  margin-top: 45px;

  @media screen and (max-width: 1300px) {
    max-width: 960px;
  }

  @media screen and (max-width: 1000px) {
    max-width: calc(100% - 20px);
  }

  @media screen and (max-width: 600px) {
    max-width: 100%;
    margin-top: 10px;
  }
`;

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({
  children,
  disabled,
  className,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}) {
  const match = useRouteMatch('/farm');

  return (
    <ThemeProvider theme={theme}>
      <HeadersPlusBodyWrapper isLarge={!!match}>
        <div className="onlyDesktop">
          <Wordmark />
        </div>
        <BodyWrapper className={className} data="test" disabled={disabled}>
          {children}
        </BodyWrapper>
        <BonusProgram />
      </HeadersPlusBodyWrapper>
      <FAQWrapper>
        <FAQInfo />
      </FAQWrapper>
    </ThemeProvider>
  );
}
