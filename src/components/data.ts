import type { IAction } from "./interface";

export const arrayActions: IAction[] = [
  { _id: 0, title: "Сохранить", type: "action-save" },
  { _id: 1, title: "Очистить полотно", type: "action-clean-canvas" },
  { _id: 2, title: "Установить размер полотна", type: "action-size-canvas" }
];
