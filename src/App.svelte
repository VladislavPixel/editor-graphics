<script lang="ts">
	import Header from "./components/header/header.svelte";
	import Footer from "./components/footer/footer.svelte";
	import Actions from "./components/actions-container/actions.svelte";
	import WorkingArea from "./components/working-area/working-area.svelte";

	import type {
		EventInputType,
		ISettingsEditor, Tool
	} from "./components/interface";

	let settingsEditor: ISettingsEditor = {
		nameCurrentFile: "",
		theme: "dark",
		toolsPanel: {
			position: "left",
			status: true
		},
		layersPanel: {
			position: "right",
			status: true
		},
		footerPanel: {
			status: true
		},
		currentTool: null,
		canvas: null,
	};

	function handlerInputFileName({ currentTarget }: EventInputType): void {
		if (currentTarget) {
			settingsEditor = {
				...settingsEditor,
				nameCurrentFile: currentTarget.value
			};
		}
	}

	function handlerUpdateTheme(): void {
		if (settingsEditor.theme === "dark") {
			settingsEditor = {
				...settingsEditor,
				theme: "light"
			};
		} else {
			settingsEditor = {
				...settingsEditor,
				theme: "dark"
			};
		}
	}

	function onChangeTool(tool: Tool) {
		settingsEditor.currentTool = tool;
	}

	function onChangeCanvas(canvas: HTMLCanvasElement) {
		settingsEditor.canvas = canvas;
	}

	function handlerUpdatePanelStatus(typePanel: "layersPanel" | "toolsPanel"): void {
		if (typePanel) {
			settingsEditor = {
				...settingsEditor,
				[typePanel]: {
					...settingsEditor[typePanel],
					status: !settingsEditor[typePanel].status
				}
			};
		}
	}

</script>

<div class="wrapper">
    <main class="wrapper__content block-content {settingsEditor.theme}">
        <Header nameFile={settingsEditor.nameCurrentFile} onUpdateInputFileName={handlerInputFileName}/>
        <Actions theme={settingsEditor.theme} onUpdateTheme={handlerUpdateTheme}/>
        <WorkingArea canvas={settingsEditor.canvas} onChangeCanvas={onChangeCanvas} onChangeTool={onChangeTool}
                     onUpdatePanelStatus={handlerUpdatePanelStatus} layersPanel={settingsEditor.layersPanel}
                     toolsPanel={settingsEditor.toolsPanel}/>
        <Footer/>
    </main>
</div>
