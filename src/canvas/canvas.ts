import type { ICanvas } from "../interface";

class Canvas implements ICanvas {
	width: number;

	height: number;

	isCanvas: boolean;

	target: HTMLCanvasElement | null;

	counterLayers: number;

	currentLayer: number;

	presentationImageData: null | ImageData;

	ctx: null | CanvasRenderingContext2D;

	arrayForIndexesLayers: Array<Array<number>>;

	arrayForSaveLayers: ImageData[];

	constructor() {
		this.width = 200;
		this.height = 200;
		this.isCanvas = false;
		this.target = null;

		this.counterLayers = 0;
		this.currentLayer = 0;
		this.presentationImageData = null;
		this.ctx = null;
		this.arrayForIndexesLayers = [];
		this.arrayForSaveLayers = [];
	}

	getCanvasHTML(): HTMLCanvasElement | null {
		return this.target;
	}

	initCanvas(el: HTMLCanvasElement): void {
		this.target = el;
	}

	addLayer(): void {
		if (this.ctx) {
			const newImageDataForLayers = this.ctx.getImageData(0, 0, this.width, this.height);

			this.arrayForSaveLayers.push(newImageDataForLayers);

			this.arrayForIndexesLayers[this.counterLayers] = [];

			this.counterLayers++;
		}
	}

	checkDataIndex(i: number): boolean {
		const layer = this.arrayForSaveLayers[this.currentLayer].data;

		if (layer[i] === 0 && layer[i + 1] === 0 && layer[i + 2] === 0 && layer[i + 3] === 0) {
			return true;
		}

		return false;
	}

	updateCurrentLayer(newCurrentLayer: number): void {
		this.currentLayer = newCurrentLayer;
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
