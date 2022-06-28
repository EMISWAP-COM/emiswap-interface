import styled from 'styled-components/macro';
import React from 'react';
import NftList from './NftList';

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

export default function NftListWrap({ children, size = 30 }: Props) {
  return (
    <StyledWrap>
      <StyledContent>{children}</StyledContent>
      <StyledNftListContainer size={size}>
        <NftList size={size} />
      </StyledNftListContainer>
    </StyledWrap>
  );
}
