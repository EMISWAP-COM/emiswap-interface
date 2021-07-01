import React, { useMemo, useState } from 'react';
import styled from 'styled-components/macro';
import { SwapPoolTabs, TabNames } from '../../components/NavigationTabs';

import AppBody from '../AppBody';
import { RadioGroup } from '../../base/ui/RadioGroup';
import Tabs from '../../base/ui/Tabs';
import { Contract } from '@ethersproject/contracts';
import { getFarmingContracts } from '../../utils';
import { useActiveWeb3React } from '../../hooks';
import FarmComponent from './FarmComponent';
import Button from '../../base/ui/Button';
import { useWalletModalToggle } from '../../state/application/hooks';

const StyledFarmingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: block;
  `};
`
const StyledTabs = styled.div`
  ${({ theme }) => theme.mediaWidth.upToMedium`
    margin-bottom: 32px;
  `};
`
const StyledInfoWrapper = styled.div`
  text-align: left;
  width: 50%;
  margin-bottom: 24px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    width: auto;
  `};
`
const StyledInfoTitle = styled.div`
  font-size: 16px;
  color: ${({theme}) => theme.white};
  margin-bottom: 16px;
`
const StyledInfo = styled.div`
  font-size: 16px;
  color: ${({theme}) => theme.darkText};
`

const radioList = [
  {
    identifier: 'all',
    value: 'All farms',
  },
  {
    identifier: 'my',
    value: 'My farming',
  },
];

const tabItems = [
  {
    id: 'staking',
    title: 'Staking',
  },
  {
    id: 'farming',
    title: 'Farming',
  },
  {
    id: 'nftfarming',
    title: 'NFT Farming',
  },
  {
    id: 'nftstaking',
    title: 'NFT Staking',
  },
];

export default function Farm() {
  const [radioValue, setRadioValue] = useState<string>('all');
  const [selectedTab, setSelectedTab] = useState<string>('staking');
  const { library, account } = useActiveWeb3React();

  const farmingContracts: Contract[] = useMemo(() => getFarmingContracts(library, account), [library, account]);

  const toggleWalletModal = useWalletModalToggle();

  return (
    <>
      <AppBody>
        <SwapPoolTabs active={TabNames.FARM} />
        {account && (
          <>
            <StyledFarmingHeader>
              <StyledTabs><Tabs items={tabItems} selectedItemId={selectedTab} onChange={setSelectedTab} /></StyledTabs>
              <RadioGroup buttonsList={radioList} groupName="farms" value={radioValue} onChange={setRadioValue} />
            </StyledFarmingHeader>
            <StyledInfoWrapper>
              <StyledInfoTitle>Variable APR Farms</StyledInfoTitle>
              <StyledInfo>
                Use these farms to increase your profit from different tokens, including ESW.
                No time limits let you stake tokens as long as you wish.
                Farming rewards are allocated to your EmiSwap account for every block.
              </StyledInfo>
            </StyledInfoWrapper>
            {farmingContracts.map((contract) => <FarmComponent key={contract.address} contract={contract} />)}
          </>
        )}
        {!account && (
          <>
            Please connect your wallet to see all available farms and staking pools
            <br/><br/>
            <Button onClick={toggleWalletModal}>Connect to a wallet</Button>
          </>
        )}
      </AppBody>
    </>
  );
}
