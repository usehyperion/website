<script lang="ts">
	import dayjs from 'dayjs';

	const { data } = $props();

	const date = $derived(dayjs(data.release.date));
</script>

<a class="text-muted-foreground hover:text-foreground text-sm transition-colors" href="/releases">
	&lt;- All Releases
</a>

<div class="pt-8">
	<h1
		class="from-foreground/50 via-foreground to-foreground/50 bg-linear-to-r bg-clip-text pb-4 font-mono text-5xl font-medium text-transparent"
	>
		{data.release.version}
	</h1>

	<time class="font-medium" datetime={date.toISOString()}>
		{date.format('MMMM D, YYYY')}
	</time>

	<div class="prose prose-neutral prose-invert max-w-none pt-8">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html data.release.content}
	</div>
</div>
