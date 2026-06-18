import cloudflare from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess()],
	extensions: [".svelte", ".md"],
	kit: {
		adapter: cloudflare(),
		alias: {
			$content: "./.velite",
		},
	},
};

export default config;
