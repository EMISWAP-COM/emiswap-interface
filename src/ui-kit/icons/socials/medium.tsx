import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from '../iconWrapper';

export const MediumIcon: FC<IconWrapperInterface> = ({
                                                         width = '32',
                                                         height = '32',
                                                         color = 'statusGreen',
                                                         ...props
                                                       }): ReactElement => (
  <IconWrapper {...props} width={width} height={height} viewBoxSize={width} color={color}>
    <path d="M5.6407 4C8.75598 4 11.2812 6.5266 11.2812 9.6431C11.2812 12.7596 8.75578 15.286 5.6407 15.286C2.52561 15.286 0 12.7596 0 9.6431C0 6.5266 2.52542 4 5.6407 4ZM14.6485 4.33056C16.2061 4.33056 17.4688 6.70883 17.4688 9.6431H17.469C17.469 12.5766 16.2063 14.9556 14.6487 14.9556C13.091 14.9556 11.8283 12.5766 11.8283 9.6431C11.8283 6.70959 13.0908 4.33056 14.6485 4.33056ZM19.0081 4.8839C19.5558 4.8839 20 7.01463 20 9.6431C20 12.2708 19.556 14.4023 19.0081 14.4023C18.4602 14.4023 18.0163 12.2714 18.0163 9.6431C18.0163 7.01482 18.4604 4.8839 19.0081 4.8839Z" fill="white"/>
  </IconWrapper>
);
