import React from 'react';
import styled from 'styled-components/macro';
import { useActiveWeb3React } from '../../../hooks';

import nftPurpleBigPng from '../../../assets/images/nft-purple-big.png';
import Modal from '../../../components/Modal';

const StyledModal = styled(Modal)`
  margin-top: 16px !important;
  overflow-y: visible !important;
  background: transparent !important;
  backdrop-filter: blur(48px);

  @media screen and (max-width: 980px) {
    background: black !important;
    backdrop-filter: none;
  }
`;

const StyledContent = styled.div`
  width: 100%;
  padding: 32px 32px 8px 32px;
`;

const StyledNftImg = styled.img`
  display: block;
  margin: 0 auto 16px auto;
`;

const StyledTitle = styled.div`
  margin-bottom: 8px;
  text-align: center;
  font-weight: 400;
  font-size: 24px;
  line-height: 36px;
  color: white;
`;

const StyledSubtitle = styled.div`
  margin-bottom: 8px;
  text-align: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 32px;
  color: #898889;
`;

const StyledLevels = styled.div`
  display: flex;

  @media screen and (max-width: 980px) {
    display: block;
  }
`;

const StyledCard = styled.div`
  flex: 1;
  margin-bottom: 16px;
  padding: 16px 24px;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(48px);

  @media screen and (max-width: 980px) {
    backdrop-filter: blur(48px);
  }
`;

const StyledCardBasic = styled(StyledCard)`
  margin-right: 24px;

  @media screen and (max-width: 900px) {
    margin-right: 0;
  }
`;

const StyledCardTitle = styled.div`
  margin-bottom: 12px;
  text-align: center;
  font-weight: 400;
  font-size: 24px;
  line-height: 36px;
  color: white;
`;

const StyledCardSubtitle = styled.div`
  text-align: center;
  font-weight: 400;
  font-size: 16px;
  line-height: 32px;
  color: white;
`;

const StyledCardText = styled.div`
  margin-bottom: 12px;
  text-align: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #b6b6b7;
`;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function NftLevelsModal({ isOpen, onClose }: Props) {
  const { chainId } = useActiveWeb3React();

  return (
    <StyledModal
      isOpen={isOpen}
      onDismiss={onClose}
      zIndex={1000}
      width={'70vw'}
      minHeight={null}
      maxHeight={90}
      maxWidth={850}
    >
      <StyledContent>
        <StyledNftImg src={nftPurpleBigPng} />
        <StyledTitle>To get your extended APRs follow 2 easy steps</StyledTitle>
        <StyledSubtitle>
          Put liquidity in Pool c ESP and get an LP token (example: LP / W) - get 180% per annum + a
          NET bonus
        </StyledSubtitle>
        <StyledLevels>
          <StyledCardBasic>
            <StyledCardTitle>Basic Level NFT</StyledCardTitle>
            <StyledCardSubtitle>Pool:</StyledCardSubtitle>
            <StyledCardText>
              {'Pool with ESW LP 180 -> 185%'}
              <br />
              {'(+5% APR)(LP < 150$?)'}
              <br />
              Pool witout ESW (LP 0)
            </StyledCardText>
            <StyledCardSubtitle>Farm:</StyledCardSubtitle>
            <StyledCardText>
              {'Farm with ESW 180 -> 185%'}
              <br />
              (+ 5 % APR)
              <br />
              {'Farm witout ESW 365 -> 375% (+10% APR)'}
            </StyledCardText>
          </StyledCardBasic>
          <StyledCard>
            <StyledCardTitle>Top Level NFT</StyledCardTitle>
            <StyledCardSubtitle>Pool:</StyledCardSubtitle>
            <StyledCardText>
              {'Pool with ESW (LP 180) -> 190%'}
              <br />
              {'(+10% APR) (LP >=150$)'}
              <br />
              Pool witout ESW (LP 0)
            </StyledCardText>
            <StyledCardSubtitle>Farm:</StyledCardSubtitle>
            <StyledCardText>
              {'Farm with ESW 180 -> 180'}
              <br />
              {'(10% APR) >=150$)'}
              <br />
              {'Farm witout ESW 365 -> 385% (+20% APR)'}
            </StyledCardText>
          </StyledCard>
        </StyledLevels>
      </StyledContent>
    </StyledModal>
  );
}
