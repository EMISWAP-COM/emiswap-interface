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
import styled from 'styled-components';
import { Token } from 'typescript';
import Column from '../../components/Column';
import Modal from '../../components/Modal';
import { filterTokens } from '../../components/SearchModal/filtering';
import { useTokenComparator } from '../../components/SearchModal/sorting';
import { PaddedColumn, SearchInput } from '../../components/SearchModal/styleds';
import Tooltip from '../../components/Tooltip';
import { isAddress } from '../../utils';
import ChainsList from './ChainsList';

const LoaderBox = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function SearchModal({
  items = [],
  handleSelect = (some: any) => {},
  isLoading = false,
  isOpen = false,
  onDismiss,
  onSelect,
}) {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>();

  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const openTooltip = useCallback(() => {
    setTooltipOpen(true);
  }, [setTooltipOpen]);

  const closeTooltip = useCallback(() => setTooltipOpen(false), [setTooltipOpen]);

  const filteredItems = searchQuery
    ? items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : items;

  const handleEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && items.length > 0) {
        if (
          items[0].symbol.toLowerCase() === searchQuery.trim().toLowerCase() ||
          items.length === 1
        ) {
          handleSelect(items[0]);
        }
      }
    },
    [filteredItems, handleSelect, searchQuery],
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
        {isLoading ? 'LOADING' : <ChainsList items={filteredItems} onSelect={onSelect} />}
      </Column>
    </Modal>
  );
}
