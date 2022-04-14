import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from '../iconWrapper';

export const TrailLogo: FC<IconWrapperInterface> = ({
  width = '110',
  height = '110',
  color = 'statusGreen',
  ...props
}): ReactElement => (
  <IconWrapper {...props} width={width} height={height} viewBoxSize="110" color={color}>
    <g filter="url(#filter0_b_177_6957)">
      <rect width="110" height="110" rx="24" fill="white" fill-opacity="0.15" />
      <rect
        x="1"
        y="1"
        width="108"
        height="108"
        rx="23"
        stroke="url(#paint0_radial_177_6957)"
        stroke-opacity="0.2"
        stroke-width="2"
      />
    </g>
    <path
      d="M82.5755 63.0496L75.6251 56.098C75.2776 55.7488 74.8643 55.4719 74.4091 55.2835C73.9539 55.095 73.4658 54.9986 72.9732 55H56.8751V51.25H73.7501C74.7447 51.25 75.6985 50.8549 76.4018 50.1516C77.105 49.4484 77.5001 48.4946 77.5001 47.5V36.25C77.5001 35.2554 77.105 34.3016 76.4018 33.5983C75.6985 32.8951 74.7447 32.5 73.7501 32.5H56.8751V30.625C56.8751 30.1277 56.6776 29.6508 56.3259 29.2992C55.9743 28.9475 55.4974 28.75 55.0001 28.75C54.5028 28.75 54.0259 28.9475 53.6743 29.2992C53.3227 29.6508 53.1251 30.1277 53.1251 30.625V32.5H37.0271C36.5344 32.4986 36.0463 32.595 35.5911 32.7835C35.1359 32.9719 34.7226 33.2488 34.3751 33.598L27.4247 40.5496C27.0734 40.9012 26.876 41.3779 26.876 41.875C26.876 42.3721 27.0734 42.8488 27.4247 43.2004L34.3751 50.152C34.7226 50.5012 35.1359 50.7781 35.5911 50.9665C36.0463 51.155 36.5344 51.2514 37.0271 51.25H53.1251V55H36.2501C35.2555 55 34.3017 55.3951 33.5985 56.0984C32.8952 56.8016 32.5001 57.7554 32.5001 58.75V70C32.5001 70.9946 32.8952 71.9484 33.5985 72.6516C34.3017 73.3549 35.2555 73.75 36.2501 73.75H53.1251V79.375C53.1251 79.8723 53.3227 80.3492 53.6743 80.7008C54.0259 81.0525 54.5028 81.25 55.0001 81.25C55.4974 81.25 55.9743 81.0525 56.3259 80.7008C56.6776 80.3492 56.8751 79.8723 56.8751 79.375V73.75H72.9732C73.4658 73.7514 73.9539 73.655 74.4091 73.4665C74.8643 73.2781 75.2776 73.0012 75.6251 72.652L82.5755 65.7004C82.9269 65.3488 83.1242 64.8721 83.1242 64.375C83.1242 63.8779 82.9269 63.4012 82.5755 63.0496Z"
      fill="white"
    />
    <defs>
      <filter
        id="filter0_b_177_6957"
        x="-24"
        y="-24"
        width="158"
        height="158"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImage" stdDeviation="12" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_177_6957" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_177_6957"
          result="shape"
        />
      </filter>
      <radialGradient
        id="paint0_radial_177_6957"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(-67.0312 -51.5625) rotate(42.4664) scale(274.936)"
      >
        <stop stop-color="white" />
        <stop offset="0.609995" stop-color="white" stop-opacity="0" />
      </radialGradient>
    </defs>
  </IconWrapper>
);
