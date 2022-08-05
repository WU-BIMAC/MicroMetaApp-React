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
	save_microscope_tooltip,
	export_microscope_tooltip,
	save_setting_tooltip,
	export_setting_tooltip,
	home_tooltip,
	string_home_circle_img,
	string_home_img,
	string_save_img,
	string_export_img,
	string_import_img,
	import_tooltip,
} from "../constants";

export default class Footer extends React.PureComponent {
	render() {
		let width = this.props.dimensions.width;
		let height = this.props.dimensions.height;
		const styleButtonContainer = {
			marginRight: "20px",
			marginLeft: "20px",
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			//justifyContent: "flex-end",
		};
		const style = {
			backgroundColor: "LightGray",
			width: width,
			height: height,
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
		};
		let styleButton = {
			width: "250px",
			minWidth: "250px",
			height: "50px",
			marginLeft: "5px",
			marginRight: "5px",
		};

		let styleImageIcon = {
			width: "20px",
			height: "20px",
			marginLeft: "10px",
			marginRight: "10px",
		};
		let styleImageIconHome = {
			width: "30px",
			height: "30px",
			marginLeft: "10px",
			marginRight: "10px",
		};

		let saveTooltip = save_microscope_tooltip;
		if (this.props.element === "image settings") {
			saveTooltip = save_setting_tooltip;
		}
		let exportTooltip = export_microscope_tooltip;
		if (this.props.element === "image settings") {
			exportTooltip = export_setting_tooltip;
		}

		let buttonsLeft = [];
		let buttonsRight = [];

		let saveOptions = [];
		if (this.props.hasSaveOption) {
			saveOptions.push("Save " + this.props.element);
			saveOptions.push("Save as new " + this.props.element);
		}
		//saveOptions.push("Export " + this.props.element + " image");
		let exportOptions = [];
		exportOptions.push("Export " + this.props.element);
		exportOptions.push("Export as new " + this.props.element);

		let importImgPath_tmp = url.resolve(
			this.props.imagesPath,
			string_import_img
		);
		let importImgPath =
			importImgPath_tmp +
			(importImgPath_tmp.indexOf("githubusercontent.com") > -1
				? "?sanitize=true"
				: "");

		let saveImgPath_tmp = url.resolve(this.props.imagesPath, string_save_img);
		let saveImgPath =
			saveImgPath_tmp +
			(saveImgPath_tmp.indexOf("githubusercontent.com") > -1
				? "?sanitize=true"
				: "");

		let exportImgPath_tmp = url.resolve(
			this.props.imagesPath,
			string_export_img
		);
		let exportImgPath =
			exportImgPath_tmp +
			(exportImgPath_tmp.indexOf("githubusercontent.com") > -1
				? "?sanitize=true"
				: "");

		//Rethink this, maybe drop down split button with multi actions?
		let index = 0;

		if (this.props.is4DNPortal && this.props.hasImport) {
			let importButtText = "Import";
			buttonsRight[index] = (
				<PopoverTooltip
					key={"TooltipButtonRight-" + index}
					position={import_tooltip.position}
					title={import_tooltip.title}
					content={import_tooltip.content}
					element={
						<Button
							key={"ButtonRight-" + index}
							onClick={() => this.props.onClickHome(importButtText)}
							style={styleButton}
							size="lg"
							variant="dark"
						>
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									//gap: "10px",
								}}
							>
								<img
									src={importImgPath}
									alt={importImgPath_tmp}
									style={styleImageIcon}
								/>
								{importButtText}
							</div>
						</Button>
					}
				/>
			);
			index++;
		}
		buttonsRight[index] = (
			<DropdownMenu
				key={"ButtonRight-1"}
				title={"Save"}
				handleMenuItemClick={this.props.onClickSave}
				inputData={saveOptions}
				width={250}
				margin={5}
				direction={"up"}
				tooltip={saveTooltip}
				hasFixedTitle={true}
				variant="dark"
				imgPath_tmp={saveImgPath_tmp}
				imgPath={saveImgPath}
			/>
		);
		buttonsRight[index + 1] = (
			<DropdownMenu
				key={"ButtonRight-2"}
				title={"Export"}
				handleMenuItemClick={this.props.onClickSave}
				inputData={exportOptions}
				width={250}
				margin={5}
				direction={"up"}
				tooltip={exportTooltip}
				hasFixedTitle={true}
				variant="dark"
				imgPath_tmp={exportImgPath_tmp}
				imgPath={exportImgPath}
			/>
		);

		let homeImg = url.resolve(this.props.imagesPath, string_home_img);
		let homeImgPath =
			homeImg +
			(homeImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
		let homeButtText = "Home";

		if (this.props.is4DNPortal) {
			homeButtText = "Back to list";
		}
		buttonsLeft[0] = (
			<PopoverTooltip
				key={"TooltipButtonLeft-0"}
				position={"top"}
				title={home_tooltip.title}
				content={home_tooltip.content}
				element={
					<Button
						key={"ButtonLeft-0"}
						onClick={() => this.props.onClickHome(homeButtText)}
						style={styleButton}
						size="lg"
						variant="outline-dark"
					>
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								//gap: "10px",
							}}
						>
							<img src={homeImgPath} alt={homeImg} style={styleImageIconHome} />
							{homeButtText}
						</div>
					</Button>
				}
			/>
		);
		let pStyle = {
			marginBottom: "0rem",
		};
		// /<div style={pStyle}>
		//</div>
		buttonsLeft[1] = (
			<p style={pStyle}>
				(c) Copyright 2018-2023 University of Massachusetts Chan Medical School.
				All Rights Reserved.
				<br />
				The software is distributed under the terms of the{" "}
				<a href="https://www.gnu.org/licenses/gpl-3.0.html">
					GNU General Public License v3.0.
				</a>
			</p>
		);
		return (
			<div style={style}>
				<div style={styleButtonContainer}>{buttonsLeft}</div>
				<div style={styleButtonContainer}>{buttonsRight}</div>
			</div>
		);
	}
}
