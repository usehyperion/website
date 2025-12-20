<script lang="ts">
	import Paintbrush from 'phosphor-svelte/lib/PaintBrush';
	import Layout from 'phosphor-svelte/lib/Layout';
	import Highlighter from 'phosphor-svelte/lib/Highlighter';
	import ShieldCheck from 'phosphor-svelte/lib/ShieldCheck';
	import Bell from 'phosphor-svelte/lib/Bell';
	import PushPin from 'phosphor-svelte/lib/PushPin';
	import PuzzlePiece from 'phosphor-svelte/lib/PuzzlePiece';
	import UserSwitch from 'phosphor-svelte/lib/UserSwitch';
	import Smiley from 'phosphor-svelte/lib/Smiley';
	import Particles from './Particles.svelte';
	import Spotlight from './Spotlight.svelte';
	import SpotlightItem from './SpotlightItem.svelte';
	import glowTop from '$lib/assets/glow-top.svg';
	import themeBubblegum from '$lib/assets/theme-bubblegum.png';
	import themeSolarDusk from '$lib/assets/theme-solar-dusk.png';
	import themeVioletBloom from '$lib/assets/theme-violet-bloom.png';
	import splitViews from '$lib/assets/split-views.png';
	import highlights from '$lib/assets/highlights.png';
	import type { Component } from 'svelte';

	const features = [
		{
			icon: Smiley,
			title: 'Emotes',
			description:
				'All of your favorite Twitch emotes, plus support for BetterTTV, FrankerFaceZ, and 7TV.'
		},
		{
			icon: ShieldCheck,
			title: 'Moderation Tools',
			description: 'Powerful tools right at your fingertips to keep your chat safe and welcoming.'
		},
		{
			icon: PushPin,
			title: 'Pinned Channels',
			description: 'Keep your favorite channels front and center for instant, one-click access.'
		},
		{
			icon: Bell,
			title: 'Notifications',
			description: 'Never miss a moment with notifications for mentions, whispers, and streams.',
			planned: true
		},
		{
			icon: PuzzlePiece,
			title: 'Plugins',
			description:
				'Extend your experience endlessly with community-built plugins and custom scripts.',
			planned: true
		},
		{
			icon: UserSwitch,
			title: 'Account Switcher',
			description:
				'Easily switch between multiple Twitch accounts without needing to reauthenticate.',
			planned: true
		}
	];
</script>

<section id="features" class="relative">
	<div
		class="pointer-events-none absolute inset-0 -z-10 -mx-28 overflow-hidden rounded-t-[3rem]"
		aria-hidden="true"
	>
		<div class="absolute top-0 left-1/2 -z-10 -translate-x-1/2">
			<img class="max-w-none" src={glowTop} alt="" width="1404" height="658" />
		</div>
	</div>

	<div class="absolute top-0 left-1/2 -z-10 size-full -translate-x-1/2">
		<Particles class="absolute inset-0 -z-10" quantity={60} />
	</div>

	<div class="mx-auto max-w-7xl px-4 sm:px-6">
		<div class="py-16 md:pt-28">
			<header class="mx-auto max-w-3xl pb-12 text-center md:pb-20">
				<h2
					class="from-foreground/50 via-foreground to-foreground/50 text-stroke-foreground text-stroke-[0.5px] bg-linear-to-b bg-clip-text pb-4 text-transparent"
				>
					A New Modern Standard.
				</h2>

				<p class="text-foreground text-lg">
					Experience an interface designed to handle even the busiest streams without skipping a
					beat. We've packed a lightweight client with heavy-hitting features to upgrade your
					chatting experience.
				</p>
			</header>

			<Spotlight class="group grid gap-6 pb-8 md:grid-cols-12 md:pb-14">
				<SpotlightItem class="md:col-span-12">
					<div class="bg-card relative z-20 h-full overflow-hidden rounded-[inherit]">
						<div class="flex flex-col md:flex-row md:items-center md:justify-between">
							<div
								class="pointer-events-none absolute bottom-0 left-1/2 -z-10 aspect-square w-1/2 -translate-x-1/2 translate-y-1/2"
								aria-hidden="true"
							>
								<div
									class="absolute inset-0 translate-z-0 rounded-full bg-neutral-900 blur-[80px]"
								></div>
							</div>

							{@render hgroup(
								Paintbrush,
								'Customizable',
								'Tailor the interface to your aesthetic with custom CSS themes. Make your own or download themes made by the community.'
							)}

							<div
								class="grid h-64 w-full grid-cols-1 grid-rows-1 overflow-hidden max-md:-mt-6 md:h-auto md:max-h-[500px] md:pt-8"
							>
								{@render themePreview(themeBubblegum, 'translate-x-0 translate-y-0')}

								{@render themePreview(
									themeVioletBloom,
									'z-10 hidden md:inline md:translate-x-12 md:translate-y-12'
								)}

								{@render themePreview(
									themeSolarDusk,
									'z-20 hidden md:inline md:translate-x-24 md:translate-y-24'
								)}
							</div>
						</div>
					</div>
				</SpotlightItem>

				<SpotlightItem class="md:col-span-7">
					<div class="bg-card z-20 flex h-full flex-col overflow-hidden rounded-[inherit]">
						{@render hgroup(
							Layout,
							'Split Views',
							'Participate in multiple chats simultaneously with a flexible drag-and-drop layout.'
						)}

						<div class="-mt-4 h-64 w-full overflow-hidden md:h-auto md:max-h-80">
							<enhanced:img class="mx-auto max-w-full" src={splitViews} />
						</div>
					</div>
				</SpotlightItem>

				<SpotlightItem class="md:col-span-5">
					<div class="bg-card z-20 flex h-full flex-col overflow-hidden rounded-[inherit]">
						{@render hgroup(
							Highlighter,
							'Highlights',
							'Easily highlight important messages in chat based on keywords or viewer types.'
						)}

						<div class="-mt-4 h-64 w-full overflow-hidden md:h-auto md:max-h-80">
							<enhanced:img class="mx-auto max-w-full" src={highlights} />
						</div>
					</div>
				</SpotlightItem>
			</Spotlight>

			<div class="grid gap-8 md:grid-cols-3 md:px-8">
				{#each features as feature (feature.title)}
					<div>
						<div class="mb-1 flex items-center space-x-2">
							<feature.icon class="fill-orange-400" />

							<div class="inline-flex items-center">
								<span class="text-foreground font-medium">{feature.title}</span>

								{#if feature.planned}
									<span
										class="ml-3 rounded-full bg-orange-500/20 px-2 py-0.5 text-xs font-medium text-orange-400"
									>
										Planned
									</span>
								{/if}
							</div>
						</div>

						<p class="text-muted-foreground text-sm">
							{feature.description}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

{#snippet hgroup(Icon: Component, title: string, description: string)}
	<hgroup class="shrink-0 p-6 md:max-w-[480px] md:p-8">
		<h3
			class="from-foreground/80 via-foreground to-foreground/80 inline-flex items-center gap-x-2 bg-linear-to-r bg-clip-text pb-1 text-xl font-semibold text-transparent"
		>
			<Icon class="fill-orange-400" />
			{title}
		</h3>

		<p class="text-muted-foreground">
			{description}
		</p>
	</hgroup>
{/snippet}

{#snippet themePreview(src: string, className?: string)}
	<enhanced:img
		class={['col-start-1 row-start-1 mx-auto max-w-none origin-top-left scale-40', className]}
		{src}
		alt="Custom CSS theme example"
	/>
{/snippet}
