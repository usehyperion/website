<script lang="ts">
	import { cn } from '$lib/utils';
	import type { SvelteHTMLElements } from 'svelte/elements';

	const { children, class: className, ...rest }: SvelteHTMLElements['div'] = $props();
</script>

<div
	class={cn(
		'bg-border relative h-full overflow-hidden rounded-3xl p-px',
		'before:pointer-events-none before:absolute before:-top-48 before:-left-48 before:z-30 before:size-96 before:translate-x-(--mouse-x) before:translate-y-(--mouse-y) before:rounded-full before:bg-orange-500 before:opacity-0 before:blur-[100px] before:transition-opacity before:duration-500 hover:before:opacity-20',
		'after:absolute after:inset-0 after:z-10 after:rounded-[inherit] after:opacity-0 after:transition-opacity after:duration-500 group-hover:after:opacity-100',
		className
	)}
	data-slot="spotlight-item"
	{...rest}
>
	{@render children?.()}
</div>

<style>
	[data-slot='spotlight-item'] {
		background-image: radial-gradient(
			250px circle at var(--mouse-x) var(--mouse-y),
			var(--color-orange-300),
			transparent
		);
	}
</style>
