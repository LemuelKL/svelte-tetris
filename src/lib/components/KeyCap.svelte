<script lang="ts">
	export let char: string;
	export let active: boolean = false;
</script>

{#if active}
	<div class="bg-slate-200 rounded-sm text-center font-mono aspect-square">{char}</div>
{:else}
	<div class="bg-slate-400 rounded-sm text-center font-mono aspect-square">{char}</div>
{/if}
