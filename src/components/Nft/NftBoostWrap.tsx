import styled from 'styled-components/macro';
import React from 'react';
import { TextLabel } from '../NavigationTabs';

const StyledWrap = styled.div`
  display: flex;
  align-items: center;
`;

const StyledContent = styled.div``;

const StyledNftListContainer = styled.div<{ size: number }>`
  width: 100%;
  margin: 0 ${({ size }) => (size || 30) / 7}px;
`;

interface Props {
  children: any;
  size?: number;
}

export default function NftBoost({ children, size = 30 }: Props) {
  return (
    <StyledWrap>
      <StyledContent>{children}</StyledContent>
      <TextLabel>NFT Boost</TextLabel>
    </StyledWrap>
  );
}
