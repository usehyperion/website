<script lang="ts">
	import dayjs from "dayjs";
	import ArrowSquareOut from "phosphor-svelte/lib/ArrowSquareOut";
	import DownloadSimple from "phosphor-svelte/lib/DownloadSimple";
	import type { ThemeManifest } from "$lib";
	import Button from "$lib/components/Button.svelte";

	interface ThemeMetadata extends ThemeManifest {
		updatedAt?: string;
	}

	interface Props {
		theme: ThemeMetadata;
		download: string;
	}

	const { theme, download }: Props = $props();
</script>

<aside class="shrink-0 lg:w-72">
	<div class=" sticky top-24 border">
		<div class=" border-b p-5">
			<h1 class="text-xl font-semibold">{theme.name}</h1>
			<p class="mt-1 font-mono text-sm text-muted-foreground">by {theme.author}</p>
			<Button class="mt-4 w-full" href={download} download={theme.name}>
				<DownloadSimple weight="bold" />
				Download
			</Button>
		</div>

		<dl class="text-sm">
			{@render row("Version", theme.version)}
			{@render row("Last updated", dayjs(theme.updatedAt).format("MMMM D, YYYY"))}

			{#if theme.repository}
				<div class="flex items-center justify-between gap-2 px-5 py-3">
					<dt class="font-mono text-xs tracking-wide text-muted-foreground uppercase">
						Source
					</dt>
					<dd>
						<a
							class="inline-flex items-center gap-1 font-medium transition-colors hover:text-accent hover:underline"
							href={theme.repository}
						>
							{theme.name}
							<ArrowSquareOut class="size-3.5" weight="bold" />
						</a>
					</dd>
				</div>
			{/if}
		</dl>
	</div>
</aside>

{#snippet row(label: string, value: string)}
	<div class=" flex items-center justify-between gap-2 border-b px-5 py-3 last:border-0">
		<dt class="font-mono text-xs tracking-wide text-muted-foreground uppercase">{label}</dt>
		<dd class="font-medium">{value}</dd>
	</div>
{/snippet}
