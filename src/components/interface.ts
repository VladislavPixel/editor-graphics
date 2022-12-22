import type Brush from "../tools/Brush";
import type Rect from "../tools/Rect";
import type Circle from "../tools/Circle";
import type Eraser from "../tools/Eraser";
import type Line from "../tools/Line";

export interface IAction {
	_id: number;
	title: string;
	type: string;
}

export type EventInputType = Event & { currentTarget: EventTarget & HTMLInputElement };

export type Tool = Brush | Rect | Circle | Eraser | Line;

export interface IPanel {
	position: string;
	status: boolean;
}

export type TypesPanels = "toolsPanel" | "layersPanel";

export type TypesPositionsPanels = "left" | "right" | "top";

export interface ISettingsEditor {
	nameCurrentFile: string;
	theme: string;
	toolsPanel: IPanel;
	layersPanel: IPanel;
	footerPanel: {
		status: boolean;
	};
	currentTool: Tool | null;
	canvas: HTMLCanvasElement | null;
};

export interface ISetteingPanel {
	_id: number;
	title: string;
	imagePath: string;
	type: string;
}
