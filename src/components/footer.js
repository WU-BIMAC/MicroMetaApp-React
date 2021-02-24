import React from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";

//import MultiTabFormWithHeader from "./multiTabFormWithHeader";
import MultiTabFormWithHeaderV3 from "./multiTabFormWithHeaderV3";
import DropdownMenu from "./dropdownMenu";
import PopoverTooltip from "./popoverTooltip";

const url = require("url");

import {
	bool_isDebug,
	string_validationTier,
	edit_microscope_tooltip,
	validation_tooltip,
	save_microscope_tooltip,
	back_tooltip,
} from "../constants";

export default class Footer extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			editing: false,
		};

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
				<MultiTabFormWithHeaderV3
					title={"Edit " + this.props.formTitle}
					//schemas={this.props.componentSchemas}
					schema={this.props.schema}
					inputData={this.props.inputData}
					//id={this.props.id}
					onConfirm={this.onFormConfirm}
					onCancel={this.onFormCancel}
					overlaysContainer={this.props.overlaysContainer}
					editable={true}
					elementByType={this.props.elementByType}
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
			padding: "5px",
		};
		let styleButton = {
			width: "250px",
			minWidth: "250px",
			height: "50px",
			marginLeft: "5px",
			marginRight: "5px",
		};

		const styleValidation = {
			position: "absolute",
			verticalAlign: "middle",
			fontWeight: "bold",
			textAlign: "center",
		};
		let validated = null;
		if (this.props.isSchemaValidated) {
			const styleValidated = Object.assign({}, styleValidation, {
				color: "green",
			});
			validated = <div style={styleValidated}>&#9679;</div>;
			// let image = url.resolve(this.props.imagesPath, "green_thumb_up.svg");
			// validated = (
			// 	<img
			// 		src={
			// 			image +
			// 			(image.indexOf("githubusercontent.com") > -1
			// 				? "?sanitize=true"
			// 				: "")
			// 		}
			// 		alt={"validated"}
			// 		style={styleValidation}
			// 	/>
			// );
		} else {
			const styleValidated = Object.assign({}, styleValidation, {
				color: "red",
			});
			validated = <div style={styleValidated}>&#9679;</div>;
			// let image = url.resolve(this.props.imagesPath, "red_thumb_down.svg");
			// validated = (
			// 	<img
			// 		src={
			// 			image +
			// 			(image.indexOf("githubusercontent.com") > -1
			// 				? "?sanitize=true"
			// 				: "")
			// 		}
			// 		alt={"not validated"}
			// 		style={imageValidation}
			// 	/>
			// );
			// styleEditButton = Object.assign(styleEditButton, {
			// 	border: "5px ridge red",
			// });
		}

		let buttons = [];
		buttons[0] = (
			<PopoverTooltip
				key={"TooltipButton-0"}
				position={edit_microscope_tooltip.position}
				title={edit_microscope_tooltip.title}
				content={edit_microscope_tooltip.content}
				element={
					<Button
						key={"Button-0"}
						onClick={this.onClickEdit}
						style={styleButton}
						size="lg"
					>
						{validated}
						{`Edit ${this.props.element}`}
					</Button>
				}
			/>
		);
		let inputData = [];
		for (let i = 1; i <= this.props.activeTier; i++) {
			inputData.push(i);
		}
		let defaultValidationTier = this.props.validationTier - 1;
		buttons[1] = (
			<DropdownMenu
				key={"Button-1"}
				title={string_validationTier}
				handleMenuItemClick={this.onClickChangeValidation}
				inputData={inputData}
				width={250}
				margin={5}
				defaultValue={defaultValidationTier}
				direction={"up"}
				tooltip={validation_tooltip}
			/>
		);
		let saveOptions = [];
		if (this.props.hasSaveOption) {
			saveOptions.push("Save " + this.props.element);
		}
		//saveOptions.push("Export " + this.props.element + " image");
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
				tooltip={save_microscope_tooltip}
			/>
		);
		buttons[3] = (
			<PopoverTooltip
				key={"TooltipButton-3"}
				position={back_tooltip.position}
				title={back_tooltip.title}
				content={back_tooltip.content}
				element={
					<Button
						key={"Button-3"}
						onClick={this.props.onClickBack}
						style={styleButton}
						size="lg"
					>
						Back
					</Button>
				}
			/>
		);
		return <div style={style}>{buttons}</div>;
	}
}
