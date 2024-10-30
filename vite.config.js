import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        watch: resolve(__dirname, "src/watch/watchList.html"),
        stock: resolve(__dirname, "src/stock/index.html"),
        details: resolve(__dirname, "src/stock/details.html"),
        analysis: resolve(__dirname, "src/stock/analysis.html"),
      },
    },
  },
});
