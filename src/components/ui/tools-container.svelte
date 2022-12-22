<script lang="ts">
	import Brush from "../../tools/Brush";
	import Rect from "../../tools/Rect";
	import Circle from "../../tools/Circle";
	import Eraser from "../../tools/Eraser";
	import Line from "../../tools/Line";
	import type { Tool, ICanvas } from "../../interface";

	export let canvas: ICanvas | undefined = undefined;

	if (canvas === undefined) {
		throw new Error("The canvas state should be passed to the component");
	}

	$: canvasHTML = canvas!.getCanvasHTML();

	export let onChangeTool = (tool: Tool): void => console.log(`выбран инструмент ${tool}`);
</script>

<div>
	<button
			on:click={() => onChangeTool(new Brush(canvasHTML))}
	>
		Кисть
	</button>
	<button
			on:click={() => onChangeTool(new Rect(canvasHTML))}
	>
		прямоугольник
	</button>
	<button
			on:click={() => onChangeTool(new Circle(canvasHTML))}
	>
		круг
	</button>
	<button
			on:click={() => onChangeTool(new Eraser(canvasHTML))}
	>
		ластик
	</button>
	<button
			on:click={() => onChangeTool(new Line(canvasHTML))}
	>
		линия
	</button>
</div>
