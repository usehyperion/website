<script lang="ts">
	import dayjs from "dayjs";
	import AppleLogo from "phosphor-svelte/lib/AppleLogoIcon";
	import ArrowRight from "phosphor-svelte/lib/ArrowRightIcon";
	import DownloadSimple from "phosphor-svelte/lib/DownloadSimpleIcon";
	import LinuxLogo from "phosphor-svelte/lib/LinuxLogoIcon";
	import WindowsLogo from "phosphor-svelte/lib/WindowsLogoIcon";
	import type { Component } from "svelte";
	import Button from "$lib/components/Button.svelte";

	const { data } = $props();

	const repo = "https://github.com/usehyperion/hyperion";

	const base = $derived(`${repo}/releases/download/${data.version}`);
	const released = $derived(dayjs(data.date));

	interface Build {
		label: string;
		note: string;
		file: string;
		recommended?: boolean;
	}

	interface Platform {
		id: "mac" | "windows" | "linux";
		name: string;
		icon: Component;
		requirement: string;
		builds: Build[];
	}

	const platforms: Platform[] = [
		{
			id: "mac",
			name: "macOS",
			icon: AppleLogo,
			requirement: "macOS 11 Big Sur or later",
			builds: [
				{
					label: "Apple Silicon",
					note: "M1 and newer",
					file: `Hyperion-aarch64.dmg`,
					recommended: true,
				},
				{
					label: "Intel",
					note: "64-bit Macs",
					file: `Hyperion-x64.dmg`,
				},
			],
		},
		{
			id: "windows",
			name: "Windows",
			icon: WindowsLogo,
			requirement: "Windows 10 or later",
			builds: [
				{
					label: "Installer",
					note: "ARM64 · .exe",
					file: `Hyperion-arm64.exe`,
					recommended: true,
				},
				{
					label: "Installer",
					note: "64-bit · .exe",
					file: `Hyperion-x64.zip`,
				},
			],
		},
		{
			id: "linux",
			name: "Linux",
			icon: LinuxLogo,
			requirement: "Most modern distributions",
			builds: [
				{
					label: "AppImage",
					note: "Runs anywhere · x86_64",
					file: `Hyperion-amd64.AppImage`,
					recommended: true,
				},
				{
					label: "Debian / Ubuntu",
					note: ".deb",
					file: `Hyperion-amd64.deb`,
				},
			],
		},
	];

	let detected = $state<Platform["id"] | null>(null);

	$effect(() => {
		const ua = navigator.userAgent;
		const platform = navigator.platform ?? "";

		if (/Mac|iPhone|iPad|iPod/.test(ua) || /Mac/.test(platform)) {
			detected = "mac";
		} else if (/Win/.test(ua) || /Win/.test(platform)) {
			detected = "windows";
		} else if (/Linux|X11/.test(ua)) {
			detected = "linux";
		}
	});

	const detectedPlatform = $derived(platforms.find((p) => p.id === detected) ?? null);
	const heroBuild = $derived(
		detectedPlatform?.builds.find((b) => b.recommended) ?? detectedPlatform?.builds[0] ?? null,
	);
</script>

<section id="download">
	<div class="frame px-8 pt-20 pb-10 md:pt-24 md:pb-14">
		<div class="max-w-3xl">
			<h1 class="mt-3">Get Hyperion.</h1>

			<p class="mt-5 max-w-prose">
				Free and open source. Pick your platform below, or grab the build we detected for
				you. No account, no tracking, no upsell.
			</p>

			<div class="reveal mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
				{#if detectedPlatform && heroBuild}
					<Button href="{base}/{heroBuild.file}" size="lg" download>
						<DownloadSimple weight="bold" />
						Download for {detectedPlatform.name}
					</Button>
				{:else}
					<Button href="#platforms" size="lg">
						<DownloadSimple weight="bold" />
						Choose your platform
					</Button>

					<span class="text-sm text-muted-foreground">
						macOS, Windows, and Linux builds below.
					</span>
				{/if}
			</div>
		</div>
	</div>

	<div class="border-y">
		<div
			class="frame flex flex-wrap items-center gap-x-3 gap-y-2 px-8 py-3 text-xs text-muted-foreground"
		>
			<span>Latest release</span>
			<span class="text-border">/</span>
			<span>{data.version}</span>
			<span class="text-border">/</span>
			<time datetime={released.toISOString()}>Released {released.format("MMM D, YYYY")}</time>
			<span class="grow"></span>
			<a
				class="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
				href="/releases/{data.version}"
			>
				Release Notes
				<ArrowRight class="size-3.5" />
			</a>
		</div>
	</div>

	<div class="border-b">
		<div id="platforms" class="frame px-px">
			<div class="grid grid-cols-1 gap-px bg-border lg:grid-cols-3">
				{#each platforms as platform (platform.id)}
					{@const isDetected = platform.id === detected}

					<div
						class={[
							"flex flex-col bg-background",
							isDetected && "border-t border-t-accent",
						]}
					>
						<header
							class=" flex items-center justify-between border-b px-5 py-4 sm:px-6"
						>
							<div class="flex items-center gap-2.5">
								<platform.icon
									class={["size-5", isDetected && "text-accent"]}
									weight="fill"
								/>

								<h2 class="text-base font-semibold">{platform.name}</h2>
							</div>

							{#if isDetected}
								<span
									class="border border-accent px-1.5 py-0.5 text-[0.625rem] tracking-wide text-accent uppercase"
								>
									Detected
								</span>
							{/if}
						</header>

						<ul class="grow">
							{#each platform.builds as build (build.file)}
								<li class=" border-b last:border-0">
									<a
										class="group flex items-center gap-3 px-5 py-4 transition-colors hover:bg-secondary sm:px-6"
										href="{base}/{build.file}"
										download
									>
										<div class="min-w-0 grow">
											<div class="flex items-center gap-2">
												<span
													class="text-sm font-medium transition-colors group-hover:text-accent"
												>
													{build.label}
												</span>

												{#if build.recommended}
													<span
														class="text-[0.625rem] tracking-wide text-muted-foreground uppercase"
													>
														Recommended
													</span>
												{/if}
											</div>

											<span class="text-xs text-muted-foreground">
												{build.note}
											</span>
										</div>

										<DownloadSimple
											class="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent"
											weight="bold"
										/>
									</a>
								</li>
							{/each}
						</ul>

						<p class=" border-t px-5 py-3 text-xs text-muted-foreground sm:px-6">
							{platform.requirement}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
