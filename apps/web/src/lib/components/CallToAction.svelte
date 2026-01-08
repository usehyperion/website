<script lang="ts">
	import ArrowRight from 'phosphor-svelte/lib/ArrowRight';
	import type { SvelteHTMLElements } from 'svelte/elements';

	const { children, ...rest }: Omit<SvelteHTMLElements['a'], 'class'> = $props();
</script>

<div
	class="relative inline-flex before:absolute before:inset-0 before:bg-orange-500 before:blur-md"
>
	<a
		class={[
			'text-foreground/80 hover:text-foreground group relative inline-flex items-center justify-center rounded-full border border-transparent px-3 py-0.5 text-sm font-medium shadow-sm transition ease-in-out',
			'before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-neutral-800/50'
		]}
		data-slot="cta"
		{...rest}
	>
		<span class="relative inline-flex items-center">
			{@render children?.()}

			<span class="ml-1 transition-transform group-hover:translate-x-0.5">
				<ArrowRight />
			</span>
		</span>
	</a>
</div>

<style>
	[data-slot='cta'] {
		background:
			linear-gradient(var(--color-orange-500), var(--color-orange-500)) padding-box,
			linear-gradient(var(--color-orange-500), var(--color-orange-200) 75%, transparent 100%)
				border-box;
	}
</style>
