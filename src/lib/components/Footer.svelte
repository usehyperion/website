<script lang="ts">
	import logo from "$lib/assets/logo.svg";

	const links = [
		{ title: "Features", href: "/#features" },
		{ title: "Themes", href: "/themes" },
		{ title: "Releases", href: "/releases" },
		{
			title: "Report an issue",
			href: "https://github.com/usehyperion/hyperion/issues/new?template=bug_report.yml",
		},
		{
			title: "Suggest a feature",
			href: "https://github.com/usehyperion/hyperion/issues/new?template=feature_request.yml",
		},
	];

	const year = new Date().getFullYear();
</script>

<footer class=" mt-auto border-t">
	<div class="frame flex flex-col gap-8 p-8 md:flex-row md:items-center md:justify-between">
		<a class="group inline-flex items-center gap-2.5" href="/" aria-label="Hyperion home">
			<img src={logo} alt="Hyperion logo" class="size-6" />
			<span class="font-display text-sm font-semibold tracking-tight">Hyperion</span>
		</a>

		<nav class="flex flex-wrap gap-x-6 gap-y-3">
			{#each links as link (link.href)}
				<a
					class="text-sm tracking-wide text-muted-foreground transition-colors hover:text-accent"
					href={link.href}
				>
					{link.title}
				</a>
			{/each}
		</nav>

		<span class="text-sm text-muted-foreground">&copy; {year} Hyperion</span>
	</div>
</footer>
