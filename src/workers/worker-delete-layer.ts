const globalThisWorker: typeof globalThis = this;

globalThisWorker.addEventListener("message", (message) => {
	const { target, present, arrayIndexes, indexTarget } = message.data;

	for (let m = 0; m < target.length; m++) {
		present.data[target[m]] = 0;
		present.data[target[m] + 1] = 0;
		present.data[target[m] + 2] = 0;
		present.data[target[m] + 3] = 0;
	}

	const result = arrayIndexes.filter((item: number[], index: number): number[] | null => {
		if (index !== indexTarget) {
			return item;
		}

		return null;
	});

	globalThisWorker.postMessage({ present, result });
});
