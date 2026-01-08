<script lang="ts">
	import ArrowLeft from 'phosphor-svelte/lib/ArrowLeft';
	import GlowDecoration from '$lib/components/GlowDecoration.svelte';
	import ThemeInfo from './ThemeInfo.svelte';

	const { data } = $props();
</script>

<div class="relative">
	<GlowDecoration />

	<div class="mx-auto max-w-6xl gap-14 px-4 pt-32 sm:px-6 md:flex md:justify-between md:pt-40">
		<div class="pb-12 md:grow md:pb-20">
			<div class="flex flex-col gap-y-6 lg:flex-row lg:gap-x-16 lg:gap-y-0">
				<div class="shrink-0">
					<div class="sticky top-24">
						<a class="group flex items-center gap-2" href="/themes">
							<ArrowLeft
								class="fill-orange-500 transition-transform group-hover:-translate-x-0.5"
								weight="bold"
							/>

							<span class="text-sm font-medium">Back</span>
						</a>
					</div>
				</div>

				<div class="pb-12">
					<div
						class="mb-8 aspect-video rounded-3xl border border-neutral-300/10 bg-neutral-700/20 p-4"
					>
						<img
							class="w-full rounded-2xl"
							src={data.theme.preview}
							width="640"
							height="360"
							alt=""
						/>
					</div>

					<div
						class={[
							'prose text-muted-foreground max-w-none **:[.anchor]:hidden',
							'prose-headings:text-foreground prose-h1:font-bold prose-h1:text-xl prose-h1:mt-8 prose-h1:mb-4',
							'prose-p:leading-relaxed prose-strong:text-foreground prose-strong:font-medium',
							'prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline'
						]}
					>
						{@html data.readme}
					</div>
				</div>
			</div>
		</div>

		<ThemeInfo theme={data.theme} download={data.download} />
	</div>
</div>
