<script lang="ts">
	import GithubLogo from "phosphor-svelte/lib/GithubLogoIcon";
	import Button from "./Button.svelte";
</script>

<section id="contribute" class="border-t">
	<div class="frame px-8">
		<div class="flex flex-col gap-6 py-10 md:py-14">
			<header class="max-w-xl">
				<h2 class="mt-3">Built in the open. Contributions welcome.</h2>

				<p class="mt-4 max-w-prose">
					Hyperion is open source and welcomes contributions from the community. Whether
					you're a developer or a passionate chatter, there are many ways to get involved.
				</p>
			</header>

			<Button class="self-start" href="https://github.com/usehyperion/hyperion" size="lg">
				<GithubLogo weight="bold" />
				Contribute on GitHub
			</Button>
		</div>
	</div>

	<div class="border-t">
		<div class="frame flex flex-wrap items-center gap-x-3 gap-y-2 px-8 py-3 text-xs">
			<a
				class="transition-colors hover:text-accent"
				href="https://github.com/usehyperion/hyperion/blob/main/COPYING">GPL-3.0 licensed</a
			>

			<span class="text-border">/</span>

			<a
				class="transition-colors hover:text-accent"
				href="https://github.com/usehyperion/hyperion"
			>
				usehyperion/hyperion
			</a>

			<span class="grow"></span>
			<span class="">v0.1.0 beta</span>
		</div>
	</div>
</section>
