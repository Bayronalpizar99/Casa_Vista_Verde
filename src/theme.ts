import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const colors = {
  light: {
    text: '#0b6f3c',
    background: '#f0f4f2',
    backgroundE6: '#f0f4f2E6', // Con transparencia para glassmorphism
    primary: '#292f3d',
    secondary: '#83b49c',
    accent: '#ff914d',
  },
  dark: {
    text: '#90f4c0',
    background: '#0b0f0d',
    backgroundE6: '#0b0f0dE6', // Con transparencia para glassmorphism
    primary: '#c2c8d6',
    secondary: '#4b7c64',
    accent: '#b34400',
  },
};

export const theme = extendTheme({
  config,
  colors,
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'dark.background' : 'light.background',
        color: props.colorMode === 'dark' ? 'dark.text' : 'light.text',
      },

      '::-webkit-scrollbar': {
        width: '12px',
      },
      '::-webkit-scrollbar-track': {
        background: 'transparent',
      },
      '::-webkit-scrollbar-thumb': {
        backgroundColor: props.colorMode === 'dark' ? '#c2c8d6' : '#292f3d',
        borderRadius: '10px',
        border: '2px solid transparent',
        backgroundClip: 'content-box',
      },
      
      // Para Firefox
      html: {
        scrollbarWidth: 'thin',
        scrollbarColor: `${props.colorMode === 'dark' ? '#c2c8d6' : '#292f3d'} transparent`,
      },
    }),
  },
});