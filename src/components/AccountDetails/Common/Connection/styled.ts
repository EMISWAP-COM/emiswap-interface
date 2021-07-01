import { darken } from 'polished';
import styled from 'styled-components/macro';

import Copy from '../../Copy';
import { WalletAction } from '../../styleds';
import { ExternalLink } from '../../../../theme';

export const Container = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.darkText};
  border: 1px solid ${({ theme }) => theme.darkGrey};
  border-radius: 12px;
  overflow: hidden;

  @media screen and (max-width: 1200px) {
    border-radius: 8px;
  }
`;

export const Main = styled.div`
  padding: 16px;

  @media screen and (max-width: 1200px) {
    padding: 16px;
  }
`;

export const DarkText = styled.span`
  color: ${({ theme }) => theme.white};
`;

export const Account = styled(DarkText)`
  font-size: 22px;
`;

export const WalletInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.white};
`;

export const Wallet = styled.div`
  display: flex;
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const BalanceWrapper = styled.div`
  display: grid;
  grid-gap: 12px;
  grid-template-columns: repeat(4, 1fr);

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 8px;
  }
`;

export const BalanceItem = styled.div`
  padding: 14px;
  border-radius: 4px;
  background: ${({ theme }) => theme.darkGrey};
`;

export const BalanceValue = styled(DarkText)`
  font-size: 16px;
  font-weight: 600;
`;

export const Options = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;

  @media screen and (max-width: 800px) {
    flex-direction: column-reverse;
    align-items: stretch;
  }
`;

export const ActionBtn = styled(WalletAction)`
  height: 32px;
`;

export const ChangeActionsBlock = styled.div`
  display: flex;

  @media screen and (max-width: 800px) {
    order: 2;
    width: 100%;
    margin: 8px 0 16px 0;
  }
`;

export const ChangeWalletBtn = styled(ActionBtn)`
  margin-left: 8px !important;
  background-color: ${({ theme }) => theme.purple} !important;
  border: 1px solid ${({ theme }) => theme.purple} !important;
  color: #ffffff;

  &:hover,
  &:focus,
  &:active {
    background: ${({ theme }) => theme.purple} !important;
    box-shadow: none;
  }

  @media screen and (max-width: 800px) {
    width: calc(50% - 5px);
    margin-left: auto;
  }
`;

export const CollectBtn = styled(ActionBtn)`
  min-width: 180px;
  margin-bottom: 10px;
`;

export const AccountControl = styled.div`
  display: flex;
  height: 53px;
  font-weight: 400;
  font-size: 1.25rem;
  background: ${({ theme }) => theme.darkGrey};

  a:hover {
    text-decoration: underline;
  }

  padding: 20px;

  @media screen and (max-width: 1200px) {
    padding: 16px;
  }

  button {
    padding: 0;

    span {
      margin-left: 0;
    }
  }
`;

export const AddressLink = styled(ExternalLink)`
  font-size: 0.825rem;
  color: ${({ theme }) => theme.blue};
  margin-left: 1rem;
  display: flex;
  :hover {
    color: ${({ theme }) => darken(0.3, theme.blue)};
  }

  & > span {
    margin-left: 4px;
  }
`;

export const Hr = styled.hr`
  height: 1px;
  border: none;
  margin: 16px 0;
  background: #615c69;
`;

export const StyledCopy = styled(Copy)`
  & > span {
    margin-left: 4px;
  }
`;
