import { defaultExclude, defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    name: 'integration',
    exclude: [...defaultExclude, '**/usecases/**', '**/validation/**'],
    include: ['**/http/**/*.spec.ts', '**/repositories/**/*.spec.ts']
  }
});
