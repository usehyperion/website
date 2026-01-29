import { octokit, type ThemeManifest } from '$lib';

const seo = {
	title: 'Themes - Hyperion',
	description:
		'Explore a variety of community-created themes for Hyperion to customize your experience.'
};

export async function load({ fetch }) {
	const { data } = await octokit.rest.repos.getContent({
		owner: 'usehyperion',
		repo: 'themes',
		path: 'themes'
	});

	if (!Array.isArray(data)) {
		return { themes: [], seo };
	}

	const requests = data
		.filter((dir) => dir.type === 'dir')
		.map(async (dir) => {
			try {
				const base = `https://raw.githubusercontent.com/usehyperion/themes/main/${dir.path}`;

				const manifest: ThemeManifest = await fetch(`${base}/manifest.json`).then((res) =>
					res.json()
				);

				return {
					...manifest,
					id: dir.name,
					preview: `${base}/preview.png`
				};
			} catch {
				return null;
			}
		});

	return {
		themes: (await Promise.all(requests)).filter((t) => t !== null),
		seo
	};
}
