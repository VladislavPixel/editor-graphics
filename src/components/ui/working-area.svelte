<script lang="ts">
	import CanvasBlock from "./canvas-block.svelte";
	import Panel from "../common/panel.svelte";
	import Layers from "./layers.svelte";
	import ToolsContainer from "./tools-container.svelte";
	import { descriptionLayersPanel, descriptionToolsPanel } from "../../consts";
	import type { Tool } from "../interface";

	let classesParent = "area-working";

	export let layersPanel = {
		position: "top",
		status: true
	};

	export let toolsPanel = {
		position: "top",
		status: true
	};

	export let canvas: HTMLCanvasElement | null = null;

	export let onChangeTool = (tool: Tool): void => console.log(`выбран инструмент ${tool}`);

	export let onChangeCanvas = (canvas: HTMLCanvasElement): void => console.log(canvas);

	export let onUpdatePanelStatus = (typePanel: string): void => console.log("update panel status");

	export let onUpdatePanelPosition = (newPosition: string, typePanel: string): void => console.log("update panel position");

</script>

<div class="block-content__working-area area-working">
	{#if toolsPanel.position !== "top"}
		<Panel description={descriptionToolsPanel} classes={classesParent} {onUpdatePanelPosition} {onUpdatePanelStatus} title="Инструменты:" targetState={toolsPanel} typePanel="toolsPanel">
			<ToolsContainer canvas={canvas} {onChangeTool} />
		</Panel>
	{/if}
	<CanvasBlock {onChangeCanvas} />
	{#if layersPanel.position !== "top"}
		<Panel description={descriptionLayersPanel} classes={classesParent} {onUpdatePanelPosition} {onUpdatePanelStatus} title="Слои:" targetState={layersPanel} typePanel="layersPanel">
			<Layers />
		</Panel>
	{/if}
</div>
