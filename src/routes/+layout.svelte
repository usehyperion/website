<script lang="ts">
	import "../app.css";
	import "geist-svelte/font/pixel";
	import "geist-svelte/font/mono";
	import { ModeWatcher } from "mode-watcher";
	import { page } from "$app/state";
	import logo from "$lib/assets/logo.svg";
	import ogDefault from "$lib/assets/og-default.jpg";
	import Footer from "$lib/components/Footer.svelte";
	import Header from "$lib/components/Header.svelte";
	import Rails from "$lib/components/Rails.svelte";

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

<ModeWatcher defaultMode="dark" track={false} />

<Rails />
<Header />

<div class="relative flex min-h-screen flex-col">
	<main class="z-1 grow">
		{@render children()}
	</main>

	<Footer />
</div>
