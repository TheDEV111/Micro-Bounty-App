import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  colors: {
    brand: {
      50: '#ffe5f0',
      100: '#ffb8d6',
      200: '#ff8abc',
      300: '#ff5ca3',
      400: '#ff2e89',
      500: '#ff006f', // Primary pink
      600: '#cc0059',
      700: '#990043',
      800: '#66002c',
      900: '#330016',
    },
    gray: {
      50: '#f7f7f8',
      100: '#e8e9eb',
      200: '#d1d3d7',
      300: '#b0b3b8',
      400: '#8e9199',
      500: '#6c6f7a', // Primary gray
      600: '#575a63',
      700: '#42444b',
      800: '#2d2f34',
      900: '#18191c',
    },
    accent: {
      pink: '#ff006f',
      lightPink: '#ff5ca3',
      darkGray: '#2d2f34',
      mediumGray: '#6c6f7a',
      lightGray: '#e8e9eb',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'gray.800',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'lg',
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          },
          transition: 'all 0.3s ease',
        },
        outline: {
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'brand.50',
            transform: 'translateY(-2px)',
          },
          transition: 'all 0.3s ease',
        },
        ghost: {
          color: 'gray.600',
          _hover: {
            bg: 'gray.100',
            color: 'brand.500',
          },
        },
      },
      defaultProps: {
        variant: 'solid',
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: 'white',
          borderRadius: 'xl',
          boxShadow: 'sm',
          border: '1px solid',
          borderColor: 'gray.200',
          transition: 'all 0.3s ease',
          _hover: {
            boxShadow: 'md',
            borderColor: 'brand.300',
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: 'bold',
        color: 'gray.800',
      },
    },
    Text: {
      baseStyle: {
        color: 'gray.700',
      },
    },
    Link: {
      baseStyle: {
        color: 'brand.500',
        _hover: {
          textDecoration: 'none',
          color: 'brand.600',
        },
      },
    },
  },
  shadows: {
    outline: '0 0 0 3px rgba(255, 0, 111, 0.3)',
  },
});

export default theme;
