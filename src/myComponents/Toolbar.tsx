import React from "react";
import "../styles/toolbar.css";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import canvasState from "../store/canvasState";
import Rect from "../tools/Rect";
import Eraser from "../tools/Eraser";
import Circle from "../tools/Circle";
import Line from "../tools/Line";

const Toolbar = () => {
	const changeColor = (e: any) => {
		toolState.setStrokeColor(e.target.value);
		toolState.setFillColor(e.target.value);
	};

	return (
		<div className="toolbar">
			<div>
				<button
					className="toolbar__btn"
					onClick={() => toolState.setTool(new Brush(canvasState.canvas))}
				>
                    Кисть
				</button>
				<button
					className="toolbar__btn"
					onClick={() => toolState.setTool(new Rect(canvasState.canvas))}
				>
                    прямоугольник
				</button>
				<button
					className="toolbar__btn"
					onClick={() => toolState.setTool(new Circle(canvasState.canvas))}
				>
                    круг
				</button>
				<button
					className="toolbar__btn"
					onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}
				>
                    ластик
				</button>
				<button
					className="toolbar__btn"
					onClick={() => toolState.setTool(new Line(canvasState.canvas))}
				>
                    линия
				</button>
				<input onChange={changeColor} type="color"/>
			</div>

			<div>
				<button className="toolbar__btn">назад</button>
				<button className="toolbar__btn">вперед</button>
				<button className="toolbar__btn">сохранить</button>
			</div>

		</div>
	);
};

export default Toolbar;
