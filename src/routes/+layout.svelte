<script lang="ts">
	import '../app.css';
	import logo from '$lib/assets/logo.svg';
	import Header from '$lib/components/Header.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={logo} />
</svelte:head>

<ModeWatcher />
<Header />

<div class="flex min-h-screen flex-col overflow-clip">
	<main class="grow">
		{@render children()}
	</main>
</div>

<Footer />
