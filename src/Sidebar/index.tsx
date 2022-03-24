import React from 'react';
import styled from 'styled-components';
import { color, layout, width } from 'styled-system';

const SidebarWrapper = styled.div`
  ${color}
  ${layout}
  ${width}
`;

const Sidebar = () => <SidebarWrapper>Sidebar</SidebarWrapper>;

export default Sidebar;
