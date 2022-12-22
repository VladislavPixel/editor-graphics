<script lang="ts">
	import type {
		TypesPanels,
		EventInputType,
		ISettingsEditor, Tool,
		TypesPositionsPanels
	} from "./interface";

	import {
		descriptionToolsPanel,
		descriptionLayersPanel
	} from "./consts";

	import Header from "./components/common/header.svelte";
	import Footer from "./components/common/footer.svelte";
	import Actions from "./components/ui/actions.svelte";
	import WorkingArea from "./components/ui/working-area.svelte";
	import Panel from "./components/common/panel.svelte";
	import Layers from "./components/ui/layers.svelte";
	import ToolsContainer from "./components/ui/tools-container.svelte";
	import { canvas } from "./canvas/canvas";

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
		canvas: canvas
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
		settingsEditor.canvas.initCanvas(canvas);
	}

	function handlerUpdatePanelStatus(typePanel: string): void {
		const isValidTypePanel = typePanel === "layersPanel" || typePanel === "toolsPanel";

		if (isValidTypePanel) {
			settingsEditor = { ...settingsEditor,
				[typePanel]: {
					...settingsEditor[typePanel],
					status: !settingsEditor[typePanel].status
				}
			};
		}
	}

	function handlerCreateCanvas(): void {
		settingsEditor.canvas.isCanvas = true;
		console.log(settingsEditor, "SETTTT");
		settingsEditor = { ...settingsEditor };
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
				settingsEditor = { ...settingsEditor,
					[currentTypePanel]: {
						...settingsEditor[currentTypePanel],
						position: newPos
					}
				};

				return;
			}

			if (newPos === "left" && settingsEditor[oppositePanel].position !== "top") {
				settingsEditor = { ...settingsEditor,
					[currentTypePanel]: {
						...settingsEditor[currentTypePanel],
						position: newPos
					},
					[oppositePanel]: {
						...settingsEditor[oppositePanel],
						position: "right"
					}
				};

				return;
			}

			if (newPos === "right" && settingsEditor[oppositePanel].position !== "top") {
				settingsEditor = { ...settingsEditor,
					[currentTypePanel]: {
						...settingsEditor[currentTypePanel],
						position: newPos
					},
					[oppositePanel]: {
						...settingsEditor[oppositePanel],
						position: "left"
					}
				};

				return;
			}

			settingsEditor = { ...settingsEditor, [currentTypePanel]: { ...settingsEditor[currentTypePanel], position: newPos } };
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
		<Header nameFile={settingsEditor.nameCurrentFile} onUpdateInputFileName={handlerInputFileName}/>
		<Actions theme={settingsEditor.theme} onUpdateTheme={handlerUpdateTheme}/>
		{#if settingsEditor.toolsPanel.position === "top"}
			<Panel description={descriptionToolsPanel} classes={classesParent} onUpdatePanelPosition={handlerUpdatePanelPosition} onUpdatePanelStatus={handlerUpdatePanelStatus} title="Инструменты:" targetState={settingsEditor.toolsPanel} typePanel="toolsPanel">
				<ToolsContainer canvas={settingsEditor.canvas} {onChangeTool} />
			</Panel>
		{/if}
		{#if settingsEditor.layersPanel.position === "top"}
			<Panel description={descriptionLayersPanel} classes={classesParent} onUpdatePanelPosition={handlerUpdatePanelPosition} onUpdatePanelStatus={handlerUpdatePanelStatus} title="Слои:" targetState={settingsEditor.layersPanel} typePanel="layersPanel">
				<Layers {classesParent} />
			</Panel>
		{/if}
		<WorkingArea onCreateCanvas={handlerCreateCanvas} canvas={settingsEditor.canvas} onChangeCanvas={onChangeCanvas} onChangeTool={onChangeTool} onUpdatePanelPosition={handlerUpdatePanelPosition} onUpdatePanelStatus={handlerUpdatePanelStatus} layersPanel={settingsEditor.layersPanel} toolsPanel={settingsEditor.toolsPanel} />
		<Footer/>
	</main>
</div>
