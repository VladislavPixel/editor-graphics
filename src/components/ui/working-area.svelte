<script lang="ts">
	import CanvasBlock from "./canvas-block.svelte";
	import Panel from "../common/panel.svelte";
	import Layers from "./layers.svelte";
	import ToolsContainer from "./tools-container.svelte";

	import { descriptionLayersPanel, descriptionToolsPanel } from "../../consts";

	import type { Tool, ICanvas, IPanel } from "../../interface";

	let classesParent = "area-working";

	export let layersPanel: IPanel = {
		position: "right",
		status: true
	};

	export let toolsPanel: IPanel = {
		position: "left",
		status: true
	};

	export let canvas: ICanvas | undefined;

	export let currentTool: Tool | null;

	if (canvas === undefined) {
		throw new Error("The canvas state should be passed to the component");
	}

	export let onCreateCanvas = (): void => console.log("problem create canvas");

	export let onChangeTool = (tool: Tool): void => console.log(`выбран инструмент ${tool}`);

	export let onChangeCanvas = (canvas: HTMLCanvasElement): void => console.log(canvas);

	export let onUpdatePanelStatus = (typePanel: string): void => console.log("update panel status");

	export let onUpdatePanelPosition = (newPosition: string, typePanel: string): void => console.log("update panel position");

</script>

<div class="block-content__working-area area-working">
	{#if toolsPanel.position !== "top"}
		<Panel description={descriptionToolsPanel} {classesParent} {onUpdatePanelPosition} {onUpdatePanelStatus} title="Инструменты:" targetState={toolsPanel} typePanel="toolsPanel">
			<ToolsContainer {classesParent} {canvas} {currentTool} {onChangeTool} />
		</Panel>
	{/if}
	<CanvasBlock {canvas} {onChangeCanvas} />
	{#if layersPanel.position !== "top"}
		<Panel description={descriptionLayersPanel} {classesParent} {onUpdatePanelPosition} {onUpdatePanelStatus} title="Слои:" targetState={layersPanel} typePanel="layersPanel">
			<Layers {canvas} {onCreateCanvas} {classesParent} />
		</Panel>
	{/if}
</div>
