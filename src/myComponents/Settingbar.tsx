import React from "react";
import "../styles/settingbar.css";
import toolState from "../store/toolState";

const Settingbar = () => {
	return (
		<div className="settingbar">
			<label htmlFor="line-width">Толщина</label>
			<input onChange={e => toolState.setLineWidth(Number(e.target.value))} id="line-width" type="number"
				defaultValue={1} min={1} max={50}/>

			<label htmlFor="stroke-width">Цвет обводки</label>
			<input onChange={e => toolState.setStrokeColor(e.target.value)} id="stroke-width" type="color"/>
		</div>
	);
};

export default Settingbar;
