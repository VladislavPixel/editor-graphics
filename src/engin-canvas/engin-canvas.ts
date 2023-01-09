import type { IEnginCanvas } from "../interface";

class EnginCanvas implements IEnginCanvas {
	counterLayers: number;

	currentLayer: number;

	presentationImageData: null | ImageData;

	ctx: null | CanvasRenderingContext2D;

	arrayForIndexesLayers: Array<Array<number>>;

	arrayForSaveLayers: ImageData[];

	constructor() {
		this.counterLayers = 0;
		this.currentLayer = 0;
		this.presentationImageData = null;
		this.ctx = null;
		this.arrayForIndexesLayers = [];
		this.arrayForSaveLayers = [];
	}

	addLayer(): void {
		if (this.ctx) {
			const newImageDataForLayers = this.ctx.getImageData(0, 0, 700, 700);

			this.arrayForIndexesLayers[this.counterLayers] = [];
	
			this.counterLayers++;
		}
	}

	updateCurrentLayer(newCurrentLayer: number): void {
		this.currentLayer = newCurrentLayer;
	}

	checkDataIndex(i: number): boolean {

	}

	drawingOnPixels(index: number): void {
		if (this.currentLayer === 0) {
			if (this.checkDataIndex(index)) {
				arrayForIndexesLayers[currentLayer].push(index);
			}
		}
	}
}

export { EnginCanvas };
