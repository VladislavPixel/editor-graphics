<script lang="ts">
	import CanvasBlock from "./canvas-block.svelte";
	import Panel from "../common/panel.svelte";

	let classesParent = "area-working";

	export let layersPanel = {
		position: "bottom",
		status: true
	};

	export let toolsPanel = {
		position: "bottom",
		status: true
	};

	export let onUpdatePanelStatus = (typePanel: string): void => console.log("update panel status");

	export let onUpdatePanelPosition = (newPosition: string, typePanel: string): void => console.log("update panel position");
</script>

<div class="block-content__working-area area-working">
	<Panel classes={classesParent} {onUpdatePanelPosition} {onUpdatePanelStatus} title="Инструменты:" targetState={toolsPanel} typePanel="toolsPanel" />
	<CanvasBlock />
	<Panel classes={classesParent} {onUpdatePanelPosition} {onUpdatePanelStatus} title="Слои:" targetState={layersPanel} typePanel="layersPanel" />
</div>
