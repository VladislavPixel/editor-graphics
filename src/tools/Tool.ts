class Tool {
	public canvas: HTMLCanvasElement | null;

	public ctx: CanvasRenderingContext2D | null;

	constructor(canvas: HTMLCanvasElement | null) {
		this.canvas = canvas;
		this.ctx = canvas?.getContext("2d") || null;
		this.destroyEvents();
	}

	destroyEvents() {
		if (this.canvas) {
			this.canvas.onmouseup = null;
			this.canvas.onmousedown = null;
			this.canvas.onmousemove = null;
		}
	}
}

export { Tool };
