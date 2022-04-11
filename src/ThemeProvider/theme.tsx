import { headerStyles, textStyles } from './fonts';

const shadedColor = 'rgba(122, 45, 244, 0.7)';

const toggle = {
  ...textStyles.mediumRubikRegular,
  padding: '0.625rem',
  borderRadius: '3.15rem',
  textAlign: 'center',
};

const theme = {
  space: ['0rem', '.25rem', '.5rem', '1rem', '1.5rem', '2rem', '2.5rem', '5rem', '10rem'],
  sizes: [
    '0rem',
    '0.25rem',
    '1rem',
    '1.25rem',
    '2rem',
    '2.5rem',
    '4rem',
    '6.25rem',
    '8rem',
    '10rem',
    '16rem',
    '17.5rem',
    '20rem',
  ],
  headerStyles,
  textStyles,
  borders: {
    processing: ' 1px solid #FFBF51 !important',
    none: '',
  },
  radii: ['.625rem', '.75rem'],
  colors: {
    bg: ' #0F0F13',
    bg1: ' #FFFFFF26',
    bg3: '#FFFFFF0D',
    window: '#FFFFFF33',
    paper: '#FFFFFF',
    greyPaper: '#AAAAAA',
    textGray: ' #FFFFFFB2',
    textPink: '#E478FF',
    textOcean: '#8CF1FF',
    statusGreen: '#37FF9F',
    statusRed: '#F54E4E',
    statusYellow: '#FFBF51',
    buttonActive: '#7A2DF4',
    buttonInactive: '#7A2DF426',
    fadedLink: '#AAAAAA',
    drop: '#1B1B1F',
    inactive: 'rgba(255, 255, 255, 0.15)',
    inactiveDrop: 'rgba(255, 255, 255, 0.2)',
    almostDisabled: 'rgba(255, 255, 255, 0.6)',
    inputDark: '#0F0F13',
    error: '#E84142',
    fadedWhite: 'rgba(255, 255, 255, 0.15)',
    disabled: 'rgba(255, 255, 255, 0.7)',
    almostNoWhite: 'rgba(255, 255, 255, 0.05)',
  },
  gradients: {
    buttonPrimary:
      'linear-gradient(163deg, rgba(47,168,255,1) 0%, rgba(50,169,255,1) 0%, rgba(129,40,204,1) 100%);',
    buttonSecondary:
      'radial-gradient(281.25% 870.12% at 2.78% -76.56%, rgba(50, 169, 255, 0.3) 0%, rgba(129, 40, 204, 0.3) 100%)',
    buttonFarm:
      'radial-gradient(175.28% 356.67% at 86.32% 100%, rgba(123, 63, 228, 0) 14.55%, #B185FF 83.34%)',
    empty: 'transparent !important',
    border:
      'radial-gradient( 184.37% 184.37% at -60.94% -46.88%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 61%)',
  },
  backdropFilter: {
    default: 'blur(3.5rem)',
  },
  textOverflow: {
    clip: 'clip',
    ellipsis: 'ellipsis',
  },
  whiteSpace: {
    nowrap: 'nowrap',
    preLine: 'pre-line',
  },
  textDecoration: {
    none: 'none',
    underline: 'underline',
  },
  lists: {
    none: 'none',
  },
  buttonSize: {
    default: '2.75rem',
    small: '2rem',
  },
  buttons: {
    gradient: {
      ...textStyles.mediumRubikRegular,
      borderRadius: '.75rem',
      background:
        'linear-gradient(163deg, rgba(47,168,255,1) 0%, rgba(50,169,255,1) 0%, rgba(129,40,204,1) 100%);',
      border: 'none',
      ':hover': {
        border: '1px solid rgba(255, 255, 255, 0.5)',
      },
      ':active': {
        border: 'none',
        background:
          'linear-gradient(163deg, rgba(47,168,255, 0.7) 0%, rgba(50,169,255,1) 0%, rgba(129,40,204,0.7) 100%);',
      },
      ':disabled': {
        border: 'none',
        background:
          'linear-gradient(163deg, rgba(47,168,255, 0.2) 0%, rgba(50,169,255,1) 0%, rgba(129,40,204,0.3) 100%);',
      },
    },
    simple: {
      ...textStyles.mediumRubikRegular,
      padding: '.5rem',
      borderRadius: '.75rem',
      background: '#7A2DF4',
      border: 'none',
      ':hover': {
        border: '1px solid rgba(255, 255, 255, 0.5)',
      },
      ':active': {
        border: 'none',
        background: 'rgba(122, 45, 244, 0.7)',
      },
      ':disabled': {
        border: 'none',
        background: shadedColor,
      },
    },
    icon: {
      ...textStyles.mediumRubikRegular,
      padding: '.5rem',
      borderRadius: '.75rem',
      background: '#7A2DF4',
      border: 'none',
      ':hover': {
        border: '1px solid rgba(255, 255, 255, 0.5)',
      },
      ':active': {
        border: 'none',
        background: 'rgba(122, 45, 244, 0.7)',
      },
      ':disabled': {
        border: 'none',
        background: shadedColor,
      },
    },
    small: {
      ...textStyles.mediumRubikRegular,
      borderRadius: '.625rem',
      background: '#7A2DF4',
      border: 'none',
      ':hover': {
        border: 'none',
      },
      ':disabled': {
        background: shadedColor,
      },
    },
    alert: {
      ...textStyles.mediumRubikRegular,
      borderRadius: '.75rem',
      background: '#F54E4E',
      border: 'none',
      ':hover': {
        border: '1px solid rgba(255, 255, 255, 0.5)',
      },
      ':active': {
        border: 'none',
        background: 'rgba(232, 65, 66, 0.7)',
      },
      ':disabled': {
        border: 'none',
        background: 'rgba(232, 65, 66, 0.2)',
      },
    },
    cancel: {
      ...textStyles.mediumRubikRegular,
      borderRadius: '.75rem',
      background: 'none',
      border: '1px solid #FFFFFF',
      ':hover': {
        background: 'rgba(255, 255, 255, 0.1)',
      },
      ':active': {
        border: '1px solid #FFFFFF',
        background: 'none',
      },
      ':disabled': {
        background: 'none',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      },
    },
  },
  InputStyles: {
    hiddenInput: {
      width: '0.0625rem',
      height: '0.0625rem',
      overflow: 'hidden',
      position: 'absolute',
      clip: 'rect(0 0 0 0)',
    },
  },
  ToggleStyles: {
    active: {
      ...toggle,
      color: '#FFFFFF',
      backgroundColor: '#7A2DF4',
    },
    inactive: {
      ...toggle,
      color: 'rgba(255, 255, 255, 0.7)',
      backgroundColor: 'none',
    },
  },
};

export type ButtonThemeType = keyof typeof theme.buttons;
export type ButtonSizeType = keyof typeof theme.buttonSize;
export type ButtonGradientType = keyof typeof theme.gradients;
export type BackdropFilterType = keyof typeof theme.backdropFilter;
export type InputStylesType = keyof typeof theme.InputStyles;
export type ToggleStylesType = keyof typeof theme.ToggleStyles;

export default theme;
