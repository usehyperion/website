<div class="rails pointer-events-none fixed inset-0 z-0 flex justify-center" aria-hidden="true">
	<div class="rail size-full border-x bg-background"></div>
</div>

<style>
	.rails {
		background-image: repeating-linear-gradient(
			-45deg,
			transparent,
			transparent 7px,
			var(--color-line) 7px,
			var(--color-line) 8px
		);

		.rail {
			max-width: var(--frame);
		}
	}
</style>
