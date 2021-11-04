import React from "react";
import Button from "react-bootstrap/Button";
import PopoverTooltip from "./popoverTooltip";

const url = require("url");

import {
	number_logo_width,
	number_logo_height,
	manage_instrument_tooltip,
	manage_settings_tooltip,
	string_logo_img_micro_bk,
	string_manage_hardware_circle_img,
	string_manage_settings_circle_img,
} from "../constants";

export default class ModeSelector extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const wrapperContainer = {
			display: "flex",
			justifyContent: "center",
			flexFlow: "column",
			width: "100%",
			height: "100%",
			alignItems: "center",
			minHeight: "800px",
		};

		const mainContainer = {
			display: "flex",
			justifyContent: "center",
			flexFlow: "column",
			width: "100%",
			height: "100%",
			alignItems: "center",
		};

		const logoContainer = {
			display: "flex",
			justifyContent: "flex-end",
			flexFlow: "column",
			width: "100%",
			//height: `${number_logo_height}px`,
			height: "40%",
			alignItems: "center",
		};
		let styleImage = {
			width: "100%",
			height: "100%",
			margin: "auto",
		};

		let styleImageContainer = {
			width: `${number_logo_width}px`,
			height: `${number_logo_height}px`,
		};
		const modeSelectorContainer = {
			display: "flex",
			justifyContent: "center",
			flexFlow: "row",
			width: "100%",
			height: "60%",
			alignItems: "flex-start",
		};
		const buttonModeSelectorStyle = {
			width: "400px",
			height: "500px",
			margin: "50px",
		};
		const buttonsInnerContainer = {
			display: "flex",
			justifyContent: "center",
			flexFlow: "column",
			width: "100%",
			height: "100%",
			alignItems: "center",
		};
		let styleIconImage = {
			width: "100%",
			height: "50%",
			margin: "30px",
		};
		let styleText_1 = {
			wordBreak: "break-word",
			whiteSpace: "normal",
		};
		let styleText_2 = {
			textAlign: "left",
			fontSize: "0.8em",
			marginLeft: "15px",
			marginRight: "15px",
			wordBreak: "break-word",
			whiteSpace: "normal",
		};
		let selectionEnabled = true;

		let logoImg = url.resolve(
			this.props.imagesPathPNG,
			string_logo_img_micro_bk
		);
		let hardwareImg = url.resolve(
			this.props.imagesPathSVG,
			string_manage_hardware_circle_img
		);
		let settingsImg = url.resolve(
			this.props.imagesPathSVG,
			string_manage_settings_circle_img
		);

		let logoPath =
			logoImg +
			(logoImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
		let hardwareImgPath =
			hardwareImg +
			(hardwareImg.indexOf("githubusercontent.com") > -1
				? "?sanitize=true"
				: "");
		let settingsImgPath =
			settingsImg +
			(settingsImg.indexOf("githubusercontent.com") > -1
				? "?sanitize=true"
				: "");
		return (
			<div style={wrapperContainer}>
				<div style={mainContainer}>
					<div style={logoContainer}>
						<div style={styleImageContainer}>
							<img src={logoPath} alt={logoImg} style={styleImage} />
						</div>
					</div>
					<div style={modeSelectorContainer}>
						<PopoverTooltip
							position={manage_instrument_tooltip.position}
							title={manage_instrument_tooltip.title}
							content={manage_instrument_tooltip.content}
							element={
								<Button
									disabled={!selectionEnabled}
									onClick={this.props.onClickCreateNewMicroscope}
									style={buttonModeSelectorStyle}
									size="lg"
									variant="light"
								>
									{
										<div style={buttonsInnerContainer}>
											<img
												src={hardwareImgPath}
												alt={this.props.hardwareImg}
												style={styleIconImage}
											/>
											<h2 style={styleText_1}>Manage Instrument</h2>
											<p style={styleText_2}>
												Collect information about the hardware components of
												your microscope.
											</p>
										</div>
									}
								</Button>
							}
						/>
						<PopoverTooltip
							position={manage_settings_tooltip.position}
							title={manage_settings_tooltip.title}
							content={manage_settings_tooltip.content}
							element={
								<Button
									disabled={!selectionEnabled || !this.props.hasSettings}
									onClick={this.props.onClickLoadMicroscope}
									style={buttonModeSelectorStyle}
									size="lg"
									variant="light"
								>
									{
										<div style={buttonsInnerContainer}>
											<img
												src={settingsImgPath}
												alt={settingsImg}
												style={styleIconImage}
											/>
											<h2 style={styleText_1}>Manage Settings</h2>
											<p style={styleText_2}>
												Collect information about the acquisition settings that
												were used to produce your image.
											</p>
										</div>
									}
								</Button>
							}
						/>
					</div>
				</div>
			</div>
		);
		//}
	}
}
