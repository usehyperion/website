<script lang="ts">
	const { children } = $props();
</script>

<div class="frame px-8 pt-20 pb-20 md:pt-24">
	{@render children()}
</div>
