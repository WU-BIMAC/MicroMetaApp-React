import React from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { AnimateKeyframes } from "react-simple-animate";

import MultiTabFormWithHeader from "./multiTabFormWithHeader";
import DropdownMenu from "./DropdownMenu";

const validationTier = "Validate @ tier: ";

export default class Footer extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			editing: false
			//	isMicroscopeValidated: false
		};

		//this.isMicroscopeValidated = false;

		this.onClickEdit = this.onClickEdit.bind(this);
		this.onFormConfirm = this.onFormConfirm.bind(this);
		this.onFormCancel = this.onFormCancel.bind(this);

		this.onClickChangeValidation = this.onClickChangeValidation.bind(this);
	}

	onClickEdit() {
		this.setState({ editing: true });
	}

	onFormConfirm(id, data) {
		this.setState({ editing: false });
		//, isMicroscopeValidated: true
		//this.isMicroscopeValidated = true;
		this.props.onFormConfirm(id, data);
	}

	onFormCancel() {
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
					schema={this.props.schema}
					inputData={this.props.inputData}
					id={this.props.id}
					onConfirm={this.onFormConfirm}
					onCancel={this.onFormCancel}
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
			minWidth: "250px",
			height: "50px",
			marginLeft: "5px",
			marginRight: "5px"
		};
		let styleEditButton = Object.assign({}, styleButton);
		let play = false;
		if (!this.props.isSchemaValidated) {
			styleEditButton = Object.assign(styleEditButton, {
				border: "5px ridge red"
			});
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
					style={styleEditButton}
					size="lg"
				>
					{`Edit ${this.props.element}`}
				</Button>
			</AnimateKeyframes>
		);
		//this could be moved to derived state from props
		let inputData = [];
		for (let i = 1; i <= this.props.activeTier; i++) {
			inputData.push(i);
		}
		let defaultValidationTier = this.props.validationTier - 1;
		buttons[1] = (
			<DropdownMenu
				key={"Button-1"}
				title={validationTier}
				handleMenuItemClick={this.onClickChangeValidation}
				inputData={inputData}
				width={250}
				margin={5}
				defaultValue={defaultValidationTier}
				direction={"up"}
			/>
		);
		let saveOptions = [];
		if (this.props.hasSaveOption) {
			saveOptions.push("Save " + this.props.element);
		}
		saveOptions.push("Export " + this.props.element + " image");
		saveOptions.push("Export " + this.props.element);
		//Rethink this, maybe drop down split button with multi actions?
		buttons[2] = (
			<DropdownMenu
				key={"Button-2"}
				title={""}
				handleMenuItemClick={this.props.onClickSave}
				inputData={saveOptions}
				width={250}
				margin={5}
				direction={"up"}
			/>
		);
		// let styleSaveButton = {
		// 	width: "250px",
		// 	minWidth: "250px",
		// 	height: "50px",
		// 	marginLeft: "5px",
		// 	marginRight: "5px"
		// };
		// buttons[2] = (
		// 	<Button
		// 		key={"Button-2"}
		// 		onClick={this.props.onClickExport}
		// 		style={styleSaveButton}
		// 		size="lg"
		// 	>
		// 		Export microscope
		// 		</Button>
		// );
		buttons[3] = (
			<Button
				key={"Button-3"}
				onClick={this.props.onClickBack}
				style={styleButton}
				size="lg"
			>
				Back
			</Button>
		);
		return <div style={style}>{buttons}</div>;
	}
}
