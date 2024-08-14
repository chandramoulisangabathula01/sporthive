// vite.config.ts
import { defineConfig } from "file:///C:/Users/chandra%20mouli/Downloads/sporthive-cedb5de2f32a883849a3484cd4af3f970dc695d4/node_modules/vite/dist/node/index.js";
import { VitePWA } from "file:///C:/Users/chandra%20mouli/Downloads/sporthive-cedb5de2f32a883849a3484cd4af3f970dc695d4/node_modules/vite-plugin-pwa/dist/index.js";
import react from "file:///C:/Users/chandra%20mouli/Downloads/sporthive-cedb5de2f32a883849a3484cd4af3f970dc695d4/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  define: {
    "process.env": process.env
  },
  plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: true
        // For making sure that the PWA is testable from the Local dev environment
      },
      registerType: "autoUpdate",
      manifest: {
        name: "SportHive Live ",
        short_name: "SportHive",
        icons: [
          {
            "src": "/favicon.ico",
            "sizes": "64x64 32x32 24x24 16x16",
            "type": "image/x-icon"
          },
          {
            "src": "/favicon-16x16.png",
            "type": "image/png",
            "sizes": "16x16"
          },
          {
            "src": "/favicon-32x32.png",
            "type": "image/png",
            "sizes": "32x32"
          },
          {
            "src": "/pwa-192x192.png",
            "type": "image/png",
            "sizes": "192x192"
          },
          {
            "src": "/pwa-512x512.png",
            "type": "image/png",
            "sizes": "512x512",
            "purpose": "any maskable"
            // Icon format that ensures that your PWA icon looks great on all Android devices
          }
        ],
        theme_color: "#AAF"
      }
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxjaGFuZHJhIG1vdWxpXFxcXERvd25sb2Fkc1xcXFxzcG9ydGhpdmUtY2VkYjVkZTJmMzJhODgzODQ5YTM0ODRjZDRhZjNmOTcwZGM2OTVkNFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcY2hhbmRyYSBtb3VsaVxcXFxEb3dubG9hZHNcXFxcc3BvcnRoaXZlLWNlZGI1ZGUyZjMyYTg4Mzg0OWEzNDg0Y2Q0YWYzZjk3MGRjNjk1ZDRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2NoYW5kcmElMjBtb3VsaS9Eb3dubG9hZHMvc3BvcnRoaXZlLWNlZGI1ZGUyZjMyYTg4Mzg0OWEzNDg0Y2Q0YWYzZjk3MGRjNjk1ZDQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1wd2FcIjtcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGRlZmluZToge1xuICAgICdwcm9jZXNzLmVudic6IHByb2Nlc3MuZW52XG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIFZpdGVQV0Eoe1xuICAgICAgZGV2T3B0aW9uczoge1xuICAgICAgICBlbmFibGVkOiB0cnVlIC8vIEZvciBtYWtpbmcgc3VyZSB0aGF0IHRoZSBQV0EgaXMgdGVzdGFibGUgZnJvbSB0aGUgTG9jYWwgZGV2IGVudmlyb25tZW50XG4gICAgICB9LFxuICAgICAgcmVnaXN0ZXJUeXBlOiAnYXV0b1VwZGF0ZScsXG4gICAgICBtYW5pZmVzdDoge1xuICAgICAgICBuYW1lOiBcIlNwb3J0SGl2ZSBMaXZlIFwiLFxuICAgICAgICBzaG9ydF9uYW1lOiBcIlNwb3J0SGl2ZVwiLFxuICAgICAgICBpY29uczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwic3JjXCI6IFwiL2Zhdmljb24uaWNvXCIsXG4gICAgICAgICAgICBcInNpemVzXCI6IFwiNjR4NjQgMzJ4MzIgMjR4MjQgMTZ4MTZcIixcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlL3gtaWNvblwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBcInNyY1wiOiBcIi9mYXZpY29uLTE2eDE2LnBuZ1wiLFxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgICAgICBcInNpemVzXCI6IFwiMTZ4MTZcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgXCJzcmNcIjogXCIvZmF2aWNvbi0zMngzMi5wbmdcIixcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICAgICAgXCJzaXplc1wiOiBcIjMyeDMyXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwic3JjXCI6IFwiL3B3YS0xOTJ4MTkyLnBuZ1wiLFxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgICAgICBcInNpemVzXCI6IFwiMTkyeDE5MlwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBcInNyY1wiOiBcIi9wd2EtNTEyeDUxMi5wbmdcIixcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICAgICAgXCJzaXplc1wiOiBcIjUxMng1MTJcIixcbiAgICAgICAgICAgIFwicHVycG9zZVwiOiBcImFueSBtYXNrYWJsZVwiIC8vIEljb24gZm9ybWF0IHRoYXQgZW5zdXJlcyB0aGF0IHlvdXIgUFdBIGljb24gbG9va3MgZ3JlYXQgb24gYWxsIEFuZHJvaWQgZGV2aWNlc1xuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgdGhlbWVfY29sb3I6ICcjQUFGJyxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBdWIsU0FBUyxvQkFBb0I7QUFDcGQsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sV0FBVztBQUdsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFRO0FBQUEsSUFDTixlQUFlLFFBQVE7QUFBQSxFQUN6QjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLE1BQ04sWUFBWTtBQUFBLFFBQ1YsU0FBUztBQUFBO0FBQUEsTUFDWDtBQUFBLE1BQ0EsY0FBYztBQUFBLE1BQ2QsVUFBVTtBQUFBLFFBQ1IsTUFBTTtBQUFBLFFBQ04sWUFBWTtBQUFBLFFBQ1osT0FBTztBQUFBLFVBQ0w7QUFBQSxZQUNFLE9BQU87QUFBQSxZQUNQLFNBQVM7QUFBQSxZQUNULFFBQVE7QUFBQSxVQUNWO0FBQUEsVUFDQTtBQUFBLFlBQ0UsT0FBTztBQUFBLFlBQ1AsUUFBUTtBQUFBLFlBQ1IsU0FBUztBQUFBLFVBQ1g7QUFBQSxVQUNBO0FBQUEsWUFDRSxPQUFPO0FBQUEsWUFDUCxRQUFRO0FBQUEsWUFDUixTQUFTO0FBQUEsVUFDWDtBQUFBLFVBQ0E7QUFBQSxZQUNFLE9BQU87QUFBQSxZQUNQLFFBQVE7QUFBQSxZQUNSLFNBQVM7QUFBQSxVQUNYO0FBQUEsVUFDQTtBQUFBLFlBQ0UsT0FBTztBQUFBLFlBQ1AsUUFBUTtBQUFBLFlBQ1IsU0FBUztBQUFBLFlBQ1QsV0FBVztBQUFBO0FBQUEsVUFDYjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLGFBQWE7QUFBQSxNQUNmO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUVGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
