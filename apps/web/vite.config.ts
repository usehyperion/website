import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import velite from '@velite/plugin-vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [enhancedImages(), tailwindcss(), velite(), sveltekit()],
	server: {
		fs: {
			allow: ['.velite']
		}
	}
});
