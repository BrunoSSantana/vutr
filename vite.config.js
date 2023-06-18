import { defaultExclude, defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    name: 'unit',
    exclude: [...defaultExclude, '**/http/**', '**/repositories/**']
  }
});
