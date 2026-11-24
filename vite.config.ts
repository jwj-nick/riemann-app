/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { contentMd } from './scripts/vite-content-md';

export default defineConfig({
  base: '/riemann-app/',
  plugins: [contentMd(), react()],
  test: { environment: 'node' },
});
