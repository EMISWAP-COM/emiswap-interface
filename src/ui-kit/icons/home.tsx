import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from './iconWrapper';

export const HomeIcon: FC<IconWrapperInterface> = ({
  width = '24',
  height = '24',
  color = '#FFFFFF',
  ...props
}): ReactElement => (
  <IconWrapper {...props} width={width} height={height} color={color}>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5.27446 10.1262C5 10.7229 5 11.4018 5 12.7595V16.9999C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 20.9999 7.11438 20.9999 9 20.9999L9 16.1667C9 15.5223 9.53726 15 10.2 15H13.8C14.4627 15 15 15.5223 15 16.1667V20.9999C16.8856 20.9999 17.8284 20.9999 18.4142 20.4142C19 19.8284 19 18.8856 19 16.9999V12.7595C19 11.4018 19 10.7229 18.7255 10.1262C18.4511 9.52943 17.9356 9.08763 16.9047 8.20401L15.9047 7.34687C14.0414 5.74974 13.1098 4.95117 12 4.95117C10.8902 4.95117 9.95857 5.74974 8.09525 7.34687L7.09525 8.20401C6.06437 9.08763 5.54892 9.52943 5.27446 10.1262Z"
      fill="currentColor"
    />
  </IconWrapper>
);
