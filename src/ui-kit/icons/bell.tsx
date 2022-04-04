import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from './iconWrapper';

export const BellIcon: FC<IconWrapperInterface> = ({
  width = '32',
  height = '32',
  ...props
}): ReactElement => (
  <IconWrapper {...props} width={width} height={height} viewBoxSize="32">
    <rect width="32" height="32" rx="10" fill="currentColor" fill-opacity="0.15" />
    <rect
      x="0.5"
      y="0.5"
      width="31"
      height="31"
      rx="9.5"
      stroke="url(#paint0_radial_24_756)"
      stroke-opacity="0.2"
    />
    <path
      d="M10.4478 11.9694C10.7621 9.14032 13.1534 7 15.9999 7C18.8464 7 21.2377 9.14032 21.5521 11.9694L21.8039 14.2356C21.8071 14.2645 21.8087 14.279 21.8103 14.2933C21.9393 15.417 22.305 16.5005 22.8835 17.4725C22.8908 17.4849 22.8983 17.4973 22.9133 17.5222L23.4913 18.4856C24.0159 19.3599 24.2781 19.797 24.2215 20.1559C24.1838 20.3946 24.0609 20.6117 23.8756 20.7668C23.597 21 23.0872 21 22.0677 21H9.93215C8.9126 21 8.40283 21 8.12426 20.7668C7.93889 20.6117 7.81601 20.3946 7.77833 20.1559C7.72171 19.797 7.98399 19.3599 8.50854 18.4856L9.08658 17.5222C9.10153 17.4973 9.10901 17.4849 9.11636 17.4725C9.6948 16.5005 10.0606 15.417 10.1895 14.2933C10.1911 14.279 10.1928 14.2645 10.196 14.2356L10.4478 11.9694Z"
      fill="currentColor"
    />
    <path
      d="M13 21C13 21.394 13.0776 21.7841 13.2284 22.1481C13.3791 22.512 13.6001 22.8427 13.8787 23.1213C14.1573 23.3999 14.488 23.6209 14.8519 23.7716C15.2159 23.9224 15.606 24 16 24C16.394 24 16.7841 23.9224 17.1481 23.7716C17.512 23.6209 17.8427 23.3999 18.1213 23.1213C18.3999 22.8427 18.6209 22.512 18.7716 22.1481C18.9224 21.7841 19 21.394 19 21L16 21H13Z"
      fill="currentColor"
    />
    <defs>
      <radialGradient
        id="paint0_radial_24_756"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(-19.5 -15) rotate(42.4664) scale(79.9812)"
      >
        <stop stop-color="currentColor" />
        <stop offset="0.609995" stop-color="currentColor" stop-opacity="0" />
      </radialGradient>
    </defs>
  </IconWrapper>
);
