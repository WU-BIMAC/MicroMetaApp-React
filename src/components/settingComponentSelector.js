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

			currentComps: [],
			settingData: props.inputData || null,
		};

		if (
			this.state.settingData === null ||
			this.state.settingData === undefined
		) {
			if (this.props.maxNumberElement === 1) {
				this.state.settingData = {};
			} else {
				this.state.settingData = [];
			}
		}

		// console.log("input setting data");
		// console.log(this.state.settingData);
		if (Array.isArray(this.state.settingData)) {
			Object.keys(this.state.settingData).forEach((settingIndex) => {
				let sett = this.state.settingData[settingIndex];
				Object.keys(this.props.componentData).forEach((compIndex) => {
					let comp = this.props.componentData[compIndex];
					if (comp.ID === sett.Component_ID) {
						this.state.currentComps.push(comp);
					}
				});
			});
		} else {
			let compID = this.state.settingData.Component_ID;
			if (compID !== null && compID !== undefined) {
				Object.keys(this.props.componentData).forEach((compIndex) => {
					let comp = this.props.componentData[compIndex];
					if (comp.ID === compID) {
						this.state.currentComps.push(comp);
					}
				});
			}
		}

		if (
			this.props.imageMetadata !== null &&
			this.props.imageMetadata !== undefined &&
			this.props.inputData !== null &&
			this.props.inputData !== undefined
		) {
			let imageMetadata = this.props.imageMetadata;
			let propsSchema = this.props.schema;
			if (
				Array.isArray(propsSchema) &&
				propsSchema[0].ID === "ObjectiveSettings.json" &&
				imageMetadata.ObjectiveSettings !== null &&
				imageMetadata.ObjectiveSettings !== null
			) {
				let imageObjSettings = imageMetadata.ObjectiveSettings;
				let newSettingCompData = Object.assign(
					{},
					imageObjSettings,
					this.state.settingData
				);
				let newImmersionLiquid = null;
				if (
					this.state.settingData.ImmersionLiquid !== null &&
					this.state.settingData.ImmersionLiquid !== undefined
				) {
					if (
						imageObjSettings.ImmersionLiquid !== null &&
						imageObjSettings.ImmersionLiquid !== undefined
					) {
						newImmersionLiquid = Object.assign(
							{},
							imageObjSettings.ImmersionLiquid,
							this.state.settingData.ImmersionLiquid
						);
					} else {
						newImmersionLiquid = this.state.settingData.ImmersionLiquid;
					}
					newSettingCompData.ImmersionLiquid = newImmersionLiquid;
				} else {
					//SHOULD I CREATE A NEW ONE HERE?
				}
				this.state.settingData = newSettingCompData;
			}
		}

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

	handleDeleteComp(index) {
		let i = index;

		let oldSettingData = this.state.settingData;
		let currentComps = this.state.currentComps.slice();
		let compToDelete = currentComps[i];
		currentComps.splice(i, 1);
		let newCurrentComps = currentComps;

		// console.log("newCurrentComps");
		// console.log(newCurrentComps);

		let newSettingData = null;
		if (Array.isArray(oldSettingData)) {
			let indexToDelete = -1;
			for (let y = 0; y < oldSettingData.length; y++) {
				let sett = oldSettingData[y];
				if (sett.Component_ID === compToDelete.ID) {
					indexToDelete = y;
					break;
				}
			}
			newSettingData = oldSettingData.slice();
			if (indexToDelete !== -1) newSettingData.splice(indexToDelete, 1);
		} else {
			newSettingData = {};
		}
		// console.log("newCurrentComps");
		// console.log(newCurrentComps);
		// console.log("newSettingData");
		// console.log(newSettingData);
		this.setState({
			settingData: newSettingData,
			selectedComp: null,
			selectedSchema: null,
			currentComps: newCurrentComps,
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
		//let slots = this.state.slots;
		let newSettingData = null;
		let settingData = null;
		if (this.props.maxNumberElement === 1) {
			newSettingData = {};
			settingData = Object.assign({}, this.state.settingData);
		} else {
			newSettingData = [];
			settingData = this.state.settingData.slice();
		}
		this.setState({
			editing: false,
			selectedSlot: null,
			selectedComp: null,
			currentComps: [],
			settingData: newSettingData,
		});
		// console.log("settingData");
		// console.log(settingData);
		this.props.onConfirm(this.props.id, settingData);
	}

	onCancel() {
		this.setState({
			editing: false,
			selectedSlot: null,
			selectedComp: null,
			currentComps: [],
			settingData: [],
		});
		this.props.onCancel();
	}

	onElementDataSave(id, data) {
		let selectedComp = this.state.selectedComp;
		// let selectedSlot = this.state.selectedSlot;
		// let category = this.state.category;
		//let slots = this.state.slots;
		let oldSettingsData = this.state.settingData;
		let settingsData = null;
		let settingData = null;
		let index = null;
		if (Array.isArray(oldSettingsData)) {
			settingsData = oldSettingsData.slice();
			Object.keys(settingsData).forEach((settingIndex) => {
				let sett = settingsData[settingIndex];
				if (sett.Component_ID === selectedComp.ID) {
					settingData = sett;
					index = settingIndex;
				}
			});
		} else {
			settingData = oldSettingsData;
		}

		if (settingData === null) {
			console.log(
				"Settings data not found in SettingComponentSelector-editing"
			);
			return;
		}

		let newSettingData = Object.assign({}, settingData, data);
		if (data.ImmersionLiquid !== null && data.ImmersionLiquid !== undefined) {
			let oldImmersionLiquid = Object.assign({}, settingData.ImmersionLiquid);
			let immersionLiquid = Object.assign(
				oldImmersionLiquid,
				data.ImmersionLiquid
			);
			newSettingData.ImmersionLiquid = immersionLiquid;
		}
		if (settingsData !== null && index !== null) {
			settingsData[index] = newSettingData;
		} else {
			settingsData = newSettingData;
		}

		// console.log("settingsData");
		// console.log(settingsData);
		this.setState({ editing: false, settingData: settingsData });
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
		//let category = this.props.category;
		let currentComps = this.state.currentComps.slice();

		// let settingsSchema = this.props.settingSchemas;
		// let experimentalsSchema = this.props.experimentalSchemas;
		let oldSettingData = this.state.settingData;
		let settingData = null;
		let isArray = null;
		if (Array.isArray(oldSettingData)) {
			settingData = this.state.settingData.slice();
			isArray = true;
		} else {
			settingData = this.state.settingData;
			let compID = settingData.Component_ID;
			if (compID !== null && compID !== undefined) return;
			isArray = false;
		}

		// let settingsSchemas = {};
		// for (let i in settingsSchema) {
		// 	let schema = settingsSchema[i];
		// 	settingsSchemas[schema.ID] = schema;
		// }

		// let expSchemas = {};
		// for (let i in experimentalsSchema) {
		// 	let schema = experimentalsSchema[i];
		// 	expSchemas[schema.ID] = schema;
		// }

		// if (currentComp !== null && currentComp !== undefined) {
		// 	return;
		// }

		if (selectedComp === null || selectedComp === undefined) {
			this.setState({
				selectedComp: null,
				selectedSchema: null,
			});
			return;
		}

		// let settingsName = selectedSchema.modelSettings + string_json_ext;
		// let currentSchema = settingsSchemas[settingsName];
		let currentSchema = this.props.schema;
		let uuid = uuidv4();
		let settingCompData = null;
		if (selectedSchema.modelSettings === "NA") {
			settingCompData = {
				Name: `${selectedSchema.title}`,
				ID: uuid,
				Component_ID: selectedComp.ID,
			};
		} else {
			if (selectedSchema.modelSettings === "ObjectiveSettings") {
				let uuid2 = uuidv4();
				let objSettingsSchema = currentSchema[0];
				let immersionLiquidSchema = currentSchema[1];
				settingCompData = {
					Name: `${objSettingsSchema.title}`,
					ID: uuid,
					Component_ID: selectedComp.ID,
					Tier: objSettingsSchema.tier,
					Schema_ID: objSettingsSchema.ID,
					Version: objSettingsSchema.version,
				};
				let immersionLiquid = {
					Name: `${immersionLiquidSchema.title}`,
					ID: uuid2,
					Tier: immersionLiquidSchema.tier,
					Schema_ID: immersionLiquidSchema.ID,
					Version: immersionLiquidSchema.version,
				};
				settingCompData.ImmersionLiquid = immersionLiquid;
				// if (
				// 	this.props.imageMetadata !== null &&
				// 	this.props.imageMetadata !== undefined &&
				// 	this.props.imageMetadata.ObjectiveSettings !== null &&
				// 	this.props.ObjectiveSettings !== undefined
				// ) {
				// 	let imageMetadataObjSettings = this.props.imageMetadata
				// 		.ObjectiveSettings;
				// 	let newSettingsCompData = Object.assign(
				// 		{},
				// 		settingCompData,
				// 		imageMetadataObjSettings
				// 	);
				// 	if (
				// 		imageMetadataObjSettings.ImmersionLiquid !== null &&
				// 		imageMetadataObjSettings.ImmersionLiquid !== undefined
				// 	) {
				// 		let imageMetadataImmersionLiquid =
				// 			imageMetadataObjSettings.ImmersionLiquid;
				// 		newSettingsCompData.ImmersionLiquid = imageMetadataImmersionLiquid;
				// 	}
				// 	settingCompData = newSettingsCompData;
				// }
			} else {
				settingCompData = {
					Name: `${currentSchema.title}`,
					ID: uuid,
					Component_ID: selectedComp.ID,
					Tier: currentSchema.tier,
					Schema_ID: currentSchema.ID,
					Version: currentSchema.version,
				};
				// if (selectedSchema.modelSettings === "ImagingEnvironment.json") {
				// 	if (
				// 		this.props.imageMetadata !== null &&
				// 		this.props.imageMetadata !== undefined &&
				// 		this.props.imageMetadata.ImagingEnvironment !== null &&
				// 		this.props.ImagingEnvironment !== undefined
				// 	) {
				// 		let imageMetadataImgEnv = this.props.imageMetadata
				// 			.ImagingEnvironment;
				// 		let newSettingsCompData = Object.assign(
				// 			{},
				// 			settingCompData,
				// 			imageMetadataImgEnv
				// 		);
				// 		settingCompData = newSettingsCompData;
				// 	}
				// }
			}
		}

		let newSettingCompData = null;
		if (
			this.props.imageMetadata !== null &&
			this.props.imageMetadata !== undefined
		) {
			let imageMetadata = this.props.imageMetadata;
			if (
				selectedSchema.modelSettings === "ObjectiveSettings" &&
				imageMetadata.ObjectiveSettings !== null &&
				imageMetadata.ObjectiveSettings !== undefined
			) {
				let imageObjSettings = imageMetadata.ObjectiveSettings;
				newSettingCompData = Object.assign(
					{},
					imageObjSettings,
					settingCompData
				);
				let newImmersionLiquid = null;
				if (
					imageObjSettings.ImmersionLiquid !== null &&
					imageObjSettings.ImmersionLiquid !== undefined
				) {
					newImmersionLiquid = Object.assign(
						{},
						imageObjSettings.ImmersionLiquid,
						settingCompData.ImmersionLiquid
					);
				} else {
					newImmersionLiquid = settingCompData.ImmersionLiquid;
				}
				newSettingCompData.ImmersionLiquid = newImmersionLiquid;
			}
		}
		if (newSettingCompData === null || newSettingCompData === undefined) {
			newSettingCompData = settingCompData;
		}

		currentComps.push(selectedComp);
		if (isArray) {
			settingData.push(newSettingCompData);
		} else {
			settingData = newSettingCompData;
		}

		// console.log("currentComps");
		// console.log(currentComps);
		// console.log("settingData");
		// console.log(settingData);

		this.setState({
			//tmpSlots: tmpSlots,
			settingData: settingData,
			currentComps: currentComps,
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
			height: "250px",
			maxHeight: "250px",
			alignItems: "center",
			width: "80%",
		};

		const modalTopList = {
			display: "flex",
			flexDirection: "row",
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
			margin: "10px",
			border: "2px solid grey",
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
			//position: "relative",
			//left: "5px",
			//top: "5px",
		};
		const styleValidation1 = {
			position: "relative",
			verticalAlign: "middle",
			fontWeight: "bold",
			textAlign: "center",
			left: "22px",
			top: "2px",
		};
		const styleValidation2 = {
			//position: "relative",
			verticalAlign: "middle",
			fontWeight: "bold",
			textAlign: "center",
			//left: "15px",
			//top: "5px",
		};
		const styleIcons = {
			display: "flex",
			flexDirection: "row",
			flexWap: "wrap",
			justifyContent: "left",
			//padding: "5px",
			position: "relative",
			left: "5px",
			top: "10px",
			width: "90%",
			height: "24px",
		};
		const styleValidated1 = Object.assign({}, styleValidation1, {
			color: "green",
		});
		const styleNotValidated1 = Object.assign({}, styleValidation1, {
			color: "red",
		});
		let isValid1 = <div style={styleValidated1}>&#9679;</div>;
		let isInvalid1 = <div style={styleNotValidated1}>&#9679;</div>;

		const styleValidated2 = Object.assign({}, styleValidation2, {
			color: "green",
		});
		const styleNotValidated2 = Object.assign({}, styleValidation2, {
			color: "red",
		});
		let isValid2 = <div style={styleValidated2}>&#9679;</div>;
		let isInvalid2 = <div style={styleNotValidated2}>&#9679;</div>;

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
			selectedComp !== undefined &&
			(selectedSchema === null || selectedSchema === undefined)
		) {
			selectedID = selectedComp.Schema_ID;
			selectedSchema = compSchemas[selectedID];
		}

		if (this.state.editing) {
			let settingsData = this.state.settingData;
			let settingData = null;

			if (Array.isArray(settingsData)) {
				Object.keys(settingsData).forEach((settingIndex) => {
					let sett = settingsData[settingIndex];
					if (sett.Component_ID === selectedComp.ID) settingData = sett;
				});
			} else {
				settingData = settingsData;
			}

			if (settingData === null) {
				console.log(
					"Settings data not found in SettingComponentSelector-editing"
				);
				return;
			}

			let settingsObj = null;
			if (
				settingData.ImmersionLiquid !== null &&
				settingData.ImmersionLiquid !== undefined
			) {
				settingsObj = [];
				settingsObj.push(settingData);
				settingsObj.push(settingData.ImmersionLiquid);
			} else {
				settingsObj = settingData;
			}
			let id = settingData.ID;
			//let settingsName = selectedSchema.modelSettings + string_json_ext;
			//let settings = settingsSchemas[settingsName];
			let settings = this.props.schema;
			return (
				<MultiTabFormWithHeaderV3
					schema={settings}
					inputData={settingsObj}
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
			let settingsData = this.state.settingData;
			let currentComps = this.state.currentComps;
			// console.log("currentComps");
			// console.log(currentComps);
			// console.log("settingsData");
			// console.log(settingsData);
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
					let found = false;
					Object.keys(currentComps).forEach((tmpCompIndex) => {
						let tmpComp = currentComps[tmpCompIndex];
						if (comp.ID === tmpComp.ID) found = true;
					});
					if (found) return;
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

					let buttonStyleModified = Object.assign({}, buttonStyle, {
						width: "100%",
					});
					if (comp === selectedComp) {
						buttonStyleModified = Object.assign({}, buttonStyleModified, {
							border: "2px solid cyan",
						});
					} else {
						buttonStyleModified = buttonStyleModified;
					}

					let validation = validate(comp, compSchema);
					let validated = validation.valid;
					let valid = null;
					if (validated) {
						valid = isValid1;
					} else {
						valid = isInvalid1;
					}
					let compButton = (
						<div
							key={"div-" + comp.Name}
							style={{ display: "flex", width: "100%" }}
						>
							{valid}
							<button
								key={"button-" + comp.Name}
								style={buttonStyleModified}
								onClick={() => this.handleSelectComp(comp)}
							>
								{compItemImage}
								{comp.Name}
							</button>
						</div>
					);
					itemList.push(compButton);
				}
			});
			let slotList = [];
			Object.keys(currentComps).forEach((compIndex) => {
				let comp = currentComps[compIndex];
				let fullButt = null;
				// console.log("comp");
				// console.log(comp);
				if (comp !== null && comp !== undefined) {
					let schema_id = comp.Schema_ID;
					let compSchema = compSchemas[schema_id];
					if (compSchema === null) return;

					let settingData = null;
					if (Array.isArray(settingsData)) {
						Object.keys(settingsData).forEach((settingIndex) => {
							let sett = settingsData[settingIndex];
							if (sett.Component_ID === comp.ID) settingData = sett;
						});
					} else {
						settingData = settingsData;
					}

					if (settingData === null) {
						console.log(
							"Settings data not found in SettingComponentSelector-display"
						);
						return;
					}

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
							border: "2px solid cyan",
						});
					} else if (compSchema.modelSettings === "NA") {
						buttonStyleModified = Object.assign({}, buttonStyle, {
							opacity: "0.4",
							border: "none",
						});
					} else {
						buttonStyleModified = buttonStyle;
					}
					let valid = null;
					let schemaHasProp = false;
					if (settingData !== null && settingData !== undefined) {
						let schema = this.props.schema;
						if (schema !== null && schema !== undefined) {
							let validated = false;
							if (
								settingData.ImmersionLiquid !== null &&
								settingData.ImmersionLiquid !== undefined
							) {
								let schemaHasProp1 =
									Object.keys(schema[0].properties).length > 0;
								let schemaHasProp2 =
									Object.keys(schema[1].properties).length > 0;
								schemaHasProp = schemaHasProp1 && schemaHasProp2;
								let validation1 = validate(settingData, schema[0]);
								let validated1 = validation1.valid;
								let validation2 = validate(
									settingData.ImmersionLiquid,
									schema[1]
								);
								let validated2 = validation2.valid;
								validated = validated1 && validated2;
							} else {
								schemaHasProp = Object.keys(schema.properties).length > 0;
								let validation = validate(settingData, schema);
								validated = validation.valid;
							}
							if (schemaHasProp)
								if (validated) {
									valid = isValid2;
								} else {
									valid = isInvalid2;
								}
						}
					}
					let butt = null;
					if (compSchema.modelSettings !== "NA" && schemaHasProp) {
						butt = (
							<button
								key={"editButton-" + comp.Name}
								style={buttonStyleModified}
								onClick={() => this.handleEditSettings(comp, compSchema)}
							>
								{compItemImage}
								{comp.Name}
							</button>
						);
					} else {
						butt = (
							<button
								key={"editButton-" + comp.Name}
								style={buttonStyleModified}
							>
								{compItemImage}
								{comp.Name}
							</button>
						);
					}

					fullButt = (
						<div key={"fullButton-" + comp.Name}>
							<div style={styleIcons}>
								<button
									key={"deleteButton-" + comp.Name}
									type="button"
									onClick={() => this.handleDeleteComp(compIndex)}
									style={styleCloser}
								>
									x
								</button>
								{valid}
							</div>
							{butt}
						</div>
					);
					slotList.push(fullButt);
				}
			});
			// if (item !== null && item !== undefined) {
			//let items = [];
			// let slots = this.state.slots;
			// let selectedSlot = this.state.selectedSlot;
			// if (slots[selectedSlot] !== undefined && slots[selectedSlot] !== null)
			// 	items = slots[selectedSlot];

			//let comp = this.state.currentComp;
			let width = slotList.length * 150;
			let modalTopListModified = Object.assign({}, modalTopList, {
				width: `${width}px`,
			});
			let topItems = (
				<div style={modalTopListContainer}>
					<h5>Current component in this slot</h5>
					<div style={{ overflow: "auto", width: "100%", maxWidth: "100%" }}>
						<div style={modalTopListModified}>{slotList}</div>
					</div>
				</div>
			);

			Object.assign(modalGridPanel, { height: "60%" });
			//}

			let multiTabPanel = null;
			if (selectedComp !== null && selectedComp !== undefined)
				multiTabPanel = (
					<MultiTabFormWithHeaderV3
						schema={selectedSchema}
						inputData={selectedComp}
						id={selectedComp.ID}
						onConfirm={this.onAddConfirm}
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
