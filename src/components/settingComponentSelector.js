import React from "react";
import Button from "react-bootstrap/Button";
import { ArcherContainer, ArcherElement } from "react-archer";

import ModalWindow from "./modalWindow";
import PopoverTooltip from "./popoverTooltip";
import MultiTabFormWithHeaderV3 from "./multiTabFormWithHeaderV3";

import { pathToFileURL } from "url";
import { v4 as uuidv4 } from "uuid";

const url = require("url");
const validate = require("jsonschema").validate;

import {
	bool_isDebug,
	string_na,
	string_object,
	string_array,
	string_json_ext,
} from "../constants";

export default class SettingComponentSelector extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			editing: false,
			editingSettings: false,
			selectedComp: null,
			selectedSchema: null,
		};

		this.handleSelectComp = this.handleSelectComp.bind(this);
		this.handleDeleteComp = this.handleDeleteComp.bind(this);
		this.handleEditSettings = this.handleEditSettings.bind(this);
		this.handleConfirmComponent = this.handleConfirmComponent.bind(this);
	}

	handleSelectComp(comp) {
		let selectedComp = comp;
		let componentSchema = this.props.componentSchemas;
		let compSchemas = {};
		for (let i in componentSchema) {
			let schema = componentSchema[i];
			compSchemas[schema.ID] = schema;
		}

		let selectedSchema = compSchemas[selectedComp.Schema_ID];

		this.setState({
			selectedComp: selectedComp,
			selectedSchema: selectedSchema,
		});
	}

	handleDeleteComp(selectedSlot, index) {
		// let i = index - 1;
		// if (selectedSlot.includes("AdditionalSlot_")) {
		// 	let tmpSlots = this.props.tmpSlots;
		// 	if (i !== 0) {
		// 		tmpSlots.splice(i, 1);
		// 	} else {
		// 		tmpSlots = [];
		// 	}
		// 	this.setState({ tmpSlots: tmpSlots });
		// } else {
		// 	let slots = Object.assign({}, this.props.slots);
		// 	delete props[selectedSlot];
		// 	this.setState({ slots: slots });
		// }
		this.setState({ selectedComp: null, selectedSchema: null });
	}

	handleEditSettings(comp, schema, slot) {
		this.setState({
			selectedComp: comp,
			selectedSchema: schema,
			//selectedSlot: slot,
			editing: true,
			editingSettings: true,
		});
	}

	handleConfirmComponent() {
		let selectedComp = this.state.selectedComp;
		let selectedSchema = this.state.selectedSchema;
		let selectedSlot = this.props.selectedSlot;
		let category = this.props.category;

		let settingsSchema = this.props.settingSchemas;
		let settingData = Object.assign({}, this.state.settingData);

		let settingsSchemas = {};
		for (let i in settingsSchema) {
			let schema = settingsSchema[i];
			settingsSchemas[schema.ID] = schema;
		}

		console.log("category");
		console.log(category);
		console.log("selectedSlot");
		console.log(selectedSlot);
		if (category !== null) {
			//console.log("onAddAdditionalConfirm category null");
			if (selectedSlot.includes("AdditionalSlot_")) {
				if (selectedComp === null || selectedComp === undefined) {
					this.setState({
						selectedComp: null,
						selectedSchema: null,
					});
					return;
				}
				//console.log("onAddAdditionalConfirm category " + category);

				let tmpSlots = this.props.tmpSlots.slice();
				tmpSlots.push(selectedComp);

				let settingsName = selectedSchema.modelSettings + string_json_ext;
				let currentSchema = settingsSchemas[settingsName];
				let uuid = uuidv4();
				let settingCompData = null;
				if (selectedSchema.modelSettings === "NA") {
					settingCompData = {
						Name: `${selectedSchema.title}`,
						ID: uuid,
						Component_ID: selectedComp.ID,
					};
				} else {
					settingCompData = {
						Name: `${currentSchema.title}`,
						ID: uuid,
						Component_ID: selectedComp.ID,
						Tier: currentSchema.tier,
						Schema_ID: currentSchema.ID,
						Version: currentSchema.version,
					};
				}

				let slotSettings = [];
				if (
					settingData[selectedSlot] !== null &&
					settingData[selectedSlot] !== undefined
				) {
					slotSettings = settingData[selectedSlot];
				}
				slotSettings.push(settingCompData);
				settingData[selectedSlot] = slotSettings;

				//TODO Should return tmpSlot if used inside ChannelCanvas_V2
				this.setState({
					//tmpSlots: tmpSlots,
					settingData: settingData,
					selectedComp: null,
					selectedSchema: null,
				});
			} else {
				if (selectedComp === null || selectedComp === undefined) {
					this.setState({
						selectedComp: null,
						selectedSchema: null,
					});
					return;
				}

				let settingsName = selectedSchema.modelSettings + string_json_ext;
				let currentSchema = settingsSchemas[settingsName];
				let uuid = uuidv4();
				let settingCompData = null;
				if (selectedSchema.modelSettings === "NA") {
					settingCompData = {
						Name: `${selectedSchema.title}`,
						ID: uuid,
						Component_ID: selectedComp.ID,
					};
				} else {
					settingCompData = {
						Name: `${currentSchema.title}`,
						ID: uuid,
						Component_ID: selectedComp.ID,
						Tier: currentSchema.tier,
						Schema_ID: currentSchema.ID,
						Version: currentSchema.version,
					};
				}

				settingData = settingCompData;
				this.setState({
					//tmpSlots: tmpSlots,
					settingData: settingData,
					selectedComp: null,
					selectedSchema: null,
				});
			}
		}
	}

	render() {
		const buttonContainerRow = {
			display: "flex",
			flexDirection: "row",
			flexWap: "wrap",
			justifyContent: "center",
			padding: "5px",
		};
		const button2 = {
			width: "250px",
			height: "50px",
			marginLeft: "5px",
			marginRight: "5px",
		};

		const regularImageStyle = {
			height: "80px",
			width: "80px",
			margin: "auto",
		};

		const modalGridContainer = {
			display: "flex",
			flexDirection: "column",
			flexWrap: "wrap",
			justifyContent: "center",
			width: "100%",
			height: "100%",
			alignItems: "center",
		};
		const modalGridPanel = {
			display: "flex",
			flexDirection: "row",
			flexWrap: "wrap",
			justifyContent: "center",
			width: "100%",
			height: "90%",
			alignItems: "left",
		};

		const modalGrid = {
			display: "flex",
			flexDirection: "column",
			//flexWrap: "wrap",
			justifyContent: "flex-start",
			overflow: "auto",
			width: "20%",
			height: "100%",
			maxHeight: "100%",
			//alignItems: "center",
		};
		const modalTopListContainer = {
			display: "flex",
			flexDirection: "row",
			flexWrap: "wrap",
			justifyContent: "space-evenly",
			overflow: "auto",
			height: "20%",
			maxHeight: "20%",
			alignItems: "center",
		};

		const modalTopList = {
			display: "flex",
			flexDirection: "row",
			flexWrap: "wrap",
			justifyContent: "space-evenly",
			alignItems: "center",
		};
		const multiTab = {
			display: "flex",
			flexDirection: "row",
			flexWrap: "wrap",
			overflow: "auto",
			maxHeight: "100%",
			minWidth: "70%",
			justifyContent: "flex-start",
			width: "70%",
			alignItems: "left",
			marginLeft: "10px",
		};

		let buttonStyle = {
			textAlign: "center",
			alignItems: "center",
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-around",
			backgroundColor: "white",
			padding: "0px",
			margin: "5px",
			border: "5px solid blue",
			fontSize: "14px",
			color: "inherit",
			cursor: "pointer",
		};

		let fontSize = number_canvas_element_icons_height + 2;
		let grabberCloserSize = number_canvas_element_icons_height;
		const styleCloser = {
			lineHeight: `${grabberCloserSize}px`,
			padding: "0px",
			border: "none",
			fontSize: `${fontSize}px`,
			backgroundColor: "transparent",
			cursor: "pointer",
			color: "grey",
			textAlign: "right",
			verticalAlign: "middle",
			position: "relative",
			left: "5px",
			top: "5px",
		};

		let slots = this.state.slots;
		let componentSchema = this.props.componentSchemas;
		let compSchemas = {};
		for (let i in componentSchema) {
			let schema = componentSchema[i];
			compSchemas[schema.ID] = schema;
		}
		let settingsSchema = this.props.settingSchemas;
		let settingsSchemas = {};
		for (let i in settingsSchema) {
			let schema = settingsSchema[i];
			settingsSchemas[schema.ID] = schema;
		}
		let experimentalsSchema = this.props.experimentalSchemas;
		let expSchemas = {};
		for (let i in experimentalsSchema) {
			let schema = experimentalsSchema[i];
			expSchemas[schema.ID] = schema;
		}

		let selectedComp = this.state.selectedComp;
		let selectedSlot = this.props.selectedSlot;
		let selectedSchema = this.state.selectedSchema;
		let selectedID = null;

		if (
			selectedComp !== null &&
			(selectedSchema === null || selectedSchema === undefined)
		) {
			selectedID = selectedComp.Schema_ID;
			selectedSchema = compSchemas[selectedID];
		}

		if (this.state.editing) {
			if (this.state.editingSettings) {
				let settingData = this.props.settingData;
				let settingsName = selectedSchema.modelSettings + string_json_ext;
				let settings = null;
				let comp = null;
				let id = null;

				let settingCompData = null;
				if (selectedSlot.includes("AdditionalSlot_")) {
					let currentSlots = this.props.tmpSlots;
					// console.log("slots");
					// console.log(slots);
					// console.log("selectedSlot");
					// console.log(selectedSlot);
					// console.log("currentSlots");
					// console.log(currentSlots);
					let index = currentSlots.indexOf(selectedComp);
					settingCompData = settingData[selectedSlot][index];
				} else {
					settingCompData = settingData[selectedSlot];
				}
				id = settingCompData.ID;
				settings = settingsSchemas[settingsName];
				comp = settingCompData;
				// console.log("settingData");
				// console.log(settingData);
				// console.log("settingsName");
				// console.log(settingsName);
				// console.log("settings");
				// console.log(settings);
				// console.log("comp");
				// console.log(comp);
				return (
					<MultiTabFormWithHeaderV3
						schema={settings}
						inputData={comp}
						id={id}
						onConfirm={this.onElementDataSave}
						onCancel={this.onElementDataCancel}
						overlaysContainer={this.props.overlaysContainer}
						currentChildrenComponentIdentifier={
							string_currentNumberOf_identifier
						}
						minChildrenComponentIdentifier={string_minNumberOf_identifier}
						maxChildrenComponentIdentifier={string_maxNumberOf_identifier}
						elementByType={this.props.elementByType}
						editable={true}
					/>
				);
			} else {
				let itemList = [];
				Object.keys(this.props.componentData).forEach((compIndex) => {
					let comp = this.props.componentData[compIndex];

					let schema_id = comp.Schema_ID;
					let compSchema = compSchemas[schema_id];
					if (compSchema === null) return;
					let compSchemaCategory = compSchema.category;
					if (
						this.props.category.includes(
							schema_id.replace(string_json_ext, "")
						) ||
						this.props.category.includes(compSchemaCategory) ||
						this.props.category.includes(
							compSchemaCategory.substring(0, compSchemaCategory.indexOf("."))
						)
					) {
						// if (selectedComp === null || selectedComp === undefined) {
						// 	selectedComp = comp;
						// }
						// if (selectedSchema === null || selectedSchema === undefined)
						// 	selectedSchema = compSchema;
						let compImage = url.resolve(
							this.props.imagesPath,
							compSchema.image
						);
						let compItemImage = (
							<img
								src={
									compImage +
									(compImage.indexOf("githubusercontent.com") > -1
										? "?sanitize=true"
										: "")
								}
								alt={comp.Name}
								style={regularImageStyle}
							/>
						);

						let buttonStyleModified = null;
						if (comp === selectedComp) {
							buttonStyleModified = Object.assign({}, buttonStyle, {
								border: "5px solid cyan",
							});
						} else {
							buttonStyleModified = buttonStyle;
						}

						let compButton = (
							<button
								key={"button-" + comp.Name}
								style={buttonStyleModified}
								onClick={() => this.handleSelectComp(comp)}
							>
								{compItemImage}
								{comp.Name}
							</button>
						);
						itemList.push(compButton);
					}
				});
				let topItems = null;
				let confirmCallback = null;
				if (selectedSlot.includes("AdditionalSlot_")) {
					//let items = [];
					// let slots = this.state.slots;
					// let selectedSlot = this.state.selectedSlot;
					// if (slots[selectedSlot] !== undefined && slots[selectedSlot] !== null)
					// 	items = slots[selectedSlot];
					let items = this.props.tmpSlots;

					let slotList = [];
					Object.keys(items).forEach((compIndex) => {
						let comp = items[compIndex];

						let schema_id = comp.Schema_ID;
						let compSchema = compSchemas[schema_id];
						if (compSchema === null) return;

						let compImage = url.resolve(
							this.props.imagesPath,
							compSchema.image
						);
						let compItemImage = (
							<img
								src={
									compImage +
									(compImage.indexOf("githubusercontent.com") > -1
										? "?sanitize=true"
										: "")
								}
								alt={comp.Name}
								style={regularImageStyle}
							/>
						);

						let buttonStyleModified = null;
						if (comp === selectedComp) {
							buttonStyleModified = Object.assign({}, buttonStyle, {
								border: "5px solid cyan",
								margin: "5px",
							});
						} else {
							buttonStyleModified = Object.assign({}, buttonStyle, {
								margin: "5px",
							});
						}
						slotList.push(
							<div>
								<button
									type="button"
									onClick={() =>
										this.handleDeleteComp(selectedSlot, slotList.length)
									}
									style={styleCloser}
								>
									x
								</button>
								<button
									key={"button-" + comp.Name}
									style={buttonStyleModified}
									onClick={() =>
										this.handleEditSettings(comp, compSchema, selectedSlot)
									}
								>
									{compItemImage}
									{comp.Name}
								</button>
							</div>
						);
					});

					topItems = (
						<div style={modalTopListContainer}>
							<h5>Current components in this slot</h5>
							<div style={modalTopList}>{slotList}</div>
						</div>
					);
					// if (
					// 	slotList !== null &&
					// 	slotList !== undefined &&
					// 	slotList.length > 0
					// )

					Object.assign(modalGridPanel, { height: "60%" });
					confirmCallback = this.handleConfirmComponent;
				}

				let multiTabPanel = null;
				if (selectedComp !== null && selectedComp !== undefined)
					multiTabPanel = (
						<MultiTabFormWithHeaderV3
							schema={selectedSchema}
							inputData={selectedComp}
							id={selectedComp.ID}
							onConfirm={confirmCallback}
							onCancel={null}
							overlaysContainer={this.props.overlaysContainer}
							currentChildrenComponentIdentifier={
								string_currentNumberOf_identifier
							}
							minChildrenComponentIdentifier={string_minNumberOf_identifier}
							maxChildrenComponentIdentifier={string_maxNumberOf_identifier}
							elementByType={this.props.elementByType}
							notModal={true}
							editable={false}
						/>
					);

				return (
					<ModalWindow overlaysContainer={this.props.overlaysContainer}>
						<div style={modalGridContainer}>
							{topItems}
							<div style={modalGridPanel}>
								<div style={modalGrid}>{itemList}</div>
								<div style={multiTab}>{multiTabPanel}</div>
							</div>
							<div style={buttonContainerRow}>
								<Button
									style={button2}
									size="lg"
									onClick={this.onInnerElementDataSave} //this.onAddAdditionalConfirm
								>
									Confirm
								</Button>
								<Button
									style={button2}
									size="lg"
									onClick={this.onInnerElementDataCancel} //this.onAddAdditionalCancel
								>
									Cancel
								</Button>
							</div>
						</div>
					</ModalWindow>
				);
			}
		}
	}
}
