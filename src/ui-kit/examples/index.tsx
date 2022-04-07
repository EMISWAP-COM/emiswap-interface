import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import { color, ColorProps, layout, LayoutProps, space, SpaceProps } from 'styled-system';
import ButtonsExample from './buttons';
import IconsExample from './icons';
import FontsExample from './fonts';
import { SpinnerIcon } from 'ui-kit/icons';
import SwitchersExample from './swithers';
import CheckBoxsExamples from './checkbox';
import RefLinkExample from './refLink';
import { Head } from '../../ThemeProvider/components';

interface RootProp extends LayoutProps, ColorProps, SpaceProps {}
const Root = styled.div<RootProp>`
  ${layout}
  ${color}
  ${space}

`;

const Header = ({ children }: { children: ReactNode }): ReactElement => (
  <Head variant="mediumSoraSemiBold" pb="4" pt="4" color="paper">
    {children}
  </Head>
);

export default () => (
  <>
    <Root size="100%" bg="bg" p="5">
      <Header>Icons</Header>
      <IconsExample />
      <Header>Spinner</Header>
      <SpinnerIcon />
      <Header>Buttons</Header>
      <ButtonsExample />
      <Header>Swithers</Header>
      <SwitchersExample />
      <Header>CheckBoxs </Header>
      <CheckBoxsExamples />
      <Header>RefLink</Header>
      <RefLinkExample />
      <Header>Fonts</Header>
      <FontsExample />
    </Root>
  </>
);
