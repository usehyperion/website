<script lang="ts">
	import ArrowRight from "phosphor-svelte/lib/ArrowRightIcon";
	import Bell from "phosphor-svelte/lib/BellIcon";
	import Highlighter from "phosphor-svelte/lib/HighlighterIcon";
	import Layout from "phosphor-svelte/lib/LayoutIcon";
	import Paintbrush from "phosphor-svelte/lib/PaintBrushIcon";
	import PushPin from "phosphor-svelte/lib/PushPinIcon";
	import PuzzlePiece from "phosphor-svelte/lib/PuzzlePieceIcon";
	import ShieldCheck from "phosphor-svelte/lib/ShieldCheckIcon";
	import Smiley from "phosphor-svelte/lib/SmileyIcon";
	import UserSwitch from "phosphor-svelte/lib/UserSwitchIcon";
	import type { Component } from "svelte";
	import highlights from "$lib/assets/highlights.png";
	import splitViews from "$lib/assets/split-views.png";
	import themeBubblegum from "$lib/assets/theme-bubblegum.png";
	import themeSolarDusk from "$lib/assets/theme-solar-dusk.png";
	import themeVioletBloom from "$lib/assets/theme-violet-bloom.png";

	const themes = [
		{ src: themeBubblegum, name: "Bubblegum" },
		{ src: themeVioletBloom, name: "Violet Bloom" },
		{ src: themeSolarDusk, name: "Solar Dusk" },
	];

	const features = [
		{
			icon: Smiley,
			title: "Emotes",
			description:
				"All of your favorite Twitch emotes, plus support for BetterTTV, FrankerFaceZ, and 7TV.",
		},
		{
			icon: ShieldCheck,
			title: "Moderation tools",
			description:
				"Powerful tools right at your fingertips to keep your chat safe and welcoming.",
		},
		{
			icon: PushPin,
			title: "Pinned channels",
			description:
				"Keep your favorite channels front and center for instant, one-click access.",
		},
		{
			icon: Bell,
			title: "Notifications",
			description:
				"Never miss a moment with notifications for mentions, whispers, and streams.",
			planned: true,
		},
		{
			icon: PuzzlePiece,
			title: "Plugins",
			description:
				"Extend your experience endlessly with community-built plugins and custom scripts.",
			planned: true,
		},
		{
			icon: UserSwitch,
			title: "Account switcher",
			description:
				"Easily switch between multiple Twitch accounts without needing to reauthenticate.",
			planned: true,
		},
	];
</script>

<section id="features" class="border-t">
	<header class="border-b">
		<div class="frame px-8 py-12">
			<h2 class="mt-3 max-w-2xl">A chat client that keeps up with the busiest streams.</h2>
		</div>
	</header>

	<div class="border-b">
		<div class="frame grid md:grid-cols-2">
			<div class="flex flex-col justify-center gap-4 p-8">
				{@render hgroup(Paintbrush, "Customizable")}

				<p class="max-w-prose">
					Restyle the entire interface with custom CSS. Write your own or install themes
					built by the community.
				</p>

				<a
					class="group inline-flex w-fit items-center gap-1.5 text-sm font-medium transition-colors hover:text-accent"
					href="/themes"
				>
					Explore themes
					<ArrowRight class="size-4 transition-transform group-hover:translate-x-0.5" />
				</a>
			</div>

			<div class="grid grid-cols-3 gap-px border-t bg-border md:border-t-0 md:border-l">
				{#each themes as theme (theme.name)}
					<figure class="flex flex-col bg-background last:border-r">
						<enhanced:img
							class="aspect-3/4 w-full object-cover object-top-left"
							src={theme.src}
							alt="The {theme.name} theme applied to Hyperion"
						/>

						<figcaption class="border-t px-3 py-2 text-xs text-muted-foreground">
							{theme.name}
						</figcaption>
					</figure>
				{/each}
			</div>
		</div>
	</div>

	<div class="border-b">
		<div class="frame grid md:grid-cols-2">
			{@render showcase(
				Layout,
				"Split views",
				"Participate in multiple chats simultaneously with a flexible drag-and-drop layout.",
				splitViews,
				false,
			)}

			{@render showcase(
				Highlighter,
				"Highlights",
				"Easily highlight important messages in chat based on keywords or viewer types.",
				highlights,
				true,
			)}
		</div>
	</div>

	<div class="frame px-px">
		<div class="grid grid-cols-2 gap-px bg-border lg:grid-cols-3">
			{#each features as feature (feature.title)}
				<div class="bg-background px-5 py-8 sm:px-6">
					<feature.icon class="size-5 text-accent" weight="bold" />

					<div class="mt-3 flex items-center gap-2.5">
						<h3 class="text-base font-semibold">{feature.title}</h3>

						{#if feature.planned}
							<span
								class=" border px-1.5 py-0.5 text-[0.625rem] tracking-wide text-muted-foreground uppercase"
							>
								Planned
							</span>
						{/if}
					</div>

					<p class="mt-1.5 text-sm text-muted-foreground">
						{feature.description}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>

{#snippet hgroup(Icon: Component, title: string)}
	<h3 class="inline-flex items-center gap-2 text-xl">
		<Icon class="size-5 text-accent" weight="bold" />
		{title}
	</h3>
{/snippet}

{#snippet showcase(
	Icon: Component,
	title: string,
	description: string,
	image: string,
	bordered: boolean,
)}
	<div class={["flex flex-col", bordered && " border-t md:border-t-0 md:border-l"]}>
		<div class={["flex flex-col gap-3 p-8", bordered ? "md:pl-10" : "md:pr-10"]}>
			{@render hgroup(Icon, title)}
			<p class="max-w-prose">{description}</p>
		</div>

		<div class={["mt-auto h-72 overflow-hidden border-t md:h-80"]}>
			<enhanced:img
				class="block size-full object-cover object-top"
				src={image}
				alt="{title} in Hyperion"
			/>
		</div>
	</div>
{/snippet}
