import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components/macro';
import { SwapPoolTabs, TabNames } from '../../components/NavigationTabs';

import AppBody from '../AppBody';
// FIXME Убрать комментарий для возврата функционала
// import { RadioGroup } from '../../base/ui/RadioGroup';
import Tabs from '../../base/ui/Tabs';
import { Contract } from '@ethersproject/contracts';
import { getFarmingContracts } from '../../utils';
import { useActiveWeb3React } from '../../hooks';
import FarmComponent from './FarmComponent';
import Button from '../../base/ui/Button';
import { useWalletModalToggle } from '../../state/application/hooks';
import getEswPriceInDai from './getEswPriceInDai';
// FIXME Убрать комментарий для возврата функционала
// import isLpToken from './isLpToken';
// import useFarming from '../../hooks/useFarming';

const StyledFarmingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    display: block;
  `};
`;
const StyledTabs = styled.div`
  ${({ theme }) => theme.mediaWidth.upToLarge`
    margin-bottom: 32px;
  `};
`;
const StyledInfoWrapper = styled.div`
  text-align: left;
  width: 50%;
  margin-bottom: 24px;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    width: auto;
  `};
`;
const StyledInfoTitle = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.white};
  margin-bottom: 16px;
`;
const StyledInfo = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.darkText};
`;

const Info = styled.div`
  color: ${({ theme }) => theme.darkWhite};
`;
// FIXME Убрать комментарий для возврата функционала
// const radioList = [
//   {
//     identifier: 'all',
//     value: 'All farms',
//   },
//   {
//     identifier: 'my',
//     value: 'My farming',
//   },
// ];

const tabItems = [
  {
    id: 'staking',
    title: 'Staking',
  },
  {
    id: 'farming',
    title: 'Farming',
  },
  // FIXME Убрать комментарий для возврата функционала
  // {
  //   id: 'nftfarming',
  //   title: 'NFT Farming',
  // },
  // {
  //   id: 'nftstaking',
  //   title: 'NFT Staking',
  // },
];

export const isStakingTab = tabname => tabname === tabItems[0].id;

export default function Farm() {
  // FIXME Убрать комментарий для возврата функционала
  // const [radioValue, setRadioValue] = useState<string>('all');
  const [selectedTab, setSelectedTab] = useState<string>('staking');
  const { library, account, chainId } = useActiveWeb3React();

  const farmingContracts: Contract[] = useMemo(
    () => getFarmingContracts(library, account, chainId),
    [library, account, chainId],
  );

  const toggleWalletModal = useWalletModalToggle();

  // @ts-ignore
  const desiredChainId = chainId

  // Get esw price in top level component to avoid needless contract requests
  const [eswPriceInDai, setEswPriceInDai] = useState('0');
  useEffect(() => {
    if (account && chainId === desiredChainId) {
      getEswPriceInDai(library, account, chainId).then(value => {
        setEswPriceInDai(value);
      });
    }
  }, [library, account, chainId, desiredChainId]);

  return (
    <>
      <AppBody>
        <SwapPoolTabs active={TabNames.FARM} />
        {account && chainId === desiredChainId && (
          <>
            <StyledFarmingHeader>
              <StyledTabs>
                <Tabs items={tabItems} selectedItemId={selectedTab} onChange={setSelectedTab} />
              </StyledTabs>
              {/* <RadioGroup buttonsList={radioList} groupName="farms" value={radioValue} onChange={setRadioValue} /> */}
            </StyledFarmingHeader>
            <StyledInfoWrapper>
              <StyledInfoTitle>
                {isStakingTab(selectedTab) ? 'Variable APR Staking' : 'Variable APR Farming'}
              </StyledInfoTitle>
              <StyledInfo>
                {isStakingTab(selectedTab)
                  ? 'Increase your profit from different tokens including ESW by staking them in our pools. No time limits let you stake your tokens as long as you wish and withdraw them at any time. Staking rewards are allocated to your EmiSwap account for every block.'
                  : 'Increase your profit from different LP tokens including ESW token pairs by farming them in our pools. No time limits let you farm your tokens as long as you wish and withdraw them at any time. Farming rewards are allocated to your EmiSwap account for every block.'}
              </StyledInfo>
            </StyledInfoWrapper>
            {farmingContracts.map(contract => (
              <FarmComponent
                key={contract.address}
                contract={contract}
                selectedTab={selectedTab}
                eswPriceInDai={eswPriceInDai}
              />
            ))}
          </>
        )}
        {!account && (
          <Info>
            Please connect your wallet to see all available farms and staking pools
            <br />
            <br />
            <Button onClick={toggleWalletModal}>Connect to a wallet</Button>
          </Info>
        )}
        {chainId !== desiredChainId && <Info>Please change network</Info>}
      </AppBody>
    </>
  );
}
