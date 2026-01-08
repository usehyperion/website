<script lang="ts">
	import MagnifyingGlass from 'phosphor-svelte/lib/MagnifyingGlass';
	import GlowDecoration from '$lib/components/GlowDecoration.svelte';

	const { data } = $props();
</script>

<div class="relative">
	<GlowDecoration />

	<div class="mx-auto px-4 pt-32 pb-12 sm:px-6 md:pt-40 md:pb-20">
		<hgroup class="pb-12 text-center md:pb-20">
			<h1
				class="from-foreground/50 via-foreground to-foreground/50 bg-linear-to-r bg-clip-text pb-4 text-transparent"
			>
				Themes
			</h1>

			<p class="text-muted-foreground mx-auto max-w-prose text-lg">
				{data.seo.description}
			</p>
		</hgroup>

		<search class="mx-auto max-w-6xl">
			<div class="grid grid-cols-1">
				<MagnifyingGlass
					class="text-muted-foreground pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center"
				/>

				<input
					id="search"
					class="text-muted-foreground col-start-1 row-start-1 flex h-10 w-full items-center gap-2 rounded-full bg-white pr-3 pl-10 ring-1 ring-neutral-900/10 transition hover:ring-neutral-900/20 dark:bg-white/5 dark:ring-white/10 dark:ring-inset dark:hover:ring-white/20"
					type="search"
					placeholder="Search themes"
				/>
			</div>

			<output class="grid-auto-fill mt-6 grid">
				{#each data.themes as theme (theme.id)}
					<div
						class="relative mb-8 rounded-xl border border-neutral-300/10 bg-neutral-700/20 p-4 backdrop-blur-sm"
					>
						<a class="absolute inset-0 z-10" href="/themes/{theme.id}">
							<span class="sr-only">View details for {theme.name}</span>
						</a>

						<img
							class="w-full rounded-lg"
							src={theme.preview}
							alt="Preview of {theme.name} by {theme.author}"
						/>

						<div class="mt-4">
							<h2 class="text-lg font-medium">{theme.name}</h2>
							<span class="text-muted-foreground text-sm">by {theme.author}</span>

							<p class="text-muted-foreground mt-2 text-sm">{theme.description}</p>
						</div>
					</div>
				{/each}
			</output>
		</search>
	</div>
</div>
