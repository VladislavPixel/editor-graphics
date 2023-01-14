function checkDataIndex(i: number, currentLayer: number, arrayForSaveLayers: ImageData[]): boolean {
	const layer = arrayForSaveLayers[currentLayer].data;

	if (layer[i] === 0 && layer[i + 1] === 0 && layer[i + 2] === 0 && layer[i + 3] === 0) {
		return true;
	}

	return false;
}

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

function isValidPixel(targetPos: ICoordinate, currentColumn: number, currentRow: number, pos1: ICoordinate, pos2: ICoordinate): ResultFnValidPixel {
	console.log(targetPos, "Проверка пиксеелй");

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

function isShaded(i: number, currentLayerNumber: number, arrayForSaveLayers: ImageData[]): boolean {
	const layer = arrayForSaveLayers[currentLayerNumber].data;

	if (layer[i] === 0 && layer[i + 1] === 0 && layer[i + 2] === 0 && layer[i + 3] === 0) {
		if (currentLayerNumber === 0) {
			return false;
		}

		return isShaded(i, currentLayerNumber - 1, arrayForSaveLayers);
	}

	return true;
}

const globalThisWorkerDraw: typeof globalThis = this;

globalThisWorkerDraw.addEventListener("message", (message) => {
	const {
		x,
		y,
		arrRgba,
		radius,
		correctPresentationImageData,
		currentLayer,
		arrayIndexes,
		arrayForSaveLayers,
		width
	} = message.data;

	const { data } = arrayForSaveLayers[currentLayer];

	const pos1 = { x: x - radius, y: y - radius };

	const pos2 = { x: x + radius, y: y - radius };

	// const pos3 = { x: x - radius, y: y + radius };

	// const pos4 = { x: x + radius, y: y + radius };

	const elementsForRow = radius * 2;

	let allPositions = elementsForRow * elementsForRow;

	console.log(elementsForRow, "РЯД");

	console.log(allPositions, "Всего");

	let targetPos = { x: x - radius, y: y - radius };

	let currentColumn = 0;

	let currentRow = 0;

	if (currentLayer === 0) {
		while (allPositions > 0) {
			allPositions--;

			const { status, target, currentCol, currentR } = isValidPixel(targetPos, currentColumn, currentRow, pos1, pos2);

			targetPos = target;

			currentColumn = currentCol;

			currentRow = currentR;

			if (!status) {
				continue;
			}

			const indexPixel = ((targetPos.y * (width * 4)) + (targetPos.x * 4));

			if (checkDataIndex(indexPixel, currentLayer, arrayForSaveLayers)) {
				arrayIndexes[currentLayer].push(indexPixel);
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

			const { status, target, currentCol, currentR } = isValidPixel(targetPos, currentColumn, currentRow, pos1, pos2);

			targetPos = target;

			currentColumn = currentCol;

			currentRow = currentR;

			if (!status) {
				continue;
			}

			const indexPixel = ((targetPos.y * (width * 4)) + (targetPos.x * 4));

			if (!isShaded(indexPixel, currentLayer - 1, arrayForSaveLayers)) {
				if (checkDataIndex(indexPixel, currentLayer, arrayForSaveLayers)) {
					arrayIndexes[currentLayer].push(indexPixel);
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

	globalThisWorkerDraw.postMessage({ correctPresentationImageData, arrayIndexes, arrayForSaveLayers });
});
