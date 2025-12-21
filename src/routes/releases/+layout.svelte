<script lang="ts">
	import { page } from '$app/state';
	import GlowDecoration from '$lib/components/GlowDecoration.svelte';

	const { children } = $props();
</script>

<div class="relative">
	<GlowDecoration />

	<div
		class={[
			'mx-auto px-4 pt-32 pb-12 sm:px-6 md:pt-40 md:pb-20',
			page.route.id === '/releases' ? 'max-w-6xl' : 'max-w-3xl'
		]}
	>
		{@render children()}
	</div>
</div>
