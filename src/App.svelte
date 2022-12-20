<script lang="ts">
	import type {
		TypesPanels,
		EventInputType,
		ISettingsEditor,
		TypesPositionsPanels
	} from "./components/interface";

	import Header from "./components/common/header.svelte";
	import Footer from "./components/common/footer.svelte";
	import Actions from "./components/ui/actions.svelte";
	import WorkingArea from "./components/ui/working-area.svelte";
	import Panel from "./components/common/panel.svelte";
	import { arrayTools } from "./components/data";

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
		const isValidPosition = newPosition === "left" || newPosition === "right" || newPosition === "top";

		const isValidTypePanel = typePanel === "layersPanel" || typePanel === "toolsPanel";

		if (!isValidPosition || !isValidTypePanel) {
			throw new Error("The transmitted values are not valid. Something went wrong... Panel rearrangement is not possible.");
		}

		if (newPosition === settingsEditor[typePanel].position) {
			return;
		}

		function permutationOfValues(currentTypePanel: TypesPanels, newPos: TypesPositionsPanels, oppositePanel: TypesPanels): void {
			if (newPos === "top") {
				settingsEditor = { ...settingsEditor, [currentTypePanel]: { ...settingsEditor[currentTypePanel], position: newPos } };
			}

			if (newPos === "left" && settingsEditor[oppositePanel].position !== "top") {
				settingsEditor = { ...settingsEditor, [currentTypePanel]: { ...settingsEditor[currentTypePanel], position: newPos }, [oppositePanel]: { ...settingsEditor[oppositePanel], position: "right" } };
			}

			if (newPos === "right" && settingsEditor[oppositePanel].position !== "top") {
				settingsEditor = { ...settingsEditor, [currentTypePanel]: { ...settingsEditor[currentTypePanel], position: newPos }, [oppositePanel]: { ...settingsEditor[oppositePanel], position: "left" } };
			}
		}

		if (typePanel === "toolsPanel") {
			permutationOfValues("toolsPanel", newPosition, "layersPanel");

		} else {
			permutationOfValues("layersPanel", newPosition, "toolsPanel");
		}
	}

	let classesParent = "block-content";

</script>

<div class="wrapper">
	<main class="wrapper__content block-content {settingsEditor.theme}">
		<Header nameFile={settingsEditor.nameCurrentFile} onUpdateInputFileName={handlerInputFileName} />
		<Actions theme={settingsEditor.theme} onUpdateTheme={handlerUpdateTheme} />
		{#if settingsEditor.toolsPanel.position === "top"}
			<Panel dataForRender={arrayTools} classes={classesParent} onUpdatePanelPosition={handlerUpdatePanelPosition} onUpdatePanelStatus={handlerUpdatePanelStatus} title="Инструменты:" targetState={settingsEditor.toolsPanel} typePanel="toolsPanel" />
		{/if}
		{#if settingsEditor.layersPanel.position === "top"}
			<Panel classes={classesParent} onUpdatePanelPosition={handlerUpdatePanelPosition} onUpdatePanelStatus={handlerUpdatePanelStatus} title="Слои:" targetState={settingsEditor.layersPanel} typePanel="layersPanel" />
		{/if}
		<WorkingArea onUpdatePanelPosition={handlerUpdatePanelPosition} onUpdatePanelStatus={handlerUpdatePanelStatus} layersPanel={settingsEditor.layersPanel} toolsPanel={settingsEditor.toolsPanel} />
		<Footer />
	</main>
</div>
