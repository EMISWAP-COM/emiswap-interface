import React from 'react';
import styled from 'styled-components/macro';
import { useActiveWeb3React } from '../../../hooks';

import nftPurpleBigPng from '../../../assets/images/nft-purple-big.png';
import { ButtonPrimary } from '../../../components/Button';
import { useHistory } from 'react-router';

const StyledContent = styled.div`
  width: 367px;
  padding: 32px 32px 32px 32px;
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

const StyledText = styled.div`
  margin-bottom: 8px;
  text-align: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 28px;
  color: #898889;
`;

interface Props {}

export default function NftPopoverContent({}: Props) {
  const history = useHistory();

  const { chainId } = useActiveWeb3React();

  return (
    <StyledContent>
      <StyledNftImg src={nftPurpleBigPng} />
      <StyledTitle>To get your extended APRs follow 2 easy steps</StyledTitle>
      <StyledText>
        Put liquidity in Pool c ESP and get an LP token (example: LP / W) - get 180% per annum + a
        NET bonus
      </StyledText>

      <ButtonPrimary onClick={() => history.push('/pool')}>Provide liquidity</ButtonPrimary>
    </StyledContent>
  );
}
