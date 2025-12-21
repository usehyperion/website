<script lang="ts">
	import List from 'phosphor-svelte/lib/List';
	import X from 'phosphor-svelte/lib/X';
	import logo from '$lib/assets/logo.svg';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { fly } from 'svelte/transition';

	const links = [
		{ title: 'Features', href: '#features' },
		{ title: 'Docs', href: '/docs' },
		{ title: 'Releases', href: '/releases' }
	];

	let menuOpen = $state(false);
	let scrolled = $state(false);
</script>

<svelte:window onscroll={() => (scrolled = scrollY > 100)} />

<header>
	<nav class="fixed z-50 w-full px-2" data-state={menuOpen ? 'open' : 'closed'}>
		<div
			class={cn(
				'mx-auto mt-2 max-w-6xl px-6 transition-all duration-500 ease-out lg:px-10',
				scrolled && 'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5'
			)}
		>
			<div class="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
				<div class="flex w-full justify-between lg:w-auto">
					<a class="inline-flex items-center gap-1" href="/" aria-label="Go home">
						<img class="size-8" src={logo} alt="Hyperion logo" width="32" height="32" />
					</a>

					<button
						class="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
						aria-label={menuOpen ? 'Close menu' : 'Open menu'}
						onclick={() => (menuOpen = !menuOpen)}
					>
						<List
							class={[
								'm-auto size-6 duration-200',
								'in-data-[state=open]:scale-0 in-data-[state=open]:rotate-180 in-data-[state=open]:opacity-0'
							]}
						/>

						<X
							class={[
								'absolute inset-0 m-auto size-6 scale-0 -rotate-180 opacity-0 duration-200',
								'in-data-[state=open]:scale-100 in-data-[state=open]:rotate-0 in-data-[state=open]:opacity-100'
							]}
						/>
					</button>
				</div>

				<div class="absolute inset-0 m-auto hidden size-fit lg:block">
					<ul class="flex gap-8 text-sm">
						{@render navItems()}
					</ul>
				</div>

				{#if menuOpen}
					<div
						class="bg-background/50 mb-6 block w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 backdrop-blur-lg md:flex-nowrap lg:hidden dark:shadow-none"
						transition:fly={{ y: -10, duration: 200 }}
					>
						<div class="lg:hidden">
							<ul class="space-y-6 text-base">
								{@render navItems()}
							</ul>
						</div>

						<div class="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
							<Button
								class="lg:inline-flex"
								href="https://github.com/usehyperion/hyperion/releases"
								size="sm"
							>
								Download
							</Button>
						</div>
					</div>
				{/if}

				<div
					class="hidden lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none"
				>
					<div class="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
						<Button
							class="lg:inline-flex"
							href="https://github.com/usehyperion/hyperion/releases"
							size="sm"
						>
							Download
						</Button>
					</div>
				</div>
			</div>
		</div>
	</nav>
</header>

{#snippet navItems()}
	{#each links as link, i (i)}
		<li>
			<a
				class="text-muted-foreground hover:text-accent-foreground block duration-150"
				href={link.href}
			>
				{link.title}
			</a>
		</li>
	{/each}
{/snippet}
