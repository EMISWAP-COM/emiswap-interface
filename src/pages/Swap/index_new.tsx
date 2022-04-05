import React from 'react';
import { Props } from '../../ThemeProvider/components';
import styled, { css } from 'styled-components';
import { color, layout, width } from 'styled-system';

import switchHoriz from '../../assets/svg/switch_horiz.svg';
import refreshValue from '../../assets/svg/refresh_value.svg';
import copy from '../../assets/svg/copy.svg';
import eswLogo from '../../assets/currencies/ESW.png';
import shareAbs from '../../assets/images/share_abs.png';

const PageContainer = styled.div<Props>`
  ${color}
  ${layout}
  ${width}
  color: white;
  padding: 62px;
`;

const SwapWrapper = styled(PageContainer)<Props>`
  display: flex;
`;

const MainContainer = styled.div`
  flex: 1;
`;

const PageHead = styled.div<Props>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
`;

const PageTitle = styled.h1`
  margin: 0;
  padding: 0;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
`;

const PageTabs = styled.div<Props>`
  display: flex;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.05);
`;

const Tab = styled.div<{ active: boolean }>`
  padding: 8px 16px;
  border-radius: 50px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;

  ${({ active }) =>
    active &&
    css`
      background: #7a2df4;
    `}
`;

const PageContent = styled.div<Props>``;

const SwapContent = styled(PageContent)`
  display: flex;
`;

const FormCard = styled.div<Props>`
  flex: 1;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.05);
`;

const ShareCard = styled.div<Props>`
  display: flex;
  flex-direction: column;
  height: 256px;
  min-width: 250px;
  margin-top: calc(40px + 18px);
  margin-left: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
`;

const ShareImage = styled.div<Props>`
  position: relative;
  height: 210px;
  width: 100%;
  border-top-right-radius: 24px;
  border-top-left-radius: 24px;
  background: #d4e1fe;
`;

const ShareImg = styled.img`
  display: block;
  z-index: 5;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
`;

const ShareText = styled.p`
  z-index: 10;
  position: relative;
  margin: 24px;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #0f0f13;
`;

const ShareFooter = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 72px;
`;

const ShareCopyIcon = styled.img`
  height: 16px;
  width: 16px;
  margin-right: 12px;
`;

const CurrencyGroup = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 24px 32px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const FieldGroup = styled.div<Props>`
  flex: 1;
`;

const Field = styled.div<Props>`
  display: flex;
  align-items: center;
  height: 48px;
  border-radius: 14px;
`;

const CurrencyField = styled(Field)`
  background: #0f0f13;
`;

const CurrencyInput = styled.input`
  flex: 1;
  border: none !important;
  padding-right: 8px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: right;
  background: transparent;
  color: #ffffff;
  box-shadow: none !important;
  outline: none !important;
`;

const RefreshImg = styled.img`
  box-sizing: content-box;
  width: 24px;
  height: 24px;
  padding: 0 8px 0 12px;
  cursor: pointer;
`;

const SwitchIcon = styled.img`
  margin-top: 32px;
  padding: 0 16px;
  cursor: pointer;
`;

const FieldTop = styled.div<Props>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const InputLabel = styled.div<Props>``;

const InputBalance = styled.div<Props>`
  color: rgba(255, 255, 255, 0.7);
`;

const PriceGroup = styled.div<Props>`
  display: flex;
  padding: 24px;
`;

const PriceFieldGroup = styled(FieldGroup)`
  flex: 1;
  margin-right: 28px;
`;

const CurrencySwitch = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const CurrencyWrap = styled.div<{ pair?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  min-width: 32px;
  margin: 6px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.15);
  cursor: pointer;

  ${({ pair }) =>
    pair &&
    css`
      width: 48px;
    `}
`;

const CurrencyIcon = styled.img`
  height: 20px;
  width: 20px;
`;

const CurrencyName = styled.div`
  box-sizing: content-box;
  width: 48px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  text-align: center;
`;

const PriceField = styled(Field)`
  background: rgba(255, 255, 255, 0.05);
`;

const PriceInfo = styled.div<Props>`
  flex: 1;
  margin-top: auto;
  margin-left: 28px;
