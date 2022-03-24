import React from 'react';
import styled from 'styled-components';
import { color, layout, width, ColorProps, LayoutProps, WidthProps } from 'styled-system';

interface Props extends ColorProps, LayoutProps, WidthProps {
  children: React.ReactNode;
}

const SidebarWrapper = styled.div<Props>`
  ${color}
  ${layout}
  ${width}
`;

const Sidebar = () => <SidebarWrapper width={1 / 2}>Sidebar</SidebarWrapper>;

export default Sidebar;
