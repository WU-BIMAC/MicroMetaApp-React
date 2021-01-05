import React from "react";
import Button from "react-bootstrap/Button";
import { ArcherContainer, ArcherElement } from "react-archer";

import ModalWindow from "./modalWindow";
import PopoverTooltip from "./popoverTooltip";
import MultiTabFormWithHeaderV2 from "./multiTabFormWithHeaderV2";
import MultiTabFormWithHeader from "./multiTabFormWithHeader";

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
	channelPath_Additional_1_7_8,
	channelPath_Additional_2_3_4_5_6,
} from "../constants";
import { bool } from "prop-types";

export default class ChannelsCanvas_V2 extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			elementList: [],
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
			hover: null,
			category: null,
			selectedSlot: null,
			selectedComp: null,
			slots: {},
		};

		// Object.keys(props.componentSchemas).forEach((schemaIndex) => {
		// 	let schema = props.componentSchemas[schemaIndex];
		// 	let schema_id = schema.ID;
		// 	//Validate schemas using jsonschema????
		// 	Object.keys(this.props.settingData).forEach((objIndex) => {
		// 		let object = this.props.settingData[objIndex];
		// 		if (props.activeTier < object.tier) return;
		// 		if (schema_id !== object.Schema_ID) return;
		// 		let validation = validate(object, schema);
		// 		//if (schema_id === "CCD.json") console.log(validation);
		// 		let validated = validation.valid;
		// 		let positionZ = object.PositionZ === undefined ? 0 : object.PositionZ;
		// 		let newElement = {
		// 			ID: schema.title + "_" + object.ID,
		// 			schema_ID: schema_id,
		// 			name: object.Name,
		// 			validated: validated,
		// 			dragged: false,
		// 			obj: object,
		// 			x: object.PositionX,
		// 			y: object.PositionY,
		// 			z: positionZ,
		// 			width: object.Width,
		// 			height: object.Height,
		// 		};
		// 		this.state.elementList.push(newElement);
		// 	});
		// 	this.state.componentsSchema[schema_id] = schema;
		// });

		this.addComponentsIndexesIfMissing = this.addComponentsIndexesIfMissing.bind(
			this
		);

		this.onEditElement = this.onEditElement.bind(this);
		this.onElementDataCancel = this.onElementDataCancel.bind(this);
		this.onElementDataSave = this.onElementDataSave.bind(this);
		this.onInnerElementDataSave = this.onInnerElementDataSave.bind(this);

		this.onAddAdditionalConfirm = this.onAddAdditionalConfirm.bind(this);
		this.onAddAdditionalCancel = this.onAddAdditionalCancel.bind(this);

		this.onCanvasElementDataSave = this.onCanvasElementDataSave.bind(this);
		this.getElementData = this.getElementData.bind(this);
		this.updatedDimensions = this.updatedDimensions.bind(this);

		this.areAllElementsValidated = this.areAllElementsValidated.bind(this);

		this.handleClick_additionalItemButton_1_7_8 = this.handleClick_additionalItemButton_1_7_8.bind(
			this
		);
		this.handleClick_additionalItemButton_2_3_4_5_6 = this.handleClick_additionalItemButton_2_3_4_5_6.bind(
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

	// handleScroll(e) {
	// 	if (this.state.isEditing) {
	// 		return;
	// 	}

	// 	let element = e.target;
	// 	let offsetY = element.scrollTop;
	// 	let offsetX = element.scrollLeft;

	// 	this.setState({ offsetX: offsetX, offsetY: offsetY });
	// }

	updatedDimensions(id, width, height, isResize) {
		let element = null;
		this.state.elementList.forEach((item) => {
			if (item.ID === id) element = item;
		});

		let newElementDataList = Object.assign({}, this.state.elementData);
		let obj = newElementDataList[id];

		if (element === null || obj === undefined) return;

		if (element.width !== -1 && element.height !== -1 && !isResize) {
			return;
		}

		element.width = width;
		element.height = height;
		obj.Width = width;
		obj.Height = height;

		let validated = this.areAllElementsValidated();
		this.props.updateElementData(newElementDataList, validated);
	}

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

	areAllElementsValidated() {
		let elementList = this.state.elementList;
		for (let i = 0; i < elementList.length; i++) {
			if (!elementList[i].validated) {
				return false;
			}
		}
		return true;
	}

	onCanvasElementDataSave(id, data, dataLinkedFields) {
		let linkedFields = this.state.linkedFields;
		if (
			dataLinkedFields !== undefined &&
			Object.keys(dataLinkedFields).length > 0
		) {
			linkedFields[id] = dataLinkedFields;
		}

		let elementList = this.state.elementList;
		for (let i = 0; i < elementList.length; i++) {
			if (elementList[i].ID === id) {
				elementList[i].validated = true;
				elementList[i].name = data.Name;
				break;
			}
		}
		let currentElementData = Object.assign({}, this.state.elementData);
		currentElementData[id] = Object.assign(currentElementData[id], data);
		this.setState({
			elementData: currentElementData,
			linkedFields: linkedFields,
		});

		let validated = this.areAllElementsValidated();
		this.props.updateElementData(currentElementData, validated);
		this.props.updateLinkedFields(linkedFields);
	}

	getElementData() {
		return Object.assign({}, this.state.elementData);
	}

	addComponentsIndexesIfMissing(schema, newElementData) {
		Object.keys(schema.properties).forEach((key) => {
			let currentNumber = string_currentNumberOf_identifier + key;
			let minNumber = string_minNumberOf_identifier + key;
			let maxNumber = string_maxNumberOf_identifier + key;
			if (newElementData[currentNumber] !== undefined) {
				return;
			}
			if (schema.properties[key].type === string_array) {
				if (schema.required.indexOf(key) != -1) {
					newElementData[currentNumber] = 1;
					newElementData[minNumber] = 1;
					newElementData[maxNumber] = -1;
				} else {
					newElementData[currentNumber] = 0;
					newElementData[minNumber] = 0;
					newElementData[maxNumber] = -1;
				}
			} else if (schema.properties[key].type === string_object) {
				if (schema.required.indexOf(key) === -1) {
					newElementData[currentNumber] = 0;
					newElementData[minNumber] = 0;
					newElementData[maxNumber] = 1;
				} else {
					newElementData[currentNumber] = 1;
					newElementData[minNumber] = 1;
					newElementData[maxNumber] = 1;
				}
			}
		});
	}

	onInnerElementDataSave(id, data) {
		let category = this.state.category;
		let selectedSlot = this.state.selectedSlot;
		if (category === null) {
			this.setState({ editing: false });
			console.log("saved inner channel data category null");
		} else {
			if (selectedSlot.includes("AddButton")) {
				let selectedComp = this.state.selectedComp;
				let selectedSlot = this.state.selectedSlot;
				let slots = Object.assign({}, this.state.slots);
				let slotItems = [];
				if (slots[selectedSlot] !== null && slots[selectedSlot] !== undefined) {
					slotItems = slots[selectedSlot];
				}
				slotItems.push(selectedComp);
				slots[selectedSlot] = slotItems;
				this.setState({ slots: slots });
				// console.log("slots");
				// console.log(slots);
			}
			console.log("saved inner channel data category " + category);
		}
	}

	onElementDataSave(id, data) {
		// let channels = this.state.channels.slice();
		// let found = false;
		// for (let i = 0; i < channels.length; i++) {
		// 	let name_id = this.props.schema.title + "_" + channels[i].ID;
		// 	if (id === name_id) {
		// 		channels[i] = data;
		// 		found = true;
		// 		found = true;
		// 		break;
		// 	}
		// }
		// if (!found) {
		// 	//todo should never happen
		// 	console.log("issue with " + id);
		// }
		//this.setState({ channels: channels, editing: false });
		let category = this.state.category;
		if (category === null) {
			this.setState({ editing: false });
			console.log("saved channel data category null");
		} else {
			console.log("saved channel data category " + category);
		}
	}

	onElementDataCancel() {
		this.setState({ editing: false });
	}

	onEditElement() {
		this.setState({ editing: true });
		if (bool_isDebug) console.log("edit channel data");
	}

	onAddAdditionalConfirm() {
		let selectedComp = this.state.selectedComp;
		let selectedSlot = this.state.selectedSlot;
		this.setState({
			editing: false,
			category: null,
			selectedSlot: null,
			selectedComp: selectedComp,
		});
	}

	onAddAdditionalCancel() {
		this.setState({
			editing: false,
			category: null,
			selectedSlot: null,
			selectedComp: null,
		});
	}

	handleClick_additionalItemButton_1_7_8(index) {
		let i = Number(index);
		console.log("handleClick_additionalItemButton " + i);
		this.setState({
			editing: true,
			category: channelPath_Additional_1_7_8,
			selectedSlot: "AddButton_" + i,
		});
	}

	handleClick_additionalItemButton_2_3_4_5_6(index) {
		let i = Number(index);
		console.log("handleClick_additionalItemButton " + i);
		this.setState({
			editing: true,
			category: channelPath_Additional_2_3_4_5_6,
			selectedSlot: "AddButton_" + i,
		});
	}

	handleClick_lightSource() {
		let category = ["Fluorescence_LightSource", "Transmitted_LightSource"];
		let selectedSlot = "LightSource";
		this.setState({
			editing: true,
			category: category,
			selectedSlot: selectedSlot,
		});
	}

	handleClick_detector() {
		let category = ["Detector"];
		let selectedSlot = "Detector";
		this.setState({
			editing: true,
			category: category,
			selectedSlot: selectedSlot,
		});
	}

	handleClick_couplingLens() {
		let category = ["CouplingLens"];
		let selectedSlot = "CouplingLens";
		this.setState({
			editing: true,
			category: category,
			selectedSlot: selectedSlot,
		});
	}

	handleClick_relayLens() {
		let category = ["RelayLens"];
		let selectedSlot = "RelayLens";
		this.setState({
			editing: true,
			category: category,
			selectedSlot: selectedSlot,
		});
	}

	handleClick_lightSourceCoupling() {
		let category = ["LightSourceCoupling"];
		let selectedSlot = "LightSourceCoupling";
		this.setState({
			editing: true,
			category: category,
			selectedSlot: selectedSlot,
		});
	}

	handleClick_excitation() {
		let category = ["ExcitationFilter"];
		let selectedSlot = "ExcitationFilter";
		this.setState({
			editing: true,
			category: category,
			selectedSlot: selectedSlot,
		});
	}

	handleClick_dichroic() {
		let category = ["StandardDichroic"];
		let selectedSlot = "StandardDichroic";
		this.setState({
			editing: true,
			category: category,
			selectedSlot: selectedSlot,
		});
	}

	handleClick_emission() {
		let category = ["EmissionFilter"];
		let selectedSlot = "EmissionFilter";
		this.setState({
			editing: true,
			category: category,
			selectedSlot: selectedSlot,
		});
	}

	handleClick_objective() {
		let category = ["Objective"];
		let selectedSlot = "Objective";
		this.setState({
			editing: true,
			category: category,
			selectedSlot: selectedSlot,
		});
	}

	createAddButton_1_7_8(buttonStyle, image, index) {
		//
		return (
			<button
				style={buttonStyle}
				onClick={() => this.handleClick_additionalItemButton_1_7_8(index)}
			>
				{image}
				Add additional element
			</button>
		);
	}

	createAddButton_2_3_4_5_6(buttonStyle, image, index) {
		//
		return (
			<button
				style={buttonStyle}
				onClick={() => this.handleClick_additionalItemButton_2_3_4_5_6(index)}
			>
				{image}
				Add additional element
			</button>
		);
	}

	handleSelectComp(comp) {
		let selectedComp = comp;
		this.setState({ selectedComp: selectedComp });
	}

	render() {
		// const {
		// 	backgroundImage,
		// 	dimensions: { width, height } = {},
		// 	microscope = null,
		// 	scalingFactor = 1,
		// } = this.props;
		// const { linkedFields } = this.state;

		// if (bool_isDebug) {
		// 	console.log("LinkedFields");
		// 	console.log(linkedFields);
		// }

		// const styleContainer = {
		// 	borderBottom: "2px solid",
		// 	borderTop: "2px solid",
		// 	borderRight: "2px solid",
		// 	color: "black",
		// 	width: `${width}px`,
		// 	height: `${height}px`,
		// };

		// const innerWidth = width - 2;
		// const innerHeight = height - 4;
		// const dropTargetStyle = {
		// 	width: `${innerWidth}px`,
		// 	height: `${innerHeight}px`,
		// };
		// const canvasContainerStyle = {
		// 	width: "100%",
		// 	height: "100%",
		// 	position: "relative",
		// 	overflow: "auto",
		// };

		// const scaledCanvasWidth = number_canvas_width * scalingFactor;
		// const scaledCanvasHeight = number_canvas_height * scalingFactor;

		// const canvasInnerContainerStyle = {
		// 	width: `${scaledCanvasWidth}px`,
		// 	height: `${scaledCanvasHeight}px`,
		// 	position: "absolute",
		// 	left: 0,
		// 	top: 0,
		// };
		// const imageStyle = {
		// 	width: "100%",
		// 	height: "100%",
		// 	margin: "auto",
		// };
		// const infoStyle = {
		// 	position: "absolute",
		// 	left: 0,
		// 	top: 0,
		// };

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
			flexWrap: "wrap",
			justifyContent: "space-evenly",
			overflow: "auto",
			width: "20%",
			maxHeight: "100%",
			alignItems: "center",
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

		if (this.state.editing) {
			if (this.state.category === null) {
				return (
					<MultiTabFormWithHeader
						schema={this.props.schema}
						inputData={this.props.channelData}
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
					/>
					// <MultiTabFormWithHeaderV2
					// 	schemas={this.props.settingSchemas}
					// 	schema={this.props.schema}
					// 	inputData={this.props.channelData}
					// 	id={this.props.id}
					// 	onConfirm={this.onElementDataSave}
					// 	onCancel={this.onElementDataCancel}
					// 	overlaysContainer={this.props.overlaysContainer}
					// 	currentChildrenComponentIdentifier={
					// 		string_currentNumberOf_identifier
					// 	}
					// 	minChildrenComponentIdentifier={string_minNumberOf_identifier}
					// 	maxChildrenComponentIdentifier={string_maxNumberOf_identifier}
					// 	elementByType={this.props.elementByType}
					// 	modalContainer={true}
					// />
				);
			} else {
				let selectedComp = this.state.selectedComp;
				let selectedSlot = this.state.selectedSlot;
				let selectedSchema = null;
				let selectedID = null;
				if (selectedComp !== null) {
					selectedID = selectedComp.ID;
					Object.keys(this.props.componentSchemas).forEach((schemaIndex) => {
						let schema = this.props.componentSchemas[schemaIndex];
						if (schema.ID === selectedComp.Schema_ID) {
							selectedSchema = schema;
						}
					});
				}
				// console.log("componentData");
				// console.log(this.props.componentData);
				let itemList = [];
				Object.keys(this.props.componentData).forEach((compIndex) => {
					let comp = this.props.componentData[compIndex];
					let compSchema = null;
					let schema_id = comp.Schema_ID;
					Object.keys(this.props.componentSchemas).forEach((schemaIndex) => {
						let schema = this.props.componentSchemas[schemaIndex];
						if (schema.ID === schema_id) {
							compSchema = schema;
						}
					});
					if (compSchema === null) return;

					// console.log("category");
					// console.log(this.state.category);
					if (
						this.state.category.includes(schema_id.replace(".json", "")) ||
						this.state.category.includes(compSchema.category)
					) {
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
						if (comp === this.state.selectedComp) {
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
				// console.log("itemList");
				// console.log(itemList);

				let topItems = null;
				if (selectedSlot.includes("AddButton")) {
					let items = [];
					let slots = this.state.slots;
					// console.log("slots");
					// console.log(slots);
					let selectedSlot = this.state.selectedSlot;
					if (slots[selectedSlot] !== undefined && slots[selectedSlot] !== null)
						items = this.state.slots[this.state.selectedSlot];

					// console.log("items");
					// console.log(items);
					let slotList = [];
					Object.keys(items).forEach((compIndex) => {
						let comp = items[compIndex];
						let compSchema = null;
						let schema_id = comp.Schema_ID;
						Object.keys(this.props.componentSchemas).forEach((schemaIndex) => {
							let schema = this.props.componentSchemas[schemaIndex];
							if (schema.ID === schema_id) {
								compSchema = schema;
							}
						});
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
						if (comp === this.state.selectedComp) {
							buttonStyleModified = Object.assign({}, buttonStyle, {
								border: "5px solid cyan",
								margin: "10px",
							});
						} else {
							buttonStyleModified = Object.assign({}, buttonStyle, {
								margin: "10px",
							});
						}
						slotList.push(
							<button
								key={"button-" + comp.Name}
								style={buttonStyleModified}
								onClick={() => this.handleSelectComp(comp)}
							>
								{compItemImage}
								{comp.Name}
							</button>
						);
					});
					// console.log("slotList");
					// console.log(slotList);
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
							console.log("Index " + i + " hasConnection");
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
							<ArcherElement
								key={"arrowItem" + id1}
								id={id1}
								relations={relations}
							>
								{button1}
							</ArcherElement>
						);
						arrowedSlotList.push(arrowItem);
					}
					console.log(arrowedSlotList);

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
				}

				return (
					<ModalWindow overlaysContainer={this.props.overlaysContainer}>
						<div style={modalGridContainer}>
							{topItems}
							<div style={modalGridPanel}>
								<div style={modalGrid}>{itemList}</div>
								<div style={multiTab}>
									{
										<MultiTabFormWithHeader
											schema={selectedSchema}
											inputData={selectedComp}
											id={selectedID}
											onConfirm={this.onInnerElementDataSave}
											onCancel={null}
											overlaysContainer={this.props.overlaysContainer}
											currentChildrenComponentIdentifier={
												string_currentNumberOf_identifier
											}
											minChildrenComponentIdentifier={
												string_minNumberOf_identifier
											}
											maxChildrenComponentIdentifier={
												string_maxNumberOf_identifier
											}
											elementByType={this.props.elementByType}
											notModal={true}
											editable={false}
										/>
										// <MultiTabFormWithHeaderV2
										// 	schemas={this.props.settingSchemas}
										// 	schema={selectedSchema}
										// 	inputData={selectedComp}
										// 	id={selectedID}
										// 	onConfirm={this.onElementDataSave}
										// 	onCancel={null}
										// 	overlaysContainer={this.props.overlaysContainer}
										// 	currentChildrenComponentIdentifier={
										// 		string_currentNumberOf_identifier
										// 	}
										// 	minChildrenComponentIdentifier={
										// 		string_minNumberOf_identifier
										// 	}
										// 	maxChildrenComponentIdentifier={
										// 		string_maxNumberOf_identifier
										// 	}
										// 	elementByType={this.props.elementByType}
										// 	modalContainer={false}
										// />
									}
								</div>
							</div>
							<div style={buttonContainerRow}>
								<Button
									style={button2}
									size="lg"
									onClick={this.onAddAdditionalConfirm}
								>
									Confirm
								</Button>
								<Button
									style={button2}
									size="lg"
									onClick={this.onAddAdditionalCancel}
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

		const gridSpaceSpecimen = Object.assign({ fontSize: "20px" }, gridSpace);

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

		let additionalItemButton_1 = this.createAddButton_1_7_8(
			buttonStyle,
			additionalItemImage,
			1
		);
		let additionalItemButton_2 = this.createAddButton_2_3_4_5_6(
			buttonStyle,
			additionalItemImage,
			2
		);
		let additionalItemButton_3 = this.createAddButton_2_3_4_5_6(
			buttonStyle,
			additionalItemImage,
			3
		);
		let additionalItemButton_4 = this.createAddButton_2_3_4_5_6(
			buttonStyle,
			additionalItemImage,
			4
		);
		let additionalItemButton_5 = this.createAddButton_2_3_4_5_6(
			buttonStyle,
			additionalItemImage,
			5
		);
		let additionalItemButton_6 = this.createAddButton_2_3_4_5_6(
			buttonStyle,
			additionalItemImage,
			6
		);
		let additionalItemButton_7 = this.createAddButton_1_7_8(
			buttonStyle,
			additionalItemImage,
			7
		);
		let additionalItemButton_8 = this.createAddButton_1_7_8(
			buttonStyle,
			additionalItemImage,
			8
		);

		let lightSourceImage;
		Object.keys(this.props.componentSchemas).forEach((schemaIndex) => {
			let schema = this.props.componentSchemas[schemaIndex];
			let schema_id = schema.ID;
			if (
				schema_id === "Fluorescence_LightSource_GenericExcitationSource.json"
			) {
				lightSourceImage = url.resolve(this.props.imagesPath, schema.image);
			}
		});
		let lightSourceItemImage = (
			<img
				src={
					lightSourceImage +
					(lightSourceImage.indexOf("githubusercontent.com") > -1
						? "?sanitize=true"
						: "")
				}
				alt={"LightSource"}
				style={regularOpaqueImageStyle}
			/>
		);
		let lightSourceButton = (
			<button style={buttonStyle} onClick={this.handleClick_lightSource}>
				{lightSourceItemImage}
				Select Light Source
			</button>
		);

		let detectorImage;
		Object.keys(this.props.componentSchemas).forEach((schemaIndex) => {
			let schema = this.props.componentSchemas[schemaIndex];
			let schema_id = schema.ID;
			if (schema_id === "GenericDetector.json") {
				detectorImage = url.resolve(this.props.imagesPath, schema.image);
			}
		});
		let detectorItemImage = (
			<img
				src={
					detectorImage +
					(detectorImage.indexOf("githubusercontent.com") > -1
						? "?sanitize=true"
						: "")
				}
				alt={"Detector"}
				style={regularOpaqueImageStyle}
			/>
		);
		let detectorButton = (
			<button style={buttonStyle} onClick={this.handleClick_detector}>
				{detectorItemImage}
				Select Detector
			</button>
		);

		let relayLensImage;
		Object.keys(this.props.componentSchemas).forEach((schemaIndex) => {
			let schema = this.props.componentSchemas[schemaIndex];
			let schema_id = schema.ID;
			if (schema_id === "RelayLens.json") {
				relayLensImage = url.resolve(this.props.imagesPath, schema.image);
			}
		});
		let relayLensItemImage = (
			<img
				src={
					relayLensImage +
					(relayLensImage.indexOf("githubusercontent.com") > -1
						? "?sanitize=true"
						: "")
				}
				alt={"RelayLens"}
				style={regularOpaqueImageStyle}
			/>
		);
		let relayLensButton = (
			<button style={buttonStyle} onClick={this.handleClick_relayLens}>
				{relayLensItemImage}
				Select Relay Lens
			</button>
		);

		let couplingLensImage;
		Object.keys(this.props.componentSchemas).forEach((schemaIndex) => {
			let schema = this.props.componentSchemas[schemaIndex];
			let schema_id = schema.ID;
			if (schema_id === "CouplingLens.json") {
				couplingLensImage = url.resolve(this.props.imagesPath, schema.image);
			}
		});
		let couplingLensItemImage = (
			<img
				src={
					couplingLensImage +
					(couplingLensImage.indexOf("githubusercontent.com") > -1
						? "?sanitize=true"
						: "")
				}
				alt={"CouplingLens"}
				style={regularOpaqueImageStyle}
			/>
		);
		let couplingLensButton = (
			<button style={buttonStyle} onClick={this.handleClick_couplingLens}>
				{couplingLensItemImage}
				Select Coupling Lens
			</button>
		);

		let lightSourceCouplingImage;
		Object.keys(this.props.componentSchemas).forEach((schemaIndex) => {
			let schema = this.props.componentSchemas[schemaIndex];
			let schema_id = schema.ID;
			if (schema_id === "FreeBeam.json") {
				lightSourceCouplingImage = url.resolve(
					this.props.imagesPath,
					schema.image
				);
			}
		});
		let lightSourceCouplingItemImage = (
			<img
				src={
					lightSourceCouplingImage +
					(lightSourceCouplingImage.indexOf("githubusercontent.com") > -1
						? "?sanitize=true"
						: "")
				}
				alt={"LightSourceCoupling"}
				style={regularOpaqueImageStyle}
			/>
		);
		let lightSourceCouplingButton = (
			<button
				style={buttonStyle}
				onClick={this.handleClick_lightSourceCoupling}
			>
				{lightSourceCouplingItemImage}
				Select Light Source Coupling
			</button>
		);

		let excitationImage;
		Object.keys(this.props.componentSchemas).forEach((schemaIndex) => {
			let schema = this.props.componentSchemas[schemaIndex];
			let schema_id = schema.ID;
			if (schema_id === "ExcitationFilter.json") {
				excitationImage = url.resolve(this.props.imagesPath, schema.image);
			}
		});
		let excitationItemImage = (
			<img
				src={
					excitationImage +
					(excitationImage.indexOf("githubusercontent.com") > -1
						? "?sanitize=true"
						: "")
				}
				alt={"Excitation"}
				style={regularOpaqueImageStyle}
			/>
		);
		let excitationButton = (
			<button style={buttonStyle} onClick={this.handleClick_excitation}>
				{excitationItemImage}
				Select Excitation Wavelength
			</button>
		);

		let dichroicImage;
		Object.keys(this.props.componentSchemas).forEach((schemaIndex) => {
			let schema = this.props.componentSchemas[schemaIndex];
			let schema_id = schema.ID;
			if (schema_id === "StandardDichroic.json") {
				dichroicImage = url.resolve(this.props.imagesPath, schema.image);
			}
		});
		let dichroicItemImage = (
			<img
				src={
					dichroicImage +
					(dichroicImage.indexOf("githubusercontent.com") > -1
						? "?sanitize=true"
						: "")
				}
				alt={"Dichroic"}
				style={regularOpaqueImageStyle}
			/>
		);
		let dichroicButton = (
			<button style={buttonStyle} onClick={this.handleClick_dichroic}>
				{dichroicItemImage}
				Select Dichroic
			</button>
		);

		let emissionImage;
		Object.keys(this.props.componentSchemas).forEach((schemaIndex) => {
			let schema = this.props.componentSchemas[schemaIndex];
			let schema_id = schema.ID;
			if (schema_id === "EmissionFilter.json") {
				emissionImage = url.resolve(this.props.imagesPath, schema.image);
			}
		});
		let emissionItemImage = (
			<img
				src={
					emissionImage +
					(emissionImage.indexOf("githubusercontent.com") > -1
						? "?sanitize=true"
						: "")
				}
				alt={"Emission"}
				style={regularOpaqueImageStyle}
			/>
		);
		let emissionButton = (
			<button style={buttonStyle} onClick={this.handleClick_emission}>
				{emissionItemImage}
				Select Emission Wavelength
			</button>
		);

		let objectiveImage;
		Object.keys(this.props.componentSchemas).forEach((schemaIndex) => {
			let schema = this.props.componentSchemas[schemaIndex];
			let schema_id = schema.ID;
			if (schema_id === "Objective.json") {
				objectiveImage = url.resolve(this.props.imagesPath, schema.image);
			}
		});
		let objectiveItemImage = (
			<img
				src={
					objectiveImage +
					(objectiveImage.indexOf("githubusercontent.com") > -1
						? "?sanitize=true"
						: "")
				}
				alt={"Objective"}
				style={regularOpaqueImageStyle}
			/>
		);
		let objectiveButton = (
			<button style={buttonStyle} onClick={this.handleClick_objective}>
				{objectiveItemImage}
				Select Objective
			</button>
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
				<div style={gridSpace}></div>
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
					<div style={gridSpaceSpecimen}>SPECIMEN</div>
				</ArcherElement>
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

		// let row7 = (
		// 	<div style={gridRowAdd}>
		// 		<div style={gridSpaceAdd}></div>
		// 		<ArcherElement
		// 			id="addButton_4"
		// 			relations={[
		// 				{
		// 					targetId: "objective",
		// 					targetAnchor: "left",
		// 					sourceAnchor: "bottom",
		// 				},
		// 			]}
		// 		>
		// 			<div style={gridSpaceAdd}>{additionalItemButton_4}</div>
		// 		</ArcherElement>
		// 		<div style={gridSpaceAdd}></div>
		// 		<ArcherElement
		// 			id="addButton_5"
		// 			relations={[
		// 				{
		// 					targetId: "dichroicFilter",
		// 					targetAnchor: "bottom",
		// 					sourceAnchor: "left",
		// 				},
		// 			]}
		// 		>
		// 			<div style={gridSpaceAdd}>{additionalItemButton_5}</div>
		// 		</ArcherElement>
		// 		<div style={gridSpaceAdd}></div>
		// 	</div>
		// );

		// let row8 = (
		// 	<div style={gridRow}>
		// 		<div style={gridSpace}></div>
		// 		<div style={gridSpace}></div>
		// 		<ArcherElement
		// 			id="objective"
		// 			relations={[
		// 				// {
		// 				// 	targetId: "specimen",
		// 				// 	targetAnchor: "top",
		// 				// 	sourceAnchor: "left",
		// 				// },
		// 				{
		// 					targetId: "addButton_5",
		// 					targetAnchor: "bottom",
		// 					sourceAnchor: "right",
		// 				},
		// 			]}
		// 		>
		// 			<div style={gridSpace}>{objectiveButton}</div>
		// 		</ArcherElement>

		// 		<div style={gridSpace}></div>
		// 		<div style={gridSpace}></div>
		// 	</div>
		// );

		// let row9 = (
		// 	<div style={gridRowAdd}>
		// 		<div style={gridSpaceAdd}></div>
		// 		<div style={gridSpaceAdd}></div>
		// 		<ArcherElement
		// 			id="specimen"
		// 			relations={
		// 				[
		// 					// {
		// 					// 	targetId: "objective",
		// 					// 	targetAnchor: "right",
		// 					// 	sourceAnchor: "top",
		// 					// },
		// 				]
		// 			}
		// 		>
		// 			<div style={gridSpaceAdd}>SPECIMEN</div>
		// 		</ArcherElement>

		// 		<div style={gridSpaceAdd}></div>
		// 		<div style={gridSpaceAdd}></div>
		// 	</div>
		// );

		return (
			<ModalWindow overlaysContainer={this.props.overlaysContainer}>
				<div>
					<h3>{this.props.schema.title}</h3>
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
					<Button style={button2} size="lg" onClick={this.props.onConfirm}>
						Confirm
					</Button>
					<Button style={button2} size="lg" onClick={this.onEditElement}>
						Edit Channel
					</Button>
					<Button style={button2} size="lg" onClick={this.props.onCancel}>
						Cancel
					</Button>
				</div>
			</ModalWindow>
		);
	}
}
