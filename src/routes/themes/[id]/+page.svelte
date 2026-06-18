<script lang="ts">
	import ArrowLeft from "phosphor-svelte/lib/ArrowLeftIcon";
	import ThemeInfo from "./ThemeInfo.svelte";

	const { data } = $props();
</script>

<div class="frame px-8 pt-28 pb-20 md:pt-32">
	<a
		class="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-accent"
		href="/themes"
	>
		<ArrowLeft class="size-4 transition-transform group-hover:-translate-x-0.5" weight="bold" />
		All themes
	</a>

	<div class="mt-8 flex flex-col gap-10 lg:flex-row lg:gap-16">
		<div class="min-w-0 grow">
			<div class=" border">
				<img
					class="w-full object-cover"
					src={data.theme.preview}
					width="640"
					height="360"
					alt="Preview of {data.theme.name}"
				/>
			</div>

			<div
				class="prose prose-neutral dark:prose-invert prose-headings:font-semibold prose-a:font-medium prose-a:text-accent prose-a:no-underline hover:prose-a:underline mt-10 max-w-none **:[.anchor]:hidden"
			>
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html data.readme}
			</div>
		</div>

		<ThemeInfo theme={data.theme} download={data.download} />
	</div>
</div>
