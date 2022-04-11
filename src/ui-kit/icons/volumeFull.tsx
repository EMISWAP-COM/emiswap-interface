import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from './iconWrapper';

export const VolumeFull: FC<IconWrapperInterface> = ({
                                                       width = '32',
                                                       height = '32',
                                                       ...props
                                                     }): ReactElement => (
  <IconWrapper {...props} width={width} height={height} viewBoxSize={width}>
    <path d="M3.46532 11.6084C2.87114 10.6181 2.87114 9.38094 3.46532 8.39065V8.39065C3.64663 8.08846 3.94701 7.87678 4.29258 7.80766L5.70344 7.52549C5.78749 7.50868 5.86326 7.4636 5.91814 7.39775L7.17085 5.8945C8.3534 4.47543 8.94468 3.7659 9.47234 3.95693C10 4.14797 10 5.07158 10 6.91879L10 13.0802C10 14.9274 10 15.851 9.47234 16.0421C8.94468 16.2331 8.3534 15.5236 7.17085 14.1045L5.91814 12.6013C5.86326 12.5354 5.78749 12.4903 5.70344 12.4735L4.29258 12.1914C3.94701 12.1222 3.64663 11.9106 3.46532 11.6084V11.6084Z" fill="white"/>
    <path d="M12.1129 7.0534C12.8903 7.83078 13.329 8.88389 13.3333 9.98326C13.3376 11.0826 12.9073 12.1392 12.1361 12.9226" stroke="white" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M15.5472 5.28563C16.791 6.52944 17.4929 8.21441 17.4998 9.97341C17.5067 11.7324 16.8182 13.4229 15.5842 14.6764" stroke="white" stroke-width="1.8" stroke-linecap="round"/>
  </IconWrapper>
);
