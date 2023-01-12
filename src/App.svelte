<script lang="ts">
	import type { IEditor, IPanel, ICanvas, IModal, Theme, Tool } from "./interface";

	import { descriptionToolsPanel, descriptionLayersPanel } from "./consts";

	import Header from "./components/common/header.svelte";
	import Footer from "./components/common/footer.svelte";
	import Actions from "./components/ui/actions.svelte";
	import WorkingArea from "./components/ui/working-area.svelte";
	import Panel from "./components/common/panel.svelte";
	import Layers from "./components/ui/layers.svelte";
	import ToolsContainer from "./components/ui/tools-container.svelte";
	import Modal from "./components/common/modal.svelte";

	import { Editor } from "./editor-graphics/editor";

	import { storeThemeEditor } from "./store/store-theme-editor";
	import { storeToolsPanel } from "./store/store-tools-panel";
	import { storeLayersPanel } from "./store/store-layers-panel";
	import { storeNameFile } from "./store/store-name-current-file";
	import { storeFooterPanel } from "./store/store-footer-panel";
	import { storeCanvas } from "./store/store-canvas";
	import { storeModal } from "./store/store-modal";
	import { storeCurrentTool } from "./store/store-current-tool";

	export const stateEditor: IEditor = new Editor();

	let theme: Theme = "dark";

	let toolsPanel: IPanel = {
		position: "left",
		status: true
	};

	let layersPanel: IPanel = {
		position: "right",
		status: true
	};

	let footerPanel: IPanel = {
		status: true,
		position: "bottom"
	};

	let nameFile: string = "";

	let canvas: undefined | ICanvas;

	let modal: undefined | IModal;

	let currentTool: null | Tool;

	storeThemeEditor.subscribe(value => {
		theme = value;
	});

	storeToolsPanel.subscribe(value => {
		toolsPanel = value;
	});

	storeLayersPanel.subscribe(value => {
		layersPanel = value;
	});

	storeNameFile.subscribe(value => {
		nameFile = value;
	});

	storeFooterPanel.subscribe(value => {
		footerPanel = value;
	});

	storeCanvas.subscribe(value => {
		canvas = value;
	});

	storeModal.subscribe(value => {
		modal = value;
	});

	if (canvas === undefined || modal === undefined) {
		throw new Error("Canvas and Modal instances has been init in Editor.");
	}

	storeCurrentTool.subscribe(value => {
		currentTool = value;
	});

	let classesParent = "block-content";
</script>

<div class="wrapper">
	<main class="wrapper__content block-content {theme}">
		<Header {nameFile} onUpdateInputFileName={stateEditor.updateInputFileName}/>
		<Actions onClickAction={stateEditor.changeTypeModal} {theme} onUpdateTheme={stateEditor.updateTheme}/>
		{#if toolsPanel.position === "top"}
			<Panel description={descriptionToolsPanel} {classesParent} onUpdatePanelPosition={stateEditor.updatePanelPosition} onUpdatePanelStatus={stateEditor.updatePanelStatus} title="Инструменты:" targetState={toolsPanel} typePanel="toolsPanel">
				<ToolsContainer {classesParent} {canvas} {currentTool} onChangeTool={stateEditor.changeTool} />
			</Panel>
		{/if}
		{#if layersPanel.position === "top"}
			<Panel description={descriptionLayersPanel} {classesParent} onUpdatePanelPosition={stateEditor.updatePanelPosition} onUpdatePanelStatus={stateEditor.updatePanelStatus} title="Слои:" targetState={layersPanel} typePanel="layersPanel">
				<Layers {canvas} onCreateCanvas={stateEditor.setCanvas} {classesParent} />
			</Panel>
		{/if}
		<WorkingArea onCreateCanvas={stateEditor.setCanvas} {currentTool} {canvas} onChangeCanvas={stateEditor.changeCanvas} onChangeTool={stateEditor.changeTool} onUpdatePanelPosition={stateEditor.updatePanelPosition} onUpdatePanelStatus={stateEditor.updatePanelStatus} {layersPanel} {toolsPanel} />
		<Footer {footerPanel} onUpdatePanelStatus={stateEditor.updatePanelStatus} />
	</main>
	{#if modal?.currentTypeModal !== "action-undefined"}
		<Modal onUpdateSizeCanvas={stateEditor.updateSizeCanvas} onClickAction={stateEditor.changeTypeModal} {modal} {classesParent} />
	{/if}
</div>
