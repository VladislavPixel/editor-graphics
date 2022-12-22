import type { ICanvas } from "../interface";

class Canvas implements ICanvas {
	width: number;

	height: number;

	isCanvas: boolean;

	target: HTMLCanvasElement | null;

	constructor() {
		this.width = 700;
		this.height = 500;
		this.isCanvas = false;
		this.target = null;
	}

	getCanvasHTML(): HTMLCanvasElement | null {
		return this.target;
	}

	initCanvas(el: HTMLCanvasElement): void {
		this.target = el;
	}
}

const canvas = new Canvas();

export { canvas };
