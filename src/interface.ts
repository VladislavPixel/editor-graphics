import type { storeNameFile } from "./store/store-name-current-file";
import type { storeThemeEditor } from "./store/store-theme-editor";
import type { storeToolsPanel } from "./store/store-tools-panel";
import type { storeLayersPanel } from "./store/store-layers-panel";
import type { storeFooterPanel } from "./store/store-footer-panel";
import type { storeCanvas } from "./store/store-canvas";
import type { storeCurrentTool } from "./store/store-current-tool";
import type { storeModal } from "./store/store-modal";
import type Brush from "./tools/Brush";
import type Rect from "./tools/Rect";
import type Circle from "./tools/Circle";
import type Eraser from "./tools/Eraser";
import type Line from "./tools/Line";

import type {
	TypeUpdatePanelStatus,
	TypeUpdatePanelPosition,
	TypeUpdateInputFileName,
	TypeUpdateTheme,
	TypeSetCanvas,
	TypeChangeCanvas,
	TypeChangeTool,
	TypeChangeTypeModal
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

export type Tool = Brush | Rect | Circle | Eraser | Line;

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
	getCanvasHTML(): HTMLCanvasElement | null;
	initCanvas(el: HTMLCanvasElement): void;
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
};

export interface ISetteingPanel {
	_id: number;
	title: string;
	imagePath: string;
	type: TypesPositionsPanels;
};
