import React from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import MultiTabFormWithHeaderV3 from "./multiTabFormWithHeaderV3";
import DropdownMenu from "./dropdownMenu";
import PopoverTooltip from "./popoverTooltip";
import ModalWindow from "./modalWindow";

const url = require("url");

import {
	help_tooltip,
	about_tooltip,
	string_validationTier,
	edit_microscope_tooltip,
	edit_setting_tooltip,
	validation_microscope_tooltip,
	validation_setting_tooltip,
	string_logo_img_micro_bk,
	string_logo_img_no_bk,
	string_help_img,
	string_about_img,
	string_paste_img,
	paste_tooltip,
	number_logo_width,
	number_logo_height,
} from "../constants";
export default class Header extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			viewAbout: false,
			editing: false,
		};

		this.onClickEdit = this.onClickEdit.bind(this);
		this.onFormConfirm = this.onFormConfirm.bind(this);
		this.onFormCancel = this.onFormCancel.bind(this);

		this.onClickChangeValidation = this.onClickChangeValidation.bind(this);
		this.onClickHelp = this.onClickHelp.bind(this);
		this.onClickAbout = this.onClickAbout.bind(this);
		this.onCloseAbout = this.onCloseAbout.bind(this);
	}

	onClickHelp() {
		window.open(
			"https://micrometaapp-docs.readthedocs.io/en/latest/docs/tutorials/index.html#step-by-step-instructions",
			"_blank"
		);
	}

	onClickAbout() {
		this.setState({ viewAbout: true });
	}

	onCloseAbout() {
		this.setState({ viewAbout: false });
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

		let bigLogoImg = url.resolve(
			this.props.imagesPathPNG,
			string_logo_img_micro_bk
		);
		let bigLogoPath =
			bigLogoImg +
			(bigLogoImg.indexOf("githubusercontent.com") > -1
				? "?sanitize=true"
				: "");

		let logoImg = url.resolve(this.props.imagesPathPNG, string_logo_img_no_bk);
		let helpImg = url.resolve(this.props.imagesPathSVG, string_help_img);
		let aboutImg = url.resolve(this.props.imagesPathSVG, string_about_img);
		let logoPath =
			logoImg +
			(logoImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
		let helpPath =
			helpImg +
			(helpImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
		let aboutPath =
			aboutImg +
			(aboutImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");

		let pasteImg = url.resolve(this.props.imagesPathSVG, string_paste_img);
		let pastePath =
			pasteImg +
			(pasteImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");

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
		let index = 0;
		if (!this.props.isViewOnly) {
			buttons[index] = (
				<PopoverTooltip
					key={"TooltipButton-" + index}
					position={editTooltip.position}
					title={editTooltip.title}
					content={editTooltip.content}
					element={
						<Button
							key={"Button-" + index}
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
			index++;

			let inputData = [];
			for (let i = 1; i <= this.props.activeTier; i++) {
				inputData.push(i);
			}
			let defaultValidationTier = this.props.validationTier - 1;

			buttons[index] = (
				<DropdownMenu
					key={"Button-" + index}
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
			index++;
			buttons[index] = (
				<PopoverTooltip
					key={"TooltipButton-" + index}
					position={paste_tooltip.position}
					title={paste_tooltip.title}
					content={paste_tooltip.content}
					element={
						<Button
							key={"Button-" + index}
							onClick={this.props.onPaste}
							style={styleButtonHelp}
							size="lg"
						>
							<img src={pastePath} alt={pasteImg} style={styleImage} />
						</Button>
					}
				/>
			);
			index++;

			buttons[index] = (
				<PopoverTooltip
					key={"TooltipButton-" + index}
					position={help_tooltip.position}
					title={help_tooltip.title}
					content={help_tooltip.content}
					element={
						<Button
							key={"Button-" + index}
							onClick={this.onClickHelp}
							style={styleButtonHelp}
							size="lg"
						>
							<img src={helpPath} alt={helpImg} style={styleImage} />
						</Button>
					}
				/>
			);
			index++;

			buttons[index] = (
				<PopoverTooltip
					key={"TooltipButton-" + index}
					position={about_tooltip.position}
					title={about_tooltip.title}
					content={about_tooltip.content}
					element={
						<Button
							key={"Button-" + index}
							onClick={this.onClickAbout}
							style={styleButtonHelp}
							size="lg"
						>
							<img src={aboutPath} alt={aboutImg} style={styleImage} />
						</Button>
					}
				/>
			);
			index++;
		} else {
			buttons[index] = (
				<Button
					key={"Button-" + index}
					onClick={this.onClickHelp}
					style={styleButtonHelp}
					size="lg"
				>
					<img src={helpPath} alt={helpImg} style={styleImage} />
				</Button>
			);
			index++;
		}
		if (this.state.viewAbout) {
			const wrapperContainer = {
				display: "flex",
				justifyContent: "center",
				flexFlow: "column",
				width: "100%",
				height: "100%",
				alignItems: "center",
				minHeight: "600px",
			};
			const mainContainer = {
				display: "flex",
				justifyContent: "center",
				flexFlow: "column",
				width: "80%",
				height: "80%",
				alignItems: "center",
			};
			const buttonsContainer = {
				display: "flex",
				justifyContent: "center",
				flexFlow: "row",
				flexWrap: "wrap",
				width: `${number_logo_width}px`,
				height: "60%",
				alignItems: "flex-start",
				alignContent: "flex-start",
				//marginTop: "10px",
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
			let styleImageContainer = {
				width: `${number_logo_width}px`,
				height: `${number_logo_height}px`,
			};
			let styleImage = {
				width: "100%",
				height: "100%",
				margin: "auto",
			};
			const container1 = {
				display: "flex",
				justifyContent: "center",
				flexFlow: "column",
				width: `${number_logo_width}px`,
				height: "100%",
				alignItems: "center",
			};
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
					<ModalWindow overlaysContainer={this.props.overlaysContainer}>
						<div style={wrapperContainer}>
							<div style={mainContainer}>
								<div style={logoContainer}>
									<div style={styleImageContainer}>
										<img
											src={bigLogoPath}
											alt={this.props.bigLogoImg}
											style={styleImage}
											onLoad={this.onImgLoad}
										/>
									</div>
								</div>
								<div style={container1}>
									<p>
										Micro Meta App is an open, easy-to-use, and powerful
										software platform that provides an intuitive visual guide to
										capturing and managing Microscopy Metadata on the basis of
										the{" "}
										<a href="https://github.com/WU-BIMAC/NBOMicroscopyMetadataSpecs/tree/master/Model/stable%20version/v02-01">
											4DN-BINA extension
										</a>{" "}
										of the{" "}
										<a href="https://docs.openmicroscopy.org/ome-model/6.1.1/developers/model-overview.html">
											OME data model
										</a>{" "}
										.
										<br />
										<br />
										App version: {this.props.appVersion}
										<br />
										Model version: {this.props.modelVersion}
										<br />
										<br />
										(c) Copyright 2018-2023 University of Massachusetts Chan
										Medical School. All Rights Reserved.
										<br />
										The software is distributed under the terms of the{" "}
										<a href="https://www.gnu.org/licenses/gpl-3.0.html">
											GNU General Public License v3.0.
										</a>
									</p>
								</div>
								<div style={buttonsContainer}>
									<Button
										style={styleButton}
										size="lg"
										onClick={this.onCloseAbout}
									>
										Close
									</Button>
								</div>
							</div>
						</div>
					</ModalWindow>
				</div>
			);
		} else if (this.state.editing) {
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
				</div>
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
