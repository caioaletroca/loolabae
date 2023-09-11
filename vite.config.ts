import path from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000
  },
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		}
	},
  plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			devOptions: {
        enabled: true
      }
		})
	],
})
