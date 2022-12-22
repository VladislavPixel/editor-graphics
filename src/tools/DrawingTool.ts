import Tool from "./Tool";

export default class DrawingTool extends Tool {
	protected fillStyle: string = "#000";

	protected strokeStyle: string = "#000";

	protected width: number = 1;

	get fillColor() {
		return this.fillStyle;
	}

	set fillColor(color: string) {
		if (!this.ctx) return;

		this.ctx.fillStyle = color;
		this.fillStyle = color;
	}

	get strokeColor() {
		return this.strokeStyle;
	}

	set strokeColor(color: string) {
		if (!this.ctx) return;

		this.ctx.strokeStyle = color;
		this.strokeStyle = color;
	}

	get lineWidth() {
		return this.width;
	}

	set lineWidth(width: number) {
		if (!this.ctx) return;

		this.ctx.lineWidth = width;
		this.width = width;
	}

	destroyEvents() {
		if (this.canvas) {
			this.canvas.onmouseup = null;
			this.canvas.onmousedown = null;
			this.canvas.onmousemove = null;
		}
	}
}
