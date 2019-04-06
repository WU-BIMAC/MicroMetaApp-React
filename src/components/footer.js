import React from "react";
import Button from "react-bootstrap/Button";
import { AnimateKeyframes } from "react-simple-animate";

import MultiTabFormWithHeader from "./multiTabFormWithHeader";
import DropdownMenu from "./DropdownMenu";

const validationTier = "Validate tier: ";

export default class Footer extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			editing: false
			//	isMicroscopeValidated: false
		};

		//this.isMicroscopeValidated = false;

		this.onClickEdit = this.onClickEdit.bind(this);
		this.onConfirm = this.onConfirm.bind(this);
		this.onCancel = this.onCancel.bind(this);

		this.onClickChangeValidation = this.onClickChangeValidation.bind(this);
	}

	onClickEdit() {
		this.setState({ editing: true });
	}

	onConfirm(id, data) {
		this.setState({ editing: false });
		//, isMicroscopeValidated: true
		//this.isMicroscopeValidated = true;
		this.props.onConfirm(id, data);
	}

	onCancel() {
		this.setState({ editing: false });
	}

	onClickChangeValidation(item) {
		let tier = Number(item);
		this.props.onClickChangeValidation(tier);
	}

	render() {
		let width = this.props.dimensions.width;
		let height = this.props.dimensions.height;

		if (this.state.editing) {
			return (
				<MultiTabFormWithHeader
					schema={this.props.microscopeSchema}
					inputData={this.props.inputData}
					id={this.props.id}
					onConfirm={this.onConfirm}
					onCancel={this.onCancel}
					overlaysContainer={this.props.overlaysContainer}
				/>
			);
		}

		const style = {
			backgroundColor: "LightGray",
			width: width,
			height: height,
			boxSizing: "border-box",
			display: "flex",
			flexDirection: "row",
			flexWap: "wrap",
			justifyContent: "center",
			alignItems: "center",
			padding: "5px"
		};
		let styleButton = {
			width: "250px",
			marginLeft: "5px",
			marginRight: "5px"
		};
		let saveButton = {
			width: "250px",
			marginLeft: "5px",
			marginRight: "5px"
		};
		let play = false;
		if (!this.props.isMicroscopeValidated) {
			saveButton = Object.assign(saveButton, { border: "5px ridge red" });
			play = true;
		}

		let buttons = [];
		buttons[0] = (
			<AnimateKeyframes
				key={"Animation-0"}
				play={play}
				durationSeconds={1}
				keyframes={[
					"opacity: 1",
					"opacity: 0.8",
					"opacity: 0.6",
					"opacity: 0.4",
					"opacity: 0.2",
					"opacity: 0.4",
					"opacity: 0.6",
					"opacity: 0.8",
					"opacity: 1",
					"opacity: 0.8",
					"opacity: 0.6",
					"opacity: 0.4",
					"opacity: 0.2",
					"opacity: 0.4",
					"opacity: 0.6",
					"opacity: 0.8",
					"opacity: 1"
				]}
				// keyframes is an array of styles, and each style
				// will be distributed over 100% of the duration
			>
				<Button
					key={"Button-0"}
					onClick={this.onClickEdit}
					style={saveButton}
					size="lg"
				>
					Edit microscope
				</Button>
			</AnimateKeyframes>
		);
		buttons[1] = (
			<Button
				key={"Button-1"}
				onClick={this.props.onClickExport}
				style={styleButton}
				size="lg"
			>
				Export microscope
			</Button>
		);
		//this could be moved to derived state from props
		let inputData = [];
		for (let i = 1; i <= this.props.activeTier; i++) {
			inputData.push(i);
		}
		let defaultValidationTier = this.props.validationTier - 1;
		buttons[2] = (
			<DropdownMenu
				key={"Button-2"}
				title={validationTier}
				handleMenuItemClick={this.onClickChangeValidation}
				inputData={inputData}
				width={250}
				defaultValue={defaultValidationTier}
			/>
		);
		//Dropdown menu validation with microscope tier and lower
		// items to pick level of validation
		// buttons[2] = (
		// 	<Button
		// 		key={"Button-2"}
		// 		onClick={this.props.onClickC}
		// 		style={styleButton}
		// 		size="lg"
		// 	>
		// 		Export microscope
		// 	</Button>
		// );
		return <div style={style}>{buttons}</div>;
	}
}
