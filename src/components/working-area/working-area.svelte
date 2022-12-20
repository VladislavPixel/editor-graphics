<script lang="ts">
	import ToolsPanel from "../tools-panel/tools-panel.svelte";
	import Layers from "../layers-panel/layers.svelte";
	import CanvasBlock from "../canvas/canvas-block.svelte";
	import type { Tool } from "../interface";

	let classesParent = "area-working";

	export let canvas: HTMLCanvasElement | null = null;

	export let layersPanel = {
		position: "left",
		status: true
	};

	export let toolsPanel = {
		position: "right",
		status: true
	};

	export let onUpdatePanelStatus = (typePanel: "layersPanel" | "toolsPanel"): void => console.log("update panel status");

	export let onChangeTool = (tool: Tool) => console.log(`выбран инструмент ${tool}`);

	export let onChangeCanvas = (canvas: HTMLCanvasElement) => console.log(canvas);
</script>

<div class="block-content__working-area area-working">
	<ToolsPanel {canvas} {onChangeTool} {onUpdatePanelStatus} classes={classesParent} {toolsPanel} />
	<CanvasBlock {onChangeCanvas} />
	<Layers {onUpdatePanelStatus} classes={classesParent} {layersPanel} />
</div>
