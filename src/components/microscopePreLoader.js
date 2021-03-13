import React from "react";

import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";

import DropdownMenu from "./dropdownMenu";
import PopoverTooltip from "./popoverTooltip";

import {
	bool_isSettings,
	number_logo_width,
	number_logo_height,
	tier_selector_tooltip,
	manage_instrument_tooltip,
	manage_settings_tooltip,
} from "../constants";
import { escapeSelector } from "jquery";

export default class MicroscopePreLoader extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		let width = 410;
		let margin = 5;
		const buttonStyle = {
			width: "200px",
			height: "50px",
			padding: "5px",
			margin: "5px",
		};
		const windowExternalContainer = {
			display: "flex",
			justifyContent: "center",
			flexFlow: "column",
			width: "100%",
			height: "100%",
			alignItems: "center",
		};
		const windowInternalContainer = {
			display: "flex",
			justifyContent: "center",
			flexFlow: "column",
			width: "100%",
			height: "100%",
			alignItems: "center",
		};
		let styleImageContainer = {
			width: `${number_logo_width}px`,
			height: `${number_logo_height}px`,
		};
		let styleImage = {
			width: "100%",
			height: "100%",
			margin: "auto",
		};
		let tierInputData = this.props.tiers;

		return (
			<div style={windowExternalContainer}>
				<div style={windowInternalContainer}>
					<div style={styleImageContainer}>
						<img
							src={this.props.logoImg}
							alt={this.props.logoImg}
							style={styleImage}
							onLoad={this.onImgLoad}
						/>
					</div>
					<DropdownMenu
						title={"Tier"}
						handleMenuItemClick={this.props.onClickTierSelection}
						inputData={tierInputData}
						width={width}
						margin={margin}
						tooltip={tier_selector_tooltip}
					/>
					<div>
						<PopoverTooltip
							position={manage_instrument_tooltip.position}
							title={manage_instrument_tooltip.title}
							content={manage_instrument_tooltip.content}
							element={
								<Button
									onClick={this.props.onClickCreateNewMicroscope}
									style={buttonStyle}
									size="lg"
								>
									Manage Instrument
								</Button>
							}
						/>
						<PopoverTooltip
							position={manage_settings_tooltip.position}
							title={manage_settings_tooltip.title}
							content={manage_settings_tooltip.content}
							element={
								<Button
									onClick={this.props.onClickLoadMicroscope}
									style={buttonStyle}
									size="lg"
									disabled={!bool_isSettings}
								>
									Manage Settings
								</Button>
							}
						/>
					</div>
				</div>
			</div>
		);
	}
}
