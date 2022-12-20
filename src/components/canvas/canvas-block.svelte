<script lang="ts">
	import { onMount } from 'svelte';

	let canvasElement;

	export let onChangeCanvas = (canvas: HTMLCanvasElement): void => console.log(canvas);

	onMount(() => {
		if (canvasElement) {
			onChangeCanvas(canvasElement);
		}
	});
</script>

<div class="area-working__canvas canvas">
	<canvas bind:this={canvasElement} width={1200} height={600} />
</div>;
