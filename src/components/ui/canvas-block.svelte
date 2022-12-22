<script lang="ts">
	import { onMount } from "svelte";
	import type { ICanvas } from "../../interface";

	export let canvas: ICanvas | undefined = undefined;

	if (canvas === undefined) {
		throw new Error("The canvas state should be passed to the component");
	}

	$: isCanvas = canvas!.isCanvas;

	let canvasElement;

	export let onChangeCanvas = (canvas: HTMLCanvasElement): void => console.log(canvas);

	onMount(() => {
		if (canvasElement) {
			canvas!.initCanvas(canvasElement);

			onChangeCanvas(canvasElement);
		}
	});
</script>

<div class="area-working__canvas canvas">
	{#if canvas && canvas.isCanvas}
		<canvas bind:this={canvasElement} width={canvas.width} height={canvas.height} />
	{/if}
</div>
