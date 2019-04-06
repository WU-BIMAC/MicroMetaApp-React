import React from "react";

import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";

import DropdownMenu from "./DropdownMenu";

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
			margin: "5px"
		};
		const windowExternalContainer = {
			display: "flex",
			justifyContent: "center",
			flexFlow: "column",
			width: "100%",
			height: "100%",
			alignItems: "center"
		};
		const windowInternalContainer = {
			display: "flex",
			justifyContent: "center",
			flexFlow: "column",
			width: "100%",
			height: "100%",
			alignItems: "center"
		};
		let tierInputData = this.props.tiers;
		return (
			<div style={windowExternalContainer}>
				<div style={windowInternalContainer}>
					<DropdownMenu
						title={"Tier"}
						handleMenuItemClick={this.props.onClickTierSelection}
						inputData={tierInputData}
						width={width}
						margin={margin}
					/>
					<div>
						<Button
							onClick={this.props.onClickCreateNewMicroscope}
							style={buttonStyle}
							size="lg"
						>
							Create microscope
						</Button>
						<Button
							onClick={this.props.onClickLoadMicroscope}
							style={buttonStyle}
							size="lg"
							disabled
						>
							Use microscope
						</Button>
					</div>
				</div>
			</div>
		);
	}
}
