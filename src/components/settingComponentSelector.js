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
	string_currentNumberOf_identifier,
	string_minNumberOf_identifier,
	string_maxNumberOf_identifier,
	number_canvas_element_icons_height,
} from "../constants";

export default class SettingComponentSelector extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			editing: false,
			selectedComp: null,
			selectedSchema: null,

			currentComp: null,
			settingData: props.inputData || null,
		};

		if (this.state.settingData !== null && this.state.settingData !== undefined)
			Object.keys(this.props.componentData).forEach((compIndex) => {
				let comp = this.props.componentData[compIndex];
				if (comp.ID === this.state.settingData.Component_ID) {
					this.state.currentComp = comp;
				}
			});

		this.handleSelectComp = this.handleSelectComp.bind(this);
		this.handleDeleteComp = this.handleDeleteComp.bind(this);
		this.handleEditSettings = this.handleEditSettings.bind(this);

		this.onAddConfirm = this.onAddConfirm.bind(this);

		this.onElementDataCancel = this.onElementDataCancel.bind(this);
		this.onElementDataSave = this.onElementDataSave.bind(this);

		this.onConfirm = this.onConfirm.bind(this);
		this.onCancel = this.onCancel.bind(this);
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

	handleDeleteComp() {
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
		this.setState({
			settingData: null,
			selectedComp: null,
			selectedSchema: null,
		});
	}

	handleEditSettings(comp, schema) {
		this.setState({
			selectedComp: comp,
			selectedSchema: schema,
			//selectedSlot: slot,
			editing: true,
		});
	}

	onConfirm() {
		let settingData = this.state.settingData;
		//let slots = this.state.slots;
		this.setState({
			editing: false,
			selectedSlot: null,
			selectedComp: null,
			currentComp: null,
			settingData: {},
		});
		this.props.onConfirm(this.props.id, settingData);
	}

	onCancel() {
		this.setState({
			editing: false,
			selectedSlot: null,
			selectedComp: null,
			currentComp: null,
			settingData: {},
		});
		this.props.onCancel();
	}

	onElementDataSave(id, data) {
		// let selectedComp = this.state.selectedComp;
		// let selectedSlot = this.state.selectedSlot;
		// let category = this.state.category;
		//let slots = this.state.slots;
		let settingData = Object.assign(this.state.settingData, data);
		this.setState({ editing: false, settingData: settingData });
	}

	onElementDataCancel() {
		// let selectedSlot = this.state.selectedSlot;
		// if (selectedSlot.includes("AdditionalSlot_")) {
		// 	//if (this.state.editingSettings) {
		// 	this.setState({ editingSettings: false });
		// } else {
		// 	this.setState({ editing: false, editingSettings: false });
		// }
		this.setState({ editing: false });
	}

	onAddConfirm() {
		let selectedComp = this.state.selectedComp;
		let selectedSchema = this.state.selectedSchema;
		//let selectedSlot = this.props.selectedSlot;
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

		if (this.state.currentComp) {
			return;
		}

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
			currentComp: selectedComp,
			selectedComp: null,
			selectedSchema: null,
		});
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
			flexDirection: "column",
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
			let settingData = this.state.settingData;
			let settingsName = selectedSchema.modelSettings + string_json_ext;
			let id = settingData.ID;
			let settings = settingsSchemas[settingsName];
			return (
				<MultiTabFormWithHeaderV3
					schema={settings}
					inputData={settingData}
					id={id}
					onConfirm={this.onElementDataSave}
					onCancel={this.onElementDataCancel}
					overlaysContainer={this.props.overlaysContainer}
					currentChildrenComponentIdentifier={string_currentNumberOf_identifier}
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
				let category = this.props.category;
				if (
					category.includes(schema_id.replace(string_json_ext, "")) ||
					category.includes(compSchemaCategory) ||
					category.includes(
						compSchemaCategory.substring(0, compSchemaCategory.indexOf("."))
					)
				) {
					// if (selectedComp === null || selectedComp === undefined) {
					// 	selectedComp = comp;
					// }
					// if (selectedSchema === null || selectedSchema === undefined)
					// 	selectedSchema = compSchema;
					let compImage = url.resolve(this.props.imagesPath, compSchema.image);
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
			//let item = this.state.currentComp;

			// if (item !== null && item !== undefined) {
			//let items = [];
			// let slots = this.state.slots;
			// let selectedSlot = this.state.selectedSlot;
			// if (slots[selectedSlot] !== undefined && slots[selectedSlot] !== null)
			// 	items = slots[selectedSlot];

			let comp = this.state.currentComp;
			let butt = null;
			if (comp !== null && comp !== undefined) {
				let schema_id = comp.Schema_ID;
				let compSchema = compSchemas[schema_id];
				if (compSchema === null) return;

				let compImage = url.resolve(this.props.imagesPath, compSchema.image);
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
				butt = (
					<div>
						<button
							type="button"
							onClick={this.handleDeleteComp}
							style={styleCloser}
						>
							x
						</button>
						<button
							key={"button-" + comp.Name}
							style={buttonStyleModified}
							onClick={() => this.handleEditSettings(comp, compSchema)}
						>
							{compItemImage}
							{comp.Name}
						</button>
					</div>
				);
			}

			topItems = (
				<div style={modalTopListContainer}>
					<h5>Current component in this slot</h5>
					<div style={modalTopList}>{butt}</div>
				</div>
			);

			Object.assign(modalGridPanel, { height: "60%" });
			confirmCallback = this.onAddConfirm;
			//}

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

			// console.log("itemList");
			// console.log(itemList);
			// console.log("multiTabPanel");
			// console.log(multiTabPanel);
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
								onClick={this.onConfirm} //this.onAddAdditionalConfirm
							>
								Confirm
							</Button>
							<Button
								style={button2}
								size="lg"
								onClick={this.onCancel} //this.onAddAdditionalCancel
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
