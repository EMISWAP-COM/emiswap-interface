import styled from 'styled-components/macro';
import React from 'react';
import useNftData from '../../hooks/useNftData';

const StyledNftList = styled.div`
  display: flex;
  align-items: center;
  max-width: 200px;
  margin: 0 32px 0 4px;

  @media screen and (max-width: 980px) {
    position: absolute;
    top: 24px;
    right: 72px;
    max-width: 84px;
    margin: 0;
  }
`;

const StyledNftImg = styled.img<{ size: number }>`
  display: block;
  margin: 0 ${({ size }) => (size || 30) / 7}px;
  width: 100%;
  height: 100%;
  max-height: ${({ size }) => size || 30}px;
  max-width: ${({ size }) => size || 30}px;
  cursor: pointer;

  @media screen and (max-width: 980px) {
    max-height: 28px;
    max-width: 28px;
  }
`;

interface Props {
  size?: number;
}

export default function NftList({ size = 30 }: Props) {
  const { nfts } = useNftData();

  return (
    <StyledNftList>
      {nfts.map((nft, index) => (
        <StyledNftImg key={index.toString()} src={nft.img} size={size} />
      ))}
    </StyledNftList>
  );
}
