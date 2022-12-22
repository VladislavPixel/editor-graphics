<script lang="ts">
	import Brush from "../../tools/Brush";
	import Rect from "../../tools/Rect";
	import Circle from "../../tools/Circle";
	import Eraser from "../../tools/Eraser";
	import Line from "../../tools/Line";
	import type { Tool } from "../interface";

	export let canvas: HTMLCanvasElement | null = null;

	export let onChangeTool = (tool: Tool): void => console.log(`выбран инструмент ${tool}`);
</script>

<div>
	<button
			on:click={() => onChangeTool(new Brush(canvas))}
	>
		Кисть
	</button>
	<button
			on:click={() => onChangeTool(new Rect(canvas))}
	>
		прямоугольник
	</button>
	<button
			on:click={() => onChangeTool(new Circle(canvas))}
	>
		круг
	</button>
	<button
			on:click={() => onChangeTool(new Eraser(canvas))}
	>
		ластик
	</button>
	<button
			on:click={() => onChangeTool(new Line(canvas))}
	>
		линия
	</button>
</div>

<style lang="scss">

</style>
