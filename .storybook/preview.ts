import { withThemeByClassName } from '@storybook/addon-themes';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import type { Preview } from "@storybook/react";
import { initialize, mswLoader } from 'msw-storybook-addon';

//Import tailwind css here
import '../views/styles/globals.css';

/*
* Initializes MSW
* See https://github.com/mswjs/msw-storybook-addon#configuring-msw
* to learn how to customize it
*/
initialize();


const customViewports = {
  xs: {
    name: 'XS',
    styles: {
      width: '350px',
      height: '963px',
    },
  },
  sm: {
    name: 'SM',
    styles: {
      width: '600px',
      height: '801px',
    },
  },
  md: {
    name: 'MD',
    styles: {
      width: '900px',
      height: '801px',
    },
  },
  lg: {
    name: 'LG',
    styles: {
      width: '1200px',
      height: '801px',
    },
  },
  xl: {
    name: 'XL',
    styles: {
      width: '1536px',
      height: '801px',
    },
  },
};

export const decorators = [
  withThemeByClassName({
    themes: {
      // nameOfTheme: 'classNameForTheme',
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
  })];


const preview: Preview = {
  parameters: {
    viewport: {
      viewports: {
        ...MINIMAL_VIEWPORTS,
        ...customViewports,
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [mswLoader],
};

export default preview;
