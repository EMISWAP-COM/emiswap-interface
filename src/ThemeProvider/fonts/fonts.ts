const textSizes = {
    small: {
      fontSize: '12px',
      lineHeight: '16px',
    },
    normal: {
      fontSize: '14px',
      lineHeight: '20px',
    },
    medium: {
      fontSize: '16px',
      lineHeight: '24px',
    },
    large: {
      fontSize: '18px',
      lineHeight: '24px',
    },
  };
  
const headerSizes = {
    small: {
      fontSize: '24px',
      lineHeight: '30px',
    },
    normal: {
      fontSize: '32px',
      lineHeight: '32px',
    },
    medium: {
      fontSize: '40px',
      lineHeight: '55px',
    },
    large: {
      fontSize: '60px',
      lineHeight: '75px',
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

  export const textStyles ={
    smallRubikRegular : {
      ...textSizes.small,
      ...fontFamilys.RubikRegular
    },
    smallRubikMedium : {
      ...textSizes.small,
      ...fontFamilys.RubikMedium
    },
    smallRubikBold : {
      ...textSizes.small,
      ...fontFamilys.RubikBold
    },
    smallSoraSemiBold : {
      ...textSizes.small,
      ...fontFamilys.SoraSemiBold
    },
    smallSoraBold : {
      ...textSizes.small,
      ...fontFamilys.SoraBold
    },
    normalRubikRegular : {
      ...textSizes.normal,
      ...fontFamilys.RubikRegular
    },
    normalRubikMedium : {
      ...textSizes.normal,
      ...fontFamilys.RubikMedium
    },
    normalRubikBold : {
      ...textSizes.normal,
      ...fontFamilys.RubikBold
    },
    normalSoraSemiBold : {
      ...textSizes.normal,
      ...fontFamilys.SoraSemiBold
    },
    normalSoraBold : {
      ...textSizes.normal,
      ...fontFamilys.SoraBold
    },
    mediumRubikRegular : {
      ...textSizes.medium,
      ...fontFamilys.RubikRegular
    },
    mediumRubikMedium : {
      ...textSizes.medium,
      ...fontFamilys.RubikMedium
    },
    mediumRubikBold : {
      ...textSizes.medium,
      ...fontFamilys.RubikBold
    },
    mediumSoraSemiBold : {
      ...textSizes.medium,
      ...fontFamilys.SoraSemiBold
    },
    mediumSoraBold : {
      ...textSizes.medium,
      ...fontFamilys.SoraBold
    }, 
     largeRubikRegular : {
      ...textSizes.large,
      ...fontFamilys.RubikRegular
    },
    largeRubikMedium : {
      ...textSizes.large,
      ...fontFamilys.RubikMedium
    },
    largeRubikBold : {
      ...textSizes.large,
      ...fontFamilys.RubikBold
    },
    largeSoraSemiBold : {
      ...textSizes.large,
      ...fontFamilys.SoraSemiBold
    },
    largeSoraBold : {
      ...textSizes.large,
      ...fontFamilys.SoraBold
    },
  }

  export const headerStyles = {
    smallRubikRegular : {
      ...headerSizes.small,
      ...fontFamilys.RubikRegular
    },
    smallRubikMedium : {
      ...headerSizes.small,
      ...fontFamilys.RubikMedium
    },
    smallRubikBold : {
      ...headerSizes.small,
      ...fontFamilys.RubikBold
    },
    smallSoraSemiBold : {
      ...headerSizes.small,
      ...fontFamilys.SoraSemiBold
    },
    smallSoraBold : {
      ...headerSizes.small,
      ...fontFamilys.SoraBold
    },
    normalRubikRegular : {
      ...headerSizes.normal,
      ...fontFamilys.RubikRegular
    },
    normalRubikMedium : {
      ...headerSizes.normal,
      ...fontFamilys.RubikMedium
    },
    normalRubikBold : {
      ...headerSizes.normal,
      ...fontFamilys.RubikBold
    },
    normalSoraSemiBold : {
      ...headerSizes.normal,
      ...fontFamilys.SoraSemiBold
    },
    normalSoraBold : {
      ...headerSizes.normal,
      ...fontFamilys.SoraBold
    },
    mediumRubikRegular : {
      ...headerSizes.medium,
      ...fontFamilys.RubikRegular
    },
    mediumRubikMedium : {
      ...headerSizes.medium,
      ...fontFamilys.RubikMedium
    },
    mediumRubikBold : {
      ...headerSizes.medium,
      ...fontFamilys.RubikBold
    },
    mediumSoraSemiBold : {
      ...headerSizes.medium,
      ...fontFamilys.SoraSemiBold
    },
    mediumSoraBold : {
      ...headerSizes.medium,
      ...fontFamilys.SoraBold
    }, 
     largeRubikRegular : {
      ...headerSizes.large,
      ...fontFamilys.RubikRegular
    },
    largeRubikMedium : {
      ...headerSizes.large,
      ...fontFamilys.RubikMedium
    },
    largeRubikBold : {
      ...headerSizes.large,
      ...fontFamilys.RubikBold
    },
    largeSoraSemiBold : {
      ...headerSizes.large,
      ...fontFamilys.SoraSemiBold
    },
    largeSoraBold : {
      ...headerSizes.large,
      ...fontFamilys.SoraBold
    },
  }

  export type TextStyleTypes = keyof typeof textStyles;
  export type HeaderStyleTypes = keyof typeof headerStyles;



