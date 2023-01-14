import { DrawingTool } from "./drawing-tool";
import type { ICanvas, IBrush, IDrawingTool } from "../interface";

class Brush implements IBrush {
	private mouseDown: boolean = false;

	drawingTool: IDrawingTool;

	stateCanvas: ICanvas | undefined;

	constructor(canvas: ICanvas | undefined) {
		this.drawingTool = new DrawingTool(canvas!.getCanvasHTML());
		this.stateCanvas = canvas;
		this.listen();
	}

	get settings() {
		const settingsItems = [
			{
				type: "number",
				key: "line-width",
				label: "Толщина",
				onChange: (value: string) => this.drawingTool.setLineWidth(Number(value)),
				defaultValue: "1"
			},
			{
				type: "color",
				key: "stroke-width",
				label: "Цвет",
				onChange: (value: string) => this.drawingTool.setStrokeColor(value),
				defaultValue: "#000"
			}
		];

		return settingsItems;
	}

	listen(): void {
		if (!this.drawingTool.canvas) {
			return;
		}

		this.drawingTool.canvas.onmouseup = this.mouseUpHandler.bind(this);
		this.drawingTool.canvas.onmousedown = this.mouseDownHandler.bind(this);
		this.drawingTool.canvas.onmousemove = this.mouseMoveHandler.bind(this);
	}

	mouseUpHandler(): void {
		this.mouseDown = false;
	}

	mouseDownHandler(e: any): void {
		this.mouseDown = true;

		if (!this.drawingTool.ctx) {
			return;
		}

		this.drawingTool.ctx.beginPath();

		this.drawingTool.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.clientHeight * 0.6);
	}

	mouseMoveHandler(event: any): void {
		if (this.mouseDown) {
			if (!this.stateCanvas) {
				return;
			}

			const canvasHTML = this.stateCanvas.getCanvasHTML();

			if (!canvasHTML) {
				return;
			}

			const canvasAreaWorking = canvasHTML?.closest(".canvas");

			if (!canvasAreaWorking) {
				return;
			}

			this.stateCanvas.draw(
				event.pageX - event.target.offsetLeft,
				event.pageY - event.target.offsetTop - canvasAreaWorking.getBoundingClientRect().top,
				this.drawingTool.rgbaColor,
				this.drawingTool.lineWidth
			);
		}
	}
}

export { Brush };
