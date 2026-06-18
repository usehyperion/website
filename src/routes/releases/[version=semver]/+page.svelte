<script lang="ts">
	import dayjs from "dayjs";
	import ArrowLeft from "phosphor-svelte/lib/ArrowLeftIcon";

	const { data } = $props();

	const date = $derived(dayjs(data.release.date));
</script>

<a
	class="group inline-flex items-center gap-1.5 text-sm transition-colors hover:text-accent"
	href="/releases"
>
	<ArrowLeft class="size-4 transition-transform group-hover:-translate-x-0.5" weight="bold" />
	All releases
</a>

<div class="mt-8 border-b pb-6">
	<time class="font-mono text-xs tracking-wide uppercase" datetime={date.toISOString()}>
		{date.format("MMMM D, YYYY")}
	</time>

	<h1 class="mt-2 text-4xl font-medium sm:text-5xl">
		{data.release.version}
	</h1>
</div>

<div class="prose mt-8 max-w-none space-y-4">
	{@html data.release.content}
</div>

<style>
	.prose :global {
		a {
			color: var(--color-accent);

			@variant hover {
				text-decoration: underline;
			}
		}
	}
</style>
