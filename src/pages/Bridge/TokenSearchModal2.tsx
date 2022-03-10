import React, { KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import Column from '../../components/Column';
import Modal from '../../components/Modal';
import { filterTokens } from '../../components/SearchModal/filtering';
import { PaddedColumn, SearchInput } from '../../components/SearchModal/styleds';
import Tooltip from '../../components/Tooltip';
import { isAddress } from '../../utils';
import List from './TokensList';

export default function SearchModal({
  tokens = [],
  handleSelect = (some: any) => {},
  isLoading = false,
  isOpen = false,
  onDismiss,
  onSelect,
  chainId,
}) {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>();

  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const availableToken = tokens.filter(t => t.symbol);

  const filteredTokens = useMemo(() => {
    return filterTokens(Object.values(availableToken), searchQuery);
  }, [availableToken, searchQuery]);

  const filteredSortedTokens = useMemo(() => {
    const sorted = filteredTokens.sort((a, b) =>
      a.symbol.localeCompare(b.symbol, 'es', { sensitivity: 'base' }),
    );
    const symbolMatch = searchQuery
      .toLowerCase()
      .split(/\s+/)
      .filter(s => s.length > 0);
    if (symbolMatch.length > 1) return sorted;

    return [
      // sort any exact symbol matches first
      ...sorted.filter(token => token.symbol.toLowerCase() === symbolMatch[0]),
      ...sorted.filter(token => token.symbol.toLowerCase() !== symbolMatch[0]),
    ];
  }, [filteredTokens, searchQuery]);

  // const openTooltip = useCallback(() => {
  //   setTooltipOpen(true);
  // }, [setTooltipOpen]);
  const closeTooltip = useCallback(() => setTooltipOpen(false), [setTooltipOpen]);

  const handleEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && filteredSortedTokens.length > 0) {
        if (
          filteredSortedTokens[0].symbol.toLowerCase() === searchQuery.trim().toLowerCase() ||
          filteredSortedTokens.length === 1
        ) {
          handleSelect(filteredSortedTokens[0]);
        }
      }
    },
    [filteredSortedTokens, handleSelect, searchQuery],
  );

  const handleInput = useCallback(event => {
    const input = event.target.value;
    const checksummedInput = isAddress(input);
    setSearchQuery(checksummedInput || input);
    setTooltipOpen(false);
  }, []);

  // clear the input on open
  useEffect(() => {
    if (isOpen) setSearchQuery('');
  }, [isOpen, setSearchQuery]);

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
        </PaddedColumn>
        {isLoading ? (
          'LOADING'
        ) : (
          <List items={filteredSortedTokens} onSelect={onSelect} chainId={chainId} />
        )}
      </Column>
    </Modal>
  );
}
