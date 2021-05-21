import React, { useContext, useMemo, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import AppBody from '../AppBody';
import { SwapPoolTabs, TabNames } from '../../components/NavigationTabs';
import Column, { AutoColumn } from '../../components/Column';
import { StyledFixedSizeList, StyledMenuItem } from '../../components/SearchModal/styleds';
import { RowFixed } from '../../components/Row';
import { Text } from 'rebass';
import { ExternalLink, TYPE } from '../../theme';
import { useHistory } from 'react-router-dom';
import { ButtonPrimary, ButtonLight } from '../../components/Button';
import DoubleCurrencyLogo from '../../components/DoubleLogo';
import { useLpTokens } from '../../hooks/useLpTokens';
import Loader from '../../components/Loader';
import { amountToString } from './utils';
import { useActiveWeb3React } from '../../hooks';
import { useWalletModalToggle } from '../../state/application/hooks';
import { formatConnectorName } from '../../components/AccountDetails/uitls'

const StyledSubTitle = styled.p`
  color: ${({ theme }) => theme.white};
  text-align: left;
  padding: 0.75rem;
  margin: 0;
  @media screen and (max-width: 375px) {
    padding: 0.75rem 0;
  }
`;

const StyledHr = styled.hr`
  width: 100%;
  background: ${({ theme }) => theme.lightGrey};
  border: none;
  height: 1px;
`;

const StyledText = styled(Text)`
  font-family: IBM Plex Arabic;
  font-style: normal;
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 40px;
  @media screen and (max-width: 375px) {
    font-size: 1rem;
  }
`;

const WrapperLoader = styled.div`
  height: 300px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledMenuItemMigrate = styled(StyledMenuItem)<{ selected?: boolean }>`
  .balance {
    color: ${({ theme, selected }) => theme[selected ? 'purple' : 'white']};
  }
  color: ${({ theme, selected }) => theme[selected ? 'purple' : 'white']};
  transition: none;
  opacity: ${({ selected }) => (selected ? 'inherit' : 'none')};

  :hover {
    color: ${({ theme }) => theme.purple};
    .balance {
      color: ${({ theme }) => theme.purple};
    }
  }
  @media screen and (max-width: 375px) {
    .double-logo {
      display: none;
    }
    display: flex;
    justify-content: space-between;
    padding: 0;
  }
`;

export default function MigrateV1() {
  const theme = useContext(ThemeContext);
  const { account, connector } = useActiveWeb3React();
  const history = useHistory();
  const toggleWalletModal = useWalletModalToggle();
  const [selected, setSelected] = useState(null);
  const { lpTokensDetailedInfo, tokens, balances, isLoading } = useLpTokens();
  const onSelect = (address: string) => {
    setSelected(address);
  };
  const formatedTokenList = lpTokensDetailedInfo
    .map((lpTokenDetailedInfo, idx) => ({ ...lpTokenDetailedInfo, balance: balances[idx] }))
    .filter((lpTokenDetailedInfoWithBalance, idx) => {
      const {
        addresses: [address0, address1],
      } = lpTokenDetailedInfoWithBalance;
      return (
        tokens.find(token => token.address === address0) &&
        tokens.find(token => token.address === address1) &&
        +amountToString(balances[idx], 10)
      );
    });
  const handleRedirect = () => {
    history.push(`migrate/${selected}`);
  };

  const CurrencyRow = useMemo(() => {
    return ({ index, style }) => {
      const {
        addresses: [address0, address1],
        base,
        balance,
      } = formatedTokenList[index];
      const token0 = tokens.find(el => el.address === address0);
      const token1 = tokens.find(el => el.address === address1);
      return (
        <StyledMenuItemMigrate
          style={{ ...style, width: '100%' }}
          onClick={() => onSelect(base)}
          selected={selected === base}
        >
          <RowFixed>
            <DoubleCurrencyLogo
              currency0={token0}
              currency1={token1}
              margin={true}
              size={22}
              additionalMargin={8}
            />
            <Column>
              <StyledText>{`${token0.symbol} - ${token1.symbol}`}</StyledText>
            </Column>
          </RowFixed>
          <AutoColumn>
            <StyledText className="balance">{amountToString(balance, 10)}</StyledText>
          </AutoColumn>
        </StyledMenuItemMigrate>
      );
    };
  }, [selected, tokens, formatedTokenList]);

  const isMetaMask = formatConnectorName(connector) === 'MetaMask'

  const isShowLoader = (
    !formatedTokenList.length
    && lpTokensDetailedInfo.length
    && balances.every(balance => balance === undefined)
  ) || isLoading;

  const isTokensNotFound = balances.every(balance => {
    return +amountToString(balance, 10) === 0;
  });

  return (
    <>
      <AppBody>
        <SwapPoolTabs active={TabNames.MIGRATE}/>
          {account && isMetaMask && <StyledSubTitle>You have</StyledSubTitle>}
          <AutoColumn gap="lg" justify="center">
            {!account ? (
              <ButtonLight onClick={toggleWalletModal}>Connect Wallet</ButtonLight>
            ) : !isMetaMask ? (
              <>
                <StyledSubTitle>Functionality of Liquidity migration is supported only with the MetaMask Wallet.
                  Please use this wallet to enjoy this opportunity.
                </StyledSubTitle>
                <ButtonPrimary
                  style={{ width: '100%', padding: '15px 16px' }}
                  disabled
                >
                  <Text fontWeight={500} fontSize={16}>
                    Migrate
                  </Text>
                </ButtonPrimary>
              </>
              ) : isShowLoader ? (
              <>
                <WrapperLoader>
                  <Loader size="100px"/>
                </WrapperLoader>
              </>
            ) : isTokensNotFound ? (
              <TYPE.body>No LP tokens found</TYPE.body>
            ) : (
              <>
                <StyledFixedSizeList
                  width="auto"
                  height={300}
                  itemCount={formatedTokenList.length}
                  itemSize={50}
                  style={{ width: '100%', margin: '0 30px' }}
                >
                  {CurrencyRow}
                </StyledFixedSizeList>
                <ButtonPrimary
                  style={{ width: '100%', padding: '15px 16px' }}
                  disabled={selected === null}
                  onClick={handleRedirect}
                >
                  <Text fontWeight={500} fontSize={16}>
                    Migrate
                  </Text>
                </ButtonPrimary>
              </>
            )}

            <StyledHr/>
            <Text color={theme.darkText} textAlign="center" fontSize={14} style={{ padding: '.5rem 0 .5rem 0' }}>
              {'Discover EmiSwap Crowdsale'}{' '}
              <ExternalLink
                id="import-pool-link"
                href="https://crowdsale.emidao.org/en"
                style={{ color: theme.blue, textDecoration: 'none' }}
              >
                {'Terms'}
              </ExternalLink>
            </Text>
          </AutoColumn>
      </AppBody>
    </>
  );
}
