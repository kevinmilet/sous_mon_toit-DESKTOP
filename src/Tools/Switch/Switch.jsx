import React from "react";
import './switch.scss';
import colors from "../../../utils/styles/colors";

const Switch = ({ isOn, handleChange }) => {

	let styleBtn;

	if (isOn) {
		styleBtn = 'switch-button-true';
	} else {
		styleBtn = 'switch-button';
	}

    return (
		<div className={styleBtn} onClick={handleChange}>
			<input className="switch-button-checkbox " type="checkbox"/>
			<label className="switch-button-label" htmlFor="">
				<span className="switch-button-label-span" style={!isOn ? {color: colors.backgroundPrimary} : {color: colors.secondary}}>Acheter</span>
			</label>
		</div>
    );
};

export default Switch;
