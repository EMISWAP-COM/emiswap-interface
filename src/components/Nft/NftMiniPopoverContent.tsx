import React from 'react';
import styled from 'styled-components/macro';
import { useActiveWeb3React } from '../../hooks';
import { useHistory } from 'react-router';
import { INft } from '../../hooks/useNftData';

const StyledContent = styled.div`
  width: 320px;
  padding: 32px 32px 32px 32px;
`;

const StyledNftImg = styled.img`
  display: block;
  width: 171px;
  margin: 0 auto 16px auto;
`;

const StyledText = styled.div`
  margin-bottom: 8px;
  text-align: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 28px;
  color: #898889;
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
      <StyledText>
        LP 180 -&gt; 185% (+5% APR)
        <br />
        Farm 365 -&gt; 375% (+10% APR)
        <br />
      </StyledText>
    </StyledContent>
  );
}
