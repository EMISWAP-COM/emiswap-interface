import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { TableHeader } from '../PurchaseHistory';
import { Contract } from '@ethersproject/contracts';
import { getMyFarmingContracts } from '../../../../utils';
import { useActiveWeb3React } from '../../../../hooks';
import FarmingTableRow from './FarmingTableRow';

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
  const { library, account } = useActiveWeb3React();
  const [myFarmingContracts, setMyFarmingContracts] = useState<Contract[]>([]);
  useEffect(() => {
    getMyFarmingContracts(library, account).then((contracts) => {
      setMyFarmingContracts(contracts);
    });
  }, [library, account])


  return (
    <>
      <TableHeader>Your Farming Rewards</TableHeader>
      <TableInfo>Each line represents your performance in one staking or farming pool</TableInfo>
      <Table>
        <TableTitles>
          <LevelWrapper>Farm</LevelWrapper>
          <LevelWrapper>Timestamp</LevelWrapper>
          <LevelWrapper flex={2}>Reward in ESW</LevelWrapper>
          <LevelWrapper flex={2}>Block reward in ESW</LevelWrapper>
          <LevelWrapper flex={2}>Farm TVL in DAI</LevelWrapper>
          <LevelWrapper>Your share</LevelWrapper>
        </TableTitles>
        {myFarmingContracts.map((contract) => <FarmingTableRow key={contract.address} contract={contract} />)}
        {!myFarmingContracts.length && (
          <TableRow>
            <NoContent>No content</NoContent>
          </TableRow>
        )}
      </Table>
    </>
  );
};

export default FarmingRewards;
