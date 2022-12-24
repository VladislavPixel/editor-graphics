<script lang="ts">
	import Brush from "../../tools/Brush";
	import Rect from "../../tools/Rect";
	import Circle from "../../tools/Circle";
	import Eraser from "../../tools/Eraser";
	import Line from "../../tools/Line";
	import type { Tool, ICanvas } from "../../interface";

	export let classesParent: string = "undefined";

	export let canvas: ICanvas | undefined;

	if (canvas === undefined) {
		throw new Error("The canvas state should be passed to the component");
	}

	$: canvasHTML = canvas!.getCanvasHTML();

	export let onChangeTool = (tool: Tool): void => console.log(`выбран инструмент ${tool}`);
</script>

<div class="{classesParent}__tools-block tools">
	<button type="button" class="tools__btn" on:click={() => onChangeTool(new Brush(canvasHTML))}>
		Кисть
	</button>
	<button type="button" class="tools__btn" on:click={() => onChangeTool(new Rect(canvasHTML))}>
		Прямоугольник
	</button>
	<button type="button" class="tools__btn" on:click={() => onChangeTool(new Circle(canvasHTML))}>
		Круг
	</button>
	<button type="button" class="tools__btn" on:click={() => onChangeTool(new Eraser(canvasHTML))}>
		Ластик
	</button>
	<button type="button" class="tools__btn" on:click={() => onChangeTool(new Line(canvasHTML))}>
		Линия
	</button>
</div>
