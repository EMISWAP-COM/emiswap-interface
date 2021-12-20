import React from 'react';
import styled from 'styled-components/macro';

const StyledTabsWrapper = styled.div`
  background-color: ${({theme}) => theme.darkGrey};
  display: inline-flex;
  border-radius: 6px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    width: 100%;
  `};
`;

const StyledTab = styled.div<{ isSelected: boolean }>`
  padding: 7px 50px;
  border-radius: 6px;
  cursor: pointer;
  color: ${({theme}) => theme.white};
  font-size: 12px;
  letter-spacing: 0.02em;

  ${({theme, isSelected}) => isSelected && `background-color: ${theme.purple}`};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 15px 10px;
    flex-grow: 1;
  `};
`;

type TabItem = {
  id: string,
  title: string,
}

type TabsProps = {
  items: TabItem[],
  selectedItemId: string,
  onChange: (tabId: string) => void,
};

const Tabs: React.FC<TabsProps> = (
  {
    items,
    selectedItemId,
    onChange,
  }
) => {
  const handleTabClick = (tabId: string) => () => {
    onChange(tabId);
  };

  return (
    <StyledTabsWrapper>
      {items.map((item) =>
        <StyledTab
          key={item.id}
          isSelected={item.id === selectedItemId}
          onClick={handleTabClick(item.id)}
        >{item.title}</StyledTab>)}
    </StyledTabsWrapper>
  )
}

export default Tabs;
