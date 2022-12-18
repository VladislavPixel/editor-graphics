import Tool from "./Tool";

export default class Circle extends Tool {
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

		const canvasData = this.canvas?.toDataURL();
		this.ctx?.beginPath();

		this.startX = e.pageX - e.target.offsetLeft;
		this.startY = e.pageY - e.target.offsetTop;

		this.saved = canvasData;
	}

	mouseMoveHandler(e: any) {
		if (this.mouseDown) {
			const currentX = e.pageX - e.target.offsetLeft;
			const currentY = e.pageX - e.target.offsetLeft;
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
			if (!this.ctx) return;

			this.ctx.clearRect(0, 0, this.canvas?.width || 0, this.canvas?.height || 0);
			this.ctx.drawImage(img, 0, 0, this.canvas?.width || 0, this.canvas?.height || 0);
			this.ctx.beginPath();

			this.ctx.arc(x, y, r, 0, 2 * Math.PI);
			this.ctx.fill();
			this.ctx.stroke();
		};
	}
}
