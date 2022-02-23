import { Token, TokenAmount } from '@uniswap/sdk';
import Card from 'components/Card';
import QuestionHelper from 'components/QuestionHelper';
import { AutoRow, RowBetween } from 'components/Row';
import { filterTokens } from 'components/SearchModal/filtering';
import SortButton from 'components/SearchModal/SortButton';
import { useTokenComparator } from 'components/SearchModal/sorting';
import { useActiveWeb3React } from 'hooks';
import { useAllTokens, useToken } from 'hooks/Tokens';
import List from './TokensList';
import { Text } from 'rebass';
import useInterval from 'hooks/useInterval';
import React, {
  KeyboardEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import styled, { ThemeContext } from 'styled-components';
import { CloseIcon, LinkStyledButton } from 'theme';
import Column from '../../components/Column';
import Modal from '../../components/Modal';
import { PaddedColumn, SearchInput } from '../../components/SearchModal/styleds';
import Tooltip from '../../components/Tooltip';
import { isAddress } from '../../utils';
import CommonBases from 'components/SearchModal/CommonBases';
import Loader from 'components/Loader';

const LoaderBox = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function SearchModal({
  tokens,
  isOpen,
  onDismiss,
  onCurrencySelect,
  isLpTokens = false,
}) {
  const { t } = useTranslation();
  const { account, chainId } = useActiveWeb3React();
  const theme = useContext(ThemeContext);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const [invertSearchOrder, setInvertSearchOrder] = useState<boolean>(false);
  const [allTokens, isLoading] = useAllTokens(isLpTokens);

  // if the current input is an address, and we don't have the token in context, try to fetch it and import
  const searchToken = useToken(searchQuery);

  const availableTokens = tokens.filter(t => t.symbol);

  const sortedTokens = Object.keys(allTokens).reduce((acc, address) => {
    if (
      availableTokens.find(({ address: movrAddress }) => {
        return movrAddress.toLowerCase() === address.toLowerCase();
      })
    ) {
      acc[address] = allTokens[address];
    }
    return acc;
  }, {});

  console.log(11, sortedTokens);

  const tokenComparator = useTokenComparator(invertSearchOrder);

  const filteredTokens: Token[] = useMemo(() => {
    if (searchToken) {
      return [searchToken];
    }
    return filterTokens(Object.values(sortedTokens), searchQuery, isLpTokens);
    // return filterTokens(Object.values(availableTokens), searchQuery, isLpTokens);
  }, [searchToken, allTokens, searchQuery, isLpTokens]);

  const filteredSortedTokens: Token[] = useMemo(() => {
    if (searchToken) {
      return [searchToken];
    }
    const sorted = filteredTokens.sort(tokenComparator);
    const symbolMatch = searchQuery
      .toLowerCase()
      .split(/\s+/)
      .filter(s => s.length > 0);
    if (symbolMatch.length > 1) {
      return sorted;
    }

    return [
      ...(searchToken ? [searchToken] : []),
      // sort any exact symbol matches first
      ...sorted.filter(token => token.symbol.toLowerCase() === symbolMatch[0]),
      ...sorted.filter(token => token.symbol.toLowerCase() !== symbolMatch[0]),
    ];
  }, [filteredTokens, searchQuery, searchToken, tokenComparator]);

  const handleCurrencySelect = useCallback(
    (currency: Token) => {
      onCurrencySelect(currency);
      onDismiss();
    },
    [onDismiss, onCurrencySelect],
  );

  // clear the input on open
  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
    }
  }, [isOpen, setSearchQuery]);

  // manage focus on modal show
  const inputRef = useRef<HTMLInputElement>();
  const handleInput = useCallback(event => {
    const input = event.target.value;
    const checksummedInput = isAddress(input);
    setSearchQuery(checksummedInput || input);
    setTooltipOpen(false);
  }, []);

  const openTooltip = useCallback(() => {
    setTooltipOpen(true);
  }, [setTooltipOpen]);
  const closeTooltip = useCallback(() => setTooltipOpen(false), [setTooltipOpen]);

  useInterval(
    () => {
      setTooltipOpen(false);
    },
    tooltipOpen ? 4000 : null,
    false,
  );

  const handleEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && filteredSortedTokens.length > 0) {
        if (
          filteredSortedTokens[0].symbol.toLowerCase() === searchQuery.trim().toLowerCase() ||
          filteredSortedTokens.length === 1
        ) {
          handleCurrencySelect(filteredSortedTokens[0]);
        }
      }
    },
    [filteredSortedTokens, handleCurrencySelect, searchQuery],
  );

  return (
    <Modal
      isOpen={isOpen}
      onDismiss={onDismiss}
      maxHeight={70}
      initialFocusRef={isMobile ? undefined : inputRef}
      minHeight={70}
    >
      <Column style={{ width: '100%' }}>
        <PaddedColumn gap="16px">
          <RowBetween>
            <Text fontWeight={500} fontSize={16}>
              Select a token
              <QuestionHelper
                disabled={tooltipOpen}
                text="Find a token by searching for its name or symbol or by pasting its address below."
              />
            </Text>
            <CloseIcon onClick={onDismiss} />
          </RowBetween>
          <Tooltip
            text="Import any token into your list by pasting the token address into the search field."
            show={tooltipOpen}
            placement="bottom"
          >
            <SearchInput
              type="text"
              id="token-search-input"
              placeholder={t('tokenSearchPlaceholder')}
              value={searchQuery}
              ref={inputRef}
              onChange={handleInput}
              onFocus={closeTooltip}
              onBlur={closeTooltip}
              onKeyDown={handleEnter}
            />
          </Tooltip>
          <RowBetween>
            <Text fontSize={14} fontWeight={500}>
              Token Name
            </Text>
            <SortButton
              ascending={invertSearchOrder}
              toggleSortOrder={() => setInvertSearchOrder(iso => !iso)}
            />
          </RowBetween>
        </PaddedColumn>

        {isLoading ? (
          <LoaderBox>
            <Loader size="100px" />
          </LoaderBox>
        ) : (
          <List items={filteredSortedTokens} onSelect={handleCurrencySelect} />
        )}
        <div style={{ height: '1px', backgroundColor: theme.bg2, margin: '0 30px' }} />
        <Card>
          <AutoRow justify={'center'}>
            <div>
              <LinkStyledButton
                style={{ fontWeight: 500, color: theme.text2, fontSize: 16 }}
                onClick={openTooltip}
              >
                Having trouble finding a token?
              </LinkStyledButton>
            </div>
          </AutoRow>
        </Card>
      </Column>
    </Modal>
  );
}
