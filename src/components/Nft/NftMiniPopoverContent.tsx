import React from 'react';
import styled from 'styled-components/macro';
import { useActiveWeb3React } from '../../hooks';
import { useHistory } from 'react-router';
import { INft } from '../../hooks/useNftData';

const StyledContent = styled.div`
  width: 320px;
  padding: 24px 32px 24px 32px;
`;

const StyledNftImg = styled.img`
  display: block;
  width: 120px;
  margin: 0 auto 24px auto;
`;

const StyledCardTitle = styled.div`
  margin-bottom: 16px;
  text-align: center;
  font-weight: 400;
  font-size: 20px;
  line-height: 1.4px;
  color: white;
`;

const StyledCardText = styled.div`
  max-width: 240px;
  margin-top: 24px;
  text-align: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 30px;
  color: #b6b6b7;
`;

const StyledCardTextBold = styled.b`
  font-size: 16px;
  font-weight: 500;
  color: white;
`;

const StyledLink = styled.a`
  color: #e478ff !important;
`;

interface Props {
  nft: INft;
}

export default function NftMiniPopoverContent({ nft }: Props) {
  const history = useHistory();

  const { chainId } = useActiveWeb3React();

  return (
    <StyledContent>
      <StyledNftImg src={nft.imgBig} />

      {nft.type === 'basic' && (
        <>
          <StyledCardTitle>EmiRoko Space Star</StyledCardTitle>
          <StyledCardText>
            Gives you: +5% on liquidity provision and + 10% to your farming rewards!
          </StyledCardText>
          <StyledCardText>
            APR LP 180% {'>'} <StyledCardTextBold>185%</StyledCardTextBold>
            <br />
            PR Farm 365% {'>'} <StyledCardTextBold>375%</StyledCardTextBold>
          </StyledCardText>
          <StyledCardText>
            Follow our guide how to provide liquidity with <StyledLink href="#">EmiRoko</StyledLink>
          </StyledCardText>
        </>
      )}

      {nft.type === 'top' && (
        <>
          <StyledCardTitle>EmiChiko Space Star</StyledCardTitle>
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
            <StyledLink href="#">EmiChiko</StyledLink>
          </StyledCardText>
        </>
      )}
    </StyledContent>
  );
}
