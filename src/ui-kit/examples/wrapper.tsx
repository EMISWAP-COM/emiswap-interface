import styled, { css } from 'styled-components';
import { color, ColorProps, layout, LayoutProps, space, SpaceProps } from 'styled-system';

interface WrapperInterface extends ColorProps, LayoutProps, SpaceProps {}

export default styled.div<WrapperInterface>`
  display: flex;
  flex-direction: column;
  ${color}
  ${layout}
  ${space}
  > * {
    margin: 10px;
  }
`;
