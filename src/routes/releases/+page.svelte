<script lang="ts">
	import dayjs from "dayjs";
	import { releases } from "$content";

	const { data } = $props();

	const sorted = releases.toSorted((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix());
</script>

<header class="pb-10 md:pb-14">
	<h1 class="mt-3">What's new</h1>

	<p class="mt-4 max-w-prose">
		{data.seo.description}
	</p>
</header>

<ol class="border-l">
	{#each sorted as release (release.version)}
		{@const date = dayjs(release.date)}
		<li class="relative pb-12 pl-8 last:pb-0">
			<span
				class="absolute top-1.5 -left-1.25 size-2.5 border-2 border-background bg-accent"
				aria-hidden="true"
			></span>

			<time
				class="font-mono text-xs tracking-wide text-muted-foreground uppercase"
				datetime={date.toISOString()}
			>
				{date.format("MMM D, YYYY")}
			</time>

			<h2 class="mt-1 text-xl font-medium">{release.version}</h2>

			<p class="mt-3 text-muted-foreground">{release.summary}</p>

			<a
				class="mt-3 inline-block text-sm font-medium transition-colors hover:text-accent"
				href="/releases/{release.version}"
			>
				Read notes
			</a>
		</li>
	{/each}
</ol>
