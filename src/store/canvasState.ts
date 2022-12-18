import { makeAutoObservable } from "mobx";

class CanvasState {
	canvas: HTMLCanvasElement | null = null;

	undoList = [];

	redoList = [];

	constructor() {
		makeAutoObservable(this);
	}

	setCanvas(canvas: HTMLCanvasElement | null) {
		this.canvas = canvas;
	}
}

export default new CanvasState();
