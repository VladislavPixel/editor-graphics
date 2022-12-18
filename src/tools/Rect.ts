import Tool from "./Tool";

export default class Rect extends Tool {
	private mouseDown: boolean = false;

	private startX: number = 0;

	private startY: number = 0;

	private saved: string | undefined;

	constructor(canvas: HTMLCanvasElement | null) {
		super(canvas);
		this.listen();
	}

	listen() {
		if (this.canvas) {
			this.canvas.onmouseup = this.mouseUpHandler.bind(this);
			this.canvas.onmousedown = this.mouseDownHandler.bind(this);
			this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
		}
	}

	mouseUpHandler(e: any) {
		this.mouseDown = false;
	}

	mouseDownHandler(e: any) {
		this.mouseDown = true;
		this.ctx?.beginPath();

		this.startX = e.pageX - e.target.offsetLeft;
		this.startY = e.pageY - e.target.offsetTop;

		this.saved = this.canvas?.toDataURL();
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
			if (!this.ctx) return;

			this.ctx.clearRect(0, 0, this.canvas?.width || 0, this.canvas?.height || 0);
			this.ctx.drawImage(img, 0, 0, this.canvas?.width || 0, this.canvas?.height || 0);
			this.ctx.beginPath();

			this.ctx.rect(x, y, w, h);
			this.ctx.fill();
			this.ctx.stroke();
		};
	}
}
