import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from './iconWrapper';

export const BellAlertIcon: FC<IconWrapperInterface> = ({
  width = '32',
  height = '32',
  dot = '#E478FF',
  ...props
}): ReactElement => (
  <IconWrapper {...props} width={width} height={height} viewBoxSize="32">
    <rect width="32" height="32" rx="10" fill="white" fill-opacity="0.15" />
    <rect
      x="0.5"
      y="0.5"
      width="31"
      height="31"
      rx="9.5"
      stroke="url(#paint0_radial_1_507)"
      stroke-opacity="0.2"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M17.7942 7.29494C17.2296 7.10345 16.6258 7 16 7C13.1535 7 10.7622 9.14032 10.4479 11.9694L10.1961 14.2356L10.1896 14.2933C10.0607 15.417 9.69489 16.5005 9.11646 17.4725L9.08667 17.5222L8.50863 18.4856C7.98408 19.3599 7.7218 19.797 7.77842 20.1559C7.8161 20.3946 7.93899 20.6117 8.12435 20.7668C8.40292 21 8.9127 21 9.93224 21H22.0678C23.0873 21 23.5971 21 23.8757 20.7668C24.061 20.6117 24.1839 20.3946 24.2216 20.1559C24.2782 19.797 24.0159 19.3599 23.4914 18.4856L22.9134 17.5222L22.8836 17.4725C22.4273 16.7059 22.1034 15.8698 21.9236 14.9994C19.1974 14.9586 17 12.7359 17 10C17 9.00331 17.2916 8.07473 17.7942 7.29494ZM20.2741 8.98883C20.0999 9.28551 20 9.63109 20 10C20 10.9498 20.6621 11.7449 21.5499 11.9491C21.4205 10.8213 20.9608 9.80382 20.2741 8.98883Z"
      fill="currentColor"
    />
    <path
      d="M13 21C13 21.394 13.0776 21.7841 13.2284 22.1481C13.3791 22.512 13.6001 22.8427 13.8787 23.1213C14.1573 23.3999 14.488 23.6209 14.8519 23.7716C15.2159 23.9224 15.606 24 16 24C16.394 24 16.7841 23.9224 17.1481 23.7716C17.512 23.6209 17.8427 23.3999 18.1213 23.1213C18.3999 22.8427 18.6209 22.512 18.7716 22.1481C18.9224 21.7841 19 21.394 19 21L16 21H13Z"
      fill="currentColor"
    />
    <circle cx="22" cy="10" r="2.5" fill={dot} stroke={dot} />
    <defs>
      <radialGradient
        id="paint0_radial_1_507"
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
