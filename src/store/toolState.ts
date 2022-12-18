import { makeAutoObservable } from "mobx";
import type Brush from "../tools/Brush";
import type Rect from "../tools/Rect";
import type Eraser from "../tools/Eraser";
import type Circle from "../tools/Circle";
import type Line from "../tools/Line";

type Tool = Brush | Rect | Circle | Eraser | Line;

class ToolState {
	tool: Tool | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	setTool(tool: Tool) {
		this.tool = tool;
	}

	setFillColor(color: string) {
		if (!this.tool) return;

		this.tool.fillColor = color;
	}

	setStrokeColor(color: string) {
		if (!this.tool) return;

		this.tool.strokeColor = color;
	}

	setLineWidth(width: number) {
		if (!this.tool) return;

		this.tool.lineWidth = width;
	}
}

export default new ToolState();
