export default class Tool {
	protected canvas: HTMLCanvasElement | null;

	protected ctx: CanvasRenderingContext2D | null;

	constructor(canvas: HTMLCanvasElement | null) {
		this.canvas = canvas;
		this.ctx = canvas?.getContext("2d") || null;
		this.destroyEvents();
	}

	set fillColor(color: string) {
		if (!this.ctx) return;

		this.ctx.fillStyle = color;
	}

	set strokeColor(color: string) {
		if (!this.ctx) return;

		this.ctx.strokeStyle = color;
	}

	set lineWidth(width: number) {
		if (!this.ctx) return;

		this.ctx.lineWidth = width;
	}

	destroyEvents() {
		if (this.canvas) {
			this.canvas.onmouseup = null;
			this.canvas.onmousedown = null;
			this.canvas.onmousemove = null;
		}
	}
}
