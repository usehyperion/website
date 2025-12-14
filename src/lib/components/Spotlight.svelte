<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		class?: string;
	}

	const { children, class: className }: Props = $props();

	let container = $state<HTMLElement>();
	const size = $state({ width: 0, height: 0 });

	const boxes = $derived(container ? Array.from(container.children) : []);

	function follow(event: MouseEvent) {
		if (!container) return;

		const rect = container.getBoundingClientRect();

		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		const inside = x < size.width && x > 0 && y < size.height && y > 0;
		if (!inside) return;

		for (const box of boxes) {
			if (!(box instanceof HTMLElement)) continue;

			const boxRect = box.getBoundingClientRect();

			const boxX = -(boxRect.left - rect.left) + x;
			const boxY = -(boxRect.top - rect.top) + y;

			box.style.setProperty('--mouse-x', `${boxX}px`);
			box.style.setProperty('--mouse-y', `${boxY}px`);
		}
	}
</script>

<svelte:window onmousemove={follow} />

<div
	class={['group', className]}
	bind:offsetWidth={size.width}
	bind:offsetHeight={size.height}
	bind:this={container}
>
	{@render children?.()}
</div>
