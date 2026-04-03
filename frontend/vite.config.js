import { defineConfig } from 'vite';
import react from
  '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
// import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [react(), svgr({
    exportAsDefault: true,
    svgo: true,
    svgoConfig: {
      plugins: [{
        removeViewBox: false
      }],
    },
  }),
  // VitePWA({
  //   registerType: "autoUpdate",
  //   includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
  //   manifest: false,
  //   injectManifest: {
  //     swSrc: 'src/service-worker.js',
  //   },
  //   manifestFilename: 'manifest.json' 
  // })

  ],
  css: {
    devSourcemap: true,
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
  },
});
