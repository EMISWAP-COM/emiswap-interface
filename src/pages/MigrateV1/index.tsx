import React, { useContext, useMemo, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import WarningBlock, { StyledButton } from '../../components/Warning/WarningBlock';
import AppBody from '../AppBody';
import { SwapPoolTabs } from '../../components/NavigationTabs';
import Column, { AutoColumn } from '../../components/Column';
import { StyledFixedSizeList, StyledMenuItem } from '../../components/SearchModal/styleds';
import { RowFixed } from '../../components/Row';
import { Text } from 'rebass';
import { ExternalLink } from '../../theme';
import { useHistory } from 'react-router-dom';
import { ButtonGreen } from '../../components/Button';
import { useVampContract } from '../../hooks/useContract';
import DoubleCurrencyLogo from '../../components/DoubleLogo';
import { useLpTokens } from '../../hooks/useLpTokens';

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

const StyledMenuItemMigrate = styled(StyledMenuItem)`
  .balance {
    color: ${({ theme }) => theme.grey1};
    transition: all 0.3s ease-in-out;
  }
  :hover {
    .balance {
      color: ${({ theme }) => theme.green1};
    }
  }
`;

export default function MigrateV1() {
  const theme = useContext(ThemeContext);
  const history = useHistory();
  const [selected, setSelected] = useState(null);
  const contract = useVampContract();
  const { tokenList, tokens, balances, lpTokensInfo } = useLpTokens(contract);
  const onSelect = (idx: number) => {
    setSelected(idx);
  };

  const handleRedirect = () => {
    history.push(`migrate/${lpTokensInfo[selected]}`);
  };

  const CurrencyRow = useMemo(() => {
    return ({ index, style }) => {
      const [address0, address1] = tokenList[index];
      const token0 = tokens.find(el => el.address === address0);
      const token1 = tokens.find(el => el.address === address1);
      return (
        <StyledMenuItemMigrate style={{ ...style, width: '100%' }} onClick={() => onSelect(index)}>
          <RowFixed>
            <DoubleCurrencyLogo
              currency0={token0}
              currency1={token1}
              margin={true}
              size={22}
              additionalMargin={8}
            />
            <Column>
              <StyledText color={selected === index && theme.green1}>
                {`${token0.symbol} - ${token1.symbol}`}
              </StyledText>
            </Column>
          </RowFixed>
          <AutoColumn>
            <StyledText className="balance" color={selected === index && theme.green1}>
              {balances[index]}
            </StyledText>
          </AutoColumn>
        </StyledMenuItemMigrate>
      );
    };
  }, [selected, theme.green1, tokenList, tokens, balances, lpTokensInfo]);

  const warningContent = () => {
    return (
      <p>
        The beta testing runs for about 2 weeks, and the users who join us within this period will
        have 50,000 ESW distributed among them during the first week after the official launch.
      </p>
    );
  };

  const warningBottomContent = () => {
    return (
      <StyledButton href={'https://link.medium.com/gNa3ztuvkdb'} target="_blank">
        <span> READ MORE </span> {'>>'}
      </StyledButton>
    );
  };
  return (
    <>
      <WarningBlock
        title="EMISWAP soft launch"
        content={warningContent}
        bottomContent={warningBottomContent}
      />
      <AppBody>
        <SwapPoolTabs active={'migrate'} />
        <StyledSubTitle>You have</StyledSubTitle>
        <AutoColumn gap="lg" justify="center">
          <StyledFixedSizeList
            width="auto"
            height={300}
            itemCount={tokenList.length}
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
