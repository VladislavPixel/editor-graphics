import { DrawingTool } from "./drawing-tool";

class Circle {
	private mouseDown: boolean = false;

	private startX: number = 0;

	private startY: number = 0;

	private saved: string | undefined;

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
				label: "Толщина обводки",
				onChange: (value: string) => this.drawingTool.setLineWidth(Number(value))
			},
			{
				type: "color",
				key: "stroke-width",
				label: "Цвет обводки",
				onChange: (value: string) => this.drawingTool.setStrokeColor(value)
			},
			{
				type: "color",
				key: "fill-width",
				label: "Цвет заливки",
				onChange: (value: string) => this.drawingTool.setFillColor(value)
			}
		];

		return settingsItems;
	}

	listen() {
		if (this.drawingTool.canvas) {
			this.drawingTool.canvas.onmouseup = this.mouseUpHandler.bind(this);
			this.drawingTool.canvas.onmousedown = this.mouseDownHandler.bind(this);
			this.drawingTool.canvas.onmousemove = this.mouseMoveHandler.bind(this);
		}
	}

	mouseUpHandler(e: any) {
		this.mouseDown = false;
	}

	mouseDownHandler(e: any) {
		this.mouseDown = true;

		const canvasData = this.drawingTool.canvas?.toDataURL();
		this.drawingTool.ctx?.beginPath();

		this.startX = e.pageX - e.target.offsetLeft;
		this.startY = e.pageY - e.target.clientHeight * 0.6;

		this.saved = canvasData;
	}

	mouseMoveHandler(e: any) {
		if (this.mouseDown) {
			const currentX = e.pageX - e.target.offsetLeft;
			const currentY = e.pageY - e.target.clientHeight * 0.6;
			const width = currentX - this.startX;
			const height = currentY - this.startY;

			const r = Math.sqrt(width ** 2 + height ** 2);

			this.draw(this.startX, this.startY, r);
		}
	}

	draw(x: number, y: number, r: number) {
		const img = new Image();

		if (this.saved) {
			img.src = this.saved;
		}

		img.onload = async() => {
			if (!this.drawingTool.ctx) return;

			this.drawingTool.ctx.clearRect(0, 0, this.drawingTool.canvas?.width || 0, this.drawingTool.canvas?.height || 0);
			this.drawingTool.ctx.drawImage(img, 0, 0, this.drawingTool.canvas?.width || 0, this.drawingTool.canvas?.height || 0);
			this.drawingTool.ctx.beginPath();

			this.drawingTool.ctx.arc(x, y, r, 0, 2 * Math.PI);
			this.drawingTool.ctx.fill();
			this.drawingTool.ctx.stroke();
		};
	}
}

export { Circle };
