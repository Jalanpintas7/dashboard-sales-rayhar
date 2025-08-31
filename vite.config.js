import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	// Konfigurasi untuk static files
	build: {
		rollupOptions: {
			output: {
				assetFileNames: (assetInfo) => {
					// Pastikan file SVG tidak di-hash
					if (assetInfo.name && assetInfo.name.endsWith('.svg')) {
						return '[name][extname]';
					}
					return 'assets/[name]-[hash][extname]';
				}
			}
		}
	}
});
