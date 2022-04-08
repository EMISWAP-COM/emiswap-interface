import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from './iconWrapper';

export const CloseIcon: FC<IconWrapperInterface> = ({
  width = '32',
  height = '32',
  ...props
}): ReactElement => (
  <IconWrapper {...props} width={width} height={height} viewBoxSize={width}>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9ZM5.29289 12.7071C4.90237 12.3166 4.90237 11.6834 5.29289 11.2929L7.58579 9L5.22183 6.63604C4.8313 6.24551 4.8313 5.61235 5.22183 5.22183C5.61235 4.8313 6.24551 4.8313 6.63604 5.22183L9 7.58579L11.364 5.22183C11.7545 4.8313 12.3877 4.8313 12.7782 5.22183C13.1687 5.61235 13.1687 6.24551 12.7782 6.63604L10.4142 9L12.7071 11.2929C13.0976 11.6834 13.0976 12.3166 12.7071 12.7071C12.3166 13.0976 11.6834 13.0976 11.2929 12.7071L9 10.4142L6.70711 12.7071C6.31658 13.0976 5.68342 13.0976 5.29289 12.7071Z"
      fill="white"
    />
  </IconWrapper>
);
