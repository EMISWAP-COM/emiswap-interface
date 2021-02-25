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
import { ButtonGreen } from '../../components/Button'

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


export default function MigrateV1() {
  const theme = useContext(ThemeContext);
  const history = useHistory();
  const [selected, setSelected] = useState(null);
  const onSelect = (idx: number) => {
    setSelected(idx);
  };

  const handleRedirect = () => {
    history.push(`migrate/${'0x440eB39eCFE6df3A5dCAeC7D9D0A16C875eBD77F'}`);
  };

  const CurrencyRow = useMemo(() => {
    return ({ index, style }) => {
      return (
        <StyledMenuItem style={{ ...style, width: '100%' }} onClick={() => onSelect(index)}>
          <RowFixed>
            <Column>
              <Text color={selected === index && theme.green1} fontWeight={500}>
                asdas
              </Text>
            </Column>
          </RowFixed>
          <AutoColumn>
            <Text color={selected === index && theme.green1}>asdasdas</Text>
          </AutoColumn>
        </StyledMenuItem>
      );
    };
  }, [selected, theme.green1]);

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
            itemCount={20}
            itemSize={50}
            style={{ width: '100%', margin: '0 30px' }}
            itemKey={index => index + 'a'}
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
            <ExternalLink id="import-pool-link" href="#" style={{ color: theme.green1, textDecoration: 'none' }}>
              {'Terms'}
            </ExternalLink>
          </Text>
        </AutoColumn>
      </AppBody>
    </>
  );
}
