import theme from 'styled-theming';

export const themeList = [
  {
    key: 'defaultLight',
    name: 'Default Light'
  },
  {
    key: 'defaultDark',
    name: 'Default Dark'
  },
];

export const rgbOrA = (r, g, b, a) => (
  !a ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a})`
);

export const colourMaps = {
  text: {
    defaultLight: 'rgba(1, 1, 1, 1)',
    defaultDark: 'rgba(255, 255, 255, 1)',
  },
  background: {
    defaultLight: 'rgba(255, 255, 255, 1)',
    defaultDark: 'rgba(0, 0, 0, 1)',
  },
  overlay: {
    defaultLight: 'rgba(255, 255, 255, 0.68)',
    defaultDark: 'rgba(0, 0, 0, 0.68)',
  },
  primary: {
    defaultDark: 'rgba(219, 128, 146, 1)',
    defaultLight: 'rgba(99, 114, 121, 1)',
  },
  secondary: {
    defaultDark: 'rgba(49, 48, 46, 1)',
    defaultLight: 'rgba(219, 234, 254, 1)',
  },
  tertiary: {
    defaultLight: 'rgba(219, 234, 254, 1)',
    defaultDark: 'rgba(0,0,0,1)',
  },
  dark: {
    defaultLight: 'rgba(0,0,0,1)',
    defaultDark: 'rgba(0,0,0,1)'
  },
  light: {
    defaultLight: 'rgba(255, 255, 255, 1)',
    defaultDark: 'rgba(255, 255, 255, 1)'
  },
  info: {
    defaultLight: 'rgba(209, 250, 229, 1)',
    defaultDark: 'rgba(59, 180, 79, 1)',
  },
  warn: {
    defaultLight: 'rgba(253, 230, 138, 1)',
    defaultDark: 'rgba(159, 159, 18, 1)',
  },
  danger: {
    defaultLight: 'rgba(248, 113, 113, 1)',
    defaultDark: 'rgba(248, 113, 113, 1)',
  }
};

export const getColourMap = () => ({
  text: theme('mode', colourMaps.text),
  background: theme('mode', colourMaps.background),
  primary: theme('mode', colourMaps.primary),
  secondary: theme('mode', colourMaps.secondary),
  tertiary: theme('mode', colourMaps.tertiary),
  dark: theme('mode', colourMaps.dark),
  light: theme('mode', colourMaps.light),
  info: theme('mode', colourMaps.info),
  warn: theme('mode', colourMaps.warn),
  danger: theme('mode', colourMaps.danger),
});
