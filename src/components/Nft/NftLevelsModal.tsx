import React from 'react';
import styled from 'styled-components/macro';
import { useActiveWeb3React } from '../../hooks';

import Modal from '../Modal';
import useNftData, { INft } from '../../hooks/useNftData';
import { ButtonPrimary } from '../Button';
import { useHistory } from 'react-router-dom';

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
  padding: 16px 32px 4px 32px;
`;

const StyledImages = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin: auto;
`;

const StyledNftImg = styled.img`
  display: block;
  width: 170px;
  margin: 16px 32px 16px 32px;

  @media screen and (max-width: 980px) {
    width: 150px;
    margin: 16px 16px 16px 16px;
  }
`;

const StyledPlus = styled.div`
  position: absolute;
  top: 110px;
  font-size: 50px;
  color: #e478ff;
`;

const StyledLevels = styled.div`
  display: flex;

  @media screen and (max-width: 980px) {
    display: block;
  }
`;

const StyledCard = styled.div`
  flex: 1;
  max-width: 314px;
  margin-right: 24px;
  margin-bottom: 24px;
  padding: 24px 32px 12px 32px;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(48px);

  @media screen and (max-width: 980px) {
    backdrop-filter: none;
  }
`;

const StyledCardBasic = styled(StyledCard)`
  margin-right: 0;

  @media screen and (max-width: 900px) {
    margin-right: 0;
  }
`;

const StyledCardTitle = styled.div`
  margin-bottom: 16px;
  text-align: center;
  font-weight: 400;
  font-size: 24px;
  line-height: 36px;
  color: white;
`;

const StyledCardText = styled.div`
  max-width: 240px;
  margin-bottom: 24px;
  text-align: center;
  font-weight: 400;
  font-size: 16px;
  line-height: 30px;
  color: #b6b6b7;
`;

const StyledCardTextBold = styled.b`
  font-size: 18px;
  font-weight: 500;
  color: white;
`;

const StyledLink = styled.a`
  color: #e478ff !important;
`;

interface Props {
  isOpen: boolean;
  onlyNfts?: INft[];
  onClose: () => void;
}

export default function NftLevelsModal({ isOpen, onlyNfts, onClose }: Props) {
  const history = useHistory();

  const { chainId } = useActiveWeb3React();

  const { nfts } = useNftData();

  const visibleNfts = onlyNfts?.length ? onlyNfts : nfts;

  const handleClickPool = () => {
    history.push('/pool');
    onClose();
  };

  return (
    <StyledModal
      isOpen={isOpen}
      onDismiss={onClose}
      zIndex={1000}
      width={'70vw'}
      minHeight={null}
      maxHeight={90}
      maxWidth={visibleNfts.length > 1 ? 719 : 378}
    >
      <StyledContent>
        <StyledImages>
          {visibleNfts.map(nft => (
            <StyledNftImg src={nft.imgBig} />
          ))}
          {visibleNfts.length > 1 && <StyledPlus>+</StyledPlus>}
        </StyledImages>
        <StyledLevels>
          <StyledCardBasic>
            <StyledCardTitle>EmiChiko Space Star</StyledCardTitle>
            <StyledCardText>
              Gives you: +5% on liquidity provision and + 10% to your farming rewards!
            </StyledCardText>
            <StyledCardText>
              APR LP 180% {'>'} <StyledCardTextBold>185%</StyledCardTextBold>
              <br />
              PR Farm 365% {'>'} <StyledCardTextBold>375%</StyledCardTextBold>
            </StyledCardText>
            <StyledCardText>
              Follow our guide how to provide liquidity with{' '}
              <StyledLink href="#">EmiChiko</StyledLink>
            </StyledCardText>
          </StyledCardBasic>
          {visibleNfts.length > 1 && (
            <StyledCard>
              <StyledCardTitle>EmiRoko Space Star</StyledCardTitle>
              <StyledCardText>
                Gives you: +10% on liquidity provision and + 20% to your farming rewards!
              </StyledCardText>
              <StyledCardText>
                APR LP 180% {'>'} <StyledCardTextBold>190%</StyledCardTextBold>
                <br />
                PR Farm 365% {'>'} <StyledCardTextBold>385%</StyledCardTextBold>
              </StyledCardText>
              <StyledCardText>
                Follow our guide how to provide liquidity with{' '}
                <StyledLink href="#">EmiRoko</StyledLink>
              </StyledCardText>
            </StyledCard>
          )}
        </StyledLevels>
        <ButtonPrimary onClick={handleClickPool}>Provide liquidity</ButtonPrimary>
        <div style={{ paddingBottom: 24 }}></div>
      </StyledContent>
    </StyledModal>
  );
}
