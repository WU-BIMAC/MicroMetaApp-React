import React from "react";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";

import DropdownMenu from "./DropdownMenu";

export default class MicroscopeLoader extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
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

		let inputData = ["Create from scratch"];
		// window
		// 	.fetch(
		// 		"https://raw.githubusercontent.com/WU-BIMAC/4DNMicroscopyMetadataToolReact/master/src/schema/testSchema.json"
		// 	)
		// 	.then(function (resp) {
		// 		console.log(resp);
		// 		return resp.text();
		// 	})
		// 	.then(function (respText) {
		// 		var schema = JSON.parse(respText);
		// 		complete(schema);
		// 	});
		return (
			<div style={windowExternalContainer}>
				<div style={windowInternalContainer}>
					<DropdownMenu
						title={""}
						handleMenuItemClick={this.props.onClickMicroscopeSelection}
						inputData={inputData}
					/>
					<div>
						<Button
							onClick={this.props.onClickCreateNewMicroscope}
							style={buttonStyle}
							size="lg"
						>
							Confirm
						</Button>
						<Button
							onClick={this.props.onClickCancel}
							style={buttonStyle}
							size="lg"
						>
							Cancel
						</Button>
					</div>
				</div>
			</div>
		);
	}
}
