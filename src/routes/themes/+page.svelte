<script lang="ts">
	import MagnifyingGlass from "phosphor-svelte/lib/MagnifyingGlassIcon";

	const { data } = $props();

	let query = $state("");

	const themes = $derived(
		data.themes.filter((theme) => theme.name.toLowerCase().includes(query.toLowerCase())),
	);
</script>

<div class="pt-20 pb-20 md:pt-24">
	<header class="frame px-8 pb-10 md:pb-14">
		<h1 class="mt-3">Themes</h1>

		<p class="mt-4 max-w-prose">
			{data.seo.description}
		</p>
	</header>

	<search>
		<div class="border-y">
			<label class="relative frame block px-px">
				<MagnifyingGlass
					class="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
				/>

				<input
					class="h-10 w-full border border-transparent pr-3 pl-9 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-accent"
					type="search"
					placeholder="Search themes"
					aria-label="Search themes"
					bind:value={query}
				/>
			</label>
		</div>

		{#if themes.length === 0}
			<p class="mt-12 border-y px-6 py-16 text-center text-sm">
				{#if query}
					No themes match "{query}"
				{:else}
					No themes published yet. Be the first to submit one on GitHub.
				{/if}
			</p>
		{:else}
			<output class="frame grid grid-auto-fill gap-px px-px [--auto-fill-size:320px]">
				{#each themes as theme (theme.id)}
					<a
						class="group flex flex-col bg-background transition-colors"
						href="/themes/{theme.id}"
					>
						<img
							class="w-full border-b object-cover"
							src={theme.preview}
							alt="Preview of {theme.name} by {theme.author}"
							loading="lazy"
						/>

						<div class="flex grow flex-col p-4">
							<div class="flex items-baseline justify-between gap-2">
								<h2
									class="text-base font-semibold transition-colors group-hover:text-accent"
								>
									{theme.name}
								</h2>

								<span class="text-xs text-muted-foreground">{theme.author}</span>
							</div>

							<p class="mt-1.5 text-sm text-muted-foreground">
								{theme.description}
							</p>
						</div>
					</a>
				{/each}
			</output>
		{/if}
	</search>
</div>
