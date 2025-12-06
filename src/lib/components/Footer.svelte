<script lang="ts">
	import logo from '$lib/assets/logo.svg';

	const links = [
		{
			title: 'Features',
			href: '#features'
		},
		{
			title: 'Docs',
			href: '/docs'
		},
		{
			title: 'Changelog',
			href: '/changelog'
		},
		{
			title: 'Report an issue',
			href: 'https://github.com/usehyperion/hyperion/issues/new?template=bug_report.yml'
		},
		{
			title: 'Suggest a feature',
			href: 'https://github.com/usehyperion/hyperion/issues/new?template=feature_request.yml'
		}
	];
</script>

<footer class="py-16">
	<div class="mx-auto max-w-5xl px-6">
		<a class="mx-auto block size-fit" href="/" aria-label="Go home">
			<img class="size-8" src={logo} alt="Hyperion logo" width="32" height="32" />
		</a>

		<nav class="my-8 flex flex-wrap justify-center gap-6 text-sm">
			{#each links as link, i (i)}
				<a class="text-muted-foreground hover:text-primary duration-150" href={link.href}>
					{link.title}
				</a>
			{/each}
		</nav>

		<span class="text-muted-foreground block text-center text-sm">
			&copy; {new Date().getFullYear()} Hyperion
		</span>
	</div>
</footer>
