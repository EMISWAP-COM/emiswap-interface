import React from 'react';
import styled from 'styled-components/macro';
import { useActiveWeb3React } from '../../hooks';
import { ButtonPrimary } from '../Button';
import { useHistory } from 'react-router';
import { INft } from '../../hooks/useNftData';

const StyledContent = styled.div`
  width: 367px;
  padding: 32px 32px 32px 32px;
  // border: 1px solid rgba(255, 255, 255, 0.24);
  white-space: normal;
  // background: rgba(0, 0, 0, 0.25);
  // backdrop-filter: blur(48px);
`;

const StyledNftImg = styled.img`
  display: block;
  width: 170px;
  margin: 0 auto 24px auto;
`;

const StyledTitle = styled.div`
  margin-bottom: 8px;
  text-align: left;
  font-weight: 400;
  font-size: 24px;
  line-height: 38px;
  color: white;
`;

const StyledText = styled.div`
  margin-bottom: 8px;
  text-align: left;
  font-weight: 400;
  font-size: 14px;
  line-height: 30px;
  color: #898889;
`;

interface Props {
  nft: INft;
}

export default function NftPopoverContent({ nft }: Props) {
  const history = useHistory();

  const { chainId } = useActiveWeb3React();

  const handleClickPool = () => {
    history.push('/pool');
  };

  return (
    <StyledContent>
      <StyledNftImg src={nft.imgBig} />
      <StyledTitle>To get your extended APRs follow 2 easy steps</StyledTitle>
      <StyledText>
        Put liquidity in Pool c ESP and get an LP token (example: LP / W) - get 180% per annum + a
        NET bonus
      </StyledText>

      <ButtonPrimary onClick={handleClickPool}>Provide liquidity</ButtonPrimary>
    </StyledContent>
  );
}
