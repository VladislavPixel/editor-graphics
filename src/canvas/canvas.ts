import type { ICanvas } from "../interface";

interface ICoordinate {
	x: number;
	y: number;
};

interface ResultFnValidPixel {
	status: boolean;
	target: ICoordinate;
	currentCol: number;
	currentR: number;
};

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
		this.width = 700;
		this.height = 500;
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

	resetCanvasState(): void {
		this.presentationImageData = null;

		this.isCanvas = false;

		this.target = null;

		this.ctx = null;
	}

	draw(x: number, y: number, arrRgba: number[], radius: number): void {
		const correctPresentationImageData = this.presentationImageData as ImageData;

		const { data } = this.arrayForSaveLayers[this.currentLayer];

		// if (window.Worker) {
		// 	const workerDraw = new Worker("./src/workers/worker-draw.ts");

		// 	workerDraw.postMessage({
		// 		x,
		// 		y,
		// 		arrRgba,
		// 		radius,
		// 		correctPresentationImageData,
		// 		currentLayer: this.currentLayer,
		// 		arrayIndexes: this.arrayForIndexesLayers,
		// 		arrayForSaveLayers: this.arrayForSaveLayers,
		// 		width: this.width
		// 	});

		// 	workerDraw.onmessage = (message) => {
		// 		const { correctPresentationImageData, arrayIndexes, arrayForSaveLayers } = message.data;

		// 		this.presentationImageData = correctPresentationImageData;

		// 		this.arrayForIndexesLayers = arrayIndexes;

		// 		this.arrayForSaveLayers = arrayForSaveLayers;

		// 		console.log("Результат воркера");

		// 		console.log(this.arrayForIndexesLayers, "Массивы индексов");

		// 		console.log(this.presentationImageData);

		// 		this.ctx!.putImageData(correctPresentationImageData, 0, 0);
		// 	};
		// }

		// =====================================================
		const pos1 = { x: x - radius, y: y - radius };

		const pos2 = { x: x + radius, y: y - radius };

		const elementsForRow = radius * 2;

		let allPositions = elementsForRow * elementsForRow;

		let targetPos = { x: x - radius, y: y - radius };

		let currentColumn = 0;

		let currentRow = 0;

		if (this.currentLayer === 0) {
			while (allPositions > 0) {
				allPositions--;

				const { status, target, currentCol, currentR } = this.isValidPixel(targetPos, currentColumn, currentRow, pos1, pos2);

				targetPos = target;

				currentColumn = currentCol;

				currentRow = currentR;

				if (!status) {
					continue;
				}

				const indexPixel = ((targetPos.y * (this.width * 4)) + (targetPos.x * 4));

				if (this.checkDataIndex(indexPixel)) {
					this.arrayForIndexesLayers[this.currentLayer].push(indexPixel);
				}

				data[indexPixel] = arrRgba[0];
				data[indexPixel + 1] = arrRgba[1];
				data[indexPixel + 2] = arrRgba[2];
				data[indexPixel + 3] = arrRgba[3];

				correctPresentationImageData.data[indexPixel] = arrRgba[0];
				correctPresentationImageData.data[indexPixel + 1] = arrRgba[1];
				correctPresentationImageData.data[indexPixel + 2] = arrRgba[2];
				correctPresentationImageData.data[indexPixel + 3] = arrRgba[3];
			}
		} else {
			while (allPositions > 0) {
				allPositions--;

				const { status, target, currentCol, currentR } = this.isValidPixel(targetPos, currentColumn, currentRow, pos1, pos2);

				targetPos = target;

				currentColumn = currentCol;

				currentRow = currentR;

				if (!status) {
					continue;
				}

				const indexPixel = ((targetPos.y * (this.width * 4)) + (targetPos.x * 4));

				if (!this.isShaded(indexPixel, this.currentLayer - 1)) {
					if (this.checkDataIndex(indexPixel)) {
						this.arrayForIndexesLayers[this.currentLayer].push(indexPixel);
					}

					data[indexPixel] = arrRgba[0];
					data[indexPixel + 1] = arrRgba[1];
					data[indexPixel + 2] = arrRgba[2];
					data[indexPixel + 3] = arrRgba[3];

					correctPresentationImageData.data[indexPixel] = arrRgba[0];
					correctPresentationImageData.data[indexPixel + 1] = arrRgba[1];
					correctPresentationImageData.data[indexPixel + 2] = arrRgba[2];
					correctPresentationImageData.data[indexPixel + 3] = arrRgba[3];
				}
			}
		}

		this.ctx!.putImageData(correctPresentationImageData, 0, 0);
	}

	isValidPixel(targetPos: ICoordinate, currentColumn: number, currentRow: number, pos1: ICoordinate, pos2: ICoordinate): ResultFnValidPixel {
		console.log(targetPos, "При проверке на валид");

		currentColumn++;

		targetPos.x = pos1.x + currentColumn;

		if (targetPos.x > pos2.x) {
			currentColumn = 0;

			currentRow = currentRow + 1;

			targetPos.x = pos1.x;

			targetPos.y = pos1.y + currentRow;
		}

		if (targetPos.x < 0 || targetPos.y < 0) {
			return { status: false, target: targetPos, currentCol: currentColumn, currentR: currentRow };
		}

		return { status: true, target: targetPos, currentCol: currentColumn, currentR: currentRow };
	}

	undoLayerActions(i: number): void {
		const arrTaget = this.arrayForIndexesLayers[i];

		if (window.Worker) {
			const workerDeleteLayer = new Worker("./src/workers/worker-delete-layer.ts");

			workerDeleteLayer.postMessage({ target: arrTaget, present: this.presentationImageData, arrayIndexes: this.arrayForIndexesLayers, indexTarget: i });

			workerDeleteLayer.onmessage = (message) => {
				const { present, result } = message.data;

				this.presentationImageData = present;

				this.arrayForIndexesLayers = result;

				this.ctx!.putImageData(present, 0, 0);
			};
		}
	}

	deleteLayer(indexLayer: number): void {
		this.arrayForSaveLayers = this.arrayForSaveLayers.filter((image: ImageData, i: number): ImageData | null => {
			if (i !== indexLayer) {
				return image;
			}

			return null;
		});

		this.currentLayer = this.currentLayer - 1 < 0 ? 0 : this.currentLayer - 1;

		if (this.arrayForSaveLayers.length === 0) {
			const deleteElementCanvas = document.querySelector(".canvas__element-canvas") as Element;

			this.target!.closest(".canvas__wrapper")!.removeChild(deleteElementCanvas);

			this.resetCanvasState();
		} else {
			this.undoLayerActions(indexLayer);
		}

		this.counterLayers--;
	}

	checkDataIndex(i: number): boolean {
		const layer = this.arrayForSaveLayers[this.currentLayer].data;

		if (layer[i] === 0 && layer[i + 1] === 0 && layer[i + 2] === 0 && layer[i + 3] === 0) {
			return true;
		}

		return false;
	}

	isShaded(i: number, currentLayerNumber: number): boolean {
		const layer = this.arrayForSaveLayers[currentLayerNumber].data;

		if (layer[i] === 0 && layer[i + 1] === 0 && layer[i + 2] === 0 && layer[i + 3] === 0) {
			if (currentLayerNumber === 0) {
				return false;
			}

			return this.isShaded(i, currentLayerNumber - 1);
		}

		return true;
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
