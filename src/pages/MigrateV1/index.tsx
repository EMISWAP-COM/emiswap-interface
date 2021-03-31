import React, { useContext, useMemo, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import AppBody from '../AppBody';
import { SwapPoolTabs } from '../../components/NavigationTabs';
import Column, { AutoColumn } from '../../components/Column';
import { StyledFixedSizeList, StyledMenuItem } from '../../components/SearchModal/styleds';
import { RowFixed } from '../../components/Row';
import { Text } from 'rebass';
import { ExternalLink } from '../../theme';
import { useHistory } from 'react-router-dom';
import { ButtonGreen } from '../../components/Button';
import DoubleCurrencyLogo from '../../components/DoubleLogo';
import { useLpTokens } from '../../hooks/useLpTokens';
import Loader from '../../components/Loader';
import { amountToString } from './utils';

const StyledSubTitle = styled.p`
  text-align: left;
  padding: 0.75rem;
  margin: 0;
`;

const StyledHr = styled.hr`
  width: 100%;
  background: #eaeeee;
  border: none;
  height: 1px;
`;

const StyledText = styled(Text)`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 40px;
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
    color: ${({ theme, selected }) => theme[selected ? 'green1' : 'grey1']};
  }
  color: ${({ theme, selected }) => theme[selected ? 'green1' : 'grey2']};
  transition: none;
  opacity: ${({ selected }) => (selected ? 'inherit' : 'none')};

  :hover {
    color: ${({ theme }) => theme.green1};
    .balance {
      color: ${({ theme }) => theme.green1};
    }
  }
`;

export default function MigrateV1() {
  const theme = useContext(ThemeContext);
  const history = useHistory();
  const [selected, setSelected] = useState(null);
  const { tokenList, tokens, balances, isLoading } = useLpTokens();
  const onSelect = (address: string) => {
    setSelected(address);
  };
  const formatedTokenList = tokenList.filter(el => {
    const {
      addresses: [address0, address1],
    } = el;
    return tokens.find(el => el.address === address0) && tokens.find(el => el.address === address1);
  });

  const handleRedirect = () => {
    history.push(`migrate/${selected}`);
  };

  const CurrencyRow = useMemo(() => {
    return ({ index, style }) => {
      const {
        addresses: [address0, address1],
        base,
      } = tokenList[index];
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
            <StyledText className="balance">{amountToString(balances[index])}</StyledText>
          </AutoColumn>
        </StyledMenuItemMigrate>
      );
    };
  }, [selected, tokenList, tokens, balances]);

  return (
    <>
      <AppBody>
        <SwapPoolTabs active={'migrate'} />
        <StyledSubTitle>You have</StyledSubTitle>
        <AutoColumn gap="lg" justify="center">
          {(!formatedTokenList.length && tokenList.length > 0) || isLoading ? (
            <WrapperLoader>
              <Loader size="100px" />
            </WrapperLoader>
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
              <ButtonGreen
                style={{ width: '100%', padding: '15px 16px' }}
                disabled={selected === null}
                onClick={handleRedirect}
              >
                <Text fontWeight={500} fontSize={16}>
                  Migrate
                </Text>
              </ButtonGreen>
            </>
          )}

          <StyledHr />
          <Text textAlign="center" fontSize={14} style={{ padding: '.5rem 0 .5rem 0' }}>
            {'Discover EmiSwap Crowdsale'}{' '}
            <ExternalLink
              id="import-pool-link"
              href="https://crowdsale.emidao.org/en"
              style={{ color: theme.green1, textDecoration: 'none' }}
            >
              {'Terms'}
            </ExternalLink>
          </Text>
        </AutoColumn>
      </AppBody>
    </>
  );
}
