// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: { plugins: [tailwindcss()] },
  // the dev toolbar sits over the phone action dock
  devToolbar: { enabled: false },
});
