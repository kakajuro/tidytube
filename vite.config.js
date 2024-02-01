import { crx } from "@crxjs/vite-plugin";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import manifest from "./manifest.json";

export default defineConfig({
  plugins: [svelte(), crx({ manifest })],
});
