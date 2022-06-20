import React, { useEffect, useMemo, useState } from 'react';
import { SwapPoolTabs, TabNames } from '../../components/NavigationTabs';

import AppBody from '../AppBody';
import { useActiveWeb3React } from '../../hooks';
import LogoIcon from '../../assets/svg/logo-icon.svg';
import { useIsFarm365Active } from '../../hooks/Coins';
import { useHistory } from 'react-router-dom';
import Farm365Item from './Farm365Item';
import { Contract } from '@ethersproject/contracts';
import { getFarming365Contracts } from '../../utils';
import styled from 'styled-components/macro';
import Button from '../../base/ui/Button';
import { useWalletModalToggle } from '../../state/application/hooks';
import Tabs from '../../base/ui/Tabs';
import useNftData from '../../hooks/useNftData';

import infoIconSvg from '../../assets/svg/info-icon.svg';
import { MouseoverPopover } from '../../components/Popover';
import NftMiniPopoverContent from '../Landing/Components/NftMiniPopoverContent';
import { bottom } from '@popperjs/core/lib/enums';

const StyledTabs = styled.div`
  display: flex;
  justify-content: flex-start;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    margin-bottom: 32px;
  `};
`;

const StyledFarmingHeader = styled.div`
  display: flex;

  @media screen and (max-width: 769px) {
    display: block;
  }
`;

const StyledFarmingInfo = styled.div`
  margin: 16px 48px 32px 0;
  color: white;
  max-width: 500px;
  text-align: left;

  @media screen and (max-width: 769px) {
    margin: 16px 0 32px 0;
  }
`;

const StyledNftList = styled.div`
  display: flex;
  align-items: center;
  max-height: 124px;
  padding: 8px 12px;
  border: 1px solid #5b5763;
  border-radius: 8px;

  @media screen and (max-width: 769px) {
    display: block;
    max-height: 200px;
    margin-bottom: 32px;
    padding: 8px 4px;
  }
`;

const StyledNft = styled.div`
  display: flex;
  align-items: center;
  margin: 0 8px;
  padding: 12px 16px;
  border: 1px solid transparent;
  cursor: pointer;

  &:hover {
    background: #0e0f13;
    border-color: #494755;
    border-radius: 8px;
  }

  @media screen and (max-width: 769px) {
    padding: 8px 8px;
  }
`;

const StyledNftImg = styled.img`
  height: 100%;
  width: 100%;
  max-width: 50px;
  max-height: 50px;
`;

const StyledNftName = styled.div`
  margin: 0 16px;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
`;

const StyledNftInfoIcon = styled.img``;

const StyledInfo = styled.div`
  color: ${({ theme }) => theme.darkWhite};
`;

const filterItems: Array<{ id: 'active' | 'finished'; title: string }> = [
  {
    id: 'active',
    title: 'Active',
  },
  {
    id: 'finished',
    title: 'Finished',
  },
];

export default function Farm365() {
  // const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  const { library, account, chainId } = useActiveWeb3React();

  const isFarm365Active = useIsFarm365Active();

  const toggleWalletModal = useWalletModalToggle();

  const { nfts } = useNftData();

  // const [loading, setLoading] = useState<boolean>(Boolean(account) && false);
  const [selectedFilterTab, setSelectedFilterTab] = useState<'active' | 'finished'>('active');

  const farming365Contracts: Contract[] = useMemo(() => {
    if (!isFarm365Active) {
      return [];
    }
    return getFarming365Contracts(library, account, chainId);
  }, [library, account, chainId, isFarm365Active]);

  useEffect(() => {
    if (!isFarm365Active) {
      history.push(`swap`);
    }
  }, [isFarm365Active, history]);

  if (!isFarm365Active) {
    return (
      <div>
        <div>
          <img src={LogoIcon} alt="logo" />
        </div>
      </div>
    );
  }

  return (
    <>
      <AppBody>
        <SwapPoolTabs active={TabNames.FARM_365} />

        {account ? (
          <>
            <StyledTabs>
              <Tabs
                items={filterItems}
                selectedItemId={selectedFilterTab}
                onChange={setSelectedFilterTab as any}
              />
            </StyledTabs>
            <StyledFarmingHeader>
              <StyledFarmingInfo>
                Stake LP token in pair with ESW into the farming pools and win a 365% or 180% APR
                airdrop if LP includes EmiSwap token + Additional % AIR for Farming. Farming rewards
                are allocated to your EmiSwap account for every block.
              </StyledFarmingInfo>
              <StyledNftList>
                {nfts.map((nft, index) => (
                  <MouseoverPopover content={<NftMiniPopoverContent />} placement="bottom">
                    <StyledNft key={index.toString()}>
                      <StyledNftImg src={nft.img} />
                      <StyledNftName>{nft.name}</StyledNftName>
                      <StyledNftInfoIcon src={infoIconSvg} />
                    </StyledNft>
                  </MouseoverPopover>
                ))}
              </StyledNftList>
            </StyledFarmingHeader>

            {farming365Contracts.map(contract => (
              <Farm365Item
                key={contract.address}
                contract={contract}
                selectedFilterTab={selectedFilterTab}
              />
            ))}
          </>
        ) : (
          <>
            <StyledInfo>
              Please connect your wallet to see all available farms
              <br />
              <br />
              <Button onClick={toggleWalletModal}>Connect to a wallet</Button>
            </StyledInfo>
          </>
        )}
      </AppBody>
    </>
  );
}
