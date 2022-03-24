import React  from 'react';
import { Props } from '../ThemeProvider'
import styled from 'styled-components';
import { color, layout, width } from 'styled-system';

const SidebarWrapper = styled.div<Props>`
  ${color}
  ${layout}
  ${width}
`;

const Sidebar = () => <SidebarWrapper minWidth={230}>Sidebar</SidebarWrapper>;

export default Sidebar;
