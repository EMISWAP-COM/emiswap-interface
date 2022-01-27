import React, { CSSProperties, memo, useMemo } from 'react';
import { Text } from 'rebass';
import Column from '../../components/Column';
import CurrencyLogo from '../../components/CurrencyLogo';
import { RowFixed } from '../../components/Row';
import { StyledFixedSizeList, StyledMenuItem } from '../../components/SearchModal/styleds';

export default function TokensList({ items = [], onSelect = (s: any) => {}, selectedItem = null }) {
  const Row = useMemo(() => {
    return memo(function CurrencyRow({ index, style }: { index: number; style: CSSProperties }) {
      const item = items[index];

      const isSelected = selectedItem && item.name === selectedItem.name;
      return (
        <StyledMenuItem
          style={style}
          className={`token-item-${item.name}`}
          onClick={() => (isSelected ? null : onSelect(item))}
          disabled={isSelected}
        >
          <RowFixed>
            <CurrencyLogo currency={item} size={'18px'} style={{ marginRight: '16px' }} />
            <Column>
              <Text fontWeight={500}>{item.name}</Text>
            </Column>
          </RowFixed>
        </StyledMenuItem>
      );
    });
  }, [items, onSelect, selectedItem]);

  return (
    <StyledFixedSizeList
      width="auto"
      height={500}
      itemCount={items.length}
      itemSize={50}
      style={{ flex: '1', margin: '0 30px' }}
      itemKey={index => index}
    >
      {Row}
    </StyledFixedSizeList>
  );
}
