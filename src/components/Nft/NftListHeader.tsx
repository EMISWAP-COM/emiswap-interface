import styled from 'styled-components/macro';
import React, { useState } from 'react';
import { ReactComponent as DropDown } from '../../assets/images/dropdown.svg';
import { MouseoverPopover } from '../Popover';
import NftPopoverContent from './NftPopoverContent';
import useNftData from '../../hooks/useNftData';
import NftLevelsModal from './NftLevelsModal';

const StyledNftList = styled.div`
  display: flex;
  align-items: center;
  max-width: 200px;
  margin: 0 32px 0 4px;
  padding: 12px 8px;
  border: 1px solid #1f1f1f;
  border-radius: 142px;

  @media screen and (max-width: 980px) {
    position: absolute;
    top: 24px;
    right: 72px;
    max-width: 84px;
    margin: 0;
  }
`;

const StyledNftImg = styled.img`
  display: block;
  margin: 0 7px;
  width: 100%;
  height: 100%;
  max-height: 24px;
  max-width: 24px;
  cursor: pointer;

  @media screen and (max-width: 980px) {
    max-height: 28px;
    max-width: 28px;
  }
`;

export const StyledNftDropDown = styled(DropDown)`
  margin: 0 0.25rem 0 0.5rem;
  height: 35%;

  path {
    stroke: ${({ theme }) => theme.white};
    stroke-width: 1.5px;
  }
`;

interface Props {}

export default function NftListHeader({}: Props) {
  const { nfts } = useNftData();

  const [nftModalVisible, setNftModalVisible] = useState(false);

  console.log(nfts);

  return (
    <>
      <StyledNftList>
        {nfts.map((nft, index) => (
          <MouseoverPopover content={<NftPopoverContent nft={nft} />}>
            <StyledNftImg
              key={index.toString()}
              src={nft.img}
              onClick={() => setNftModalVisible(true)}
            />
          </MouseoverPopover>
        ))}
      </StyledNftList>
      <NftLevelsModal isOpen={nftModalVisible} onClose={() => setNftModalVisible(false)} />
    </>
  );
}
