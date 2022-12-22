import type {
	IAction,
	ISetteingPanel
} from "./interface";

import SidebarTop from "../assets/sidebar-top.svg";
import SidebarLeft from "../assets/sidebar-left.svg";
import SidebarRight from "../assets/sidebar-right.svg";

export const arrayActions: IAction[] = [
	{ _id: 0, title: "Сохранить", type: "action-save" },
	{ _id: 1, title: "Очистить полотно", type: "action-clean-canvas" },
	{ _id: 2, title: "Установить размер полотна", type: "action-size-canvas" }
];

export const arraySettingForPanel: ISetteingPanel[] = [
	{ _id: 0, title: "Закрепить сверху", imagePath: SidebarTop, type: "top" },
	{ _id: 1, title: "Закрепить слева", imagePath: SidebarLeft, type: "left" },
	{ _id: 2, title: "Закрепить справа", imagePath: SidebarRight, type: "right" }
];
