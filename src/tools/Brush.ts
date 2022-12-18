import Tool from "./Tool";

export default class Brush extends Tool {
	private mouseDown: boolean = false;

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

	mouseUpHandler(e: any) {
		this.mouseDown = false;
	}

	mouseDownHandler(e: any) {
		this.mouseDown = true;

		if (!this.ctx) return;

		this.ctx.beginPath();
		this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
	}

	mouseMoveHandler(e: any) {
		if (this.mouseDown) {
			this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
		}
	}

	draw(x: number, y: number) {
		if (!this.ctx) return;

		this.ctx.lineTo(x, y);
		this.ctx.stroke();
	}
}
