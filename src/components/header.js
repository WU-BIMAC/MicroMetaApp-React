import React from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import MultiTabFormWithHeaderV3 from "./multiTabFormWithHeaderV3";
import DropdownMenu from "./dropdownMenu";
import PopoverTooltip from "./popoverTooltip";

const url = require("url");

import {
	help_tooltip,
	string_validationTier,
	edit_microscope_tooltip,
	edit_setting_tooltip,
	validation_microscope_tooltip,
	validation_setting_tooltip,
	string_logo_img_no_bk,
	string_help_img,
} from "../constants";

export default class Header extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			editing: false,
		};

		this.onClickEdit = this.onClickEdit.bind(this);
		this.onFormConfirm = this.onFormConfirm.bind(this);
		this.onFormCancel = this.onFormCancel.bind(this);

		this.onClickChangeValidation = this.onClickChangeValidation.bind(this);
		this.onClickHelp = this.onClickHelp.bind(this);
	}

	onClickHelp() {
		window.open(
			"https://micrometaapp-docs.readthedocs.io/en/latest/docs/tutorials/index.html#step-by-step-instructions",
			"_blank"
		);
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

		const style = {
			backgroundColor: "LightGray",
			width: width,
			height: height,
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
		};
		const styleButtonContainer = {
			marginRight: "20px",
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			//justifyContent: "flex-end",
		};
		let styleImageContainer = {
			width: "430px",
			height: "60px",
			marginLeft: "20px",
		};
		let styleImage = {
			width: "100%",
			height: "100%",
			margin: "auto",
		};
		let styleButton = {
			width: "250px",
			minWidth: "250px",
			height: "50px",
			margin: "5px",
		};

		let styleButtonHelp = {
			width: "50px",
			minWidth: "50px",
			height: "50px",
			margin: "5px",
		};
		const styleValidation = {
			position: "absolute",
			verticalAlign: "middle",
			fontWeight: "bold",
			textAlign: "center",
		};
			let logoImg = url.resolve(this.props.imagesPathPNG, string_logo_img_no_bk);
			let helpImg = url.resolve(this.props.imagesPathSVG, string_help_img);
		let logoPath =
			logoImg +
			(logoImg.indexOf("githubusercontent.com") > -1
				? "?sanitize=true"
				: "");
		let helpPath =
			helpImg +
			(helpImg.indexOf("githubusercontent.com") > -1
				? "?sanitize=true"
				: "");

		let validated = null;
		if (this.props.isSchemaValidated) {
			const styleValidated = Object.assign({}, styleValidation, {
				color: "green",
			});
			validated = <div style={styleValidated}>&#9679;</div>;
		} else {
			const styleValidated = Object.assign({}, styleValidation, {
				color: "red",
			});
			validated = <div style={styleValidated}>&#9679;</div>;
		}

		let editTooltip = edit_microscope_tooltip;
		let validationTooltip = validation_microscope_tooltip;
		if (this.props.element === "image settings") {
			editTooltip = edit_setting_tooltip;
			validationTooltip = validation_setting_tooltip;
		}

		let buttons = [];
		if (!this.props.isViewOnly) {
			buttons[0] = (
				<PopoverTooltip
					key={"TooltipButton-0"}
					position={editTooltip.position}
					title={editTooltip.title}
					content={editTooltip.content}
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
					direction={"down"}
					tooltip={validationTooltip}
				/>
			);

			buttons[2] = (
				<PopoverTooltip
					key={"TooltipButton-2"}
					position={help_tooltip.position}
					title={help_tooltip.title}
					content={help_tooltip.content}
					element={
						<Button
							key={"Button-2"}
							onClick={this.onClickHelp}
							style={styleButtonHelp}
							size="lg"
						>
							<img src={helpPath} alt={this.props.helpImg} style={styleImage} />
						</Button>
					}
				/>
			);
		} else {
			buttons[0] = (
				<Button
					key={"Button-0"}
					onClick={this.onClickHelp}
					style={styleButtonHelp}
					size="lg"
				>
					<img src={helpPath} alt={this.props.helpImg} style={styleImage} />
				</Button>
			);
		}

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
					isDebug={this.props.isDebug}
				/>
			);
		}
		return (
			<div style={style}>
				<div style={styleImageContainer}>
					<img
						src={logoPath}
						alt={this.props.logoImg}
						style={styleImage}
						onLoad={this.onImgLoad}
					/>
				</div>
				<div style={styleButtonContainer}>{buttons}</div>
			</div>
		);
	}
}
