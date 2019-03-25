import React from "react";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import Dropzone from "react-dropzone";

import DropdownMenu from "./DropdownMenu";

export default class DataLoader extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false
		};

		this.simulateClick = this.simulateClick.bind(this);
		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		this.setState({ isLoading: true }, () => {
			this.props.onClick().then(() => {
				this.setState({ isLoading: false });
			});
		});
	}

	simulateClick(buttonRef) {
		if (buttonRef === null) return;
		buttonRef.click();
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
		const { isLoading } = this.state;
		return (
			<div style={windowExternalContainer}>
				<div style={windowInternalContainer}>
					<Button
						ref={this.simulateClick}
						disabled={isLoading}
						onClick={!isLoading ? this.onClick : null}
						style={buttonStyle}
						size="lg"
					>
						{isLoading ? "Loading…" : "Load schema"}
					</Button>
				</div>
			</div>
		);
	}
}
