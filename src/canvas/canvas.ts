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

	updateSize(width: string | undefined, height: string | undefined): void {
		const setSize = (value: string | undefined, type: "width" | "height"): number => {
			const typeValue = typeof value;

			const valueNumber = Number(value);

			const isNaN = Number.isNaN(valueNumber);

			const isDefaultCase = typeValue !== "string" || value === "" || isNaN;

			if (isDefaultCase && type === "width") {
				return 700;
			}

			if (isDefaultCase && type === "height") {
				return 500;
			}

			return valueNumber;
		};

		this.width = setSize(width, "width");

		this.height = setSize(height, "height");
	}
}

export { Canvas };
