import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "React Custom Template",
        short_name: "React Custom Template",
        description: "To develop apps with best practices",
        display: "fullscreen",
        theme_color: "#26c6da",
        background_color: "#26c6da",
      },
      registerType: "autoUpdate",
      workbox: {
        cleanupOutdatedCaches: true,
      },
    }),
  ],
  resolve: {
    alias: {
      src: __dirname + "/src",
    },
  },
});
