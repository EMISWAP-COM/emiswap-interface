import { headerStyles, textStyles } from './fonts';

const shadedColor = 'rgba(122, 45, 244, 0.7)';

const theme = {
  space: [4, 8, 16, 24, 32, 40, 80, 160],
  headerStyles,
  textStyles,
  borders: {
    processing: ' 1px solid #FFBF51 !important',
    none: '',
  },
  radii: [10, 12],
  colors: {
    bg: ' #0F0F13',
    bg1: ' #FFFFFF26',
    bg3: '#FFFFFF0D',
    window: '#FFFFFF33',
    text: '#FFFFFF',
    textGray: ' #FFFFFFB2',
    textPink: '#E478FF',
    textOcean: '#8CF1FF',
    statusGreen: '#37FF9F',
    statusRed: '#F54E4E',
    statusYellow: '#FFBF51',
    buttonActive: '#7A2DF4',
    buttonInactive: '#7A2DF426',
    drop: '#1B1B1F',
    disabled: 'rgba(255, 255, 255, 0.7)',
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
  buttonSize: {
    default: '2.75rem',
    small: '2rem',
  },
  buttons: {
    gradient: {
      ...textStyles.mediumRubikRegular,
      minWidth: '9rem',
      borderRadius: 12,
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
      minWidth: 162,
      padding: '0.5rem',
      borderRadius: 12,
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
      minWidth: 109,
      padding: 8,
      borderRadius: 12,
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
      minWidth: 48,
      borderRadius: 10,
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
      minWidth: 212,
      borderRadius: 12,
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
      minWidth: 212,
      borderRadius: 12,
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
};

export type ButtonThemeType = keyof typeof theme.buttons;
export type ButtonSizeType = keyof typeof theme.buttonSize;
export type ButtonGradientType = keyof typeof theme.gradients;
export type BackdropFilterType = keyof typeof theme.backdropFilter;

export default theme;
