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

export interface ISettingsEditor {
	nameCurrentFile: string;
	theme: string;
	toolsPanel: {
		position: string;
		status: boolean;
	};
	layersPanel: {
		position: string;
		status: boolean;
	};
	footerPanel: {
		status: boolean;
	};
	currentTool: Tool | null;
	canvas: HTMLCanvasElement | null;
};
