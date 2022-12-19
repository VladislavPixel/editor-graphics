<script lang="ts">
	import Header from "./components/header/header.svelte";
	import Footer from "./components/footer/footer.svelte";
	import Actions from "./components/actions-container/actions.svelte";
	import WorkingArea from "./components/working-area/working-area.svelte";

	import type {
		EventInputType,
		ISettingsEditor
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
		}
	};

	function handlerInputFileName({ currentTarget }: EventInputType): void {
		if (currentTarget) {
			settingsEditor = { ...settingsEditor, nameCurrentFile: currentTarget.value };
		}
	}

	function handlerUpdateTheme(): void {
		if (settingsEditor.theme === "dark") {
			settingsEditor = { ...settingsEditor, theme: "light" };
		} else {
			settingsEditor = { ...settingsEditor, theme: "dark" };
		}
	}

	function handlerUpdatePanelStatus(typePanel: string): void {
		const isValidTypePanel = typePanel === "layersPanel" || typePanel === "toolsPanel";

		if (isValidTypePanel) {
			settingsEditor = { ...settingsEditor, [typePanel]: { ...settingsEditor[typePanel], status: !settingsEditor[typePanel].status } };
		}
	}

	function handlerUpdatePanelPosition(newPosition: string, typePanel: string): void {
		const isValidPosition = newPosition === "left" || newPosition === "right" || newPosition === "bottom";

		const isValidTypePanel = typePanel === "layersPanel" || typePanel === "toolsPanel";
		
		if (isValidPosition && isValidTypePanel) {
			settingsEditor = { ...settingsEditor, [typePanel]: { ...settingsEditor[typePanel], position: newPosition } };
		}
	}

</script>

<div class="wrapper">
	<main class="wrapper__content block-content {settingsEditor.theme}">
		<Header nameFile={settingsEditor.nameCurrentFile} onUpdateInputFileName={handlerInputFileName} />
		<Actions theme={settingsEditor.theme} onUpdateTheme={handlerUpdateTheme} />
		<WorkingArea onUpdatePanelPosition={handlerUpdatePanelPosition} onUpdatePanelStatus={handlerUpdatePanelStatus} layersPanel={settingsEditor.layersPanel} toolsPanel={settingsEditor.toolsPanel} />
		<Footer />
	</main>
</div>
