import React from 'react';
import styled from 'styled-components';
import Modal from "../../../components/Modal";

const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 24px;
  color: ${({ theme }) => theme.white};


  > p {
    line-height: 24px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

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

export default function LandingModal({ isOpen, onDissmiss }) {
  return (
    <Modal
      isOpen={isOpen}
      // maxHeight={90}
      maxWidth={680}
      onDismiss={onDissmiss}
      className="landing_modal"
    >
      <ModalContent>
        <Header>EmiSwap Smart Farming  <CloseWrapper onClick={onDissmiss} >Close  <Close>X</Close></CloseWrapper></Header>
        <p>
          Smart Farming allows you to get 365% APR on your LP token plus an additional percentage (XXX%) on staked LP-ESW tokens in Farming pool.
        </p>

        <p>
          How to get 365% APR?
        </p>

        <ul>
          <li>Provide liquidity for any pair and get LP tokens</li>
          <li>Stake your LP tokens in pair with ESW tokens in Farming pool</li>
          <li>Get 365% on your LP tokens</li>
          <li>Get XXX% APR on your LP+ESW tokens in Farming pool</li>
        </ul>

        <p>Staking your LP tokens with ESW into the farming pool will make you eligible for getting a 365% APR! It doesn’t end there, as you get an extra 0.25% of the pool’s trading fees as a liquidity provider.</p>
        <p>The 365% APR will be allocated to all farmers three months after the campaign has ended or after users remove liquidity.</p>
      </ModalContent>
    </Modal>
  )
}
