import { s } from 'velite';
import { defineConfig } from 'velite';

export default defineConfig({
	root: './src/content',
	collections: {
		releases: {
			name: 'Release',
			pattern: 'releases/*.md',
			schema: s.object({
				date: s.string(),
				version: s.string(),
				summary: s.string(),
				content: s.markdown()
			})
		}
	}
});
