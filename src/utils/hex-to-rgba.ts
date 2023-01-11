function hexToRgbA(hex: string): number[] {
	let arrElementsHex: string[];

	let result: string;

	if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
		arrElementsHex = hex.substring(1).split("");

		if (arrElementsHex.length === 3) {
			arrElementsHex = [arrElementsHex[0], arrElementsHex[0], arrElementsHex[1], arrElementsHex[1], arrElementsHex[2], arrElementsHex[2]];
		}

		result = "0x" + arrElementsHex.join("");

		return [(Number(result) >> 16) & 255, (Number(result) >> 8) & 255, Number(result) & 255, 255];
	}

	throw new Error("Bad Hex");
}

export { hexToRgbA };
