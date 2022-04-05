import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from './iconWrapper';

export const MenuIcon: FC<IconWrapperInterface> = ({
  width = '20',
  height = '20',
  ...props
}): ReactElement => (
  <IconWrapper {...props} width={width} height={height} viewBoxSize="20">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.58398 4.5H16.4173M3.69093 10H10.7391M3.58398 15.5H16.4173"
        stroke="white"
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-linecap="round"
      />
      <path
        d="M14.1798 9.14251L15.8195 8.1587C16.486 7.75878 17.334 8.2389 17.334 9.01619L17.334 10.9838C17.334 11.7611 16.486 12.2412 15.8195 11.8413L14.1798 10.8575C13.5325 10.4691 13.5325 9.53091 14.1798 9.14251Z"
        fill="white"
      />
    </svg>
  </IconWrapper>
);
