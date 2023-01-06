<script lang="ts">
	import type { ICanvas } from "../../interface";

	export let canvas: ICanvas | undefined;

	if (canvas === undefined) {
		throw new Error("The canvas state should be passed to the component");
	}

	$: isCanvas = canvas!.isCanvas;

	$: widthCanvas = canvas!.width;

	$: heightCanvas = canvas!.height;

	let canvasElement: null | undefined | HTMLCanvasElement;

	export let onChangeCanvas = (canvas: HTMLCanvasElement): void => console.log(canvas);

	$: {
		if (isCanvas && canvasElement) {
			onChangeCanvas(canvasElement);
		}
	}
</script>

<div class="area-working__canvas canvas">
	<div class="canvas__wrapper">
		{#if isCanvas}
			<canvas class="canvas__element-canvas" bind:this={canvasElement} width={widthCanvas} height={heightCanvas} />
		{/if}
	</div>
</div>
