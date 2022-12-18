import React, { useEffect, useRef } from "react";
import "../styles/canvas.css";
import { observer } from "mobx-react-lite";
import canvasState from "../store/canvasState";

const Canvas = observer(() => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		canvasState.setCanvas(canvasRef.current);
	}, []);

	return (
		<div className="canvas">
			<canvas ref={canvasRef} width={1200} height={600} />
		</div>
	);
});

export default Canvas;
