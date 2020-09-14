import React from "react";
import { DropTarget } from "react-drag-drop-container";
import { DragDropContainer } from "react-drag-drop-container";

import CanvasElement from "./canvasElement";
import { CanvasElementDeleteButton } from "./canvasElement";

import { pathToFileURL } from "url";
import { v4 as uuidv4 } from "uuid";

const url = require("url");
const validate = require("jsonschema").validate;

import {
	bool_isDebug,
	string_na,
	string_object,
	string_array,
	string_toolbar,
	string_canvas,
	string_json_ext,
	string_currentNumberOf_identifier,
	string_minNumberOf_identifier,
	string_maxNumberOf_identifier,
	number_canvas_width,
	number_canvas_height,
	number_min_element_width,
} from "../constants";
import { bool } from "prop-types";

export default class Canvas extends React.PureComponent {
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
			isEditing: false,
			hover: null,
			draggingID: null,
			showcasedSpot: null,
			occupiedSpots: [],
			originalDimensions: {},
		};

		Object.keys(props.componentSchemas).forEach((schemaIndex) => {
			let schema = props.componentSchemas[schemaIndex];
			let schema_id = schema.ID;
			//Validate schemas using jsonschema????
			Object.keys(props.inputData).forEach((objIndex) => {
				let object = props.inputData[objIndex];
				if (props.activeTier < object.tier) return;
				if (schema_id !== object.Schema_ID) return;
				let validation = validate(object, schema);
				//if (schema_id === "CCD.json") console.log(validation);
				let validated = validation.valid;
				let positionZ = object.PositionZ === undefined ? 0 : object.PositionZ;
				let newElement = {
					ID: schema.title + "_" + object.ID,
					schema_ID: schema_id,
					name: object.Name,
					validated: validated,
					dragged: false,
					obj: object,
					x: object.PositionX,
					y: object.PositionY,
					z: positionZ,
					width: object.Width,
					height: object.Height,
					occupiedSpot: object.OccupiedSpot,
				};
				let occupiedSpot = object.OccupiedSpot;
				if (occupiedSpot !== undefined) {
					newElement = Object.assign(newElement, {
						occupiedSpot: occupiedSpot,
					});
				} else {
					newElement = Object.assign(newElement, { occupiedSpot: null });
				}
				if (occupiedSpot !== undefined && occupiedSpot !== null)
					this.state.occupiedSpots.push(occupiedSpot);
				this.state.elementList.push(newElement);
			});
			this.state.componentsSchema[schema_id] = schema;
		});

		this.setEditingOnCanvas = this.setEditingOnCanvas.bind(this);
		this.addComponentsIndexesIfMissing = this.addComponentsIndexesIfMissing.bind(
			this
		);

		this.dragged = this.dragged.bind(this);
		this.dropped = this.dropped.bind(this);
		this.isDragging = this.isDragging.bind(this);
		this.isNotDragging = this.isNotDragging.bind(this);
		this.onDelete = this.onDelete.bind(this);

		this.handleMouseIn = this.handleMouseIn.bind(this);
		this.handleMouseOut = this.handleMouseOut.bind(this);

		this.onCanvasElementDataSave = this.onCanvasElementDataSave.bind(this);
		this.getElementData = this.getElementData.bind(this);
		this.updatedDimensions = this.updatedDimensions.bind(this);

		this.areAllElementsValidated = this.areAllElementsValidated.bind(this);

		//this.onImgLoad = this.onImgLoad.bind(this);

		this.handleScroll = this.handleScroll.bind(this);

		this.clearOccupiedSpotOnElements = this.clearOccupiedSpotOnElements.bind(
			this
		);

		this.props.updateElementData(this.state.elementData, true);
	}

	static getDerivedStateFromProps(props, state) {
		if (props.componentsSchema !== null) {
			let componentsSchema = {};
			Object.keys(props.componentSchemas).forEach((schemaIndex) => {
				let schema = props.componentSchemas[schemaIndex];
				let schema_id = schema.ID;
				componentsSchema[schema_id] = schema;
			});
			let elementList = state.elementList;
			for (let i = 0; i < elementList.length; i++) {
				let element = elementList[i];
				let schema_id = element.schema_ID;
				let schema = componentsSchema[schema_id];
				let object = element.obj;
				let validation = validate(object, schema);
				let validated = validation.valid;
				element.validated = validated;
			}
			return {
				componentsSchema: componentsSchema,
			};
		}

		return null;
	}

	setEditingOnCanvas(isEditing) {
		this.setState({ isEditing: isEditing });
	}

	handleMouseIn(itemID) {
		this.setState({ hover: itemID });
	}

	handleMouseOut() {
		this.setState({ hover: null });
	}

	handleScroll(e) {
		if (this.state.isEditing) {
			return;
		}

		let element = e.target;
		let offsetY = element.scrollTop;
		let offsetX = element.scrollLeft;

		this.setState({ offsetX: offsetX, offsetY: offsetY });
	}

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

	clearOccupiedSpotOnElements(occupiedSpotsToClear) {
		let newElementList = this.state.elementList.slice();
		let newElementDataList = Object.assign({}, this.state.elementData);
		newElementList.map((item, index) => {
			if (occupiedSpotsToClear.includes(item.occupiedSpot)) {
				newElementList[index].occupiedSpot = null;
				newElementDataList[item.ID] = null;
			}
		});
		this.setState({
			elementList: newElementList,
			elementData: newElementDataList,
		});
	}

	isDragging(e) {
		let occupiedSpots = this.state.occupiedSpots.slice();
		// console.log("occupiedSpots");
		// console.log(occupiedSpots);
		let elementDimensions = this.props.canvasElementsDimensions;
		let componentsSchema = this.state.componentsSchema;
		let newElementList = this.state.elementList;
		let sourceElement = e.dragData;
		let schema_ID = null;
		let id = null;
		let occupiedSpot = null;
		if (sourceElement.source === string_toolbar) {
			schema_ID = sourceElement.schema_ID;
		} else {
			schema_ID = newElementList[sourceElement.index].schema_ID;
			occupiedSpot = newElementList[sourceElement.index].occupiedSpot;
			id = newElementList[sourceElement.index].id;
		}

		// console.log("occupiedSpot in drag");
		// console.log(occupiedSpot);
		let x = e.x;
		let y = e.y - this.state.headerOffset;
		let schema = componentsSchema[schema_ID];

		let spots = null;
		let ns_ID = null;
		if (
			elementDimensions[schema.category] !== undefined &&
			elementDimensions[schema.category] !== null
		) {
			ns_ID = schema.category;
			spots = elementDimensions[ns_ID];
			// console.log("Found category NSID: " + ns_ID);
			// console.log(spots);
		} else {
			ns_ID = schema.category + "_" + schema_ID.replace(".json", "");
			spots = elementDimensions[ns_ID];
			// console.log("Found full name NSID: " + ns_ID);
			// console.log(spots);
		}
		let showcasedSpot = null;

		if (occupiedSpot !== undefined && occupiedSpot !== null) {
			let indexOf = occupiedSpots.indexOf(occupiedSpot);
			// console.log("indexOf in drag");
			// console.log(indexOf);
			if (indexOf !== -1) {
				occupiedSpots.splice(indexOf, 1);
				// console.log("occupiedSpots");
				// console.log(occupiedSpots);
			}
		}

		//console.log("X: " + x + "||" + "Y: " + y);
		// for (let i = 0; i < spots.length; i++) {
		// 	let spot = spots[i];
		// 	let x1 = spot.x - spot.w / 2;
		// 	let x2 = spot.x + spot.w / 2;
		// 	let y1 = spot.y - spot.h / 2;
		// 	let y2 = spot.y + spot.h / 2;
		// 	console.log("X1: " + x1 + "||" + "Y1: " + y1);
		// 	console.log("X2: " + x2 + "||" + "Y2: " + y2);
		// 	if (x > x1 && x < x2 && y > y1 && y < y2) {
		// 		console.log("IMHERE");
		// 		showcasedSpot = spot;
		// 		break;
		// 	}
		// }
		//console.log("ns_ID");
		//console.log(ns_ID);
		this.setState({
			draggingID: ns_ID,
			showcasedSpot: showcasedSpot,
			occupiedSpots: occupiedSpots,
		});
	}

	isNotDragging(e) {
		this.setState({ draggingID: null, showcasedSpot: null });
	}

	dragged(e) {
		let newElementList = this.state.elementList.slice();
		let newElementDataList = Object.assign({}, this.state.elementData);
		let occupiedSpots = this.state.occupiedSpots.slice();
		newElementList[e.index].dragged = true;
		let draggedItem = newElementList[e.index];

		let ID = draggedItem.ID;
		let x = draggedItem.x;
		let y = draggedItem.y;
		let l1_x = x;
		let l1_y = y;
		let r1_x = x + draggedItem.width;
		let r1_y = y + draggedItem.height;

		let oldZ = draggedItem.z;

		for (let k = 0; k < this.state.elementList.length; k++) {
			let item = this.state.elementList[k];
			if (ID === item.ID) continue;
			let l2_x = item.x;
			let l2_y = item.y;
			let r2_x = l2_x + item.width;
			let r2_y = l2_y + item.height;

			if (l1_x > r2_x || r1_x < l2_x) {
				continue;
			}
			if (l1_y > r2_y || r1_y < l2_y) {
				continue;
			}

			if (item.z > oldZ) {
				item.z = item.z - 1;
			}
		}

		let occupiedSpotsToClear = [];
		let length = occupiedSpots.length;
		for (let i = 0; i < length; i++) {
			let tmpSpot = occupiedSpots[i];
			if (tmpSpot.includes(ID)) {
				occupiedSpotsToClear.push(tmpSpot);
				occupiedSpots.splice(i, 1);
				length--;
			}
		}
		newElementList.map((item, index) => {
			if (occupiedSpotsToClear.includes(item.occupiedSpot)) {
				newElementList[index].occupiedSpot = null;
				newElementDataList[item.ID] = null;
			}
		});

		this.setState({
			elementList: newElementList,
			elementData: newElementDataList,
			occupiedSpots: occupiedSpots,
		});
	}

	dropped(e) {
		let scalingFactor = this.props.scalingFactor;
		let componentsSchema = this.state.componentsSchema;
		let elementDimensions = this.props.canvasElementsDimensions;
		let sourceElement = e.dragData;
		let newElementList = this.state.elementList.slice();
		let newElementDataList = Object.assign({}, this.state.elementData);
		let originalDimensions = Object.assign({}, this.state.originalDimensions);
		let newElement = null;
		let occupiedSpots = this.state.occupiedSpots.slice();
		let x = e.x;
		let y = e.y - this.state.headerOffset;

		let schema_ID = null;
		if (sourceElement.source === string_toolbar) {
			schema_ID = sourceElement.schema_ID;
		} else {
			schema_ID = newElementList[sourceElement.index].schema_ID;
		}
		let schema = componentsSchema[schema_ID];
		let spots = null;
		let ns_ID = null;
		if (
			elementDimensions[schema.category] !== undefined &&
			elementDimensions[schema.category] !== null
		) {
			ns_ID = schema.category;
			spots = elementDimensions[ns_ID];
		} else {
			ns_ID = schema.category + "_" + schema_ID.replace(".json", "");
			spots = elementDimensions[ns_ID];
		}

		let offsetX = this.state.offsetX;
		let offsetY = this.state.offsetY;
		let containerOffsetX = this.props.containerOffsetLeft;
		let containerOffsetY = this.props.containerOffsetTop;

		x += offsetX - containerOffsetX;
		y += offsetY - containerOffsetY;

		//console.logconsole.log("X: " + x + " - " + "Y: " + y);
		let occupiedSpot = null;

		let width = 100;
		let height = 100;

		let defaultOffset = 12 /** scalingFactor*/ + 6.67;

		if (spots !== undefined && spots !== null) {
			if (
				ns_ID === "LightPath_ExcitationFilter" ||
				ns_ID === "LightPath_EmissionFilter" ||
				ns_ID === "LightPath_StandardDichroic"
			) {
				let spot = spots;
				let spotW = spot.w * scalingFactor;
				let spotH = spot.h * scalingFactor;
				width = spotW;
				height = spotH;
				newElementList.map((item, index) => {
					if (item.schema_ID === "FilterSet.json") {
						let tmpID = item.ID + "_" + ns_ID;
						if (occupiedSpots.includes(tmpID)) return;
						let xOff = item.x + item.width / 2 + spot.x + containerOffsetX;
						let yOff =
							item.y +
							item.height / 2 +
							defaultOffset +
							spot.y +
							containerOffsetY;
						let x1 = xOff - spotW / 2;
						let x2 = xOff + spotW / 2;
						let y1 = yOff - spotH / 2;
						let y2 = yOff + spotH / 2;
						if (x > x1 && x < x2 && y > y1 && y < y2) {
							x = x1;
							y = y1;
							occupiedSpot = tmpID;
						}
					}
				});
			} else if (Array.isArray(spots)) {
				for (let i = 0; i < spots.length; i++) {
					let tmpID = ns_ID + "_" + i;
					let spot = spots[i];
					let spotW = spot.w * scalingFactor;
					let spotH = spot.h * scalingFactor;
					width = spotW;
					height = spotH;
					if (occupiedSpots.includes(tmpID)) continue;
					if (spot.x !== -1 && spot.y !== -1) {
						let xOff = spot.x * scalingFactor + containerOffsetX; // + (offsetX - containerOffsetX);
						let yOff = spot.y * scalingFactor + containerOffsetY; // + (offsetY - containerOffsetY);
						let x1 = xOff - spotW / 2;
						let x2 = xOff + spotW / 2;
						let y1 = yOff - spotH / 2;
						let y2 = yOff + spotH / 2;
						if (x > x1 && x < x2 && y > y1 && y < y2) {
							x = x1;
							y = y1;
							occupiedSpot = tmpID;
							break;
						}
					}
				}
			} else {
				let tmpID = ns_ID + "_" + 1;
				let spot = spots;
				let spotW = spot.w * scalingFactor;
				let spotH = spot.h * scalingFactor;
				width = spotW;
				height = spotH;
				if (!occupiedSpots.includes(tmpID)) {
					if (spot.x !== -1 && spot.y !== -1) {
						let xOff = spot.x * scalingFactor + containerOffsetX; // + (offsetX - containerOffsetX);
						let yOff = spot.y * scalingFactor + containerOffsetY; // + (offsetY - containerOffsetY);
						let x1 = xOff - spotW / 2;
						let x2 = xOff + spotW / 2;
						let y1 = yOff - spotH / 2;
						let y2 = yOff + spotH / 2;
						if (x > x1 && x < x2 && y > y1 && y < y2) {
							x = x1;
							y = y1;
							occupiedSpot = tmpID;
						}
					}
				}
			}
		}

		//console.log("DROPPED: w-" + width + "||h-" + height);

		let minElementWidth = number_min_element_width * scalingFactor;

		let adjustedWidth = 0;
		if (width < minElementWidth) {
			adjustedWidth = (minElementWidth - width) / 2;
			x -= adjustedWidth;
			width = minElementWidth;
		}

		if (originalDimensions[schema_ID] === undefined) {
			originalDimensions[schema_ID] = {
				w: width,
				h: height,
			};
		}

		if (occupiedSpot !== null) {
			occupiedSpots.push(occupiedSpot);
			y -= 12; // * scalingFactor;
			console.log("IN SPOT");
		} else {
			y -= 5 * scalingFactor;
			x -= 5 * scalingFactor;
		}

		y -= 6.67;
		// if (sourceElement.source !== string_toolbar) {
		// 	x -= 5;
		// 	y -= 15;
		// }

		let index = null;
		let ID = null;

		// console.log("occupiedSpot in drop to be set");
		// console.log(occupiedSpot);

		if (sourceElement.source === string_toolbar) {
			let uuid = uuidv4();
			newElement = {
				//Schema is old version needs to be updated constantly
				//AKA needs to put schemas in canvas and retrieve them
				//on the fly
				ID: schema.title + "_" + uuid,
				schema_ID: schema.ID,
				validated: false,
				dragged: false,
				x: x,
				y: y,
				z: 0,
				width: width,
				height: height,
				offsetX: offsetX,
				offsetY: offsetY,
				occupiedSpot: occupiedSpot,
			};
			newElementList.push(newElement);
			let newElementData = {
				Name: `New ${schema.title}`,
				ID: uuid,
				Tier: schema.tier,
				Schema_ID: schema.ID,
				Version: schema.version,
				PositionX: x,
				PositionY: y,
				PositionZ: 0,
				Width: width,
				Height: height,
				OffsetX: offsetX,
				OffsetY: offsetY,
				OccupiedSpot: occupiedSpot,
			};
			newElement.name = newElementData.Name;
			this.addComponentsIndexesIfMissing(schema, newElementData);
			newElement.obj = newElementData;
			newElementDataList[newElement.ID] = newElementData;
			index = newElementList.length - 1;
			ID = newElement.ID;
		} else {
			let item = this.state.elementList[sourceElement.index];
			if (item.occupiedSpot !== occupiedSpot) {
				let previousOccupiedSpot = item.occupiedSpot;
				// console.log("previousOccupiedSpot in drop");
				// console.log(previousOccupiedSpot);
				let indexOf = occupiedSpots.indexOf(previousOccupiedSpot);
				if (indexOf !== -1) {
					// console.log("indexOf in drop");
					// console.log(indexOf);
					occupiedSpots.splice(indexOf, 1);
				}
			}
			newElementList[sourceElement.index].x = x;
			newElementList[sourceElement.index].y = y;
			newElementList[sourceElement.index].dragged = false;
			newElementList[sourceElement.index].offsetX = offsetX;
			newElementList[sourceElement.index].offsetY = offsetY;
			newElementList[sourceElement.index].occupiedSpot = occupiedSpot;
			newElementDataList[item.ID].PositionX = x;
			newElementDataList[item.ID].PositionY = y;
			newElementDataList[item.ID].OffsetX = offsetX;
			newElementDataList[item.ID].OffsetY = offsetY;
			newElementDataList[item.ID].OccupiedSpot = occupiedSpot;
			if (occupiedSpot !== null) {
				newElementList[sourceElement.index].width = width;
				newElementList[sourceElement.index].height = height;
				newElementDataList[item.ID].Width = width;
				newElementDataList[item.ID].Height = height;
			}

			this.addComponentsIndexesIfMissing(schema, newElementDataList[item.ID]);

			width = item.width;
			height = item.height;
			index = sourceElement.index;
			ID = item.ID;
		}

		let newZ = 0;
		let l1_x = x;
		let l1_y = y;
		let r1_x = x + width;
		let r1_y = y + height;

		for (let k = 0; k < this.state.elementList.length; k++) {
			let item = this.state.elementList[k];
			if (ID === item.ID) continue;
			let l2_x = item.x;
			let l2_y = item.y;
			let r2_x = l2_x + item.width;
			let r2_y = l2_y + item.height;
			if (l1_x > r2_x || r1_x < l2_x) {
				continue;
			}
			if (l1_y > r2_y || r1_y < l2_y) {
				continue;
			}
			if (item.z + 1 > newZ) newZ = item.z + 1;
		}

		newElementList[index].z = newZ;
		newElementDataList[ID].PositionZ = newZ;

		// console.log("occupiedSpots");
		// console.log(occupiedSpots);

		this.setState({
			elementList: newElementList,
			elementData: newElementDataList,
			draggingID: null,
			showcasedSpot: null,
			occupiedSpots: occupiedSpots,
			originalDimensions: originalDimensions,
		});

		let validated = this.areAllElementsValidated();
		this.props.updateElementData(newElementDataList, validated);
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

	onDelete(index) {
		let elementList = this.state.elementList.slice();
		let elementData = Object.assign({}, this.state.elementData);

		if (elementList.length === 0) return;
		if (elementData.length === 0) return;

		let id = elementList[index].ID;
		let name = elementList[index].name;
		let schemaID = elementList[index].schema_ID;

		let elementDimensions = this.props.canvasElementsDimensions;
		let componentsSchema = this.state.componentsSchema;
		let occupiedSpots = this.state.occupiedSpots.slice();
		let schema = componentsSchema[schemaID];
		let occupiedSpot = elementList[index].occupiedSpot;
		let ns_ID = null;
		if (
			elementDimensions[schema.category] !== undefined &&
			elementDimensions[schema.category] !== null
		) {
			ns_ID = schema.category;
			//console.log("Found category NSID: " + ns_ID);
			//console.log(spots);
		} else {
			ns_ID = schema.category + "_" + schemaID.replace(".json", "");
			//console.log("Found full name NSID: " + ns_ID);
			//console.log(spots);
		}

		if (occupiedSpot !== undefined && occupiedSpot !== null) {
			let indexOf = occupiedSpots.indexOf(occupiedSpot);
			// console.log("indexOf in drag");
			// console.log(indexOf);
			if (indexOf !== -1) {
				occupiedSpots.splice(indexOf, 1);
				// console.log("occupiedSpots");
				// console.log(occupiedSpots);
			}
		}
		let occupiedSpotsToClear = [];
		let length = occupiedSpots.length;
		for (let i = 0; i < length; i++) {
			let tmpSpot = occupiedSpots[i];
			if (tmpSpot.includes(id)) {
				occupiedSpotsToClear.push(tmpSpot);
				occupiedSpots.splice(i, 1);
				length--;
			}
		}
		elementList.map((item, index) => {
			if (occupiedSpotsToClear.includes(item.occupiedSpot)) {
				elementList[index].occupiedSpot = null;
				elementData[item.ID].OccupiedSpot = null;
			}
		});

		// console.log("elementList");
		// console.log(elementList);
		// console.log("elementData");
		// console.log(elementData);

		let deletedSchema = schemaID.replace(string_json_ext, "");
		let deletedID = id.replace(deletedSchema, "");
		deletedID = deletedID.replace("_", "");

		let linkedFields = this.state.linkedFields;

		for (let key in linkedFields) {
			let links = linkedFields[key];
			let done = false;
			let fieldToDelete = null;
			for (let field in links) {
				let link = links[field];
				if (link.value === deletedID) {
					if (elementData[key] !== undefined) {
						elementData[key][field] = string_na;
					}
					fieldToDelete = field;
					done = true;
					break;
				}
			}
			delete linkedFields[key][fieldToDelete];
			if (Object.keys(linkedFields[key]).length === 0) {
				delete linkedFields[key];
			}
			if (done) break;
		}

		elementList.splice(index, 1);

		if (elementData[id] !== undefined) {
			delete elementData[id];
		}

		this.setState({
			elementList: elementList,
			elementData: elementData,
			occupiedSpots: occupiedSpots,
		});

		let validated = this.areAllElementsValidated();
		this.props.updateElementData(elementData, validated);
	}

	createList() {
		let scalingFactor = this.props.scalingFactor;
		let originalDimensions = this.state.originalDimensions;
		let hover = this.state.hover;
		let elementList = this.state.elementList;
		let elementData = this.state.elementData;

		let highestZ = 0;
		for (let k = 0; k < this.state.elementList.length; k++) {
			let item = elementList[k];
			let z = item.z;
			if (z > highestZ) highestZ = z;
		}
		let imageValidationSize = 16 * scalingFactor;
		const imageValidation = {
			height: `${imageValidationSize}px`,
			width: `${imageValidationSize}px`,
			margin: "auto",
			verticalAlign: "middle",
		};
		let fontSize = 14 * scalingFactor;
		let grabberCloserSize = 12 * scalingFactor;
		//console.log("fontSize - " + fontSize);
		//console.log("grabberCloserSize - " + grabberCloserSize);
		const styleGrabber = {
			lineHeight: `${grabberCloserSize}px`,
			fontSize: `${fontSize}px`,
			fontWeight: "bold",
			color: "grey",
			textAlign: "center",
			verticalAlign: "middle",
		};
		const styleCloser = {
			lineHeight: `${grabberCloserSize}px`,
			padding: "0px",
			border: "none",
			fontSize: `${fontSize}px`,
			backgroundColor: "transparent",
			cursor: "pointer",
			color: "grey",
			textAlign: "center",
			verticalAlign: "middle",
		};
		//justifyContent: "space-between"
		let minElementWidth = number_min_element_width * scalingFactor;
		//	console.log("minElementWidth - " + minElementWidth);
		const styleActionContainer = {
			display: "flex",
			flexDirection: "row",
			width: `${minElementWidth}px`,
			height: `${grabberCloserSize}px`,
		};

		let styleActionElementNameContainer = {
			display: "flex",
			flexDirection: "column",
		};

		let styleElementNameContainer = {
			display: "flex",
			flexDirection: "column",
		};
		//paddingLeft: "5px",
		let hoverSize = 125; //* scalingFactor;
		let hoverFontSize = 80 * scalingFactor;
		let styleNameHover = {
			overflow: "unset",
			fontSize: `${hoverFontSize}%`,
			textAlign: "left",
			lineHeight: `${hoverSize}%`,
			color: "gray",
		};
		let styleNameRegular = {
			display: "none",
		};

		let stylesContainer = {};
		let stylesImages = {};

		elementList.map((item) => {
			let x = item.x;
			let y = item.y;
			let style = {
				position: "absolute",
				left: x,
				top: y,
			};
			let containerWidth = item.width;
			let containerHeight = item.height;

			// if (containerWidth == -1) containerWidth = 100;
			// if (containerHeight == -1) containerHeight = 100;

			let scaledContainerWidth = containerWidth;
			let scaledContainerHeight = containerHeight;

			// if (!item.validated) {
			// 	scaledContainerWidth += 10;
			// 	scaledContainerHeight += 10;
			// }

			if (scaledContainerWidth <= minElementWidth)
				scaledContainerWidth = minElementWidth;
			scaledContainerHeight += 12 /* * scalingFactor */ + 6.67;

			// console.log("SCW - " + scaledContainerWidth);
			// console.log("SCH - " + scaledContainerHeight);

			stylesContainer[item.ID] = Object.assign(
				{
					width: `${scaledContainerWidth}px`,
					height: `${scaledContainerHeight}px`,
				},
				style
			);
			stylesImages[item.ID] = {
				width: item.width,
				height: item.height,
			};
		});
		let droppableElement = [];
		let componentsSchema = this.state.componentsSchema;
		let elementByType = {};
		// console.log("elementData");
		// console.log(elementData);
		Object.keys(elementData).forEach(function (key) {
			let element = elementData[key];
			// console.log("element");
			// console.log(element);
			let schemaID = element.Schema_ID.replace(string_json_ext, "");
			if (elementByType[schemaID] === undefined) {
				elementByType[schemaID] = {};
			}
			elementByType[schemaID][element.Name] = element.ID;
		});

		for (let k = 0; k <= highestZ; k++) {
			elementList.map((item, index) => {
				if (item.z != k) return;
				let schema_id = item.schema_ID;
				let schema = componentsSchema[schema_id];
				let styleName = null;
				if (item.ID === hover) {
					styleName = Object.assign(styleNameHover, {
						width: `${stylesImages[item.ID].width}px`,
					});
				} else {
					styleName = styleNameRegular;
				}
				let minWidth = null;
				let maxWidth = null;
				let minHeight = null;
				let maxHeight = null;
				if (originalDimensions[schema_id] !== undefined) {
					let originalDim = originalDimensions[schema_id];
					minWidth = (originalDim.w * scalingFactor) / 2;
					maxWidth = originalDim.w * scalingFactor * 2;
					minHeight = (originalDim.h * scalingFactor) / 2;
					maxHeight = originalDim.h * scalingFactor * 2;
				}
				let validated;
				if (item.validated) {
					const styleValidated = Object.assign({}, styleGrabber, {
						color: "green",
					});
					validated = <div style={styleValidated}>&#9679;</div>;
					// let image = url.resolve(this.props.imagesPath, "green_thumb_up.svg");
					// validated = (
					// 	<img
					// 		src={
					// 			image +
					// 			(image.indexOf("githubusercontent.com") > -1
					// 				? "?sanitize=true"
					// 				: "")
					// 		}
					// 		alt={"validated"}
					// 		style={imageValidation}
					// 	/>
					// );
				} else {
					const styleNotValidated = Object.assign({}, styleGrabber, {
						color: "red",
					});
					validated = <div style={styleNotValidated}>&#9679;</div>;
					// let image = url.resolve(this.props.imagesPath, "red_thumb_down.svg");
					// validated = (
					// 	<img
					// 		src={
					// 			image +
					// 			(image.indexOf("githubusercontent.com") > -1
					// 				? "?sanitize=true"
					// 				: "")
					// 		}
					// 		alt={"not validated"}
					// 		style={imageValidation}
					// 	/>
					// );
				}
				droppableElement.push(
					<div
						style={stylesContainer[item.ID]}
						key={"draggableWrapper" + index}
						onMouseEnter={() => this.handleMouseIn(item.ID)}
						onMouseLeave={this.handleMouseOut}
					>
						<DragDropContainer
							targetKey={string_canvas}
							key={"draggable" + index}
							dragClone={false}
							dragData={{ source: string_canvas, index: index }}
							onDragStart={this.dragged}
							dragHandleClassName="grabber"
						>
							<div style={styleActionElementNameContainer}>
								<div style={styleActionContainer}>
									<div className="grabber" style={styleGrabber}>
										&#8759;
									</div>
									{validated}
									<CanvasElementDeleteButton
										index={index}
										handleDelete={this.onDelete}
										myStyle={styleCloser}
										isViewOnly={this.props.isViewOnly}
									/>
								</div>
								<div style={styleElementNameContainer}>
									<CanvasElement
										activeTier={this.props.activeTier}
										id={item.ID}
										image={url.resolve(this.props.imagesPath, schema.image)}
										schema={schema}
										handleConfirm={this.onCanvasElementDataSave}
										updateDimensions={this.updatedDimensions}
										overlaysContainer={this.props.overlaysContainer}
										inputData={elementData[item.ID]}
										width={stylesImages[item.ID].width}
										height={stylesImages[item.ID].height}
										minWidth={minWidth}
										maxWidth={maxWidth}
										minHeight={minHeight}
										maxHeight={maxHeight}
										//validated={item.validated}
										dragged={item.dragged}
										currentChildrenComponentIdentifier={
											string_currentNumberOf_identifier
										}
										minChildrenComponentIdentifier={
											string_minNumberOf_identifier
										}
										maxChildrenComponentIdentifier={
											string_maxNumberOf_identifier
										}
										elementByType={elementByType}
										isViewOnly={this.props.isViewOnly}
										setEditingOnCanvas={this.setEditingOnCanvas}
									/>
									<div style={styleName}>{item.name}</div>
								</div>
							</div>
						</DragDropContainer>
					</div>
				);
			});
		}
		return droppableElement;
	}

	render() {
		const {
			backgroundImage,
			dimensions: { width, height } = {},
			microscope = null,
			scalingFactor = 1,
		} = this.props;
		const { linkedFields } = this.state;
		let occupiedSpots = this.state.occupiedSpots;
		let elementList = this.state.elementList;
		// if (bool_isDebug) {
		// 	console.log("LinkedFields");
		// 	console.log(linkedFields);
		// }

		const styleContainer = {
			borderBottom: "2px solid",
			borderTop: "2px solid",
			borderRight: "2px solid",
			color: "black",
			width: `${width}px`,
			height: `${height}px`,
		};

		const innerWidth = width - 2;
		const innerHeight = height - 4;
		const dropTargetStyle = {
			width: `${innerWidth}px`,
			height: `${innerHeight}px`,
		};
		const canvasContainerStyle = {
			width: "100%",
			height: "100%",
			position: "relative",
			overflow: "auto",
		};

		const scaledCanvasWidth = number_canvas_width * scalingFactor;
		const scaledCanvasHeight = number_canvas_height * scalingFactor;

		const canvasInnerContainerStyle = {
			width: `${scaledCanvasWidth}px`,
			height: `${scaledCanvasHeight}px`,
			position: "absolute",
			left: 0,
			top: 0,
		};
		const imageStyle = {
			width: "100%",
			height: "100%",
			margin: "auto",
		};
		const infoStyle = {
			position: "absolute",
			left: "10px",
			top: "10px",
		};
		const micInfo = [];
		if (microscope !== null && microscope !== undefined) {
			if (microscope.Name) {
				micInfo.push(`Name: ${microscope.Name}`);
				micInfo.push(<br key={"newline-1"} />);
			}
			if (
				microscope.Manufacturer !== null &&
				microscope.Manufacturer !== undefined
			) {
				micInfo.push(`Manufacturer: ${microscope.Manufacturer}`);
				micInfo.push(<br key={"newline-2"} />);
			}
			if (microscope.Model !== null && microscope.Model !== undefined) {
				micInfo.push(`Model: ${microscope.Model}`);
				micInfo.push(<br key={"newline-3"} />);
			}
		}

		const showcasedSpots = [];
		if (this.state.draggingID != null) {
			let elementDimensions = this.props.canvasElementsDimensions;
			let draggingID = this.state.draggingID;
			let markedSpots = elementDimensions[draggingID];

			let offsetX = this.state.offsetX;
			let offsetY = this.state.offsetY;
			let containerOffsetX = this.props.containerOffsetLeft;
			let containerOffsetY = this.props.containerOffsetTop;

			let xOff = offsetX - containerOffsetX;
			let yOff = offsetY - containerOffsetY;

			let defaultOffset = 12 /* * scalingFactor*/ + 6.67;

			//console.log("occupiedSpots");
			//console.log(occupiedSpots);
			if (markedSpots !== undefined && markedSpots !== null) {
				if (
					draggingID === "LightPath_ExcitationFilter" ||
					draggingID === "LightPath_EmissionFilter" ||
					draggingID === "LightPath_StandardDichroic"
				) {
					elementList.map((item, index) => {
						if (item.schema_ID === "FilterSet.json") {
							let tmpID = item.ID + "_" + draggingID;
							if (occupiedSpots.includes(tmpID)) return;
							let spot = markedSpots;
							let xOff = item.x + item.width / 2 + spot.x + containerOffsetX; // + xOff;
							let yOff =
								item.y +
								item.height / 2 +
								defaultOffset +
								spot.y +
								containerOffsetY;
							let x1 = xOff - (spot.w * scalingFactor) / 2;
							let y1 = yOff - (spot.h * scalingFactor) / 2;
							let spotStyleTmp = {
								position: "absolute",
								left: x1,
								top: y1,
								width: spot.w * scalingFactor,
								height: spot.h * scalingFactor,
							};
							if (this.state.showcasedSpot === spot) {
								spotStyleTmp.border = "10px ridge cornflowerBlue";
							} else {
								spotStyleTmp.border = "2px ridge cornflowerBlue";
							}

							const spotStyle = spotStyleTmp;
							showcasedSpots.push(<div key={tmpID} style={spotStyle} />);
						}
					});
				} else if (Array.isArray(markedSpots)) {
					for (let i = 0; i < markedSpots.length; i++) {
						let tmpID = draggingID + "_" + i;
						if (occupiedSpots.includes(tmpID)) continue;
						let spot = markedSpots[i];
						let xOff = spot.x * scalingFactor + containerOffsetX; // + xOff;
						let yOff = spot.y * scalingFactor + containerOffsetY; // + yOff;
						let x1 = xOff - (spot.w * scalingFactor) / 2;
						let y1 = yOff - (spot.h * scalingFactor) / 2;
						let spotStyleTmp = {
							position: "absolute",
							left: x1,
							top: y1,
							width: spot.w * scalingFactor,
							height: spot.h * scalingFactor,
						};
						if (this.state.showcasedSpot === spot) {
							spotStyleTmp.border = "10px ridge cornflowerBlue";
						} else {
							spotStyleTmp.border = "2px ridge cornflowerBlue";
						}

						const spotStyle = spotStyleTmp;
						showcasedSpots.push(<div key={tmpID} style={spotStyle} />);
					}
				} else {
					let tmpID = draggingID + "_" + 1;
					if (!occupiedSpots.includes(tmpID)) {
						let spot = markedSpots;
						let xOff = spot.x * scalingFactor + containerOffsetX; // + xOff;
						let yOff = spot.y * scalingFactor + containerOffsetY; // + yOff;
						let x1 = xOff - (spot.w * scalingFactor) / 2;
						let y1 = yOff - (spot.h * scalingFactor) / 2;
						let spotStyleTmp = {
							position: "absolute",
							left: x1,
							top: y1,
							width: spot.w * scalingFactor,
							height: spot.h * scalingFactor,
						};
						if (this.state.showcasedSpot === spot) {
							spotStyleTmp.border = "10px ridge cornflowerBlue";
						} else {
							spotStyleTmp.border = "2px ridge cornflowerBlue";
						}

						const spotStyle = spotStyleTmp;
						showcasedSpots.push(<div key={tmpID} style={spotStyle} />);
					}
				}
			}
		}

		return (
			<div style={styleContainer}>
				<DropTarget
					style={dropTargetStyle}
					onHit={this.dropped}
					onDragEnter={this.isDragging}
					onDragLeave={this.isNotDragging}
					targetKey={string_canvas}
				>
					<div style={canvasContainerStyle} onScroll={this.handleScroll}>
						<div style={canvasInnerContainerStyle}>
							<img
								src={
									backgroundImage +
									(backgroundImage.indexOf("githubusercontent.com") > -1
										? "?sanitize=true"
										: "")
								}
								alt={backgroundImage}
								style={imageStyle}
								//onLoad={this.onImgLoad}
							/>
						</div>
						<div style={infoStyle}>
							<p>{micInfo}</p>
						</div>
						{this.createList()}
						{showcasedSpots}
					</div>
				</DropTarget>
			</div>
		);
	}
}
