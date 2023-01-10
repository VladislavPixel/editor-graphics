import DrawingTool from "./DrawingTool";
import type { ICanvas } from "./../interface";

export default class Brush {
	private mouseDown: boolean = false;

	protected drawingTool: DrawingTool;

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

		if (!this.drawingTool.ctx) {
			return;
		}

		this.drawingTool.ctx.beginPath();

		this.drawingTool.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.clientHeight * 0.6);
	}

	mouseMoveHandler(event: any) {
		console.log(event.pageX, "pageX");
		console.log(event.target.offsetLeft, "offsetLeft");
		console.log(event, "EVENT");

		if (this.mouseDown) {
			this.draw(
				event.pageX - event.target.offsetLeft,
				event.pageY - event.target.offsetTop
			);
		}
	}

	draw(x: number, y: number): void {
		// console.log(`X: ${x}; Y: ${y - 128}`);
		console.log(this.stateCanvas?.arrayForSaveLayers);

		if (this.stateCanvas !== undefined) {
			const canvasHTML = this.stateCanvas.getCanvasHTML();
			if (canvasHTML) {
				console.log(y - canvasHTML.getBoundingClientRect().top);
			}
			// const canvasHTMLContainer = this.stateCanvas.getCanvasHTML()?.closest(".canvas");

			// if (canvasHTMLContainer) {
			// 	console.log(y - canvasHTMLContainer.getBoundingClientRect().top);
			// }

			// const indexPixel = ((y * (this.stateCanvas.width * 4)) + (x * 4));
		}

		// this.engineCanvas.drawingOnPixels(index);

		// if (!this.drawingTool.ctx) return;

		// this.drawingTool.ctx.lineTo(x, y);
		// this.drawingTool.ctx.stroke();
	}
}
