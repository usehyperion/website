<script lang="ts">
	import { toggleMode, mode } from "mode-watcher";
	import List from "phosphor-svelte/lib/List";
	import Moon from "phosphor-svelte/lib/Moon";
	import Sun from "phosphor-svelte/lib/Sun";
	import X from "phosphor-svelte/lib/X";
	import { fly } from "svelte/transition";
	import logo from "$lib/assets/logo.svg";
	import Button from "$lib/components/Button.svelte";

	const links = [
		{ title: "Features", href: "/#features" },
		{ title: "Themes", href: "/themes" },
		{ title: "Releases", href: "/releases" },
	];

	let menuOpen = $state(false);
</script>

<header class="fixed inset-x-0 top-0 z-50">
	<nav class=" border-b bg-background">
		<div class="frame flex items-center justify-between gap-4 py-3">
			<a class="group inline-flex items-center gap-2.5" href="/" aria-label="Hyperion home">
				<img src={logo} alt="Hyperion logo" class="size-6" />
				<span class="font-display text-base font-semibold">Hyperion</span>
			</a>

			<ul class="hidden items-center gap-8 lg:flex">
				{#each links as link (link.href)}
					<li>
						<a
							class="text-sm text-muted-foreground transition-colors hover:text-accent"
							href={link.href}
						>
							{link.title}
						</a>
					</li>
				{/each}
			</ul>

			<div class="flex items-center gap-2">
				<button
					class=" grid size-9 place-items-center border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
					onclick={toggleMode}
					aria-label="Toggle color mode"
				>
					{#if mode.current === "light"}
						<Sun class="size-4" />
					{:else}
						<Moon class="size-4" />
					{/if}
				</button>

				<Button class="hidden lg:inline-flex" href="/download" size="sm">Download</Button>

				<button
					class=" grid size-9 place-items-center border text-muted-foreground transition-colors hover:border-accent hover:text-accent lg:hidden"
					aria-label={menuOpen ? "Close menu" : "Open menu"}
					aria-expanded={menuOpen}
					onclick={() => (menuOpen = !menuOpen)}
				>
					{#if menuOpen}
						<X class="size-5" />
					{:else}
						<List class="size-5" />
					{/if}
				</button>
			</div>
		</div>

		{#if menuOpen}
			<div
				class=" border-t bg-background lg:hidden"
				transition:fly={{ y: -8, duration: 180 }}
			>
				<ul class="frame py-2">
					{#each links as link (link.href)}
						<li class=" border-b last:border-0">
							<a
								class="block py-3 text-sm tracking-wide text-muted-foreground uppercase transition-colors hover:text-accent"
								href={link.href}
								onclick={() => (menuOpen = false)}
							>
								{link.title}
							</a>
						</li>
					{/each}
					<li class="py-4">
						<Button class="w-full" href="/download">Download</Button>
					</li>
				</ul>
			</div>
		{/if}
	</nav>
</header>
