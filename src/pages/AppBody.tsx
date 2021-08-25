import React, { useState } from 'react';
import Wordmark from '../components/Wordmark';
import styled from 'styled-components/macro';
import BonusProgram from '../components/BonusProgram';
import { ThemeProvider } from 'emotion-theming';
import theme from '@rebass/preset';
import FAQInfo from '../components/FAQInfo';
import { useRouteMatch } from 'react-router';
import { YMInitializer } from 'react-yandex-metrika';
import { useActiveWeb3React } from '../hooks';
import chainIds from '../constants/chainIds';
import WalletRejectIcon from '../assets/svg/wallet-reject.svg';
import Modal from '../components/Modal';
import { Text } from 'rebass';
import { ButtonPrimary } from '../components/Button';
import { useIsKuCoinActive } from '../hooks/Coins';

export const HeadersPlusBodyWrapper = styled.div<{ isLarge?: boolean }>`
  position: relative;
  max-width: ${({ isLarge }) => isLarge ? '1200px' : '440px'};
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

export const ModalMobile = styled(Modal)`
  width: calc(100vw - 32px) !important;
  margin: 32px !important;
  border: 1px solid #615C69 !important;
  border-radius: 12px !important;
  // box-shadow: none !important;
  transform: translateY(0px) !important;
`;

export const KCSAlert = styled.div`
   padding: 24px;
   color: white;
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

  const { chainId } = useActiveWeb3React();

  const isKuCoinActive = useIsKuCoinActive();

  const [showModal, setShowModal] = useState<boolean>(!isKuCoinActive);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <HeadersPlusBodyWrapper isLarge={!!match}>
        <div className="onlyDesktop">
          <Wordmark/>
        </div>
        <YMInitializer accounts={[78893968]} options={{ webvisor: true }}/>
        <BodyWrapper className={className} data="test" disabled={disabled}>
          {children}
        </BodyWrapper>
        <BonusProgram/>
      </HeadersPlusBodyWrapper>
      <FAQWrapper>
        {(chainId as any) !== chainIds.KUCOIN && (
          <FAQInfo/>
        )}
      </FAQWrapper>
      <ModalMobile
        isOpen={showModal}
        onDismiss={handleCloseModal}
      >
        <KCSAlert>
          <img src={WalletRejectIcon} alt={''}/>
          <div style={{ marginTop: '16px' }}>
            To continue using the exchange please switch to the KCC network or change the wallet to MetaMask
          </div>
          <div style={{ marginTop: '24px' }}>
            <ButtonPrimary onClick={handleCloseModal}>
              <Text fontWeight={500} fontSize={20}>
                Accept
              </Text>
            </ButtonPrimary>
          </div>
        </KCSAlert>
      </ModalMobile>
    </ThemeProvider>
  );
}
