<script lang="ts">
	import ToolsPanel from "../tools-panel/tools-panel.svelte";
	import Layers from "../layers-panel/layers.svelte";
	import CanvasBlock from "../canvas/canvas-block.svelte";

	let classesParent = "area-working";

	export let layersPanel = {
		position: "left",
		status: true
	};

	export let toolsPanel = {
		position: "right",
		status: true
	};

	export let onUpdatePanelStatus = (typePanel: "layersPanel" | "toolsPanel"): void => console.log("update panel status");
</script>

<div class="block-content__working-area area-working">
	<ToolsPanel {onUpdatePanelStatus} classes={classesParent} {toolsPanel} />
	<CanvasBlock />
	<Layers {onUpdatePanelStatus} classes={classesParent} {layersPanel} />
</div>
