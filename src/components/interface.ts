export interface IAction {
  _id: number;
  title: string;
  type: string;
}

export type EventInputType = Event & { currentTarget: EventTarget & HTMLInputElement; };

export interface ISettingsEditor {
  theme: string;
  toolsPanel: {
    position: string;
    status: boolean;
  },
  layersPanel: {
    position: string;
    status: boolean;
  },
  footerPanel: {
    status: boolean;
  }
}
