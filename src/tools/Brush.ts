import DrawingTool from "./DrawingTool";
import type { ICanvas, IEnginCanvas } from './../interface';

export default class Brush {
	private mouseDown: boolean = false;

	protected drawingTool: DrawingTool;

	stateCanvas: ICanvas | undefined;

	engineCanvas: IEnginCanvas;

	constructor(canvas: ICanvas | undefined, engineCanvas: IEnginCanvas) {
		this.drawingTool = new DrawingTool(canvas!.getCanvasHTML());
		this.stateCanvas = canvas;
		this.engineCanvas = engineCanvas;
		this.listen();
	}

	get settings() {
		const settingsItems = [
			{
				type: "number",
				key: "line-width",
				label: "Толщина",
				onChange: (value: string) => this.drawingTool.setLineWidth(Number(value))
			},
			{
				type: "color",
				key: "stroke-width",
				label: "Цвет обводки",
				onChange: (value: string) => this.drawingTool.setStrokeColor(value)
			}
		];

		return settingsItems;
	}

	listen() {
		if (!this.drawingTool.canvas) return;

		this.drawingTool.canvas.onmouseup = this.mouseUpHandler.bind(this);
		this.drawingTool.canvas.onmousedown = this.mouseDownHandler.bind(this);
		this.drawingTool.canvas.onmousemove = this.mouseMoveHandler.bind(this);
	}

	mouseUpHandler() {
		this.mouseDown = false;
	}

	mouseDownHandler(e: any) {
		this.mouseDown = true;

		if (!this.drawingTool.ctx) return;

		this.drawingTool.ctx.beginPath();

		this.drawingTool.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.clientHeight * 0.6);
	}

	mouseMoveHandler(e: any) {
		if (this.mouseDown) {
			this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.clientHeight * 0.6);
		}
	}

	draw(x: number, y: number) {
		if (this.stateCanvas === undefined || this.engineCanvas === undefined) {
			return;
		}

		const index = ((y * (this.stateCanvas.width * 4)) + (x * 4));

		this.engineCanvas.drawingOnPixels(index);

		// if (!this.drawingTool.ctx) return;

		// this.drawingTool.ctx.lineTo(x, y);
		// this.drawingTool.ctx.stroke();
	}
}
