import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#ffe5f0' },
          100: { value: '#ffb8d6' },
          200: { value: '#ff8abc' },
          300: { value: '#ff5ca3' },
          400: { value: '#ff2e89' },
          500: { value: '#ff006f' }, // Primary pink
          600: { value: '#cc0059' },
          700: { value: '#990043' },
          800: { value: '#66002c' },
          900: { value: '#330016' },
        },
      },
      fonts: {
        heading: { value: "'Poppins', sans-serif" },
        body: { value: "'Inter', sans-serif" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
export default system;

