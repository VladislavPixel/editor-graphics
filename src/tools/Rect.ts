import DrawingTool from "./DrawingTool";

export default class Rect {
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
		this.drawingTool.ctx?.beginPath();

		this.startX = e.pageX - e.target.offsetLeft;
		this.startY = e.pageY - e.target.offsetTop;

		this.saved = this.drawingTool.canvas?.toDataURL();
	}

	mouseMoveHandler(e: any) {
		if (this.mouseDown) {
			const currentX = e.pageX - e.target.offsetLeft;
			const currentY = e.pageX - e.target.offsetLeft;
			const width = currentX - this.startX;
			const height = currentY - this.startY;

			this.draw(this.startX, this.startY, width, height);
		}
	}

	draw(x: number, y: number, w: number, h: number) {
		const img = new Image();

		if (this.saved) {
			img.src = this.saved;
		}

		img.onload = async() => {
			if (!this.drawingTool.ctx) return;

			this.drawingTool.ctx.clearRect(0, 0, this.drawingTool.canvas?.width || 0, this.drawingTool.canvas?.height || 0);
			this.drawingTool.ctx.drawImage(img, 0, 0, this.drawingTool.canvas?.width || 0, this.drawingTool.canvas?.height || 0);
			this.drawingTool.ctx.beginPath();

			this.drawingTool.ctx.rect(x, y, w, h);
			this.drawingTool.ctx.fill();
			this.drawingTool.ctx.stroke();
		};
	}
}
