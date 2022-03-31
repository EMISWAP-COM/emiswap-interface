import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from './iconWrapper';

export const PipeIcon: FC<IconWrapperInterface> = ({
  width = '32',
  height = '32',
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
      stroke="url(#paint0_radial_1_510)"
      stroke-opacity="0.2"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12.8689 10.1129C10.7651 11.234 9.33301 13.4498 9.33301 16.0002C9.33301 16.078 9.33434 16.1554 9.33698 16.2326L14.1622 14.9397L12.8689 10.1129ZM15.767 9.33748L17.1894 14.6462L17.2011 14.6895C17.2511 14.8753 17.3216 15.1372 17.3525 15.3774C17.3916 15.6801 17.4007 16.1589 17.119 16.6468C16.8373 17.1347 16.4181 17.3661 16.1365 17.4837C15.913 17.577 15.6509 17.6469 15.465 17.6964L15.4217 17.708L10.1122 19.1307C11.2333 21.2347 13.4492 22.6668 15.9997 22.6668C19.6816 22.6668 22.6663 19.6821 22.6663 16.0002C22.6663 12.3183 19.6816 9.3335 15.9997 9.3335C15.9218 9.3335 15.8442 9.33483 15.767 9.33748Z"
      fill="currentColor"
    />
    <path
      d="M14.3611 9.88231C14.1096 8.94339 13.9838 8.47393 13.5365 8.28291C13.0891 8.09189 12.7234 8.29254 11.992 8.69385C11.6207 8.89751 11.2648 9.12963 10.9273 9.38856C10.0591 10.0548 9.33062 10.8854 8.78345 11.8332C8.23627 12.7809 7.88113 13.8271 7.73828 14.9121C7.68277 15.3338 7.65974 15.7582 7.66897 16.1815C7.68716 17.0156 7.69625 17.4327 8.08533 17.7245C8.47442 18.0164 8.94388 17.8906 9.8828 17.639L14.0685 16.5175C14.9792 16.2735 15.4345 16.1515 15.6416 15.7927C15.8487 15.434 15.7267 14.9787 15.4827 14.068L14.3611 9.88231Z"
      fill="currentColor"
    />
    <defs>
      <radialGradient
        id="paint0_radial_1_510"
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
