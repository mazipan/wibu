import * as path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import graphql from '@rollup/plugin-graphql';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react(), graphql()],
});
