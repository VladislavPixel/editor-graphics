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

		if (!isValidPosition || !isValidTypePanel) {
			throw new Error("The transmitted values are not valid. Something went wrong... Panel rearrangement is not possible.");
		}

		function permutationOfValues(currentTypePanel: TypesPanels, newPos: TypesPositionsPanels): void {
			// ОБНОВИТЬ В ЭТОМ МЕСТЕ И ЕСЛИ боттом, то просто менять и все
			settingsEditor = { ...settingsEditor, layersPanel: { ...settingsEditor["layersPanel"], position: "left" }, [typePanel]: { ...settingsEditor[typePanel], position: newPosition } };
		}

		if (typePanel === "toolsPanel") {
			permutationOfValues("toolsPanel", newPosition);
		}

		if (typePanel === "layersPanel") {
			permutationOfValues("layersPanel", newPosition);
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
