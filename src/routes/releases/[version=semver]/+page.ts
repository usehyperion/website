import { releases } from '$content';
import { error } from '@sveltejs/kit';

export function load({ params }) {
	const release = releases.find((r) => r.version === params.version);

	if (!release) {
		error(404, 'Release not found');
	}

	return {
		release,
		seo: {
			title: `Release ${release.version} - Hyperion`,
			description: release.summary
		}
	};
}
