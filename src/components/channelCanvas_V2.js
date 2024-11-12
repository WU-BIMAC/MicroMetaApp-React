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
	string_na,
	string_object,
	string_array,
	string_json_ext,
	string_currentNumberOf_identifier,
	string_minNumberOf_identifier,
	string_maxNumberOf_identifier,
	number_canvas_element_icons_height,
	channelPath_Additional_1,
	channelPath_Additional_2,
	channelPath_Additional_3_4_5_6,
	channelPath_Additional_7,
	channelPath_Additional_8,
	channelPath_Excitation,
	channelPath_Dichroic,
	channelPath_Emission,
	channelPath_LightSource,
	channelPath_Detector,
	channelPath_RelayLens,
	channelPath_CouplingLens,
	channelPath_LightSourceCoupling,
	channelPath_Objective,
	select_lightSource,
	select_couplingLens,
	select_lightSourceCoupling,
	select_relayLens,
	select_detector,
	select_excitation,
	select_dichroic,
	select_emission,
	select_additional_left,
	select_additional_right,
	edit_channel_settings,
	string_add_img
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

		if (
			props.objective !== null &&
			props.objective !== undefined &&
			props.objectiveSettings !== null &&
			props.objectiveSettings !== undefined
		) {
			this.state.slots["Objective"] = props.objective;
		}

		if (props.channelData !== null && props.channelData !== undefined) {
			let lightPath = props.channelData[1];
			if (lightPath !== null && lightPath !== undefined) {
				let componentSettings = lightPath.ComponentSettings;
				if (componentSettings !== null && componentSettings !== undefined) {
					this.state.settingData = componentSettings;
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

		// console.log("channelData");
		// console.log(channelData);
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
		//console.log("onElementDataSave");
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
			slots = Object.assign({}, slots);
			if (selectedSlot.includes("AdditionalSlot_")) {
				let tmpSlots = this.state.tmpSlots;
				slots[selectedSlot] = tmpSlots;

				let newSelectedSettingData = [];
				for (let index1 = 0; index1 < tmpSlots.length; index1++) {
					let tmp = tmpSlots[index1];
					let compID = tmp.ID;
					for (
						let index2 = 0;
						index2 < settingData[selectedSlot].length;
						index2++
					) {
						let sett = settingData[selectedSlot][index2];
						let settID = sett.Component_ID;
						if (compID === settID) {
							newSelectedSettingData.push(sett);
						}
					}
				}
				settingData[selectedSlot] = newSelectedSettingData;
			} else {
				let earlyReturn = false;
				if (selectedComp === null || selectedComp === undefined) {
					earlyReturn = true;
				} else {
					let validation = validate(selectedComp, selectedSchema);
					let validated = validation.valid;
					if (!validated) {
						earlyReturn = true;
					}
				}
				if (earlyReturn) {
					// this.setState({
					// 	editing: faltruese,
					// 	editingSettings: false,
					// 	category: null,
					// 	selectedSlot: null,
					// 	selectedComp: null,
					// 	selectedSchema: null,
					// });
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
						ModelVersion: currentSchema.modelVersion,
						Extension: currentSchema.extension,
						Domain: currentSchema.domain,
						Category: currentSchema.category,
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
							ModelVersion: immersionLiquidSchema.modelVersion,
							Extension: immersionLiquidSchema.extension,
							Domain: immersionLiquidSchema.domain,
							Category: immersionLiquidSchema.category,
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
		//console.log("onElementDataSave");
		let selectedComp = this.state.selectedComp;
		let selectedSlot = this.state.selectedSlot;
		//let category = this.state.category;
		let settingData = Object.assign({}, this.state.settingData);
		if (this.state.editingSettings) {
			if (selectedSlot.includes("AdditionalSlot_")) {
				let currentSlots = this.state.tmpSlots;
				let index = currentSlots.indexOf(selectedComp);
				let obj = settingData[selectedSlot][index];
				settingData[selectedSlot][index] = Object.assign(obj, data);
				this.setState({
					editingSettings: false,
					settingData: settingData,
				});
			} else {
				if (!selectedSlot.includes("Objective")) {
					let obj = settingData[selectedSlot];
					settingData[selectedSlot] = Object.assign(obj, data);
				}
				this.setState({
					editing: false,
					editingSettings: false,
					settingData: settingData,
					category: null,
					selectedSlot: null,
					selectedComp: null,
					selectedSchema: null,
				});
			}
		} else {
			let currentChannelData = data;
			let currentLightPath = data.LightPath;
			let currentFluorophore = data.Fluorophore;
			let objects = this.state.channelData.slice();
			let oldChannelData = Object.assign({}, objects[0]);
			let oldLightPath = Object.assign({}, objects[1]);
			let oldFluorophore = Object.assign({}, objects[2]);
			let newChannelData = Object.assign(oldChannelData, currentChannelData);
			let newLightPath = Object.assign(oldLightPath, currentLightPath);
			let newFluorophore = Object.assign(oldFluorophore, currentFluorophore);
			newChannelData.LightPath = newLightPath;
			newChannelData.Fluorophore = newFluorophore;
			let newObjects = [];
			newObjects[0] = newChannelData;
			newObjects[1] = newLightPath;
			newObjects[2] = newFluorophore;
			this.setState({
				editing: false,
				editingSettings: false,
				channelData: newObjects,
				category: null,
				selectedSlot: null,
				selectedComp: null,
				selectedSchema: null,
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
		let i = index;
		let settingsData = Object.assign({}, this.state.settingData);
		if (selectedSlot.includes("AdditionalSlot_")) {
			let settingData = settingsData[selectedSlot];
			let newTmpSlots = this.state.tmpSlots.slice();
			let compToDelete = newTmpSlots[i];
			newTmpSlots.splice(i, 1);
			let indexToDelete = -1;
			if (settingData !== null && settingData !== undefined) {
				for (let y = 0; y < settingData.length; y++) {
					let sett = settingData[y];
					if (sett.Component_ID === compToDelete.ID) {
						indexToDelete = y;
						break;
					}
				}
				let newSettingData = settingData.slice();
				if (indexToDelete !== -1) newSettingData.splice(indexToDelete, 1);
				settingsData[selectedSlot] = newSettingData;
			}
			this.setState({ tmpSlots: newTmpSlots, settingData: settingsData });
		} else {
			let slots = Object.assign({}, this.state.slots);
			delete slots[selectedSlot];
			if (
				settingsData[selectedSlot] !== null &&
				settingsData[selectedSlot] !== undefined
			)
				delete settingsData[selectedSlot];
			this.setState({ slots: slots, settingData: settingsData });
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
		let selectedSlot = this.state.selectedSlot;
		if (
			selectedSlot !== null &&
			selectedSlot !== undefined &&
			selectedSlot.includes("AdditionalSlot_")
		) {
			this.setState({ editingSettings: false });
		} else {
			this.setState({ editing: false, editingSettings: false });
		}
		console.log('Cancel called from: settingsMainViews');
	}

	onEditElement() {
		this.setState({ editing: true });
	}

	onAddAdditionalConfirm() {
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

		if (category !== null) {
			if (selectedSlot.includes("AdditionalSlot_")) {
				if (selectedComp === null || selectedComp === undefined) {
					this.setState({
						selectedSlot: null,
						selectedComp: null,
						selectedSchema: null,
					});
					return;
				}

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
						ModelVersion: currentSchema.modelVersion,
						Extension: currentSchema.extension,
						Domain: currentSchema.domain,
						Category: currentSchema.category,
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
			//selectedComp: comp,
			tmpSlots: localComps,
		});
	}

	handleClick_lightSource() {
		let category = channelPath_LightSource;
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
		let category = channelPath_Detector;
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
		let category = channelPath_CouplingLens;
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
		let category = channelPath_RelayLens;
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
		let category = channelPath_LightSourceCoupling;
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
		let category = channelPath_Objective;
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

	createAddButton(
		buttonStyle,
		addButtonImage,
		addButtonImageStyle,
		index,
		category,
		isEnabled
	) {
		let addButtonImagePath = addButtonImage +
					(addButtonImage.indexOf("githubusercontent.com") > -1
						? "?sanitize=true"
						: "");
		let image = (
			<img
				src={addButtonImagePath
				}
				alt={addButtonImage}
				style={addButtonImageStyle}
			/>
		);

		if (isEnabled)
			return (
				<button
					style={buttonStyle}
					onClick={() => this.handleClick_additionalItemButton(category, index)}
				>
					{image}
					Add additional element(s)
				</button>
			);

		let buttStyle = Object.assign({}, buttonStyle, { border: "none" });
		return (
			<button style={buttStyle} disabled>
				{image}
				Add additional element(s)
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
		styleIcons,
		callback,
		deleteCallback,
		editCallback,
		text,
		isEnabled,
		valid
	) {
		let image = null;
		let name = text;
		let needDelete = false;
		let hasSettings = true;
		let element = null;
		let isObjective = false;
		if (slots[imageSlot] !== null && slots[imageSlot] !== undefined) {
			element = slots[imageSlot];
			let elementSchema = compSchemas[element.Schema_ID];
			image = url.resolve(imagesPath, elementSchema.image);
			name = element.Name;
			needDelete = true;
			if (elementSchema.modelSettings === "NA") {
				hasSettings = false;
			}
			if (elementSchema.modelSettings === "ObjectiveSettings")
				isObjective = true;
		} else {
			image = url.resolve(imagesPath, imageName);
			if (imageSlot === "Objective") isObjective = true;
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
		if (needDelete) {
			let butt = null;
			if (isEnabled && hasSettings) {
				butt = (
					<button
						style={buttonStyle}
						onClick={() =>
							editCallback(element, compSchemas[element.Schema_ID], imageSlot)
						}
					>
						{itemImage}
						{name}
					</button>
				);
			} else {
				let buttStyle = Object.assign({}, buttonStyle, { border: "none" });
				butt = (
					<button style={buttStyle} disabled>
						{itemImage}
						{name}
					</button>
				);
			}

			let deleteButt = null;
			if (!isObjective) {
				deleteButt = (
					<button
						type="button"
						onClick={() => deleteCallback(imageSlot)}
						style={styleCloser}
					>
						x
					</button>
				);
			}

			button = (
				<div>
					<div style={styleIcons}>
						{deleteButt}
						{valid}
					</div>
					{butt}
				</div>
			);
		} else {
			if (isEnabled && !isObjective) {
				button = (
					<button style={buttonStyle} onClick={callback}>
						{itemImage}
						{name}
					</button>
				);
			} else {
				let buttStyle = Object.assign({}, buttonStyle, { border: "none" });
				button = (
					<button style={buttStyle} disabled>
						{itemImage}
						{name}
					</button>
				);
			}
		}
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
			//flexWrap: "wrap",
			justifyContent: "center",
			width: "100%",
			height: "100%",
			alignItems: "center",
		};
		const modalGridPanel = {
			display: "flex",
			flexDirection: "row",
			//flexWrap: "wrap",
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
			//flexWrap: "wrap",
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
		const styleValidation = {
			position: "absolute",
			verticalAlign: "middle",
			fontWeight: "bold",
			textAlign: "center",
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
		const styleValidated = Object.assign({}, styleValidation, {
			color: "green",
		});
		const styleNotValidated = Object.assign({}, styleValidation, {
			color: "red",
		});
		const styleValidated1 = Object.assign({}, styleValidation1, {
			color: "green",
		});
		const styleNotValidated1 = Object.assign({}, styleValidation1, {
			color: "red",
		});
		const styleValidated2 = Object.assign({}, styleValidation2, {
			color: "green",
		});
		const styleNotValidated2 = Object.assign({}, styleValidation2, {
			color: "red",
		});
		let isValid = <div style={styleValidated}>&#9679;</div>;
		let isInvalid = <div style={styleNotValidated}>&#9679;</div>;
		let isValid1 = <div style={styleValidated1}>&#9679;</div>;
		let isInvalid1 = <div style={styleNotValidated1}>&#9679;</div>;
		let isValid2 = <div style={styleValidated2}>&#9679;</div>;
		let isInvalid2 = <div style={styleNotValidated2}>&#9679;</div>;

		let channelData = this.state.channelData;
		let settingData = this.state.settingData;
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
			selectedComp !== undefined &&
			(selectedSchema === null || selectedSchema === undefined)
		) {
			selectedID = selectedComp.Schema_ID;
			selectedSchema = compSchemas[selectedID];
		}

		if (this.state.editing) {
			console.log("INSIDE CHANNELCANVAS_V2 1");
			if (this.state.editingSettings) {
				let settingsName = selectedSchema.modelSettings + string_json_ext;
				let settings = null;
				let comp = null;
				let id = null;
				let editable = true;
				if (selectedComp.Schema_ID === "Objective.json") {
					//let settingCompData = settingData[selectedSlot];
					let settingCompData = this.props.objectiveSettings;
					id = settingCompData.ID;
					let immersionLiquidSchema = expSchemas["ImmersionLiquid.json"];
					let immersionLiquid = settingCompData.ImmersionLiquid;
					comp = [];
					comp[0] = settingCompData;
					comp[1] = immersionLiquid;
					settings = [];
					settings[0] = settingsSchemas[settingsName];
					settings[1] = immersionLiquidSchema;
					editable = false;
				} else {
					let settingCompData = null;
					if (selectedSlot.includes("AdditionalSlot_")) {
						let currentSlots = this.state.tmpSlots;
						let index = currentSlots.indexOf(selectedComp);
						settingCompData = settingData[selectedSlot][index];
					} else {
						settingCompData = settingData[selectedSlot];
					}
					id = settingCompData.ID;
					settings = settingsSchemas[settingsName];
					comp = settingCompData;
				}
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
						editable={editable}
						isDebug={this.props.isDebug}
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
						isDebug={this.props.isDebug}
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
						this.state.category.includes(
							compSchemaCategory.substring(0, compSchemaCategory.indexOf("."))
						)
					) {
						if (selectedSlot.includes("AdditionalSlot_")) {
							let items = this.state.tmpSlots;
							let found = false;
							Object.keys(items).forEach((tmpCompIndex) => {
								let tmpComp = items[tmpCompIndex];
								if (comp.ID === tmpComp.ID) found = true;
							});
							if (found) return;
						}
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
				let topItems = null;
				let confirmCallback = null;
				if (selectedSlot.includes("AdditionalSlot_")) {
					//let items = [];
					// let slots = this.state.slots;
					// let selectedSlot = this.state.selectedSlot;
					// if (slots[selectedSlot] !== undefined && slots[selectedSlot] !== null)
					// 	items = slots[selectedSlot];
					let items = this.state.tmpSlots;
					let settingDataSlot = settingData[selectedSlot];

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
						if (settingDataSlot !== null && settingDataSlot !== undefined) {
							let settingDataObj = settingDataSlot[compIndex];
							if (settingDataObj !== null && settingDataObj !== undefined) {
								let schema = settingsSchemas[settingDataObj.Schema_ID];
								if (schema !== null && schema !== undefined) {
									schemaHasProp = Object.keys(schema.properties).length > 0;
									if (schemaHasProp) {
										let validation = validate(settingDataObj, schema);
										let validated = validation.valid;
										if (validated) {
											valid = isValid2;
										} else {
											valid = isInvalid2;
										}
									}
								}
							}
						}

						let butt = null;
						if (compSchema.modelSettings !== "NA" && schemaHasProp) {
							butt = (
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
							);
						} else {
							butt = (
								<button key={"button-" + comp.Name} style={buttonStyleModified}>
									{compItemImage}
									{comp.Name}
								</button>
							);
						}

						slotList.push(
							<div>
								<div style={styleIcons}>
									<button
										type="button"
										onClick={() =>
											this.handleDeleteComp(selectedSlot, compIndex)
										}
										style={styleCloser}
									>
										x
									</button>
									{valid}
								</div>
								{butt}
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
							<div
								key={id1}
								style={{ marginLeft: "20px", marginRight: "20px" }}
							>
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
					let width = 150 * arrowedSlotList.length;
					let modalTopListModified = Object.assign({}, modalTopList, {
						width: `${width}px`,
					});
					topItems = (
						<div style={modalTopListContainer}>
							<h5>Current components in this slot</h5>
							<div
								style={{ overflow: "auto", width: "100%", maxWidth: "100%" }}
							>
								<ArcherContainer
									svgContainerStyle={{
										overflow: "auto",
										width: `${width}px`,
									}}
									strokeColor="red"
								>
									<div style={modalTopListModified}>{arrowedSlotList}</div>
								</ArcherContainer>
							</div>
						</div>
					);

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
							isDebug={this.props.isDebug}
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
			height: "860px",
			overflow: "auto",
		};

		const gridRow = {
			display: "flex",
			flexDirection: "row",
			flexWrap: "wrap",
			justifyContent: "space-between",
			width: "100%",
			height: "150px",
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
			height: "140px",
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

		const opaqueAddButtonImageStyle = Object.assign(
			{ opacity: "0.4" },
			addButtonImageStyle
		);

		let addButtonImage = url.resolve(this.props.imagesPath, string_add_img);

		let hasChannelPath_Additional_1 = false;
		let hasChannelPath_Additional_2 = false;
		let hasChannelPath_Additional_3_4_5_6 = false;
		let hasChannelPath_Additional_7 = false;
		let hasChannelPath_Additional_8 = false;
		let hasLightSource = false;
		let hasDetector = false;
		let hasRelayLens = false;
		let hasCouplingLens = false;
		let hasLightSourceCoupling = false;
		let hasExcitation = false;
		let hasDichroic = false;
		let hasEmission = false;
		let hasObjective = false;
		let testCategory = [
			channelPath_Additional_1,
			channelPath_Additional_2,
			channelPath_Additional_3_4_5_6,
			channelPath_Additional_7,
			channelPath_Additional_8,
			channelPath_LightSource,
			channelPath_Detector,
			channelPath_RelayLens,
			channelPath_CouplingLens,
			channelPath_LightSourceCoupling,
			channelPath_Excitation,
			channelPath_Dichroic,
			channelPath_Emission,
			channelPath_Objective,
		];
		Object.keys(this.props.componentData).forEach((compIndex) => {
			let comp = this.props.componentData[compIndex];

			let schema_id = comp.Schema_ID;
			let compSchema = compSchemas[schema_id];
			if (compSchema === null) return;
			let compSchemaCategory = compSchema.category;

			for (let index in testCategory) {
				let category = testCategory[index];
				if (
					category.includes(schema_id.replace(string_json_ext, "")) ||
					category.includes(compSchemaCategory) ||
					category.includes(
						compSchemaCategory.substring(0, compSchemaCategory.indexOf("."))
					)
				) {
					if (category === channelPath_Additional_1)
						hasChannelPath_Additional_1 = true;
					if (category === channelPath_Additional_2)
						hasChannelPath_Additional_2 = true;
					if (category === channelPath_Additional_3_4_5_6)
						hasChannelPath_Additional_3_4_5_6 = true;
					if (category === channelPath_Additional_7)
						hasChannelPath_Additional_7 = true;
					if (category === channelPath_Additional_8)
						hasChannelPath_Additional_8 = true;

					if (category === channelPath_LightSource) hasLightSource = true;
					if (category === channelPath_Detector) hasDetector = true;
					if (category === channelPath_RelayLens) hasRelayLens = true;
					if (category === channelPath_CouplingLens) hasCouplingLens = true;
					if (category === channelPath_LightSourceCoupling)
						hasLightSourceCoupling = true;

					if (category === channelPath_Excitation) hasExcitation = true;
					if (category === channelPath_Dichroic) hasDichroic = true;
					if (category === channelPath_Emission) hasEmission = true;

					if (category === channelPath_Objective) hasObjective = true;
				}
			}
		});

		let additionalItemButton_1 = this.createAddButton(
			buttonStyle,
			addButtonImage,
			hasChannelPath_Additional_1
				? addButtonImageStyle
				: opaqueAddButtonImageStyle,
			1,
			channelPath_Additional_1,
			hasChannelPath_Additional_1
		);

		let additionalItemButton_2 = this.createAddButton(
			buttonStyle,
			addButtonImage,
			hasChannelPath_Additional_2
				? addButtonImageStyle
				: opaqueAddButtonImageStyle,
			2,
			channelPath_Additional_2,
			hasChannelPath_Additional_2
		);
		let additionalItemButton_3 = this.createAddButton(
			buttonStyle,
			addButtonImage,
			hasChannelPath_Additional_3_4_5_6
				? addButtonImageStyle
				: opaqueAddButtonImageStyle,
			3,
			channelPath_Additional_3_4_5_6,
			hasChannelPath_Additional_3_4_5_6
		);
		let additionalItemButton_4 = this.createAddButton(
			buttonStyle,
			addButtonImage,
			hasChannelPath_Additional_3_4_5_6
				? addButtonImageStyle
				: opaqueAddButtonImageStyle,
			4,
			channelPath_Additional_3_4_5_6,
			hasChannelPath_Additional_3_4_5_6
		);
		let additionalItemButton_5 = this.createAddButton(
			buttonStyle,
			addButtonImage,
			hasChannelPath_Additional_3_4_5_6
				? addButtonImageStyle
				: opaqueAddButtonImageStyle,
			5,
			channelPath_Additional_3_4_5_6,
			hasChannelPath_Additional_3_4_5_6
		);
		let additionalItemButton_6 = this.createAddButton(
			buttonStyle,
			addButtonImage,
			hasChannelPath_Additional_3_4_5_6
				? addButtonImageStyle
				: opaqueAddButtonImageStyle,
			6,
			channelPath_Additional_3_4_5_6,
			hasChannelPath_Additional_3_4_5_6
		);
		let additionalItemButton_7 = this.createAddButton(
			buttonStyle,
			addButtonImage,
			hasChannelPath_Additional_7
				? addButtonImageStyle
				: opaqueAddButtonImageStyle,
			7,
			channelPath_Additional_7,
			hasChannelPath_Additional_7
		);
		let additionalItemButton_8 = this.createAddButton(
			buttonStyle,
			addButtonImage,
			hasChannelPath_Additional_8
				? addButtonImageStyle
				: opaqueAddButtonImageStyle,
			8,
			channelPath_Additional_8,
			hasChannelPath_Additional_8
		);

		let specButtStyle = Object.assign({}, buttonStyle, { border: "none" });
		let specimenButton = ChannelCanvas_V2.createSlotButton(
			this.props.imagesPath,
			"LightPath_10_Specimen.svg",
			"Specimen",
			slots,
			compSchemas,
			regularImageStyle,
			specButtStyle,
			styleCloser,
			styleIcons,
			null,
			null,
			null,
			"Specimen",
			false,
			null
		);

		let lightSource = settingData["LightSource"];
		let valid = null;
		if (lightSource !== undefined && lightSource !== null) {
			let schema = settingsSchemas[lightSource.Schema_ID];
			if (schema !== null && schema !== undefined) {
				let schemaHasProp = Object.keys(schema.properties).length > 0;
				if (schemaHasProp) {
					let validation = validate(lightSource, schema);
					let validated = validation.valid;
					if (validated) {
						valid = isValid2;
					} else {
						valid = isInvalid2;
					}
				} else {
					hasLightSource = false;
				}
			}
		}
		let lightSourceButton = ChannelCanvas_V2.createSlotButton(
			this.props.imagesPath,
			"LightPath_1_LightSource_outline.svg",
			"LightSource",
			slots,
			compSchemas,
			hasLightSource ? regularImageStyle : regularOpaqueImageStyle,
			buttonStyle,
			styleCloser,
			styleIcons,
			this.handleClick_lightSource,
			this.handleDeleteComp,
			this.handleEditSettings,
			"Select Light Source",
			hasLightSource,
			valid
		);

		let detector = settingData["Detector"];
		valid = null;
		if (detector !== undefined && detector !== null) {
			let schema = settingsSchemas[detector.Schema_ID];
			if (schema !== null && schema !== undefined) {
				let schemaHasProp = Object.keys(schema.properties).length > 0;
				if (schemaHasProp) {
					let validation = validate(detector, schema);
					let validated = validation.valid;
					if (validated) {
						valid = isValid2;
					} else {
						valid = isInvalid2;
					}
				} else {
					hasDetector = false;
				}
			}
		}
		let detectorButton = ChannelCanvas_V2.createSlotButton(
			this.props.imagesPath,
			"LightPath_9_Detector_outline.svg",
			"Detector",
			slots,
			compSchemas,
			hasDetector ? regularImageStyle : regularOpaqueImageStyle,
			buttonStyle,
			styleCloser,
			styleIcons,
			this.handleClick_detector,
			this.handleDeleteComp,
			this.handleEditSettings,
			"Select Detector",
			hasDetector,
			valid
		);

		let relayLens = settingData["RelayLens"];
		valid = null;
		if (relayLens !== undefined && relayLens !== null) {
			let schema = settingsSchemas[relayLens.Schema_ID];
			if (schema !== null && schema !== undefined) {
				let schemaHasProp = Object.keys(schema.properties).length > 0;
				if (schemaHasProp) {
					let validation = validate(relayLens, schema);
					let validated = validation.valid;
					if (validated) {
						valid = isValid2;
					} else {
						valid = isInvalid2;
					}
				} else {
					hasRelayLens = false;
				}
			}
		}
		let relayLensButton = ChannelCanvas_V2.createSlotButton(
			this.props.imagesPath,
			"LightPath_8_RelayLens_outline.svg",
			"RelayLens",
			slots,
			compSchemas,
			hasRelayLens ? regularImageStyle : regularOpaqueImageStyle,
			buttonStyle,
			styleCloser,
			styleIcons,
			this.handleClick_relayLens,
			this.handleDeleteComp,
			this.handleEditSettings,
			"Select Relay Lens",
			hasRelayLens
		);

		let couplingLens = settingData["CouplingLens"];
		valid = null;
		if (couplingLens !== undefined && couplingLens !== null) {
			let schema = settingsSchemas[couplingLens.Schema_ID];
			if (schema !== null && schema !== undefined) {
				let schemaHasProp = Object.keys(schema.properties).length > 0;
				if (schemaHasProp) {
					let validation = validate(couplingLens, schema);
					let validated = validation.valid;
					if (validated) {
						valid = isValid2;
					} else {
						valid = isInvalid2;
					}
				} else {
					hasCouplingLens = false;
				}
			}
		}
		let couplingLensButton = ChannelCanvas_V2.createSlotButton(
			this.props.imagesPath,
			"LightPath_3_CouplingLens_outline.svg",
			"CouplingLens",
			slots,
			compSchemas,
			hasCouplingLens ? regularImageStyle : regularOpaqueImageStyle,
			buttonStyle,
			styleCloser,
			styleIcons,
			this.handleClick_couplingLens,
			this.handleDeleteComp,
			this.handleEditSettings,
			"Select Coupling Lens",
			hasCouplingLens,
			valid
		);

		let lightSourceCoupling = settingData["LightSourceCoupling"];
		valid = null;
		if (lightSourceCoupling !== undefined && lightSourceCoupling !== null) {
			let schema = settingsSchemas[lightSourceCoupling.Schema_ID];
			if (schema !== null && schema !== undefined) {
				let schemaHasProp = Object.keys(schema.properties).length > 0;
				if (schemaHasProp) {
					let validation = validate(lightSourceCoupling, schema);
					let validated = validation.valid;
					if (validated) {
						valid = isValid2;
					} else {
						valid = isInvalid2;
					}
				} else {
					hasLightSourceCoupling = false;
				}
			}
		}
		let lightSourceCouplingButton = ChannelCanvas_V2.createSlotButton(
			this.props.imagesPath,
			"LightPath_2_LightSourceCoupling_outline.svg",
			"LightSourceCoupling",
			slots,
			compSchemas,
			hasLightSourceCoupling ? regularImageStyle : regularOpaqueImageStyle,
			buttonStyle,
			styleCloser,
			styleIcons,
			this.handleClick_lightSourceCoupling,
			this.handleDeleteComp,
			this.handleEditSettings,
			"Select Light Source Coupling",
			hasLightSourceCoupling,
			valid
		);

		let excitationFilter = settingData["ExcitationFilter"];
		valid = null;
		if (excitationFilter !== undefined && excitationFilter !== null) {
			let schema = settingsSchemas[excitationFilter.Schema_ID];
			if (schema !== null && schema !== undefined) {
				let schemaHasProp = Object.keys(schema.properties).length > 0;
				if (schemaHasProp) {
					let validation = validate(excitationFilter, schema);
					let validated = validation.valid;
					if (validated) {
						valid = isValid2;
					} else {
						valid = isInvalid2;
					}
				} else {
					hasExcitation = false;
				}
			}
		}
		let excitationButton = ChannelCanvas_V2.createSlotButton(
			this.props.imagesPath,
			"LightPath_4_ExcitationFilter_outline.svg",
			"ExcitationFilter",
			slots,
			compSchemas,
			hasExcitation ? regularImageStyle : regularOpaqueImageStyle,
			buttonStyle,
			styleCloser,
			styleIcons,
			this.handleClick_excitation,
			this.handleDeleteComp,
			this.handleEditSettings,
			"Select Excitation Wavelength",
			hasExcitation,
			valid
		);

		let dichroic = settingData["Dichroic"];
		valid = null;
		if (dichroic !== undefined && dichroic !== null) {
			let schema = settingsSchemas[dichroic.Schema_ID];
			if (schema !== null && schema !== undefined) {
				let schemaHasProp = Object.keys(schema.properties).length > 0;
				if (schemaHasProp) {
					let validation = validate(dichroic, schema);
					let validated = validation.valid;
					if (validated) {
						valid = isValid2;
					} else {
						valid = isInvalid2;
					}
				} else {
					hasDichroic = false;
				}
			}
		}
		let dichroicButton = ChannelCanvas_V2.createSlotButton(
			this.props.imagesPath,
			"LightPath_5_Dichroic_outline.svg",
			"Dichroic",
			slots,
			compSchemas,
			hasDichroic ? regularImageStyle : regularOpaqueImageStyle,
			buttonStyle,
			styleCloser,
			styleIcons,
			this.handleClick_dichroic,
			this.handleDeleteComp,
			this.handleEditSettings,
			"Select Dichroic",
			hasDichroic,
			valid
		);

		let emissionFilter = settingData["EmissionFilter"];
		valid = null;
		if (emissionFilter !== undefined && emissionFilter !== null) {
			let schema = settingsSchemas[emissionFilter.Schema_ID];
			if (schema !== null && schema !== undefined) {
				let schemaHasProp = Object.keys(schema.properties).length > 0;
				if (schemaHasProp) {
					let validation = validate(emissionFilter, schema);
					let validated = validation.valid;
					if (validated) {
						valid = isValid2;
					} else {
						valid = isInvalid2;
					}
				} else {
					hasEmission = false;
				}
			}
		}
		let emissionButton = ChannelCanvas_V2.createSlotButton(
			this.props.imagesPath,
			"LightPath_6_EmissionFilter_outline.svg",
			"EmissionFilter",
			slots,
			compSchemas,
			hasEmission ? regularImageStyle : regularOpaqueImageStyle,
			buttonStyle,
			styleCloser,
			styleIcons,
			this.handleClick_emission,
			this.handleDeleteComp,
			this.handleEditSettings,
			"Select Emission Wavelength",
			hasEmission,
			valid
		);

		//let objective = settingData["Objective"];
		let objective = this.props.objectiveSettings;
		valid = null;
		if (objective !== undefined && objective !== null) {
			let schema = settingsSchemas[objective.Schema_ID];
			let immersionLiquidSchema = expSchemas["ImmersionLiquid.json"];
			if (schema !== null && schema !== undefined) {
				let schemaHasProp = Object.keys(schema.properties).length > 0;
				let schemaHasProp2 =
					Object.keys(immersionLiquidSchema.properties).length > 0;
				if (schemaHasProp || schemaHasProp2) {
					let validation = validate(objective, schema);
					let validated = validation.valid;
					let validation2 = validate(
						objective.ImmersionLiquid,
						immersionLiquidSchema
					);
					let validated2 = validation2.valid;
					if (validated && validated2) {
						valid = isValid2;
					} else {
						valid = isInvalid2;
					}
				} else {
					hasObjective = false;
				}
			}
		}
		let objectiveButton = ChannelCanvas_V2.createSlotButton(
			this.props.imagesPath,
			"LightPath_7_Objective_outline.svg",
			"Objective",
			slots,
			compSchemas,
			hasObjective ? regularImageStyle : regularOpaqueImageStyle,
			buttonStyle,
			styleCloser,
			styleIcons,
			this.handleClick_objective,
			this.handleDeleteComp,
			this.handleEditSettings,
			"Objective",
			hasObjective,
			valid
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
					<div style={gridSpace}>
						{
							<PopoverTooltip
								key={"TooltipButton-LightSource"}
								position={select_lightSource.position}
								title={select_lightSource.title}
								content={select_lightSource.content}
								element={lightSourceButton}
							/>
						}
					</div>
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
					<div style={gridSpace}>
						{
							<PopoverTooltip
								key={"TooltipButton-Detector"}
								position={select_detector.position}
								title={select_detector.title}
								content={select_detector.content}
								element={detectorButton}
							/>
						}
					</div>
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
					<div style={gridSpaceAdd}>
						{
							<PopoverTooltip
								key={"TooltipButton-Additional1"}
								position={select_additional_right.position}
								title={select_additional_right.title}
								content={select_additional_right.content}
								element={additionalItemButton_1}
							/>
						}
					</div>
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
					<div style={gridSpaceAdd}>
						{
							<PopoverTooltip
								key={"TooltipButton-Additional8"}
								position={select_additional_left.position}
								title={select_additional_left.title}
								content={select_additional_left.content}
								element={additionalItemButton_8}
							/>
						}
					</div>
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
					<div style={gridSpace}>
						{
							<PopoverTooltip
								key={"TooltipButton-CouplingLens"}
								position={select_couplingLens.position}
								title={select_couplingLens.title}
								content={select_couplingLens.content}
								element={couplingLensButton}
							/>
						}
					</div>
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
					<div style={gridSpace}>
						{
							<PopoverTooltip
								key={"TooltipButton-RelayLens"}
								position={select_relayLens.position}
								title={select_relayLens.title}
								content={select_relayLens.content}
								element={relayLensButton}
							/>
						}
					</div>
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
					<div style={gridSpace}>
						{
							<PopoverTooltip
								key={"TooltipButton-LightSourceCoupling"}
								position={select_lightSourceCoupling.position}
								title={select_lightSourceCoupling.title}
								content={select_lightSourceCoupling.content}
								element={lightSourceCouplingButton}
							/>
						}
					</div>
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
					<div style={gridSpaceAdd}>
						{
							<PopoverTooltip
								key={"TooltipButton-Additional2"}
								position={select_additional_right.position}
								title={select_additional_right.title}
								content={select_additional_right.content}
								element={additionalItemButton_2}
							/>
						}
					</div>
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
					<div style={gridSpaceAdd}>
						{
							<PopoverTooltip
								key={"TooltipButton-Additional4"}
								position={select_additional_right.position}
								title={select_additional_right.title}
								content={select_additional_right.content}
								element={additionalItemButton_4}
							/>
						}
					</div>
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
					<div style={gridSpaceAdd}>
						{
							<PopoverTooltip
								key={"TooltipButton-Additional5"}
								position={select_additional_left.position}
								title={select_additional_left.title}
								content={select_additional_left.content}
								element={additionalItemButton_5}
							/>
						}
					</div>
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
					<div style={gridSpaceAdd}>
						{
							<PopoverTooltip
								key={"TooltipButton-Additional7"}
								position={select_additional_left.position}
								title={select_additional_left.title}
								content={select_additional_left.content}
								element={additionalItemButton_7}
							/>
						}
					</div>
				</ArcherElement>
			</div>
		);
		const gridRowSpecial = {
			display: "flex",
			flexDirection: "column",
			width: "100%",
			height: "150px",
		};
		let gridRowFilterSet = Object.assign({}, gridRow, {
			border: "5px solid black",
			height: "100%",
			position: "relative",
			top: "-30px",
			left: "0px",
		});
		let borderTitleStyle = {
			display: "inline",
			position: "relative",
			top: "-10%",
			left: "30%",
			minWidth: "240px",
			width: "240px",
			height: "30px",
			//display: "inline",
			backgroundColor: "white",
			zIndex: 2,
		};
		let row6 = (
			<div style={gridRowSpecial}>
				<button style={borderTitleStyle} disabled>
					Fluorescence Light Path
				</button>
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
						<div style={gridSpace}>
							{
								<PopoverTooltip
									key={"TooltipButton-Excitation"}
									position={select_excitation.position}
									title={select_excitation.title}
									content={select_excitation.content}
									element={excitationButton}
								/>
							}
						</div>
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
						<div style={gridSpace}>
							{
								<PopoverTooltip
									key={"TooltipButton-Additional3"}
									position={select_additional_right.position}
									title={select_additional_right.title}
									content={select_additional_right.content}
									element={additionalItemButton_3}
								/>
							}
						</div>
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
						<div style={gridSpace}>
							{
								<PopoverTooltip
									key={"TooltipButton-Dichroic"}
									position={select_dichroic.position}
									title={select_dichroic.title}
									content={select_dichroic.content}
									element={dichroicButton}
								/>
							}
						</div>
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
						<div style={gridSpace}>
							{
								<PopoverTooltip
									key={"TooltipButton-Additional6"}
									position={select_additional_left.position}
									title={select_additional_left.title}
									content={select_additional_left.content}
									element={additionalItemButton_6}
								/>
							}
						</div>
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
						<div style={gridSpace}>
							{
								<PopoverTooltip
									key={"TooltipButton-Emission"}
									position={select_emission.position}
									title={select_emission.title}
									content={select_emission.content}
									element={emissionButton}
								/>
							}
						</div>
					</ArcherElement>
				</div>
			</div>
		);

		valid = null;
		if (
			this.props.schema !== undefined &&
			this.props.schema !== null &&
			this.state.channelData !== undefined &&
			this.state.channelData !== null
		) {
			let channelObj = this.state.channelData;
			let validation1 = validate(channelObj[0], this.props.schema[0]);
			let validated1 = validation1.valid;
			let validated2 = false;
			if (channelObj[2] !== undefined && channelObj[2] !== null) {
				let validation2 = validate(channelObj[2], this.props.schema[2]);
				validated2 = validation2.valid;
			}
			let validated3 = false;
			if (channelObj[1] !== undefined && channelObj[1] !== null) {
				let validation3 = validate(channelObj[1], this.props.schema[1]);
				validated3 = validation3.valid;
			}

			if (validated1 && validated2 && validated3) {
				valid = isValid;
			} else {
				valid = isInvalid;
			}
		} else {
			valid = isInvalid;
		}

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
					<PopoverTooltip
						key={"TooltipButton-EditChannelSettings"}
						position={edit_channel_settings.position}
						title={edit_channel_settings.title}
						content={edit_channel_settings.content}
						element={
							<Button style={button2} size="lg" onClick={this.onEditElement}>
								{valid}
								{edit_channel_settings.title}
							</Button>
						}
					/>

					<Button style={button2} size="lg" onClick={this.onCancel}>
						Cancel
					</Button>
				</div>
			</ModalWindow>
		);
	}
}