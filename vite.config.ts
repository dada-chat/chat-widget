import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
// npm install -D vite-plugin-css-injected-by-js

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin()],
  build: {
    lib: {
      entry: "src/main.tsx",
      name: "DadaChatWidget",
      formats: ["iife"],
      fileName: () => "widget.js",
    },
    cssCodeSplit: false, // css 주입
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
  define: {
    "process.env.NODE_ENV": '"production"', // process 접근 자체를 무력화
    process: {},
  },
});
