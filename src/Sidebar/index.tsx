import React  from 'react';
import { Props } from '../ThemeProvider/components'
import styled from 'styled-components';
import { color, layout, width } from 'styled-system';

const SidebarWrapper = styled.div<Props>`
  ${color}
  ${layout}
  ${width}
  background: #ccc;
`;

const Sidebar = () => <SidebarWrapper minWidth={230}>Sidebar</SidebarWrapper>;

export default Sidebar;
