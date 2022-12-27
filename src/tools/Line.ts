import DrawingTool from "./DrawingTool";

export default class Line {
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
		this.startX = e.pageX - e.target.offsetLeft;
		this.startY = e.pageY - e.target.offsetTop;

		this.drawingTool.ctx?.beginPath();
		this.drawingTool.ctx?.moveTo(this.startX, this.startY);

		this.saved = this.drawingTool.canvas?.toDataURL();
	}

	mouseMoveHandler(e: any) {
		if (this.mouseDown) {
			this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
		}
	}

	draw(x: number, y: number) {
		const img = new Image();

		if (this.saved) {
			img.src = this.saved;
		}

		img.onload = async() => {
			if (!this.drawingTool.ctx) return;

			this.drawingTool.ctx.clearRect(0, 0, this.drawingTool.canvas?.width || 0, this.drawingTool.canvas?.height || 0);
			this.drawingTool.ctx.drawImage(img, 0, 0, this.drawingTool.canvas?.width || 0, this.drawingTool.canvas?.height || 0);
			this.drawingTool.ctx.beginPath();

			this.drawingTool.ctx.moveTo(this.startX, this.startY);
			this.drawingTool.ctx.lineTo(x, y);
			this.drawingTool.ctx.stroke();
		};
	}
}
