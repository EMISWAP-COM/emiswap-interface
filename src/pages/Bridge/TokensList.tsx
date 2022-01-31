import { currencyEquals } from '@uniswap/sdk';
import { useWeb3React } from '@web3-react/core';
import React, { CSSProperties, memo, useMemo } from 'react';
import { Text } from 'rebass';
import { AutoColumn } from '../../components/Column';
import { RowFixed } from '../../components/Row';
import { StyledFixedSizeList, StyledMenuItem } from '../../components/SearchModal/styleds';
import { useTokenBalances } from '../../state/wallet/hooks';
import { currencyKey } from '../../utils/currencyId';
import { tokenAmountToString } from '../../utils/formats';
import { Icon } from './styled';

export default function TokensList({ items = [], onSelect = (s: any) => {}, selectedItem = null }) {
  const { account } = useWeb3React();
  const balances = useTokenBalances(account, items);

  const Row = useMemo(() => {
    return memo(function CurrencyRow({ index, style }: { index: number; style: CSSProperties }) {
      const item = items[index];

      const isSelected = selectedItem && currencyEquals(item, selectedItem);

      return (
        <StyledMenuItem
          style={style}
          className={`token-item-${item.address}`}
          onClick={() => (isSelected ? null : onSelect(item))}
          disabled={isSelected}
        >
          <RowFixed>
            {item.icon && <Icon src={item.icon} alt="icon" width="16px" height="16px" />}
            <Text fontWeight={500}>{item.symbol}</Text>
          </RowFixed>
          <AutoColumn>{tokenAmountToString(balances[item.address])}</AutoColumn>
        </StyledMenuItem>
      );
    });
  }, [items, onSelect, selectedItem, balances]);

  return (
    <StyledFixedSizeList
      width="auto"
      height={500}
      itemCount={items.length}
      itemSize={50}
      style={{ flex: '1', margin: '0 30px' }}
      itemKey={index => currencyKey(items[index])}
    >
      {Row}
    </StyledFixedSizeList>
  );
}
