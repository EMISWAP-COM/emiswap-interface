import React from 'react';
import { MEDIA_WIDTHS } from '../../theme';
import { useDarkModeManager } from '../../state/user/hooks';
import styled from 'styled-components';

import WhiteLogo from '../../assets/svg/logo_white.svg';
import BrownLogo from '../../assets/svg/logo_brown.svg';

const UniIcon = styled.div<{ mobile?: boolean }>`
  width: 150px;
  margin: 0 auto;
  height: 90px;
  position: relative;
  top: 7px;

   ${({ mobile }) => (mobile === true ? 'display: none;' : '')}

  @media (max-width: ${(MEDIA_WIDTHS as any)['upToSmall']}px) {
    ${({ mobile }) =>
      mobile === true
        ? `
        width: 81px;
        display: block;
        position: absolute;
        top: -2px;
        left: 0;
        height: auto;
        margin: 0;
        z-index: -1;
      `
        : 'display: none;'}
  }
`;

export default function Logo({ mobile, ...rest }: { mobile?: boolean }) {
  const [isDark] = useDarkModeManager();

  return (
    <UniIcon mobile={mobile}>
      <img src={isDark ? WhiteLogo : BrownLogo} alt="logo" />
    </UniIcon>
  );
}
