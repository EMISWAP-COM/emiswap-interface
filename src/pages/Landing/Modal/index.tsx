import React from 'react';
import styled from 'styled-components';
import Modal from "../../../components/Modal";

const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 12px 0 12px 0;
  background: #0F0F13;
  border: 1px solid #615C69;
  box-sizing: border-box;
  border-radius: 24px;
  color: ${({ theme }) => theme.white};


  > p {
    line-height: 24px;
    margin: 12px 24px;

    &.lp_popup_heading {
      font-size: 18px;
    }
  }

  > hr {
    width: 100%;
    border-color: #615C69;
  }

  > ol li {
    line-height: 24px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 36px;

  font-style: normal;
  font-weight: normal;
  font-size: 32px;

  color: #FFFFFF;
`;

const CloseWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
`;

const Close = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  border-radius: 24px;
  background: #27272E;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 16px;
  cursor: pointer;
`;

export default function LandingModal({ isOpen, onDismiss }) {
  return (
    <Modal
      isOpen={isOpen}
      // maxHeight={90}
      maxWidth={606}
      onDismiss={onDismiss}
      className="landing_modal"
    >
      <Header>EmiSwap Smart Farming  <CloseWrapper onClick={onDismiss} >Close  <Close>X</Close></CloseWrapper></Header>
      <ModalContent>
        <p className="lp_popup_heading">180% APR Airdrop</p>

        <p>
          Users can provide liquidity in any pool with ESW token (for example ESW/USDT) for at least 1 month and get 180% APR.
        </p>

        <p>
          The 180% APR will be allocated to all Liquidity Providers three months after the campaign has ended or after users remove liquidity.
        </p>

        <hr />

        <p className="lp_popup_heading">Smart Farming + 365% APR Airdrop</p>

        <p>Smart Farming allows users to get 365% APR on their LP token plus an additional percentage (XXX%) on staked LP-ESW tokens in Farming pool. </p>

        <p>This feature will be released at a random time, and the first 10 users, who will stake their LP and ESW tokens in the Farming pool will get 500 ESW as a bonus. Stay tuned and wait for the release of LP/ESW Farming pool!</p>

        <p className="lp_popup_heading">How to get 365% APR? </p>

        <ol>
          <li>Provide liquidity for any pair and get LP tokens</li>
          <li>Stake your LP tokens in pair with ESW tokens in Farming pool</li>
          <li>Get 365% on your LP tokens</li>
          <li>Get XXX% APR on your LP+ESW tokens in Farming pool</li>
        </ol>

        <hr />

        <p style={{ color: '#878789' }}>It doesn’t end there, as you get an extra 0.25% of the pool’s trading fees as a liquidity provider.</p>
      </ModalContent>
    </Modal>
  )
}
