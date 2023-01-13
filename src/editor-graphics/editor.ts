import { get } from "svelte/store";
import { storeThemeEditor } from "../store/store-theme-editor";
import { storeToolsPanel } from "../store/store-tools-panel";
import { storeLayersPanel } from "../store/store-layers-panel";
import { storeNameFile } from "../store/store-name-current-file";
import { storeFooterPanel } from "../store/store-footer-panel";
import { storeCanvas } from "../store/store-canvas";
import { storeCurrentTool } from "../store/store-current-tool";
import { storeModal } from "../store/store-modal";
import type { IModal, ModalTypes, ModalType, CurrentToolType, ICanvas, CanvasType, Theme, IEditor, IPanel, Tool, EventInputType, TypesPanels, TypesPositionsPanels, ToolsPanelType, ThemeEditorType, LayersPanelType, NameFileType, FooterPanelType } from "../interface";

export type TypeUpdatePanelStatus = (typePanel: string) => void;

export type TypeUpdatePanelPosition = (newPosition: string, typePanel: string) => void;

export type TypeUpdateInputFileName = ({ currentTarget }: EventInputType) => void;

export type TypeUpdateTheme = () => void;

export type TypeSetCanvas = () => void;

export type TypeChangeCanvas = (canvas: HTMLCanvasElement) => void;

export type TypeChangeTool = (tool: Tool) => void;

export type TypeChangeTypeModal = (newType: ModalTypes) => void;

export type TypeUpdateSizeCanvas = (width: string, height: string) => void;

class Editor implements IEditor {
	nameCurrentFile: NameFileType;

	theme: ThemeEditorType;

	toolsPanel: ToolsPanelType;

	layersPanel: LayersPanelType;

	footerPanel: FooterPanelType;

	currentTool: CurrentToolType;

	canvas: CanvasType;

	updatePanelStatus: TypeUpdatePanelStatus;

	updatePanelPosition: TypeUpdatePanelPosition;

	updateInputFileName: TypeUpdateInputFileName;

	updateTheme: TypeUpdateTheme;

	setCanvas: TypeSetCanvas;

	changeCanvas: TypeChangeCanvas;

	changeTool: TypeChangeTool;

	modal: ModalType;

	changeTypeModal: TypeChangeTypeModal;

	updateSizeCanvas: TypeUpdateSizeCanvas;

	constructor() {
		this.nameCurrentFile = storeNameFile;
		this.theme = storeThemeEditor;
		this.toolsPanel = storeToolsPanel;
		this.layersPanel = storeLayersPanel;
		this.footerPanel = storeFooterPanel;
		this.currentTool = storeCurrentTool;
		this.canvas = storeCanvas;
		this.modal = storeModal;
		this.updatePanelStatus = this.#updatePanelStatus.bind(this);
		this.updateInputFileName = this.#updateInputFileName.bind(this);
		this.updateTheme = this.#updateTheme.bind(this);
		this.updatePanelPosition = this.#updatePanelPosition.bind(this);
		this.setCanvas = this.#setCanvas.bind(this);
		this.changeCanvas = this.#changeCanvas.bind(this);
		this.changeTool = this.#changeTool.bind(this);
		this.changeTypeModal = this.#changeTypeModal.bind(this);
		this.updateSizeCanvas = this.#updateSizeCanvas.bind(this);
	}

	#updateSizeCanvas(width: string, height: string): void {
		this.canvas.update((value: ICanvas) => {
			value.updateSize(width, height);

			return value;
		});
	}

	#changeTypeModal(newType: ModalTypes): void {
		this.modal.update((value: IModal) => {
			value.changeTypeModal(newType);

			return value;
		});
	}

	#updateInputFileName({ currentTarget }: EventInputType): void {
		if (currentTarget) {
			this.nameCurrentFile.update((value: string) => {
				value = currentTarget.value;

				return value;
			});
		}
	}

	#updateTheme(): void {
		this.theme.update((value: Theme) => {
			if (value === "dark") {
				return "light";
			}

			return "dark";
		});
	}

	#changeTool(tool: Tool): void {
		this.currentTool.update((value: Tool | null) => {
			value = tool;

			return value;
		});
	}

	#changeCanvas(canvas: HTMLCanvasElement): void {
		this.canvas.update((value: ICanvas): ICanvas => {
			value.initCanvas(canvas);

			value.ctx = canvas.getContext("2d");

			const valueToolStore = get(this.currentTool);

			if (valueToolStore) {
				valueToolStore.drawingTool.canvas = canvas;

				valueToolStore.drawingTool.ctx = value.ctx;

				valueToolStore.listen();
			}

			value.presentationImageData = value.ctx!.createImageData(value.width, value.height);

			value.addLayer();

			return value;
		});
	}

	#setCanvas(): void {
		this.canvas.update((value: ICanvas): ICanvas => {
			if (value.isCanvas === false) {
				value.isCanvas = true;
			} else {
				value.addLayer();
			}

			return value;
		});
	}

	#updatePanelStatus(typePanel: string): void {
		const isValidTypePanel = typePanel === "layersPanel" || typePanel === "toolsPanel" || typePanel === "footerPanel";

		if (isValidTypePanel) {
			this[typePanel].update((value: IPanel): IPanel => {
				value.status = !value.status;

				return value;
			});
		}
	}

	#updatePanelPosition(newPosition: string, typePanel: string): void {
		const isValidPosition = newPosition === "left" || newPosition === "right" || newPosition === "top";

		const isValidTypePanel = typePanel === "layersPanel" || typePanel === "toolsPanel";

		if (!isValidPosition || !isValidTypePanel) {
			throw new Error("The transmitted values are not valid. Something went wrong... Panel rearrangement is not possible.");
		}

		const valuePanel = get(this[typePanel]);

		if (newPosition === valuePanel.position) {
			return;
		}

		const permutationOfValues = (currentTypePanel: TypesPanels, newPos: TypesPositionsPanels, oppositePanel: TypesPanels): void => {
			if (newPos === "top") {
				this[currentTypePanel].update((value: IPanel): IPanel => {
					value.position = newPos;

					return value;
				});

				return;
			}

			const valueOppositePanel = get(this[oppositePanel]);

			if (newPos === "left" && valueOppositePanel.position !== "top") {
				this[currentTypePanel].update((value: IPanel): IPanel => {
					value.position = newPos;

					return value;
				});

				this[oppositePanel].update((value: IPanel): IPanel => {
					value.position = "right";

					return value;
				});

				return;
			}

			if (newPos === "right" && valueOppositePanel.position !== "top") {
				this[currentTypePanel].update((value: IPanel): IPanel => {
					value.position = newPos;

					return value;
				});

				this[oppositePanel].update((value: IPanel): IPanel => {
					value.position = "left";

					return value;
				});

				return;
			}

			this[currentTypePanel].update((value: IPanel): IPanel => {
				value.position = newPos;

				return value;
			});
		};

		if (typePanel === "toolsPanel") {
			permutationOfValues("toolsPanel", newPosition, "layersPanel");
		} else {
			permutationOfValues("layersPanel", newPosition, "toolsPanel");
		}
	}
}

export { Editor };
