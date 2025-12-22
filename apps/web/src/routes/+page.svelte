<script lang="ts">
	import Contribute from '$lib/components/Contribute.svelte';
	import Features from '$lib/components/Features.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import preview from '$lib/assets/preview.png';
</script>

<Hero />

<div class="mx-auto max-w-6xl pt-10 pb-2">
	<enhanced:img src={preview} alt="Preview of the application" />
</div>

<Features />
<Contribute />
