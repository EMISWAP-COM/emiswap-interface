import styled from 'styled-components/macro';
import { Header } from '../../../../styleds';

export const Wrapper = styled.div``;

export const FlexBetween = styled.div`
  margin-top: 36px;
  display: flex;
  position: relative;
  justify-content: space-between;
  @media screen and (max-width: 800px) {
    display: block;
    margin-top: 24px;
  }
`;

export const TableWrapper = styled.div<{ desktopMaxHeight?: number }>`
  color: ${({ theme }) => theme.white};
  align-items: center;
  max-height: 138px;
  overflow-y: auto;

  @media screen and (max-width: 1200px) {
    max-height: ${p => p.desktopMaxHeight ?? 310}px;
    background: none;
    margin-top: 10px;
  }
`;

export const TableHeader = styled(Header)<{ marginTop?: number; marginBottom?: number }>`
  margin-top: ${({ marginTop }) => (marginTop ?? 0) + 'px'};
  margin-bottom: ${({ marginBottom }) => (marginBottom ?? 24) + 'px'};

  @media screen and (max-width: 1200px) {
    margin-bottom: 0;
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

export const TableTitles = styled(TableRow)`
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

export const StyledCell = styled.div<{ flex?: number }>`
  flex: ${({ flex }) => flex || 1};

  @media screen and (max-width: 1200px) {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    height: 34px;
    padding: 0.5rem 1rem;

    &:nth-child(2n) {
      background: ${({ theme }) => theme.darkGrey};
    }
  }
`;

export const NoContent = styled.div`
  width: 100%;
  text-align: center;
  @media screen and (max-width: 1200px) {
    font-weight: 500;
    font-size: 0.75rem;
  }
`;

export const DateField = styled.div`
  flex: 1;
  width: auto;

  @media screen and (max-width: 1200px) {
    position: relative;
    left: -1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text1};
  }
`;

export const Label = styled.span`
  display: none;

  @media screen and (max-width: 1200px) {
    display: flex;
  }
`;

export const LevelWrapperLabeled = styled.div<{ flex?: number }>`
  display: flex;
  justify-content: flex-start;
  flex: ${({ flex }) => flex || 1};
  width: auto;

  @media screen and (max-width: 1200px) {
    justify-content: flex-end;
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

export const PoolCostWrapper = styled(LevelWrapper)<{ tabActive: string }>`
  justify-content: ${({ tabActive }) => (tabActive === '10x' ? 'center' : 'flex-start')};

  @media screen and (max-width: 1200px) {
    justify-content: flex-end;
  }
`;

export const Cost = styled.div`
  font-size: 0.8rem;

  @media screen and (max-width: 1200px) {
    min-width: auto;
  }

  span {
    font-weight: 600;
    color: ${({ theme }) => theme.white};
  }
`;

export const Wallet = styled.div`
  flex: 1;
  width: auto;
  color: ${({ theme }) => theme.white};

  @media screen and (max-width: 1200px) {
    font-weight: 500;
    font-size: 0.75rem;
    margin-left: 0;
  }
`;

export const BonusName = styled.span`
  text-overflow: ellipsis;
`;
