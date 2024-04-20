import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      html: {
        overflowY: 'scroll',
      },
    },
  },
});

export default theme;
