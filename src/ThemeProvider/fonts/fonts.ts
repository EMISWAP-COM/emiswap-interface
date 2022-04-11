const textSizes = {
  small: {
    fontSize: '.75rem',
    lineHeight: '1rem',
  },
  normal: {
    fontSize: '.875rem',
    lineHeight: '1.25rem',
  },
  medium: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
  },
  large: {
    fontSize: '1.125rem',
    lineHeight: '1.5rem',
  },
};

const headerSizes = {
  small: {
    fontSize: '1.5rem',
    lineHeight: '1.875rem',
  },
  normal: {
    fontSize: '2rem',
    lineHeight: '2rem',
  },
  medium: {
    fontSize: '2.5rem',
    lineHeight: '3.438rem',
  },
  large: {
    fontSize: '3.75rem',
    lineHeight: '4.688rem',
  },
};

const fontFamilys = {
  RubikRegular: {
    fontFamily: 'RubikRegular',
    fontWeight: 400,
  },
  RubikMedium: {
    fontFamily: 'RubikMedium',
    fontWeight: 500,
  },
  RubikBold: {
    fontFamily: 'RubikBold',
    fontWeight: 700,
  },
  SoraSemiBold: {
    fontFamily: 'SoraSemiBold',
    fontWeight: 600,
  },
  SoraBold: {
    fontFamily: 'SoraBold',
    fontWeight: 700,
  },
};

export const textStyles = {
  smallRubikRegular: {
    ...textSizes.small,
    ...fontFamilys.RubikRegular,
  },
  smallRubikMedium: {
    ...textSizes.small,
    ...fontFamilys.RubikMedium,
  },
  smallRubikBold: {
    ...textSizes.small,
    ...fontFamilys.RubikBold,
  },
  smallSoraSemiBold: {
    ...textSizes.small,
    ...fontFamilys.SoraSemiBold,
  },
  smallSoraBold: {
    ...textSizes.small,
    ...fontFamilys.SoraBold,
  },
  normalRubikRegular: {
    ...textSizes.normal,
    ...fontFamilys.RubikRegular,
  },
  normalRubikMedium: {
    ...textSizes.normal,
    ...fontFamilys.RubikMedium,
  },
  normalRubikBold: {
    ...textSizes.normal,
    ...fontFamilys.RubikBold,
  },
  normalSoraSemiBold: {
    ...textSizes.normal,
    ...fontFamilys.SoraSemiBold,
  },
  normalSoraBold: {
    ...textSizes.normal,
    ...fontFamilys.SoraBold,
  },
  mediumRubikRegular: {
    ...textSizes.medium,
    ...fontFamilys.RubikRegular,
  },
  mediumRubikMedium: {
    ...textSizes.medium,
    ...fontFamilys.RubikMedium,
  },
  mediumRubikBold: {
    ...textSizes.medium,
    ...fontFamilys.RubikBold,
  },
  mediumSoraSemiBold: {
    ...textSizes.medium,
    ...fontFamilys.SoraSemiBold,
  },
  mediumSoraBold: {
    ...textSizes.medium,
    ...fontFamilys.SoraBold,
  },
  largeRubikRegular: {
    ...textSizes.large,
    ...fontFamilys.RubikRegular,
  },
  largeRubikMedium: {
    ...textSizes.large,
    ...fontFamilys.RubikMedium,
  },
  largeRubikBold: {
    ...textSizes.large,
    ...fontFamilys.RubikBold,
  },
  largeSoraSemiBold: {
    ...textSizes.large,
    ...fontFamilys.SoraSemiBold,
  },
  largeSoraBold: {
    ...textSizes.large,
    ...fontFamilys.SoraBold,
  },
};

export const headerStyles = {
  smallRubikRegular: {
    ...headerSizes.small,
    ...fontFamilys.RubikRegular,
  },
  smallRubikMedium: {
    ...headerSizes.small,
    ...fontFamilys.RubikMedium,
  },
  smallRubikBold: {
    ...headerSizes.small,
    ...fontFamilys.RubikBold,
  },
  smallSoraSemiBold: {
    ...headerSizes.small,
    ...fontFamilys.SoraSemiBold,
  },
  smallSoraBold: {
    ...headerSizes.small,
    ...fontFamilys.SoraBold,
  },
  normalRubikRegular: {
    ...headerSizes.normal,
    ...fontFamilys.RubikRegular,
  },
  normalRubikMedium: {
    ...headerSizes.normal,
    ...fontFamilys.RubikMedium,
  },
  normalRubikBold: {
    ...headerSizes.normal,
    ...fontFamilys.RubikBold,
  },
  normalSoraSemiBold: {
    ...headerSizes.normal,
    ...fontFamilys.SoraSemiBold,
  },
  normalSoraBold: {
    ...headerSizes.normal,
    ...fontFamilys.SoraBold,
  },
  mediumRubikRegular: {
    ...headerSizes.medium,
    ...fontFamilys.RubikRegular,
  },
  mediumRubikMedium: {
    ...headerSizes.medium,
    ...fontFamilys.RubikMedium,
  },
  mediumRubikBold: {
    ...headerSizes.medium,
    ...fontFamilys.RubikBold,
  },
  mediumSoraSemiBold: {
    ...headerSizes.medium,
    ...fontFamilys.SoraSemiBold,
  },
  mediumSoraBold: {
    ...headerSizes.medium,
    ...fontFamilys.SoraBold,
  },
  largeRubikRegular: {
    ...headerSizes.large,
    ...fontFamilys.RubikRegular,
  },
  largeRubikMedium: {
    ...headerSizes.large,
    ...fontFamilys.RubikMedium,
  },
  largeRubikBold: {
    ...headerSizes.large,
    ...fontFamilys.RubikBold,
  },
  largeSoraSemiBold: {
    ...headerSizes.large,
    ...fontFamilys.SoraSemiBold,
  },
  largeSoraBold: {
    ...headerSizes.large,
    ...fontFamilys.SoraBold,
  },
};

export type TextStyleTypes = keyof typeof textStyles;
export type HeaderStyleTypes = keyof typeof headerStyles;
