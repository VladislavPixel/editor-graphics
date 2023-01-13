import type {
	IAction,
	ISetteingPanel,
	IToolElementForUI
} from "./interface";

import SidebarTop from "./assets/sidebar-top.svg";
import SidebarLeft from "./assets/sidebar-left.svg";
import SidebarRight from "./assets/sidebar-right.svg";
import BrushTool from "./assets/brush-tool.svg";
import RectangleTool from "./assets/rectangle-tool.svg";
import CircleTool from "./assets/circle-tool.svg";
import EraserTool from "./assets/eraser-tool.svg";
import LineTool from "./assets/line-tool.svg";

import { Brush } from "./tools/brush";
import { Rect } from "./tools/rect";
import { Circle } from "./tools/circle";
import { Eraser } from "./tools/eraser";
import { Line } from "./tools/line";

export const arrayActions: IAction[] = [
	{ _id: 0, title: "Сохранить", type: "action-file-save" },
	{ _id: 1, title: "Очистить полотно", type: "action-clean-canvas" },
	{ _id: 2, title: "Установить размер полотна", type: "action-size-canvas" }
];

export const arraySettingForPanel: ISetteingPanel[] = [
	{ _id: 0, title: "Закрепить сверху", imagePath: SidebarTop, type: "top" },
	{ _id: 1, title: "Закрепить слева", imagePath: SidebarLeft, type: "left" },
	{ _id: 2, title: "Закрепить справа", imagePath: SidebarRight, type: "right" }
];

export const arrayTools: IToolElementForUI[] = [
	{ _id: 0, imgPath: BrushTool, imgTitle: "кисть", constructorClass: Brush },
	{ _id: 1, imgPath: RectangleTool, imgTitle: "прямоугольник", constructorClass: Rect },
	{ _id: 2, imgPath: CircleTool, imgTitle: "круг", constructorClass: Circle },
	{ _id: 3, imgPath: EraserTool, imgTitle: "ластик", constructorClass: Eraser },
	{ _id: 4, imgPath: LineTool, imgTitle: "линия", constructorClass: Line }
];
