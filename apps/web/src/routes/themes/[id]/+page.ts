import { octokit, type ThemeManifest } from '$lib';
import { zip } from '$lib/zip.js';

export async function load({ fetch, params }) {
	const { data: readme } = await octokit.rest.repos.getReadmeInDirectory({
		mediaType: {
			format: 'html'
		},
		owner: 'usehyperion',
		repo: 'themes',
		dir: `themes/${params.id}`
	});

	const {
		data: [{ commit }]
	} = await octokit.rest.repos.listCommits({
		owner: 'usehyperion',
		repo: 'themes',
		path: `themes/${params.id}/main.css`
	});

	const base = `https://raw.githubusercontent.com/usehyperion/themes/main/themes/${params.id}`;

	const [cssBlob, manifestBlob] = await Promise.all([
		fetch(`${base}/main.css`).then((res) => res.blob()),
		fetch(`${base}/manifest.json`).then((res) => res.blob())
	]);

	const manifest: ThemeManifest = await manifestBlob.text().then(JSON.parse);

	const zipBlob = await zip([
		{ name: 'main.css', data: cssBlob },
		{ name: 'manifest.json', data: manifestBlob }
	]);

	const download = URL.createObjectURL(zipBlob);

	return {
		readme: readme as unknown as string,
		theme: {
			...manifest,
			preview: `${base}/preview.png`,
			updatedAt: commit.committer?.date
		},
		download,
		seo: {
			title: `${manifest.name} - Hyperion`,
			description: manifest.description,
			image: `${base}/preview.png`
		}
	};
}
