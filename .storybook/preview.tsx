import React from 'react';
import ThemeProvider, { Flex } from '../src/ThemeProvider';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  Story => (
    <ThemeProvider>
      <Flex flexWrap="wrap" alignItems="center" p={1} bg="black">
        <Story />
      </Flex>
    </ThemeProvider>
  ),
];
