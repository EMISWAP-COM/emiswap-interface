import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from '../iconWrapper';

export const TwitterIcon: FC<IconWrapperInterface> = ({
  width = '32',
  height = '32',
  ...props
}): ReactElement => (
  <IconWrapper {...props} width={width} height={height} viewBoxSize={32}>
    <rect width="32" height="32" rx="10" fill="white" fill-opacity="0.15" />
    <rect
      x="0.5"
      y="0.5"
      width="31"
      height="31"
      rx="9.5"
      stroke="url(#paint0_radial_177_6871)"
      stroke-opacity="0.2"
    />
    <path
      d="M25.375 10.2774C24.6717 10.583 23.9275 10.7843 23.166 10.875C23.9663 10.4064 24.5681 9.66195 24.8586 8.78126C24.102 9.22368 23.2756 9.5341 22.4148 9.69923C22.0524 9.31935 21.6165 9.01716 21.1336 8.811C20.6507 8.60484 20.1309 8.49904 19.6059 8.50001C17.4801 8.50001 15.7598 10.1953 15.7598 12.2852C15.7583 12.5759 15.7916 12.8657 15.859 13.1484C14.3346 13.077 12.842 12.6881 11.4766 12.0067C10.1111 11.3254 8.90292 10.3665 7.9293 9.19141C7.58772 9.76724 7.40708 10.4242 7.40625 11.0938C7.40625 12.4063 8.09102 13.5664 9.125 14.2461C8.51239 14.2316 7.91234 14.0694 7.37578 13.7734V13.8203C7.37578 15.6563 8.70391 17.1836 10.4617 17.5313C10.1312 17.6194 9.79053 17.664 9.44844 17.6641C9.20569 17.6645 8.9635 17.6409 8.72539 17.5938C9.21406 19.0977 10.6363 20.1914 12.3211 20.2227C10.9521 21.2777 9.27134 21.848 7.54297 21.8438C7.23618 21.8433 6.92967 21.825 6.625 21.7891C8.38327 22.9118 10.4271 23.5057 12.5133 23.5C19.5977 23.5 23.468 17.7305 23.468 12.7266C23.468 12.5625 23.4637 12.3984 23.4559 12.2383C24.2071 11.7039 24.857 11.0399 25.375 10.2774Z"
      fill="white"
    />
    <defs>
      <radialGradient
        id="paint0_radial_177_6871"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(-19.5 -15) rotate(42.4664) scale(79.9812)"
      >
        <stop stop-color="white" />
        <stop offset="0.609995" stop-color="white" stop-opacity="0" />
      </radialGradient>
    </defs>
  </IconWrapper>
);
