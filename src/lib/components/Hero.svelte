<script lang="ts">
	import DownloadSimple from "phosphor-svelte/lib/DownloadSimpleIcon";
	import GithubLogo from "phosphor-svelte/lib/GithubLogoIcon";
	import previewDark from "$lib/assets/preview-dark.png?enhanced";
	import previewLight from "$lib/assets/preview-light.png?enhanced";
	import Button from "$lib/components/Button.svelte";
	import Synthesis from "./Synthesis.svelte";
</script>

<section id="hero">
	<div class="frame pt-20 md:pt-24">
		<div class="max-w-3xl px-8 pb-10 md:pb-14">
			<h1 class="mt-6">Twitch chat, built for people who live in it.</h1>

			<p class="mt-6 max-w-prose text-base">
				Elevate your stream experience with a next-generation Twitch chat client. Fast,
				modern, and fully loaded with the features you need.
			</p>

			<div class="mt-8 space-x-2">
				<Button href="/download" size="lg">
					<DownloadSimple weight="bold" />
					Download
				</Button>

				<Button
					href="https://github.com/usehyperion/hyperion"
					size="lg"
					variant="secondary"
				>
					<GithubLogo weight="bold" />
					View source
				</Button>
			</div>
		</div>
	</div>

	<div class="relative frame p-8">
		<Synthesis />

		<enhanced:img
			class="block w-full border dark:hidden"
			src={previewLight}
			alt="Hyperion's Twitch chat interface in light mode"
		/>
		<enhanced:img
			class="hidden w-full border dark:block"
			src={previewDark}
			alt="Hyperion's Twitch chat interface in dark mode"
		/>
	</div>
</section>
