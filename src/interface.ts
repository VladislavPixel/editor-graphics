import type { storeNameFile } from "./store/store-name-current-file";
import type { storeThemeEditor } from "./store/store-theme-editor";
import type { storeToolsPanel } from "./store/store-tools-panel";
import type { storeLayersPanel } from "./store/store-layers-panel";
import type { storeFooterPanel } from "./store/store-footer-panel";
import type { storeCanvas } from "./store/store-canvas";
import type { storeCurrentTool } from "./store/store-current-tool";
import type { storeModal } from "./store/store-modal";
// import type Brush from "./tools/Brush";
// import type Rect from "./tools/Rect";
// import type Circle from "./tools/Circle";
// import type Eraser from "./tools/Eraser";
// import type Line from "./tools/Line";

import type {
	TypeUpdatePanelStatus,
	TypeUpdatePanelPosition,
	TypeUpdateInputFileName,
	TypeUpdateTheme,
	TypeSetCanvas,
	TypeChangeCanvas,
	TypeChangeTool,
	TypeChangeTypeModal,
	TypeUpdateSizeCanvas
} from "./editor-graphics/editor";

export type ToolsPanelType = typeof storeToolsPanel;
export type ThemeEditorType = typeof storeThemeEditor;
export type LayersPanelType = typeof storeLayersPanel;
export type NameFileType = typeof storeNameFile;
export type FooterPanelType = typeof storeFooterPanel;
export type CanvasType = typeof storeCanvas;
export type CurrentToolType = typeof storeCurrentTool;
export type ModalType = typeof storeModal;

export type EventInputType = Event & { currentTarget: EventTarget & HTMLInputElement };

export type TypesPanels = "toolsPanel" | "layersPanel" | "footerPanel";

export type TypesPositionsPanels = "left" | "right" | "top" | "bottom";

export type Theme = "dark" | "light";

export type ModalTypes = "action-undefined" | "action-file-save" | "action-clean-canvas" | "action-size-canvas";

export interface IAction {
	_id: number;
	title: string;
	type: ModalTypes;
};

export interface IPanel {
	position: TypesPositionsPanels;
	status: boolean;
};

export interface ICanvas {
	width: number;
	height: number;
	isCanvas: boolean;
	target: HTMLCanvasElement | null;
	counterLayers: number;
	currentLayer: number;
	presentationImageData: null | ImageData;
	ctx: null | CanvasRenderingContext2D;
	arrayForIndexesLayers: Array<Array<number>>;
	arrayForSaveLayers: ImageData[];
	draw(x: number, y: number, arrRgba: number[]): void;
	undoLayerActions(i: number): void;
	resetCanvasState(): void;
	deleteLayer(indexLayer: number): void;
	checkDataIndex(i: number): boolean;
	isShaded(i: number, currentLayerNumber: number): boolean;
	addLayer(): void;
	updateCurrentLayer(newCurrentLayer: number): void;
	getCanvasHTML(): HTMLCanvasElement | null;
	initCanvas(el: HTMLCanvasElement): void;
	updateSize(width: string | undefined, height: string | undefined): void;
};

export interface IModal {
	currentTypeModal: ModalTypes;
	changeTypeModal(newType: ModalTypes): void;
	title: string;
	offer: string;
};

export interface IEditor {
	nameCurrentFile: NameFileType;
	theme: ThemeEditorType;
	toolsPanel: ToolsPanelType;
	layersPanel: LayersPanelType;
	footerPanel: FooterPanelType;
	currentTool: CurrentToolType;
	canvas: CanvasType;
	changeTool: TypeChangeTool;
	changeCanvas: TypeChangeCanvas;
	updatePanelStatus: TypeUpdatePanelStatus;
	setCanvas: TypeSetCanvas;
	updatePanelPosition: TypeUpdatePanelPosition;
	updateInputFileName: TypeUpdateInputFileName;
	updateTheme: TypeUpdateTheme;
	modal: ModalType;
	changeTypeModal: TypeChangeTypeModal;
	updateSizeCanvas: TypeUpdateSizeCanvas;
};

export interface ISetteingPanel {
	_id: number;
	title: string;
	imagePath: string;
	type: TypesPositionsPanels;
};

export interface IDrawingTool {
	get fillColor(): string;
	get rgbaColor(): number[];
	setFillColor(color: string): void;
	get strokeColor(): string;
	setStrokeColor(color: string): void;
	get lineWidth(): number;
	setLineWidth(width: number): void;
	destroyEvents(): void;
	canvas: HTMLCanvasElement | null;
	ctx: CanvasRenderingContext2D | null;
};

export interface IBrush {
	stateCanvas: ICanvas | undefined;
	drawingTool: IDrawingTool;
	listen(): void;
	mouseUpHandler(): void;
	mouseDownHandler(e: any): void;
	mouseMoveHandler(event: any): void;
};

export type Tool = IBrush;
