import Brush from "./Brush";

export default class Eraser extends Brush {
	draw(x: number, y: number) {
		if (!this.drawingTool.ctx) return;

		this.drawingTool.ctx.strokeStyle = "#d4d4d4";
		this.drawingTool.ctx.lineTo(x, y);
		this.drawingTool.ctx.stroke();
	}
}