`;

const ValueLine = styled.div<Props>`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-top: 12px;
`;

const ValueInfo = styled.div<Props>``;

const ActionsGroup = styled.div<Props>`
  padding: 8px 24px 24px 24px;
`;

const ButtonPrimary = styled.button`
  height: 46px;
  border: none;
  border-radius: 12px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  background: #7a2df4;
  color: white;
  cursor: pointer;

  &:disabled {
    color: rgba(255, 255, 255, 0.7);
    background: rgba(122, 45, 244, 0.15);
  }
`;

const ButtonApprove = styled(ButtonPrimary)`
  width: calc(50% - 8px);
  margin-right: 16px;
`;

const ButtonSwap = styled(ButtonPrimary)`
  width: calc(50% - 8px);
`;

const ButtonMax = styled(ButtonPrimary)`
  box-sizing: content-box;
  height: 32px;
  min-width: 48px;
  margin: 0 8px 0 12px;
  border: none;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
`;

const Swap = () => {
  return (
    <SwapWrapper>
      <MainContainer>
        <PageHead>
          <PageTitle>Swap</PageTitle>
          <PageTabs>
            <Tab active={true}>Single Chain</Tab>
            <Tab active={false}>Multi-chain</Tab>
          </PageTabs>
        </PageHead>
        <SwapContent>
          <FormCard>
            <CurrencyGroup>
              <FieldGroup>
                <FieldTop>
                  <InputLabel>From</InputLabel>
                  <InputBalance>Balance: 0.000</InputBalance>
                </FieldTop>
                <CurrencyField>
                  <CurrencySwitch>
                    <CurrencyWrap>
                      <CurrencyIcon src={eswLogo} />
                    </CurrencyWrap>
                    <CurrencyName>ESW</CurrencyName>
                  </CurrencySwitch>
                  <CurrencyInput placeholder="0.000" />
                  <ButtonMax>MAX</ButtonMax>
                </CurrencyField>
              </FieldGroup>
              <SwitchIcon src={switchHoriz} alt="" />
              <FieldGroup>
                <FieldTop>
                  <InputLabel>To (estimated)</InputLabel>
                  <InputBalance>Balance: 0.000</InputBalance>
                </FieldTop>
                <CurrencyField>
                  <CurrencySwitch>
                    <CurrencyWrap>
                      <CurrencyIcon src={eswLogo} />
                    </CurrencyWrap>
                    <CurrencyName>ESW</CurrencyName>
                  </CurrencySwitch>
                  <CurrencyInput placeholder="0.000" />
                </CurrencyField>
              </FieldGroup>
            </CurrencyGroup>
            <PriceGroup>
              <PriceFieldGroup>
                <FieldTop>
                  <InputLabel>Price</InputLabel>
                </FieldTop>
                <PriceField>
                  <CurrencyWrap pair>
                    <CurrencyIcon src={eswLogo} />
                    <CurrencyIcon style={{ marginLeft: -8 }} src={eswLogo} />
                  </CurrencyWrap>
                  <CurrencyInput placeholder="0.000" />
                  <RefreshImg src={refreshValue} alt="" />
                </PriceField>
              </PriceFieldGroup>
              <PriceInfo>
                <ValueLine>
                  <span>Minimum received:</span>
                  <div>
                    <span>0.000 BTC</span>
                    <ValueInfo></ValueInfo>
                  </div>
                </ValueLine>
                <ValueLine>
                  <span>Price Impact:</span>
                  <div>
                    <span>0.000 BTC</span>
                    <ValueInfo></ValueInfo>
                  </div>
                </ValueLine>
              </PriceInfo>
            </PriceGroup>
            <ActionsGroup>
              <ButtonApprove>Approve ETH</ButtonApprove>
              <ButtonSwap disabled>Swap</ButtonSwap>
            </ActionsGroup>
          </FormCard>
        </SwapContent>
      </MainContainer>
      <ShareCard>
        <ShareImage>
          <ShareImg src={shareAbs} />
          <ShareText>Share referral link to earn cryptocurrency</ShareText>
        </ShareImage>
        <ShareFooter>
          <ShareCopyIcon src={copy} alt="" />
          <span>Copy Referral Link</span>
        </ShareFooter>
      </ShareCard>
    </SwapWrapper>
  );
};

export default Swap;
