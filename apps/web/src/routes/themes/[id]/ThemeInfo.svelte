<script lang="ts">
	import ArrowSquareOut from 'phosphor-svelte/lib/ArrowSquareOut';
	import DownloadSimple from 'phosphor-svelte/lib/DownloadSimple';
	import type { ThemeManifest } from '$lib';
	import dayjs from 'dayjs';
	import { Button } from '$lib/components/ui/button';

	interface ThemeMetadata extends ThemeManifest {
		updatedAt?: string;
	}

	interface Props {
		theme: ThemeMetadata;
		download: string;
	}

	const { theme, download }: Props = $props();
</script>

<aside class="pb-12 md:w-64 md:shrink-0 md:pt-15 md:pb-20 lg:w-72 lg:pt-0">
	<div class="sticky top-24 space-y-6">
		<div
			class="rounded-3xl border border-neutral-800 bg-linear-to-tr from-neutral-900 to-neutral-900/25 p-5"
		>
			<div class="mb-5">
				<Button class="w-full" href={download} download={theme.name}>
					Download <DownloadSimple />
				</Button>
			</div>

			<dl class="text-sm">
				<div class="flex items-center justify-between gap-2 border-t py-3">
					<dt class="text-muted-foreground">Version</dt>
					<dd class="font-medium">{theme.version}</dd>
				</div>

				<div class="flex items-center justify-between gap-2 border-t py-3">
					<dt class="text-muted-foreground">Author</dt>
					<dd class="font-medium">{theme.author}</dd>
				</div>

				<div class="flex items-center justify-between gap-2 border-t py-3">
					<dt class="text-muted-foreground">Last Updated</dt>
					<dd class="font-medium">
						<time datetime={theme.updatedAt}>{dayjs(theme.updatedAt).format('MMMM D, YYYY')}</time>
					</dd>
				</div>

				{#if theme.repository}
					<div class="flex items-center justify-between gap-2 border-t py-3">
						<dt class="text-muted-foreground">Source</dt>

						<dd>
							<a
								class="flex items-center gap-1 font-medium text-orange-500"
								href={theme.repository}
							>
								{theme.name}
								<ArrowSquareOut class="fill-current" weight="bold" />
							</a>
						</dd>
					</div>
				{/if}
			</dl>
		</div>
	</div>
</aside>

<style>
	dl > div {
		border-image: linear-gradient(
				to right,
				--alpha(var(--color-neutral-800) / 0.3),
				var(--color-neutral-800),
				--alpha(var(--color-neutral-800) / 0.3)
			)
			1;
	}
</style>
