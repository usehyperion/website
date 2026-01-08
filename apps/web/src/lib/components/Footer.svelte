<script lang="ts">
	import logo from '$lib/assets/logo.svg';

	const links = [
		{
			title: 'Features',
			href: '/#features'
		},
		{
			title: 'Themes',
			href: '/themes'
		},
		{
			title: 'Releases',
			href: '/releases'
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

<footer
	class="mx-auto max-w-5xl border-t px-6 py-16 [border-image:linear-gradient(to_right,transparent,var(--color-neutral-800),transparent)1]"
>
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
</footer>
