import React from 'react';

import * as Styled from './styles';

export interface TabProps {
  label: string;
  value: string;
}

export interface TabsProps {
  tabs: TabProps[];
  value: TabProps['value'];
  onChange: (tab: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, value, onChange }) => (
  <Styled.Tabs>
    {tabs.map(tab => (
      <Styled.TabItem
        key={tab.value}
        children={tab.label}
        active={tab.value === value}
        onClick={() => onChange(tab.value)}
      />
    ))}
  </Styled.Tabs>
);
