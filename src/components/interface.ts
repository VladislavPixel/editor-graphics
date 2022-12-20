export interface IAction {
	_id: number;
	title: string;
	type: string;
}

export type EventInputType = Event & { currentTarget: EventTarget & HTMLInputElement };

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
};

export interface ISetteingPanel {
	_id: number;
	title: string;
	imagePath: string;
	type: string;
}
