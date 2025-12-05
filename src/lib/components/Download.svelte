<script lang="ts">
	import { Button } from './ui/button';
</script>

<section class="mx-auto max-w-6xl px-4 sm:px-6">
	<div class="relative overflow-hidden rounded-[3rem] px-8 py-12 md:py-20">
		<div
			class="pointer-events-none absolute top-0 left-1/2 -z-10 flex aspect-square w-1/3 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
			aria-hidden="true"
		>
			<div class="absolute inset-0 translate-z-0 rounded-full bg-orange-500/70 blur-[120px]"></div>
			<div class="absolute size-1/4 translate-z-0 rounded-full bg-orange-400 blur-2xl"></div>
		</div>

		<div
			class="pointer-events-none absolute bottom-0 left-0 -z-10 translate-y-1/2 opacity-50 blur-2xl"
			aria-hidden="true"
		>
			<svg width="434" height="427">
				<defs>
					<linearGradient id="download" x1="19.609%" x2="50%" y1="14.544%" y2="100%">
						<stop offset="0%" stop-color="#f8a837" />
						<stop offset="100%" stop-color="#fd642d" stop-opacity="0" />
					</linearGradient>
				</defs>

				<path
					d="m0 0 461 369-284 58z"
					fill="url(#download)"
					fill-rule="evenodd"
					transform="matrix(1 0 0 -1 0 427)"
				/>
			</svg>
		</div>

		<div class="mx-auto max-w-3xl text-center">
			<h2
				class="from-foreground/50 via-foreground to-foreground/50 bg-linear-to-r bg-clip-text pb-4 text-transparent"
			>
				Take control of your chat
			</h2>

			<p class="text-foreground pb-10 text-lg">
				Fast, customizable, and open source. Download the latest build and experience Twitch chat
				the way it was meant to be.
			</p>

			<Button class="text-base" href="/download" size="lg">Download</Button>
		</div>
	</div>
</section>
