import { Tool } from "./tool";
import { hexToRgbA } from "../utils/hex-to-rgba";
import type { IDrawingTool } from "../interface";

class DrawingTool extends Tool implements IDrawingTool {
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
		this.rgbaColorStyle = hexToRgbA(color);
	}

	get lineWidth(): number {
		return this.width;
	}

	setLineWidth(width: number): void {
		this.width = Math.abs(width);
	}

	destroyEvents(): void {
		if (this.canvas) {
			this.canvas.onmouseup = null;

			this.canvas.onmousedown = null;

			this.canvas.onmousemove = null;
		}
	}
}

export { DrawingTool };
