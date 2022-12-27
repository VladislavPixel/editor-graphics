import Brush from "./Brush";

export default class Eraser extends Brush {
	draw(x: number, y: number) {
		if (!this.drawingTool.ctx) return;

		this.drawingTool.ctx.strokeStyle = "#fff";
		this.drawingTool.ctx.lineTo(x, y);
		this.drawingTool.ctx.stroke();
	}

	get settings() {
		const settingsItems = [
			{
				type: "number",
				key: "line-width",
				label: "Толщина",
				onChange: (value: string) => this.drawingTool.setLineWidth(Number(value))
			}
		];

		return settingsItems;
	}
}
