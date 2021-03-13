import React from "react";
import Button from "react-bootstrap/Button";
import { ArcherContainer, ArcherElement } from "react-archer";

import ModalWindow from "./modalWindow";
import PopoverTooltip from "./popoverTooltip";
import MultiTabFormWithHeaderV3 from "./multiTabFormWithHeaderV3";
//import MultiTabFormWithHeader from "./multiTabFormWithHeader";

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
	channelPath_Additional_1_8,
	channelPath_Additional_2,
	channelPath_Additional_3_4_5_6,
	channelPath_Additional_7,
	channelPath_Excitation,
	channelPath_Dichroic,
	channelPath_Emission,
	channelPath_Detector,
} from "../constants";
import { bool } from "prop-types";

export default class ChannelCanvas_V2 extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			//elementList: [],
			elementData: Object.assign({}, this.props.inputData),
			componentsSchema: {},
			linkedFields: props.linkedFields || {},
			imgHeight: null,
			imgWidth: null,
			backgroundScale: null,
			offsetY: 0,
			offsetX: 0,
			headerOffset: props.headerOffset || 0,
			editing: false,
			editingSettings: false,
			hover: null,
			category: null,
			selectedSlot: null,
			selectedComp: null,
			slots: {},
			tmpSlots: [],
			settingData: {},
			channelData: props.channelData || {},
		};

		let components = {};
		Object.keys(this.props.componentData).forEach((compIndex) => {
			let comp = this.props.componentData[compIndex];
			components[comp.ID] = comp;
		});

		if (props.channelData !== null && props.channelData !== undefined) {
			let lightPath = props.channelData[0].LightPath;
			if (lightPath !== null && lightPath !== undefined) {
				let componentSettings = lightPath.ComponentSettings;
				this.state.settingData = componentSettings;
				if (componentSettings !== null && componentSettings !== undefined) {
					for (let slot in componentSettings) {
						let settingDatas = componentSettings[slot];
						if (slot.includes("AdditionalSlot_")) {
							for (let index in settingDatas) {
								let settingData = settingDatas[index];
								let compID = settingData.Component_ID;
								let partialSlots = [];
								if (
									this.state.slots[slot] !== null &&
									this.state.slots[slot] !== undefined
								)
									partialSlots = this.state.slots[slot];
								partialSlots[index] = components[compID];
								this.state.slots[slot] = partialSlots;
							}
						} else {
							let settingData = settingDatas;
							let compID = settingData.Component_ID;
							this.state.slots[slot] = components[compID];
						}
					}
				}
			}
		}

		//TRANSFER INPUT TO SETTING DATA

		//this.addComponentsIndexesIfMissing = this.addComponentsIndexesIfMissing.bind(this);

		this.onEditElement = this.onEditElement.bind(this);
		this.onElementDataCancel = this.onElementDataCancel.bind(this);
		this.onElementDataSave = this.onElementDataSave.bind(this);
		this.onInnerElementDataSave = this.onInnerElementDataSave.bind(this);
		this.onInnerElementDataCancel = this.onInnerElementDataCancel.bind(this);

		this.onAddAdditionalConfirm = this.onAddAdditionalConfirm.bind(this);
		//this.onAddAdditionalCancel = this.onAddAdditionalCancel.bind(this);

		//this.onCanvasElementDataSave = this.onCanvasElementDataSave.bind(this);
		//this.getElementData = this.getElementData.bind(this);
		//this.updatedDimensions = this.updatedDimensions.bind(this);

		//this.areAllElementsValidated = this.areAllElementsValidated.bind(this);

		this.handleClick_additionalItemButton = this.handleClick_additionalItemButton.bind(
			this
		);
		this.handleClick_lightSource = this.handleClick_lightSource.bind(this);
		this.handleClick_detector = this.handleClick_detector.bind(this);
		this.handleClick_couplingLens = this.handleClick_couplingLens.bind(this);
		this.handleClick_relayLens = this.handleClick_relayLens.bind(this);
		this.handleClick_lightSourceCoupling = this.handleClick_lightSourceCoupling.bind(
			this
		);
		this.handleClick_excitation = this.handleClick_excitation.bind(this);
		this.handleClick_dichroic = this.handleClick_dichroic.bind(this);
		this.handleClick_emission = this.handleClick_emission.bind(this);
		this.handleClick_objective = this.handleClick_objective.bind(this);

		this.handleSelectComp = this.handleSelectComp.bind(this);
		this.handleDeleteComp = this.handleDeleteComp.bind(this);
		this.handleEditSettings = this.handleEditSettings.bind(this);

		this.onConfirm = this.onConfirm.bind(this);
		this.onCancel = this.onCancel.bind(this);

		// this.handleScroll = this.handleScroll.bind(this);

		//this.props.updateElementData(this.state.elementData, true);
	}

	//static getDerivedStateFromProps(props, state) {
	// if (props.componentsSchema !== null) {
	// 	let componentsSchema = {};
	// 	Object.keys(props.componentSchemas).forEach((schemaIndex) => {
	// 		let schema = props.componentSchemas[schemaIndex];
	// 		let schema_id = schema.ID;
	// 		componentsSchema[schema_id] = schema;
	// 	});
	// 	let elementList = state.elementList;
	// 	for (let i = 0; i < elementList.length; i++) {
	// 		let element = elementList[i];
	// 		let schema_id = element.schema_ID;
	// 		let schema = componentsSchema[schema_id];
	// 		let object = element.obj;
	// 		let validation = validate(object, schema);
	// 		let validated = validation.valid;
	// 		element.validated = validated;
	// 	}
	// 	return {
	// 		componentsSchema: componentsSchema,
	// 	};
	// }
	// return null;
	//}

	// updatedDimensions(id, width, height, isResize) {
	// 	let element = null;
	// 	this.state.elementList.forEach((item) => {
	// 		if (item.ID === id) element = item;
	// 	});

	// 	let newElementDataList = Object.assign({}, this.state.elementData);
	// 	let obj = newElementDataList[id];

	// 	if (element === null || obj === undefined) return;

	// 	if (element.width !== -1 && element.height !== -1 && !isResize) {
	// 		return;
	// 	}

	// 	element.width = width;
	// 	element.height = height;
	// 	obj.Width = width;
	// 	obj.Height = height;

	// 	let validated = this.areAllElementsValidated();
	// 	this.props.updateElementData(newElementDataList, validated);
	// }

	// onImgLoad({ target: img }) {
	// 	let oldHeight = this.state.imgHeight;
	// 	let oldWidth = this.state.imgWidth;
	// 	if (oldWidth !== null && oldHeight !== null) return;
	// 	let newHeight = img.height;
	// 	let newWidth = img.width;
	// 	this.setState({
	// 		imgHeight: newHeight,
	// 		imgWidth: newWidth,
	// 	});
	// }

	// areAllElementsValidated() {
	// 	let elementList = this.state.elementList;
	// 	for (let i = 0; i < elementList.length; i++) {
	// 		if (!elementList[i].validated) {
	// 			return false;
	// 		}
	// 	}
	// 	return true;
	// }

	// onCanvasElementDataSave(id, data, dataLinkedFields) {
	// 	let linkedFields = this.state.linkedFields;
	// 	if (
	// 		dataLinkedFields !== undefined &&
	// 		Object.keys(dataLinkedFields).length > 0
	// 	) {
	// 		linkedFields[id] = dataLinkedFields;
	// 	}

	// 	// let elementList = this.state.elementList;
	// 	// for (let i = 0; i < elementList.length; i++) {
	// 	// 	if (elementList[i].ID === id) {
	// 	// 		elementList[i].validated = true;
	// 	// 		elementList[i].name = data.Name;
	// 	// 		break;
	// 	// 	}
	// 	// }
	// 	let currentElementData = Object.assign({}, this.state.elementData);
	// 	currentElementData[id] = Object.assign(currentElementData[id], data);
	// 	this.setState({
	// 		elementData: currentElementData,
	// 		linkedFields: linkedFields,
	// 	});

	// 	let validated = this.areAllElementsValidated();
	// 	this.props.updateElementData(currentElementData, validated);
	// 	this.props.updateLinkedFields(linkedFields);
	// }

	// getElementData() {
	// 	return Object.assign({}, this.state.elementData);
	// }

	// addComponentsIndexesIfMissing(schema, newElementData) {
	// 	Object.keys(schema.properties).forEach((key) => {
	// 		let currentNumber = string_currentNumberOf_identifier + key;
	// 		let minNumber = string_minNumberOf_identifier + key;
	// 		let maxNumber = string_maxNumberOf_identifier + key;
	// 		if (newElementData[currentNumber] !== undefined) {
	// 			return;
	// 		}
	// 		if (schema.properties[key].type === string_array) {
	// 			if (schema.required.indexOf(key) != -1) {
	// 				newElementData[currentNumber] = 1;
	// 				newElementData[minNumber] = 1;
	// 				newElementData[maxNumber] = -1;
	// 			} else {
	// 				newElementData[currentNumber] = 0;
	// 				newElementData[minNumber] = 0;
	// 				newElementData[maxNumber] = -1;
	// 			}
	// 		} else if (schema.properties[key].type === string_object) {
	// 			if (schema.required.indexOf(key) === -1) {
	// 				newElementData[currentNumber] = 0;
	// 				newElementData[minNumber] = 0;
	// 				newElementData[maxNumber] = 1;
	// 			} else {
	// 				newElementData[currentNumber] = 1;
	// 				newElementData[minNumber] = 1;
	// 				newElementData[maxNumber] = 1;
	// 			}
	// 		}
	// 	});
	// }

	onConfirm() {
		let channelData = this.state.channelData[0];
		let settingData = this.state.settingData;
		//let slots = this.state.slots;
		channelData.LightPath.ComponentSettings = settingData;
		this.setState({
			editing: false,
			editingSettings: false,
			category: null,
			selectedSlot: null,
			selectedComp: null,
			slots: {},
			tmpSlots: [],
			settingData: {},
			channelData: {},
		});
		this.props.onConfirm(this.props.id, channelData);
	}

	onCancel() {
		this.setState({
			editing: false,
			editingSettings: false,
			category: null,
			selectedSlot: null,
			selectedComp: null,
			slots: {},
			tmpSlots: [],
			settingData: {},
			channelData: {},
		});
		this.props.onCancel();
	}

	onInnerElementDataCancel() {
		//console.log("onInnerElementDataCancel");
		this.setState({
			editing: false,
			editingSettings: false,
			category: null,
			selectedSlot: null,
			selectedComp: null,
			tmpSlots: null,
		});
	}

	onInnerElementDataSave(id, data) {
		//console.log("onInnerElementDataSave");
		let selectedComp = this.state.selectedComp;
		let selectedSchema = this.state.selectedSchema;
		let selectedSlot = this.state.selectedSlot;
		let category = this.state.category;
		let slots = this.state.slots;
		let settingsSchema = this.props.settingSchemas;
		let experimentalsSchema = this.props.experimentalSchemas;
		let settingData = Object.assign({}, this.state.settingData);

		let settingsSchemas = {};
		for (let i in settingsSchema) {
			let schema = settingsSchema[i];
			settingsSchemas[schema.ID] = schema;
		}

		let expSchemas = {};
		for (let i in experimentalsSchema) {
			let schema = experimentalsSchema[i];
			expSchemas[schema.ID] = schema;
		}

		if (category !== null) {
			//console.log("onAddAdditionalConfirm data category " + category);
			slots = Object.assign({}, slots);
			if (selectedSlot.includes("AdditionalSlot_")) {
				let tmpSlots = this.state.tmpSlots;
				slots[selectedSlot] = tmpSlots;
			} else {
				if (selectedComp === null || selectedComp === undefined) {
					this.setState({
						editing: false,
						editingSettings: false,
						category: null,
						selectedSlot: null,
						selectedComp: null,
						selectedSchema: null,
					});
					return;
				}

				slots[selectedSlot] = selectedComp;
				let settingsName = selectedSchema.modelSettings + string_json_ext;
				let currentSchema = settingsSchemas[settingsName];
				let settingCompData = null;
				let uuid = uuidv4();
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
				if (selectedComp.Schema_ID === "Objective.json") {
					let uuid2 = uuidv4();
					let immersionLiquidSchema = expSchemas["ImmersionLiquid.json"];
					if (
						settingCompData.ImmersionLiquid !== null ||
						settingCompData.ImmersionLiquid !== undefined
					) {
						settingCompData.ImmersionLiquid = {
							Name: `${immersionLiquidSchema.title}`,
							ID: uuid2,
							Tier: immersionLiquidSchema.tier,
							Schema_ID: immersionLiquidSchema.ID,
							Version: immersionLiquidSchema.version,
						};
					}
				}
				settingData[selectedSlot] = settingCompData;
			}

			this.setState({
				editing: false,
				editingSettings: false,
				category: null,
				selectedSlot: null,
				selectedComp: null,
				selectedSchema: null,
				slots: slots,
				settingData: settingData,
			});
		}
	}

	onElementDataSave(id, data) {
		let selectedComp = this.state.selectedComp;
		let selectedSlot = this.state.selectedSlot;
		let category = this.state.category;
		//let slots = this.state.slots;
		let settingData = Object.assign({}, this.state.settingData);
		if (this.state.editingSettings) {
			// console.log("saving setting data");
			// console.log(id);
			// console.log(data);
			if (selectedSlot.includes("AdditionalSlot_")) {
				let currentSlots = this.state.tmpSlots;
				let index = currentSlots.indexOf(selectedComp);
				let obj = settingData[selectedSlot][index];
				settingData[selectedSlot][index] = Object.assign(obj, data);
			} else {
				let obj = settingData[selectedSlot];
				settingData[selectedSlot] = Object.assign(obj, data);
			}
			console.log("settingData");
			console.log(settingData);
			this.setState({
				//editing: false,
				editingSettings: false,
				settingData: settingData,
			});
		} else {
			console.log("saving channel data");
			console.log(id);
			console.log(data);
			let currentChannelData = data;
			let currentLightPath = data.LightPath;
			let currentFluorophore = data.Fluorophore;
			let objects = this.state.channelData.slice();
			objects[0] = Object.assign(objects[0], currentChannelData);
			objects[1] = Object.assign(objects[1], currentLightPath);
			objects[2] = Object.assign(objects[2], currentFluorophore);
			this.setState({
				editing: false,
				editingSettings: false,
				channelData: objects,
			});
		}
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
		let i = index - 1;
		if (selectedSlot.includes("AdditionalSlot_")) {
			let tmpSlots = this.state.tmpSlots;
			if (i !== 0) {
				tmpSlots.splice(i, 1);
			} else {
				tmpSlots = [];
			}
			this.setState({ tmpSlots: tmpSlots });
		} else {
			let slots = Object.assign({}, this.state.slots);
			delete slots[selectedSlot];
			this.setState({ slots: slots });
		}
	}

	handleEditSettings(comp, schema, slot) {
		this.setState({
			selectedComp: comp,
			selectedSchema: schema,
			selectedSlot: slot,
			editing: true,
			editingSettings: true,
		});
	}

	onElementDataCancel() {
		// if (this.state.editingSettings) {
		// 	this.setState({ editingSettings: false });
		// } else {
		// 	this.setState({ editing: false, editingSettings: false });
		// }
		this.setState({ editing: false, editingSettings: false });
	}

	onEditElement() {
		this.setState({ editing: true });
		if (bool_isDebug) console.log("edit channel data");
	}

	onAddAdditionalConfirm() {
		//console.log("onAddAdditionalConfirm - click");
		let selectedComp = this.state.selectedComp;
		let selectedSchema = this.state.selectedSchema;
		let selectedSlot = this.state.selectedSlot;
		let category = this.state.category;
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
						selectedSlot: null,
						selectedComp: null,
					});
					return;
				}
				//console.log("onAddAdditionalConfirm category " + category);

				let tmpSlots = this.state.tmpSlots.slice();
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

				this.setState({
					tmpSlots: tmpSlots,
					settingData: settingData,
					selectedComp: null,
					selectedSchema: null,
				});
			}
		}
	}

	handleClick_additionalItemButton(category, index) {
		let i = Number(index);
		let selectedSlot = "AdditionalSlot_" + i;
		let slots = this.state.slots;
		let comp = null;
		let localComps = null;
		if (slots[selectedSlot] !== null && slots[selectedSlot] !== undefined) {
			localComps = slots[selectedSlot];
			comp = localComps[localComps.length - 1];
		} else {
			localComps = [];
		}
		this.setState({
			editing: true,
			category: category,
			selectedSlot: selectedSlot,
			selectedComp: comp,
			tmpSlots: localComps,
		});
	}

	handleClick_lightSource() {
		let category = ["Fluorescence_LightSource", "Transmitted_LightSource"];
		let selectedSlot = "LightSource";
		let slots = this.state.slots;
		let comp = null;
		if (slots[selectedSlot] !== null && slots[selectedSlot] !== undefined)
			comp = slots[selectedSlot];
		this.setState({
			editing: true,
			category: category,
			selectedSlot: selectedSlot,
			selectedComp: comp,
		});
	}

	handleClick_detector() {
		let category = ["Detector"];
		let selectedSlot = "Detector";
		let slots = this.state.slots;
		let comp = null;
		if (slots[selectedSlot] !== null && slots[selectedSlot] !== undefined)
			comp = slots[selectedSlot];
		this.setState({
			editing: true,
			category: category,
			selectedSlot: selectedSlot,
			selectedComp: comp,
		});
	}

	handleClick_couplingLens() {
		let category = ["CouplingLens"];
		let selectedSlot = "CouplingLens";
		let slots = this.state.slots;
		let comp = null;
		if (slots[selectedSlot] !== null && slots[selectedSlot] !== undefined)
			comp = slots[selectedSlot];
		this.setState({
			editing: true,
			category: category,
			selectedSlot: selectedSlot,
			selectedComp: comp,
		});
	}

	handleClick_relayLens() {
		let category = ["RelayLens"];
		let selectedSlot = "RelayLens";
		let slots = this.state.slots;
		let comp = null;
		if (slots[selectedSlot] !== null && slots[selectedSlot] !== undefined)
			comp = slots[selectedSlot];
		this.setState({
			editing: true,
			category: category,
			selectedSlot: selectedSlot,
			selectedComp: comp,
		});
	}

	handleClick_lightSourceCoupling() {
		let category = ["LightSourceCoupling"];
		let selectedSlot = "LightSourceCoupling";
		let slots = this.state.slots;
		let comp = null;
		if (slots[selectedSlot] !== null && slots[selectedSlot] !== undefined)
			comp = slots[selectedSlot];
		this.setState({
			editing: true,
			category: category,
			selectedSlot: selectedSlot,
			selectedComp: comp,
		});
	}

	handleClick_excitation() {
		let category = channelPath_Excitation;
		let selectedSlot = "ExcitationFilter";
		let slots = this.state.slots;
		let comp = null;
		if (slots[selectedSlot] !== null && slots[selectedSlot] !== undefined)
			comp = slots[selectedSlot];
		this.setState({
			editing: true,
			category: category,
			selectedSlot: selectedSlot,
			selectedComp: comp,
		});
	}

	handleClick_dichroic() {
		let category = channelPath_Dichroic;
		let selectedSlot = "Dichroic";
		let slots = this.state.slots;
		let comp = null;
		if (slots[selectedSlot] !== null && slots[selectedSlot] !== undefined)
			comp = slots[selectedSlot];
		this.setState({
			editing: true,
			category: category,
			selectedSlot: selectedSlot,
			selectedComp: comp,
		});
	}

	handleClick_emission() {
		let category = channelPath_Emission;
		let selectedSlot = "EmissionFilter";
		let slots = this.state.slots;
		let comp = null;
		if (slots[selectedSlot] !== null && slots[selectedSlot] !== undefined)
			comp = slots[selectedSlot];
		this.setState({
			editing: true,
			category: category,
			selectedSlot: selectedSlot,
			selectedComp: comp,
		});
	}

	handleClick_objective() {
		let category = ["Objective"];
		let selectedSlot = "Objective";
		let slots = this.state.slots;
		let comp = null;
		if (slots[selectedSlot] !== null && slots[selectedSlot] !== undefined)
			comp = slots[selectedSlot];
		this.setState({
			editing: true,
			category: category,
			selectedSlot: selectedSlot,
			selectedComp: comp,
		});
	}

	createAddButton(buttonStyle, image, index, category) {
		//
		return (
			<button
				style={buttonStyle}
				onClick={() => this.handleClick_additionalItemButton(category, index)}
			>
				{image}
				Add additional element
			</button>
		);
	}

	static createSlotButton(
		imagesPath,
		imageName,
		imageSlot,
		slots,
		compSchemas,
		style,
		buttonStyle,
		styleCloser,
		callback,
		deleteCallback,
		editCallback,
		text
	) {
		let image = null;
		let name = text;
		let needDelete = false;
		let element = null;
		if (slots[imageSlot] !== null && slots[imageSlot] !== undefined) {
			element = slots[imageSlot];
			image = url.resolve(imagesPath, compSchemas[element.Schema_ID].image);
			name = element.Name;
			needDelete = true;
		} else {
			image = url.resolve(imagesPath, imageName);
		}
		let itemImage = (
			<img
				src={
					image +
					(image.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "")
				}
				alt={imageSlot}
				style={style}
			/>
		);

		let button = null;
		if (needDelete)
			button = (
				<div>
					<button
						type="button"
						onClick={() => deleteCallback(imageSlot)}
						style={styleCloser}
					>
						x
					</button>
					<button
						style={buttonStyle}
						onClick={() =>
							editCallback(element, compSchemas[element.Schema_ID], imageSlot)
						}
					>
						{itemImage}
						{name}
					</button>
				</div>
			);
		else
			button = (
				<button style={buttonStyle} onClick={callback}>
					{itemImage}
					{name}
				</button>
			);
		return button;
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

		let channelData = this.state.channelData;

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
		let selectedSlot = this.state.selectedSlot;
		let selectedSchema = null;
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
				let settingData = this.state.settingData;
				let settingsName = selectedSchema.modelSettings + string_json_ext;
				let settings = null;
				let comp = null;
				let id = null;
				if (selectedComp.Schema_ID === "Objective.json") {
					let settingCompData = settingData[selectedSlot];
					id = settingCompData.ID;
					let immersionLiquidSchema = expSchemas["ImmersionLiquid.json"];
					let immersionLiquid = settingCompData.ImmersionLiquid;
					comp = [];
					comp[0] = settingCompData;
					comp[1] = immersionLiquid;
					settings = [];
					settings[0] = settingsSchemas[settingsName];
					settings[1] = immersionLiquidSchema;
				} else {
					let settingCompData = null;
					if (selectedSlot.includes("AdditionalSlot_")) {
						let currentSlots = this.state.tmpSlots;
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
				}
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
			} else if (this.state.category === null) {
				return (
					<MultiTabFormWithHeaderV3
						schema={this.props.schema}
						inputData={channelData}
						id={this.props.id}
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
						this.state.category.includes(
							schema_id.replace(string_json_ext, "")
						) ||
						this.state.category.includes(compSchemaCategory) ||
						this.state.category.includes(compSchemaCategory.substring(0, compSchemaCategory.indexOf(".")))
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
					let items = this.state.tmpSlots;

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
					let arrowedSlotList = [];
					for (let i = 0; i < slotList.length; i++) {
						let button1 = slotList[i];
						let nextIndex = i + 1;
						let hasConnection = false;

						if (
							slotList[nextIndex] !== null &&
							slotList[nextIndex] !== undefined
						) {
							hasConnection = true;
							//console.log("Index " + i + " hasConnection");
						}
						let id1 = "button" + i;
						let id2 = "button" + nextIndex;
						let relations = [];
						if (hasConnection) {
							relations = [
								{
									targetId: `${id2}`,
									targetAnchor: "left",
									sourceAnchor: "right",
								},
							];
						}
						let arrowItem = (
							<div key={id1} style={{ margin: "10px" }}>
								<ArcherElement
									key={"arrowItem" + id1}
									id={id1}
									relations={relations}
								>
									{button1}
								</ArcherElement>
							</div>
						);
						arrowedSlotList.push(arrowItem);
					}
					//console.log(arrowedSlotList);

					topItems = (
						<div style={modalTopListContainer}>
							<h5>Current components in this slot</h5>
							<ArcherContainer strokeColor="red">
								<div style={modalTopList}>{arrowedSlotList}</div>
							</ArcherContainer>
						</div>
					);
					// if (
					// 	slotList !== null &&
					// 	slotList !== undefined &&
					// 	slotList.length > 0
					// )

					Object.assign(modalGridPanel, { height: "60%" });
					confirmCallback = this.onAddAdditionalConfirm;
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

		const grid = {
			display: "flex",
			flexDirection: "column",
			flexWrap: "wrap",
			justifyContent: "space-between",
			minHeight: "800px",
			height: "800px",
		};

		const gridRow = {
			display: "flex",
			flexDirection: "row",
			flexWrap: "wrap",
			justifyContent: "space-between",
			width: "100%",
			height: "130px",
			alignItems: "center",
		};

		const gridRowAdd = {
			display: "flex",
			flexDirection: "row",
			flexWrap: "wrap",
			justifyContent: "space-between",
			width: "100%",
			height: "70px",
			alignItems: "center",
		};

		const gridSpace = {
			display: "flex",
			flexDirection: "column",
			flexWrap: "wrap",
			minWidth: "120px",
			height: "120px",
			width: "18%",
			justifyContent: "center",
			alignItems: "center",
			//margin: "5px",
			alignContent: "center",
		};

		const gridSpaceAdd = {
			display: "flex",
			flexDirection: "column",
			flexWrap: "wrap",
			minWidth: "120px",
			height: "60px",
			width: "18%",
			justifyContent: "center",
			alignItems: "center",
			//margin: "5px",
			alignContent: "center",
		};

		//const gridSpaceSpecimen = Object.assign({ fontSize: "20px" }, gridSpace);

		const regularOpaqueImageStyle = Object.assign(
			{ opacity: "0.4" },
			regularImageStyle
		);

		const addButtonImageStyle = {
			height: "25px",
			width: "25px",
			margin: "auto",
		};

		let addButtonImage = url.resolve(this.props.imagesPath, "AddButton.svg");
		let additionalItemImage = (
			<img
				src={
					addButtonImage +
					(addButtonImage.indexOf("githubusercontent.com") > -1
						? "?sanitize=true"
						: "")
				}
				alt={"Add"}
				style={addButtonImageStyle}
			/>
		);

		let additionalItemButton_1 = this.createAddButton(
			buttonStyle,
			additionalItemImage,
			1,
			channelPath_Additional_1_8
		);
		let additionalItemButton_2 = this.createAddButton(
			buttonStyle,
			additionalItemImage,
			2,
			channelPath_Additional_2
		);
		let additionalItemButton_3 = this.createAddButton(
			buttonStyle,
			additionalItemImage,
			3,
			channelPath_Additional_3_4_5_6
		);
		let additionalItemButton_4 = this.createAddButton(
			buttonStyle,
			additionalItemImage,
			4,
			channelPath_Additional_3_4_5_6
		);
		let additionalItemButton_5 = this.createAddButton(
			buttonStyle,
			additionalItemImage,
			5,
			channelPath_Additional_3_4_5_6
		);
		let additionalItemButton_6 = this.createAddButton(
			buttonStyle,
			additionalItemImage,
			6,
			channelPath_Additional_3_4_5_6
		);
		let additionalItemButton_7 = this.createAddButton(
			buttonStyle,
			additionalItemImage,
			7,
			channelPath_Additional_7
		);
		let additionalItemButton_8 = this.createAddButton(
			buttonStyle,
			additionalItemImage,
			8,
			channelPath_Additional_1_8
		);

		let specimenButton = ChannelCanvas_V2.createSlotButton(
			this.props.imagesPath,
			"LightPath_10_Specimen.svg",
			"Specimen",
			slots,
			compSchemas,
			regularOpaqueImageStyle,
			buttonStyle,
			styleCloser,
			null,
			null,
			null,
			"Specimen"
		);

		let lightSourceButton = ChannelCanvas_V2.createSlotButton(
			this.props.imagesPath,
			"LightPath_1_LightSource_outline.svg",
			"LightSource",
			slots,
			compSchemas,
			regularOpaqueImageStyle,
			buttonStyle,
			styleCloser,
			this.handleClick_lightSource,
			this.handleDeleteComp,
			this.handleEditSettings,
			"Select Light Source"
		);

		let detectorButton = ChannelCanvas_V2.createSlotButton(
			this.props.imagesPath,
			"LightPath_9_Detector_outline.svg",
			"Detector",
			slots,
			compSchemas,
			regularOpaqueImageStyle,
			buttonStyle,
			styleCloser,
			this.handleClick_detector,
			this.handleDeleteComp,
			this.handleEditSettings,
			"Select Detector"
		);

		let relayLensButton = ChannelCanvas_V2.createSlotButton(
			this.props.imagesPath,
			"LightPath_8_RelayLens_outline.svg",
			"RelayLens",
			slots,
			compSchemas,
			regularOpaqueImageStyle,
			buttonStyle,
			styleCloser,
			this.handleClick_relayLens,
			this.handleDeleteComp,
			this.handleEditSettings,
			"Select Relay Lens"
		);

		let couplingLensButton = ChannelCanvas_V2.createSlotButton(
			this.props.imagesPath,
			"LightPath_3_CouplingLens_outline.svg",
			"CouplingLens",
			slots,
			compSchemas,
			regularOpaqueImageStyle,
			buttonStyle,
			styleCloser,
			this.handleClick_couplingLens,
			this.handleDeleteComp,
			this.handleEditSettings,
			"Select Coupling Lens"
		);

		let lightSourceCouplingButton = ChannelCanvas_V2.createSlotButton(
			this.props.imagesPath,
			"LightPath_2_LightSourceCoupling_outline.svg",
			"LightSourceCoupling",
			slots,
			compSchemas,
			regularOpaqueImageStyle,
			buttonStyle,
			styleCloser,
			this.handleClick_lightSourceCoupling,
			this.handleDeleteComp,
			this.handleEditSettings,
			"Select Light Source Coupling"
		);

		let excitationButton = ChannelCanvas_V2.createSlotButton(
			this.props.imagesPath,
			"LightPath_4_ExcitationFilter_outline.svg",
			"ExcitationFilter",
			slots,
			compSchemas,
			regularOpaqueImageStyle,
			buttonStyle,
			styleCloser,
			this.handleClick_excitation,
			this.handleDeleteComp,
			this.handleEditSettings,
			"Select Excitation Wavelength"
		);

		let dichroicButton = ChannelCanvas_V2.createSlotButton(
			this.props.imagesPath,
			"LightPath_5_Dichroic_outline.svg",
			"Dichroic",
			slots,
			compSchemas,
			regularOpaqueImageStyle,
			buttonStyle,
			styleCloser,
			this.handleClick_dichroic,
			this.handleDeleteComp,
			this.handleEditSettings,
			"Select Dichroic"
		);

		let emissionButton = ChannelCanvas_V2.createSlotButton(
			this.props.imagesPath,
			"LightPath_6_EmissionFilter_outline.svg",
			"EmissionFilter",
			slots,
			compSchemas,
			regularOpaqueImageStyle,
			buttonStyle,
			styleCloser,
			this.handleClick_emission,
			this.handleDeleteComp,
			this.handleEditSettings,
			"Select Emission Wavelength"
		);

		let objectiveButton = ChannelCanvas_V2.createSlotButton(
			this.props.imagesPath,
			"LightPath_7_Objective_outline.svg",
			"Objective",
			slots,
			compSchemas,
			regularOpaqueImageStyle,
			buttonStyle,
			styleCloser,
			this.handleClick_objective,
			this.handleDeleteComp,
			this.handleEditSettings,
			"Select Objective"
		);

		let row1 = (
			<div style={gridRow}>
				<ArcherElement
					id="lightSource"
					relations={[
						{
							targetId: "addButton_1",
							targetAnchor: "top",
							sourceAnchor: "bottom",
						},
					]}
				>
					<div style={gridSpace}>{lightSourceButton}</div>
				</ArcherElement>
				<div style={gridSpace}></div>
				<ArcherElement
					id="specimen"
					relations={[
						{
							targetId: "objective",
							targetAnchor: "top",
							sourceAnchor: "bottom",
						},
					]}
				>
					<div style={gridSpace}>{specimenButton}</div>
				</ArcherElement>
				<div style={gridSpace}></div>
				<ArcherElement id="detectorButton" relations={[]}>
					<div style={gridSpace}>{detectorButton}</div>
				</ArcherElement>
			</div>
		);
		let row2 = (
			<div style={gridRowAdd}>
				<ArcherElement
					id="addButton_1"
					relations={[
						{
							targetId: "couplingLens",
							targetAnchor: "top",
							sourceAnchor: "bottom",
						},
					]}
				>
					<div style={gridSpaceAdd}>{additionalItemButton_1}</div>
				</ArcherElement>
				<div style={gridSpaceAdd}></div>
				<div style={gridSpaceAdd}></div>
				<div style={gridSpaceAdd}></div>
				<ArcherElement
					id="addButton_8"
					relations={[
						{
							targetId: "detectorButton",
							targetAnchor: "bottom",
							sourceAnchor: "top",
						},
					]}
				>
					<div style={gridSpaceAdd}>{additionalItemButton_8}</div>
				</ArcherElement>
			</div>
		);

		let row3 = (
			<div style={gridRow}>
				<ArcherElement
					id="couplingLens"
					relations={[
						{
							targetId: "lightSourceCoupling",
							targetAnchor: "top",
							sourceAnchor: "bottom",
						},
					]}
				>
					<div style={gridSpace}>{couplingLensButton}</div>
				</ArcherElement>
				<div style={gridSpace}></div>
				<div style={gridSpace}></div>
				<div style={gridSpace}></div>
				<ArcherElement
					id="relayLens"
					relations={[
						{
							targetId: "addButton_8",
							targetAnchor: "bottom",
							sourceAnchor: "top",
						},
					]}
				>
					<div style={gridSpace}>{relayLensButton}</div>
				</ArcherElement>
			</div>
		);

		let row4 = (
			<div style={gridRow}>
				<ArcherElement
					id="lightSourceCoupling"
					relations={[
						{
							targetId: "addButton_2",
							targetAnchor: "top",
							sourceAnchor: "bottom",
						},
					]}
				>
					<div style={gridSpace}>{lightSourceCouplingButton}</div>
				</ArcherElement>
				<div style={gridSpace}></div>
				<ArcherElement
					id="objective"
					relations={[
						{
							targetId: "addButton_5",
							targetAnchor: "top",
							sourceAnchor: "right",
						},
						{
							targetId: "specimen",
							targetAnchor: "bottom",
							sourceAnchor: "top",
						},
					]}
				>
					<div style={gridSpace}>{objectiveButton}</div>
				</ArcherElement>
				{/* <div style={gridSpace}></div> */}
				<div style={gridSpace}></div>
				<div style={gridSpace}></div>
			</div>
		);

		let row5 = (
			<div style={gridRowAdd}>
				<ArcherElement
					id="addButton_2"
					relations={[
						{
							targetId: "excitationFilter",
							targetAnchor: "top",
							sourceAnchor: "bottom",
						},
					]}
				>
					<div style={gridSpaceAdd}>{additionalItemButton_2}</div>
				</ArcherElement>
				<ArcherElement
					id="addButton_4"
					relations={[
						{
							targetId: "objective",
							targetAnchor: "left",
							sourceAnchor: "top",
						},
					]}
				>
					<div style={gridSpaceAdd}>{additionalItemButton_4}</div>
				</ArcherElement>
				{/* <div style={gridSpaceAdd}></div> */}
				<div style={gridSpaceAdd}></div>
				{/* <div style={gridSpaceAdd}></div> */}
				<ArcherElement
					id="addButton_5"
					relations={[
						{
							targetId: "dichroicFilter",
							targetAnchor: "top",
							sourceAnchor: "left",
						},
					]}
				>
					<div style={gridSpaceAdd}>{additionalItemButton_5}</div>
				</ArcherElement>
				<ArcherElement
					id="addButton_7"
					relations={[
						{
							targetId: "relayLens",
							targetAnchor: "bottom",
							sourceAnchor: "top",
						},
					]}
				>
					<div style={gridSpaceAdd}>{additionalItemButton_7}</div>
				</ArcherElement>
			</div>
		);
		let gridRowFilterSet = Object.assign(
			{ border: "5px solid black" },
			gridRow
		);
		let row6 = (
			<div style={gridRowFilterSet}>
				<ArcherElement
					id="excitationFilter"
					relations={[
						{
							targetId: "addButton_3",
							targetAnchor: "left",
							sourceAnchor: "right",
						},
					]}
				>
					<div style={gridSpace}>{excitationButton}</div>
				</ArcherElement>
				<ArcherElement
					id="addButton_3"
					relations={[
						{
							targetId: "dichroicFilter",
							targetAnchor: "left",
							sourceAnchor: "right",
						},
					]}
				>
					<div style={gridSpace}>{additionalItemButton_3}</div>
				</ArcherElement>
				<ArcherElement
					id="dichroicFilter"
					relations={[
						{
							targetId: "addButton_4",
							targetAnchor: "right",
							sourceAnchor: "top",
						},
						{
							targetId: "addButton_6",
							targetAnchor: "left",
							sourceAnchor: "right",
						},
					]}
				>
					<div style={gridSpace}>{dichroicButton}</div>
				</ArcherElement>
				<ArcherElement
					id="addButton_6"
					relations={[
						{
							targetId: "emissionFilter",
							targetAnchor: "left",
							sourceAnchor: "right",
						},
					]}
				>
					<div style={gridSpace}>{additionalItemButton_6}</div>
				</ArcherElement>
				<ArcherElement
					id="emissionFilter"
					relations={[
						{
							targetId: "addButton_7",
							targetAnchor: "bottom",
							sourceAnchor: "top",
						},
					]}
				>
					<div style={gridSpace}>{emissionButton}</div>
				</ArcherElement>
			</div>
		);

		return (
			<ModalWindow overlaysContainer={this.props.overlaysContainer}>
				<div>
					<h3>{this.props.schema[0].title}</h3>
				</div>
				<ArcherContainer strokeColor="red">
					<div style={grid}>
						{row1}
						{row2}
						{row3}
						{row4} {row5} {row6}
						{/* {row7} {row8} {row9} */}
					</div>
				</ArcherContainer>
				<div style={buttonContainerRow}>
					<Button style={button2} size="lg" onClick={this.onConfirm}>
						Confirm
					</Button>
					<Button style={button2} size="lg" onClick={this.onEditElement}>
						Edit Channel
					</Button>
					<Button style={button2} size="lg" onClick={this.onCancel}>
						Cancel
					</Button>
				</div>
			</ModalWindow>
		);
	}
}