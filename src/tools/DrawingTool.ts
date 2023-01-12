import Tool from "./Tool";
import { hexToRgbA } from "../utils/hex-to-rgba";

export default class DrawingTool extends Tool {
	protected fillStyle: string = "#000";

	protected strokeStyle: string = "#000";

	protected width: number = 1;

	protected rgbaColorStyle: number[] = [0, 0, 0, 255];

	get fillColor(): string {
		return this.fillStyle;
	}

	get rgbaColor(): number[] {
		return this.rgbaColorStyle;
	}

	setFillColor(color: string): void {
		if (!this.ctx) {
			return;
		}

		this.ctx.fillStyle = color;

		this.fillStyle = color;
	}

	get strokeColor(): string {
		return this.strokeStyle;
	}

	setStrokeColor(color: string): void {
		if (!this.ctx) {
			return;
		}

		this.ctx.strokeStyle = color;

		this.strokeStyle = color;

		this.rgbaColorStyle = hexToRgbA(color);
	}

	get lineWidth(): number {
		return this.width;
	}

	setLineWidth(width: number): void {
		if (!this.ctx) {
			return;
		}

		this.ctx.lineWidth = width;

		this.width = width;
	}

	destroyEvents(): void {
		if (this.canvas) {
			this.canvas.onmouseup = null;

			this.canvas.onmousedown = null;

			this.canvas.onmousemove = null;
		}
	}
}
