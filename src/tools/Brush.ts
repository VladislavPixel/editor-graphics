import DrawingTool from "./DrawingTool";

export default class Brush {
	private mouseDown: boolean = false;

	protected drawingTool: DrawingTool;

	constructor(canvas: HTMLCanvasElement | null) {
		this.drawingTool = new DrawingTool(canvas);
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

	mouseUpHandler(e: any) {
		this.mouseDown = false;
	}

	mouseDownHandler(e: any) {
		this.mouseDown = true;

		if (!this.drawingTool.ctx) return;

		this.drawingTool.ctx.beginPath();
		this.drawingTool.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
	}

	mouseMoveHandler(e: any) {
		if (this.mouseDown) {
			this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
		}
	}

	draw(x: number, y: number) {
		if (!this.drawingTool.ctx) return;

		this.drawingTool.ctx.lineTo(x, y);
		this.drawingTool.ctx.stroke();
	}
}
