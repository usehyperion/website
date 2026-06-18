import { enhancedImages } from "@sveltejs/enhanced-img";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import velite from "@velite/plugin-vite";
import { defineConfig } from "vite-plus";

export default defineConfig({
	plugins: [enhancedImages(), tailwindcss(), velite(), sveltekit()],
	server: {
		fs: {
			allow: [".velite"],
		},
	},
	staged: {
		"*": "vp check --fix",
	},
	fmt: {
		tabWidth: 4,
		useTabs: true,
		svelte: true,
		sortTailwindcss: {
			stylesheet: "./src/app.css",
		},
		sortImports: {
			internalPattern: ["$"],
			newlinesBetween: false,
		},
		overrides: [
			{
				files: ["*.yml", "*.yaml"],
				options: {
					tabWidth: 2,
					useTabs: false,
				},
			},
		],
	},
	lint: {
		categories: {
			correctness: "error",
			nursery: "allow",
			pedantic: "allow",
			perf: "warn",
			restriction: "allow",
			style: "allow",
			suspicious: "warn",
		},
	},
});
