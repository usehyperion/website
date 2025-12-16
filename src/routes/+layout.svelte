<script lang="ts">
	import '../app.css';
	import logo from '$lib/assets/logo.svg';
	import ogDefault from '$lib/assets/og-default.jpg';
	import Header from '$lib/components/Header.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/state';

	const { children } = $props();

	const { image = ogDefault, ...seo } = $derived(page.data.seo);
</script>

<svelte:head>
	<link rel="icon" href={logo} />

	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Hyperion" />
	<meta property="og:url" content={page.url.href} />
	<meta property="og:title" content={seo.title} />
	<meta property="og:description" content={seo.description} />
	<meta property="og:image" content={image} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={seo.title} />
	<meta name="twitter:description" content={seo.description} />
	<meta name="twitter:image" content={image} />
</svelte:head>

<ModeWatcher />
<Header />

<div class="flex min-h-screen flex-col overflow-clip">
	<main class="grow">
		{@render children()}
	</main>
</div>

<Footer />
