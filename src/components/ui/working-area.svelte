<script lang="ts">
	import CanvasBlock from "./canvas-block.svelte";
	import Panel from "../common/panel.svelte";
	import { arrayTools } from "../data";

	let classesParent = "area-working";

	export let layersPanel = {
		position: "top",
		status: true
	};

	export let toolsPanel = {
		position: "top",
		status: true
	};

	export let onUpdatePanelStatus = (typePanel: string): void => console.log("update panel status");

	export let onUpdatePanelPosition = (newPosition: string, typePanel: string): void => console.log("update panel position");
</script>

<div class="block-content__working-area area-working">
	{#if toolsPanel.position !== "top"}
		<Panel dataForRender={arrayTools} classes={classesParent} {onUpdatePanelPosition} {onUpdatePanelStatus} title="Инструменты:" targetState={toolsPanel} typePanel="toolsPanel" />
	{/if}
	<CanvasBlock />
	{#if layersPanel.position !== "top"}
		<Panel classes={classesParent} {onUpdatePanelPosition} {onUpdatePanelStatus} title="Слои:" targetState={layersPanel} typePanel="layersPanel" />
	{/if}
</div>
