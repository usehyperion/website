<script lang="ts">
	import DownloadSimple from 'phosphor-svelte/lib/DownloadSimple';
	import glowBottom from '$lib/assets/glow-bottom.svg';
	import Particles from '$lib/components/Particles.svelte';
	import { Button } from '$lib/components/ui/button';
	import CallToAction from './CallToAction.svelte';
</script>

<section id="hero" class="relative mx-auto max-w-6xl px-4 sm:px-6">
	<Particles class="absolute inset-0 -z-10" />

	<div
		class="pointer-events-none absolute inset-0 -z-10 -mx-28 overflow-hidden rounded-b-[3rem]"
		aria-hidden="true"
	>
		<div class="absolute bottom-0 left-1/2 -z-10 -translate-x-1/2">
			<img class="max-w-none" src={glowBottom} alt="" width="2146" height="774" />
		</div>
	</div>

	<div class="pt-32 pb-16 md:pt-52 md:pb-32">
		<div class="mx-auto max-w-4xl text-center">
			<CallToAction href="https://github.com/usehyperion/hyperion/releases">
				Hyperion is now in beta
			</CallToAction>

			<h1
				class="from-foreground/50 via-foreground to-foreground/50 bg-linear-to-r bg-clip-text py-4 text-transparent"
			>
				Chat Smarter with Hyperion
			</h1>

			<p class="mx-auto max-w-prose pb-10 text-lg">
				Elevate your stream experience with a next-generation Twitch chat client. Fast, modern, and
				fully loaded with the features you need.
			</p>

			<div
				class="mx-auto max-w-xs space-y-4 sm:inline-flex sm:max-w-none sm:justify-center sm:space-y-0 sm:space-x-4"
			>
				<Button href="https://github.com/usehyperion/hyperion/releases">
					<DownloadSimple />
					Download
				</Button>

				<Button href="#features" variant="secondary">Explore features</Button>
			</div>
		</div>
	</div>
</section>
