import Tool from "./Tool";

export default class Line extends Tool {
	private mouseDown: boolean = false;

	private startX: number = 0;

	private startY: number = 0;

	private saved: string | undefined;

	constructor(canvas: HTMLCanvasElement | null) {
		super(canvas);
		this.listen();
	}

	listen() {
		if (!this.canvas) return;

		this.canvas.onmouseup = this.mouseUpHandler.bind(this);
		this.canvas.onmousedown = this.mouseDownHandler.bind(this);
		this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
	}

	mouseUpHandler() {
		this.mouseDown = false;
	}

	mouseDownHandler(e: any) {
		this.mouseDown = true;
		this.startX = e.pageX - e.target.offsetLeft;
		this.startY = e.pageY - e.target.offsetTop;

		this.ctx?.beginPath();
		this.ctx?.moveTo(this.startX, this.startY);

		this.saved = this.canvas?.toDataURL();
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
			if (!this.ctx) return;

			this.ctx.clearRect(0, 0, this.canvas?.width || 0, this.canvas?.height || 0);
			this.ctx.drawImage(img, 0, 0, this.canvas?.width || 0, this.canvas?.height || 0);
			this.ctx.beginPath();

			this.ctx.moveTo(this.startX, this.startY);
			this.ctx.lineTo(x, y);
			this.ctx.stroke();
		};
	}
}
