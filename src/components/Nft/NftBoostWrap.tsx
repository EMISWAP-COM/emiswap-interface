import styled from 'styled-components/macro';
import React from 'react';
import NftBoostSvg from '../../assets/svg/nft-boost.svg';
import useNftData from '../../hooks/useNftData';

const StyledWrap = styled.div`
  display: flex;
  align-items: center;
`;

const StyledContent = styled.div``;

const StyledNftBoost = styled.div<{ size?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 40px;
  height: 22px;
  padding: 0 8px;
  margin-left: 4px;
  border: 2px solid #f5841f;
  border-radius: 14px;
  font-weight: 500;
  font-size: 10px;
  line-height: 10px;
  color: white;
`;

const StyledNftBoostImg = styled.img`
  width: 7px;
  height: 10px;
  margin-right: 4px;
`;

interface Props {
  text: string;
  children: any;
  size?: number;
  visible?: boolean;
}

export default function NftBoostWrap({ text, children, size = 30, visible = false }: Props) {
  const { nfts } = useNftData();

  return (
    <StyledWrap>
      <StyledContent>{children}</StyledContent>
      {(Boolean(nfts?.length) || visible) && (
        <StyledNftBoost>
          <StyledNftBoostImg src={NftBoostSvg} />
          {text}
        </StyledNftBoost>
      )}
    </StyledWrap>
  );
}
