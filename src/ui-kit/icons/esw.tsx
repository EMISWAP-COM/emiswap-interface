import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from './iconWrapper';

export const ESWIcon: FC<IconWrapperInterface> = ({
  width = '32',
  height = '32',
  ...props
}): ReactElement => (
  <IconWrapper {...props} width={width} height={height} viewBoxSize="32">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="10" fill="white" fill-opacity="0.15" />
      <rect
        x="0.5"
        y="0.5"
        width="31"
        height="31"
        rx="9.5"
        stroke="url(#paint0_radial_24_826)"
        stroke-opacity="0.2"
      />
      <path
        d="M26.001 15.9995C26.001 21.5226 21.5236 26 16.0005 26C10.4774 26 6 21.5226 6 15.9995C6 10.4764 10.4774 5.99902 16.0005 5.99902C21.5236 5.99902 26.001 10.4764 26.001 15.9995Z"
        fill="white"
      />
      <g clip-path="url(#clip0_24_826)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13.7175 12.9076L15.8692 9.17899L16.4308 13.761C16.4728 14.1015 16.5486 14.7909 16.1805 15.3479C15.7156 16.0036 15.3307 16.1402 14.9416 16.2769C14.7502 16.3441 14.5567 16.4135 14.3548 16.5438C13.6523 16.9579 9.65592 19.9404 9.65592 19.9404L13.7658 14.629C13.8268 14.5513 13.8521 14.4546 13.8395 14.3579L13.6733 13.1367C13.6607 13.0569 13.6775 12.977 13.7175 12.9076ZM20.4062 16.079L22.5616 19.8055L18.31 18.0005C17.9939 17.8667 17.3586 17.5875 17.0599 16.9905C16.7241 16.2603 16.7981 15.8589 16.8743 15.4538C16.9117 15.2546 16.9483 15.0524 16.9364 14.8125C16.9288 13.9975 16.3423 9.04766 16.3423 9.04766L18.8902 15.2602C18.9271 15.3519 18.9983 15.4221 19.0884 15.4595L20.2297 15.9263C20.3053 15.9553 20.3661 16.0098 20.4062 16.079ZM10.0024 20.2943L14.3096 20.2921C14.3897 20.292 14.4673 20.2667 14.5302 20.2158L15.5054 19.4614C15.5829 19.4022 15.6793 19.3757 15.7772 19.3896L22.435 20.2908C22.435 20.2908 17.8522 18.3235 17.1421 17.9225C16.9282 17.8129 16.7713 17.6801 16.6173 17.5481C16.3044 17.2797 15.9935 17.0149 15.1928 16.9405C14.5261 16.9004 13.9665 17.3106 13.6925 17.5173L10.0024 20.2943Z"
          fill="url(#paint1_angular_24_826)"
        />
      </g>
      <defs>
        <radialGradient
          id="paint0_radial_24_826"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(-19.5 -15) rotate(42.4664) scale(79.9812)"
        >
          <stop stop-color="white" />
          <stop offset="0.609995" stop-color="white" stop-opacity="0" />
        </radialGradient>
        <radialGradient
          id="paint1_angular_24_826"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(15.9847 16.3339) rotate(37.5419) scale(8.70474 9.14013)"
        >
          <stop offset="0.209611" stop-color="#E478FF" />
          <stop offset="0.349746" stop-color="#5D09E1" />
          <stop offset="0.483859" stop-color="#E478FF" />
          <stop offset="0.656099" stop-color="#5D09E1" />
          <stop offset="0.849511" stop-color="#E478FF" />
          <stop offset="0.999662" stop-color="#5D09E1" />
        </radialGradient>
        <clipPath id="clip0_24_826">
          <rect
            width="12.6158"
            height="10.9337"
            fill="white"
            transform="translate(9.86011 9.24792)"
          />
        </clipPath>
      </defs>
    </svg>
  </IconWrapper>
);
