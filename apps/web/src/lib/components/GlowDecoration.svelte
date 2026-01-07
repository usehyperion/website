<script lang="ts">
	import Particles from './Particles.svelte';
	import glow from '$lib/assets/glow-default.svg';
</script>

<div
	class="pointer-events-none absolute top-0 left-1/2 -z-10 flex aspect-square w-200 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
	aria-hidden="true"
>
	<div class="absolute inset-0 translate-z-0 rounded-full bg-orange-500/30 blur-[120px]"></div>
	<div class="absolute size-64 translate-z-0 rounded-full bg-orange-400/70 blur-[80px]"></div>
</div>

<Particles class="absolute inset-0 -z-10 h-96" quantity={15} />

<div
	class="pointer-events-none absolute left-1/2 -z-10 -mt-16 -translate-x-1/2 opacity-90 blur-2xl md:block"
	aria-hidden="true"
>
	<img src={glow} class="max-w-none" width="1440" height="427" alt="" />
</div>
