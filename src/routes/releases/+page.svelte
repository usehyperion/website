<script lang="ts">
	import { releases } from '$content';
	import dayjs from 'dayjs';

	const { data } = $props();

	releases.sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix());
</script>

<hgroup class="pb-12 text-center md:pb-20">
	<h1
		class="from-foreground/50 via-foreground to-foreground/50 bg-linear-to-r bg-clip-text pb-4 text-transparent"
	>
		What's New
	</h1>

	<p class="text-muted-foreground mx-auto max-w-prose text-lg">
		{data.seo.description}
	</p>
</hgroup>

<div class="relative mx-auto max-w-3xl">
	<div
		id="timeline"
		class="after:animate-shine absolute top-4 left-0.5 -z-10 h-full w-0.5 overflow-hidden bg-neutral-800 after:absolute after:top-0 after:left-0 after:h-4 after:w-0.5 after:-translate-y-full"
		aria-hidden="true"
	></div>

	{#each releases as release (release.version)}
		{@const date = dayjs(release.date)}

		<article class="group pt-12 first-of-type:pt-0">
			<div class="md:flex">
				<div class="w-48 shrink-0">
					<time
						class={[
							'mb-3 inline-flex items-center bg-linear-to-r from-orange-500 to-orange-200 bg-clip-text text-sm font-medium text-transparent',
							'before:size-1.5 before:rounded-full before:bg-orange-500 before:ring-4 before:ring-orange-500/30'
						]}
						datetime={date.toISOString()}
					>
						<span class="ml-6.5 md:ml-5">{date.format('MMM D, YYYY')}</span>
					</time>
				</div>

				<div
					class="release ml-8 grow space-y-3 border-b pb-12 group-last-of-type:border-none group-last-of-type:pb-0 md:ml-0"
				>
					<h2
						class="from-foreground/50 via-foreground to-foreground/50 bg-linear-to-r bg-clip-text font-mono text-xl leading-8 font-medium text-transparent"
					>
						{release.version}
					</h2>

					<div
						class="prose prose-p:leading-relaxed prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline prose-strong:font-medium text-foreground max-w-none"
					>
						<p>{release.summary}</p>
					</div>

					<a
						class="inline-block text-sm font-medium text-orange-500 transition-colors hover:text-orange-400"
						href="/releases/{release.version}"
					>
						Read More
					</a>
				</div>
			</div>
		</article>
	{/each}
</div>

<style>
	#timeline {
		mask-image: linear-gradient(0deg, transparent, #fff 150px, #fff);

		@variant after {
			background-image: linear-gradient(
				180deg,
				transparent,
				--alpha(var(--color-orange-500) / 65%) 25%,
				var(--color-orange-200) 50%,
				--alpha(var(--color-orange-500) / 65%) 75%,
				transparent
			);
		}
	}

	.release {
		border-image: linear-gradient(
				to right,
				--alpha(var(--color-neutral-700) / 30%),
				var(--color-neutral-700),
				--alpha(var(--color-neutral-700) / 30%)
			)
			1;
	}
</style>
