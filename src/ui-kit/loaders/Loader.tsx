import React from 'react';
import ContentLoader from 'react-content-loader';
import theme from '../../ThemeProvider/theme';

interface InterfaceImageLoader {
  speed?: number;
  width: number;
  height: number;
  backgroundColor?: string;
  foregroundColor?: string;
  borderRadius?: string | number;
}

const Loader = (props: InterfaceImageLoader) => {
  const defaultBgColor = theme.colors.almostNoWhite;
  const defaultForegroundColor = theme.colors.inactive;
  return (
    <ContentLoader
      speed={props.speed || 3}
      width={props.width}
      height={props.height}
      viewBox={`0 0 ${props.width} ${props.height}`}
      backgroundColor={props.backgroundColor || defaultBgColor}
      foregroundColor={props.foregroundColor || defaultForegroundColor}
      style={{ borderRadius: props.borderRadius || '0.625rem' }}
    >
      <rect x="0" y="0" rx="4" ry="4" width={props.width} height={props.height} />
    </ContentLoader>
  );
};

export default Loader;
