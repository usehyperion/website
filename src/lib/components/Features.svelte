<script lang="ts">
	import Particles from './Particles.svelte';
	import Spotlight from './Spotlight.svelte';
	import SpotlightItem from './SpotlightItem.svelte';
	import bell from '$lib/assets/bell.png';
	import chatBubbles from '$lib/assets/chat-bubbles.png';
	import paintbrush from '$lib/assets/paintbrush.png';
	import pin from '$lib/assets/pin.png';
	import puzzlePiece from '$lib/assets/puzzle-piece.png';
	import shield from '$lib/assets/shield.png';
	import glowTop from '$lib/assets/glow-top.svg';

	const features = [
		{
			title: 'Customizable',
			description: 'Tailor the interface to your aesthetic with custom CSS themes.',
			image: paintbrush
		},
		{
			title: 'Moderation Tools',
			description: 'Powerful tools right at your fingertips to keep your chat safe and welcoming.',
			image: shield
		},
		{
			title: 'Notifications',
			description: 'Never miss a moment with notifications for mentions, whispers, and streams.',
			image: bell,
			planned: true
		},
		{
			title: 'Pinned Channels',
			description: 'Keep your favorite channels front and center for instant, one-click access.',
			image: pin
		},
		{
			title: 'Split Views',
			description:
				'Participate in multiple chats simultaneously with a flexible drag-and-drop layout.',
			image: chatBubbles
		},
		{
			title: 'Plugins',
			description:
				'Extend your experience endlessly with community-built plugins and custom scripts.',
			image: puzzlePiece,
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
		<Particles class="absolute inset-0 -z-10" quantity={20} />
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

			<Spotlight class="grid-auto-fill grid gap-4">
				{#each features as feature, i (i)}
					<SpotlightItem>
						<div class="bg-card relative z-20 h-full overflow-hidden rounded-[inherit]">
							<div class="flex flex-col">
								<div
									class="pointer-events-none absolute bottom-0 left-1/2 -z-10 aspect-square w-1/2 -translate-x-1/2 translate-y-1/2"
									aria-hidden="true"
								>
									<div
										class="absolute inset-0 translate-z-0 rounded-full bg-neutral-800 blur-[80px]"
									></div>
								</div>

								<div class="order-1 shrink-0 p-6 pt-0 md:order-0 md:max-w-[480px] md:p-8">
									<h3
										class="from-foreground/80 via-foreground to-foreground/80 inline-flex items-center bg-linear-to-r bg-clip-text pb-1 text-xl font-semibold text-transparent"
									>
										{feature.title}

										{#if feature.planned}
											<span
												class="bg-foreground/20 text-foreground ml-3 rounded-full px-2 py-0.5 text-xs font-medium"
											>
												Planned
											</span>
										{/if}
									</h3>

									<p class="text-muted-foreground">
										{feature.description}
									</p>
								</div>

								<div class="relative h-64 w-full overflow-hidden md:h-auto md:pb-8">
									<enhanced:img
										class="absolute bottom-0 left-1/2 mx-auto w-56 max-w-none -translate-x-1/2 md:relative md:left-0 md:max-w-full md:translate-x-0"
										src={feature.image}
										alt={feature.title}
									/>
								</div>
							</div>
						</div>
					</SpotlightItem>
				{/each}
			</Spotlight>
		</div>
	</div>
</section>
