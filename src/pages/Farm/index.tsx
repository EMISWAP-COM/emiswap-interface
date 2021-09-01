import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components/macro';
import { SwapPoolTabs, TabNames } from '../../components/NavigationTabs';

import AppBody from '../AppBody';
// FIXME Убрать комментарий для возврата функционала
// import { RadioGroup } from '../../base/ui/RadioGroup';
import Tabs from '../../base/ui/Tabs';
import { Contract } from '@ethersproject/contracts';
import { getContract, getFarmingContracts } from '../../utils';
import { useActiveWeb3React } from '../../hooks';
import FarmComponent from './FarmComponent';
import Button from '../../base/ui/Button';
import { useWalletModalToggle } from '../../state/application/hooks';
import getEswPriceInDai from './getEswPriceInDai';
import Farm2Component from './Farm2Component';
import { loadFarms, loadUserFarms } from '../../state/farming/actions';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../state';
import { FARMING_2_ABI } from '../../constants/abis/farming2';
import LogoIcon from '../../assets/svg/logo-icon.svg';
import { useIsKuCoinActive } from '../../hooks/Coins';
import { useHistory } from 'react-router-dom';

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

const LoadingInfo = styled.div`
    min-height: 45vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    color: ${({ theme }) => theme.darkWhite};
`;

const tabItems = [
  {
    id: 'farming',
    title: 'Farming',
  },
  {
    id: 'staking',
    title: 'Staking',
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

export const isStakingTab = tabname => tabname === tabItems[1].id;

export default function Farm() {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  const { library, account, chainId } = useActiveWeb3React();
  const isKuCoinActive = useIsKuCoinActive();

  const { id: userId } = useSelector((state: AppState) => state.user.info);
  const farms2 = useSelector((state: AppState) => state.farming.farms);

  // FIXME Убрать комментарий для возврата функционала
  // const [radioValue, setRadioValue] = useState<string>('all');
  const [selectedTab, setSelectedTab] = useState<string>('farming');
  const [loading, setLoading] = useState<boolean>(Boolean(account));

  const farmingContracts: Contract[] = useMemo(
    () => getFarmingContracts(library, account, chainId),
    [library, account, chainId],
  );

  const farming2Contracts: Contract[] = useMemo(() => {
    return farms2.map((farm) => getContract(farm.contractAddress, FARMING_2_ABI, library, account));
  }, [library, account, farms2]);

  useEffect(() => {
    if (isKuCoinActive) {
      history.push(`swap`);
    }
  }, [isKuCoinActive, history]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, [selectedTab]);

  // Load farms list
  useEffect(() => {
    dispatch(loadFarms() as any);
  }, [dispatch, userId, account, chainId]);

  // This counter is used to update data every N seconds
  const [intervalUpdateCounter, setIntervalUpdateCounter] = useState<number>(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIntervalUpdateCounter(counter => ++counter);
    }, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Load user staking data
  useEffect(() => {
    if (userId) {
      dispatch(loadUserFarms(userId) as any);
    }
  }, [dispatch, userId, account, chainId, intervalUpdateCounter]);

  const toggleWalletModal = useWalletModalToggle();

  // @ts-ignore
  const desiredChainId = chainId;

  // Get esw price in top level component to avoid needless contract requests
  const [eswPriceInDai, setEswPriceInDai] = useState('0');
  useEffect(() => {
    if (account && chainId === desiredChainId) {
      getEswPriceInDai(library, account, chainId).then(value => {
        setEswPriceInDai(value);
      });
    }
  }, [library, account, chainId, desiredChainId]);

  if (isKuCoinActive) {
    return (
      <LoadingInfo>
        <div>
          <img src={LogoIcon} alt="logo"/>
        </div>
      </LoadingInfo>
    )
  }

  return (
    <>
      <AppBody>
        <SwapPoolTabs active={TabNames.FARM}/>

        {account && loading && (
          <LoadingInfo>
            <div>
              <img src={LogoIcon} alt="logo"/>
              <div style={{ width: '100%', marginTop: '30px' }}>
                We’re uploading the list of our awesome farming pools.<br/>
                It may take a few seconds 😉
              </div>
            </div>
          </LoadingInfo>
        )}

        {account && chainId === desiredChainId && farmingContracts?.length && !loading && (
          <>
            <StyledFarmingHeader>
              <StyledTabs>
                <Tabs items={tabItems} selectedItemId={selectedTab} onChange={setSelectedTab}/>
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

            <br/><br/>

            <StyledInfoWrapper>
              <StyledInfoTitle>
                {isStakingTab(selectedTab) ? 'Fixed APR Staking' : 'Fixed APR Farming'}
              </StyledInfoTitle>
              <StyledInfo>
                Stake coins for a limited period of time to boost your APR. Please not that you will not be able to
                withdraw staked coins before the end of the farming period. Farming rewards are allocated to your
                EmiSwap account every 30 seconds.
              </StyledInfo>
            </StyledInfoWrapper>
            {farming2Contracts.map(contract =>
              <Farm2Component
                key={contract.address}
                contract={contract}
                selectedTab={selectedTab}
                eswPriceInDai={eswPriceInDai}
              />,
            )}
          </>
        )}

        {!account && (
          <Info>
            Please connect your wallet to see all available farms and staking pools
            <br/>
            <br/>
            <Button onClick={toggleWalletModal}>Connect to a wallet</Button>
          </Info>
        )}

        {chainId !== desiredChainId && <Info>Please change network</Info>}
      </AppBody>
    </>
  );
}
