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
	save_setting_tooltip,
	back_tooltip,
	string_back_img,
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

		let styleImageBk = {
			width: "20px",
			height: "20px",
		};

		let saveTooltip = save_microscope_tooltip;
		if (this.props.element === "image settings") {
			saveTooltip = save_setting_tooltip;
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
			buttonsRight[index] = (
				<PopoverTooltip
					key={"TooltipButtonRight-0"}
					position={import_tooltip.position}
					title={import_tooltip.title}
					content={import_tooltip.content}
					element={
						<Button
							key={"ButtonRight-0"}
							onClick={() => this.props.onClickBack("Import")}
							style={styleButton}
							size="lg"
							variant="dark"
						>
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									gap: "10px",
								}}
							>
								<img
									src={importImgPath}
									alt={importImgPath_tmp}
									style={styleImageBk}
									onLoad={this.onImgLoad}
								/>
								Import
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
				isCentered={true}
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
				tooltip={saveTooltip}
				hasFixedTitle={true}
				variant="dark"
				imgPath_tmp={exportImgPath_tmp}
				imgPath={exportImgPath}
				isCentered={true}
			/>
		);

		let backImgPath_tmp = url.resolve(this.props.imagesPath, string_back_img);
		let backImgPath =
			backImgPath_tmp +
			(backImgPath_tmp.indexOf("githubusercontent.com") > -1
				? "?sanitize=true"
				: "");
		let backText = "Back";

		if (this.props.is4DNPortal) {
			backText = "Back to list";
		}
		buttonsLeft[0] = (
			<PopoverTooltip
				key={"TooltipButtonLeft-0"}
				position={"top"}
				title={back_tooltip.title}
				content={back_tooltip.content}
				element={
					<Button
						key={"ButtonLeft-0"}
						onClick={() => this.props.onClickBack(backText)}
						style={styleButton}
						size="lg"
						variant="outline-dark"
					>
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								gap: "10px",
							}}
						>
							<img
								src={backImgPath}
								alt={backImgPath_tmp}
								style={styleImageBk}
								onLoad={this.onImgLoad}
							/>
							{backText}
						</div>
					</Button>
				}
			/>
		);
		return (
			<div style={style}>
				<div style={styleButtonContainer}>{buttonsLeft}</div>
				<div style={styleButtonContainer}>{buttonsRight}</div>
			</div>
		);
	}
}
