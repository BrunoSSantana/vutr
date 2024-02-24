import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/server.ts'],
  splitting: false,
  sourcemap: true,
  format: 'esm',
  clean: true,
})