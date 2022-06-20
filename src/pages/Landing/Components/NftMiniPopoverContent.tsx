import React from 'react';
import styled from 'styled-components/macro';
import { useActiveWeb3React } from '../../../hooks';

import nftPurpleBigPng from '../../../assets/images/nft-purple-big.png';
import { useHistory } from 'react-router';

const StyledContent = styled.div`
  width: 320px;
  padding: 32px 32px 32px 32px;
`;

const StyledNftImg = styled.img`
  display: block;
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

interface Props {}

export default function NftMiniPopoverContent({}: Props) {
  const history = useHistory();

  const { chainId } = useActiveWeb3React();

  return (
    <StyledContent>
      <StyledNftImg src={nftPurpleBigPng} />
      <StyledText>
        LP 180 -&gt; 185% (+5% APR)
        <br />
        Farm 365 -&gt; 375% (+10% APR)
        <br />
      </StyledText>
    </StyledContent>
  );
}
