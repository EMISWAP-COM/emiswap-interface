import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { TableHeader, TabProps, Tabs } from '../PurchaseHistory';
import { Contract } from '@ethersproject/contracts';
import { getContract, getMyFarmingContracts } from '../../../../utils';
import { useActiveWeb3React } from '../../../../hooks';
import FarmingTableRow from './FarmingTableRow';
import Farming2TableRow from './Farming2TableRow';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../../../state';
import { loadFarms, loadUserFarms, loadUserFarmsForLK } from '../../../../state/farming/actions';
import { FARMING_2_ABI } from '../../../../constants/abis/farming2';

const TableInfo = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.darkText};
  margin-bottom: 24px;
`;

const Table = styled.div`
  color: ${({ theme }) => theme.white};
  max-height: 138px;
  align-items: center;
  overflow-y: auto;

  @media screen and (max-width: 1200px) {
    max-height: 310px;
    background: none;
    margin-top: 10px;
  }
`;

export const TableRow = styled.div`
  height: 46px;
  display: flex;
  border-radius: 3px;
  font-size: 12px;
  align-items: center;
  padding: 0 1rem;
  border-bottom: ${({ theme }) => `1px solid ${theme.grey1}`};

  @media screen and (max-width: 1200px) {
    flex-direction: column;
    height: auto;
    margin-bottom: 8px;
    padding: 0 0 8px 0;
  }
`;

const TableTitles = styled(TableRow)`
  position: sticky;
  top: 0;
  padding: 0 1rem;
  background: ${({ theme }) => theme.darkGrey};
  height: 30px;
  border-bottom: none;

  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

export const LevelWrapper = styled.div<{ flex?: number }>`
  display: flex;
  justify-content: flex-start;
  flex: ${({ flex }) => flex || 1};
  width: auto;

  @media screen and (max-width: 1200px) {
    justify-content: flex-end;
  }
`;

const NoContent = styled.div`
  width: 100%;
  text-align: center;
  @media screen and (max-width: 1200px) {
    font-weight: 500;
    font-size: 0.75rem;
  }
`;

const FarmingRewards = () => {
  const { library, account, chainId } = useActiveWeb3React();
  const [myFarmingContracts, setMyFarmingContracts] = useState<Contract[]>([]);
  useEffect(() => {
    getMyFarmingContracts(library, account).then(contracts => {
      setMyFarmingContracts(contracts);
    });
  }, [library, account]);

  const [selectedTab, setSelectedTab] = useState<string>('variable');

  const tabs: Record<string, TabProps> = {
    airdrops: { value: 'fixed', label: 'Fixed APR' },
    x10: { value: 'variable', label: 'Variable APR Farms' },
  };
  const tabsValues = Object.values(tabs);

  const dispatch = useDispatch<AppDispatch>();
  const { id: userId } = useSelector((state: AppState) => state.user.info);

  useEffect(() => {
    dispatch(loadFarms() as any);
    if (userId) {
      dispatch(loadUserFarms(userId) as any);
      dispatch(loadUserFarmsForLK(userId) as any);
    }
  }, [dispatch, userId, chainId, account]);

  const farm2Stakes = useSelector((state: AppState) => state.farming.stakes);

  return (
    <>
      <TableHeader>
        Your Farming Rewards
        <Tabs tabs={tabsValues} value={selectedTab} onChange={setSelectedTab} />
      </TableHeader>
      <TableInfo>
        {selectedTab === 'fixed' && 'Each line represents one stake'}
        {selectedTab === 'variable' && 'Each line represents your performance in one staking or farming pool'}
      </TableInfo>
      {selectedTab === 'fixed' && (
        <Table>
          <TableTitles>
            <LevelWrapper>Farm</LevelWrapper>
            <LevelWrapper>Lock period</LevelWrapper>
            <LevelWrapper flex={2}>Timestamp</LevelWrapper>
            <LevelWrapper flex={2}>Staked amount</LevelWrapper>
            <LevelWrapper>Fixed APR</LevelWrapper>
            <LevelWrapper flex={2}>Reward in ESW</LevelWrapper>
            <LevelWrapper>Reward in</LevelWrapper>
          </TableTitles>
          {farm2Stakes.map(stake => {
            const contract = getContract(stake.contractAddress, FARMING_2_ABI, library, account);
            return <Farming2TableRow key={stake.id} contract={contract} stakeData={stake} />;
          })}
          {!farm2Stakes.length && (
            <TableRow>
              <NoContent>No content</NoContent>
            </TableRow>
          )}
        </Table>
      )}
      {selectedTab === 'variable' && (
        <Table>
          <TableTitles>
            <LevelWrapper>Farm</LevelWrapper>
            <LevelWrapper flex={2}>Reward in ESW</LevelWrapper>
            <LevelWrapper flex={2}>Block reward in ESW</LevelWrapper>
            <LevelWrapper flex={2}>Farm TVL in DAI</LevelWrapper>
            <LevelWrapper>Your share</LevelWrapper>
          </TableTitles>
          {myFarmingContracts.map(contract => (
            <FarmingTableRow key={contract.address} contract={contract} />
          ))}
          {!myFarmingContracts.length && (
            <TableRow>
              <NoContent>No content</NoContent>
            </TableRow>
          )}
        </Table>
      )}
    </>
  );
};

export default FarmingRewards;
