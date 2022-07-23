import styled, { css } from 'styled-components/macro';
import React, { useState } from 'react';
import useNftData from '../../hooks/useNftData';
import NftLevelsModal from './NftLevelsModal';
import Button from '../../base/ui/Button';
import { isMobile } from 'react-device-detect';

export const StyledNftButton = styled(Button)<{ appHeader?: boolean }>`
  width: 127px;
  height: 40px;
  margin-right: 24px;
  border: 1px solid #ff7223;
  border-radius: 4px;
  // font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  background: #ff7223;
  box-shadow: 0px 0px 30px #ff7223;

  @media screen and (max-width: 980px) {
    position: absolute;
    top: 20px;
    right: 80px;
    max-width: 84px;
    margin: 0;
    font-size: 12px;

    ${({ appHeader }) =>
      appHeader &&
      css`
        top: 25px;
        margin-top: 1px;
        right: 120px;
        max-width: 48px;
      `}
  }
`;

interface Props {
  appHeader?: boolean;
}

export default function NftHeaderButton({ appHeader = false }: Props) {
  const { nfts } = useNftData();

  const [nftModalVisible, setNftModalVisible] = useState(false);

  if (!nfts?.length) {
    return null;
  }

  return (
    <>
      <StyledNftButton appHeader={true} onClick={() => setNftModalVisible(true)}>
        {isMobile && appHeader ? 'NFT' : 'NFT BOOST'}
      </StyledNftButton>
      <NftLevelsModal isOpen={nftModalVisible} onClose={() => setNftModalVisible(false)} />
    </>
  );
}
