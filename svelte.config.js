import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = { 
	kit: { 
		adapter: adapter({
			// Konfigurasi khusus untuk Netlify
			edge: false,
			split: false
		}),
		alias: {
			$lib: './src/lib'
		},
		// Memastikan file static di-copy dengan benar
		files: {
			assets: 'static'
		}
	},
	preprocess: vitePreprocess()
};

export default config;
