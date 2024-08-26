import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#E3F2F9',
      100: '#C5E4F3',
      200: '#A2D4EC',
      300: '#7AC1E4',
      400: '#47A9DA',
      500: '#0088CC',
      600: '#007AB8',
      700: '#006BA1',
      800: '#005885',
      900: '#003F5E',
    },
    dark: {
      50: '#f0f2f5',
      100: '#d9dbe1',
      200: '#bfc3cd',
      300: '#a5abb9',
      400: '#8c94a6',
      500: '#737c93',
      600: '#5a637f',
      700: '#404b6c',
      800: '#272f58',
      900: '#0e163f',
    },
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});

export default theme;
