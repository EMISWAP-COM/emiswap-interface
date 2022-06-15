import styled from 'styled-components/macro';
import React from 'react';
import NftList from './index';

const StyledWrap = styled.div`
  display: flex;
  align-items: center;
`;

const StyledContent = styled.div``;

const StyledNftListContainer = styled.div`
  width: 100%;
  margin: 0 4px;
`;

interface Props {
  children: any;
  size?: number;
}

export default function NftListWrap({ children, size = 30 }: Props) {
  return (
    <StyledWrap>
      <StyledContent>{children}</StyledContent>
      <StyledNftListContainer>
        <NftList size={size} />
      </StyledNftListContainer>
    </StyledWrap>
  );
}
