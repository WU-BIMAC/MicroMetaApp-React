import React from "react";
import { DropTarget } from "react-drag-drop-container";
import { DragDropContainer } from "react-drag-drop-container";

import CanvasElement from "./canvasElement";
import { CanvasElementDeleteButton } from "./canvasElement";
import { pathToFileURL } from "url";

const path = require("path");
const validate = require("jsonschema").validate;
const uuidv4 = require("uuid/v4");

const currentNumberOf_identifier = "Number_Of_";
const minNumberOf_identifier = "Min_Number_Of_";
const maxNumberOf_identifier = "Max_Number_Of_";

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
			scale: null,
			isEditing: false
		};

		Object.keys(props.componentSchemas).forEach(schemaIndex => {
			let schema = props.componentSchemas[schemaIndex];
			let schema_id = schema.ID;
			//Validate schemas using jsonschema????
			Object.keys(props.inputData).forEach(objIndex => {
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
					height: object.Height
				};
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
		this.onDelete = this.onDelete.bind(this);
		this.onCanvasElementDataSave = this.onCanvasElementDataSave.bind(this);
		this.getElementData = this.getElementData.bind(this);
		this.updatedDimensions = this.updatedDimensions.bind(this);

		this.areAllElementsValidated = this.areAllElementsValidated.bind(this);

		this.onImgLoad = this.onImgLoad.bind(this);

		this.handleScroll = this.handleScroll.bind(this);

		this.props.updateElementData(this.state.elementData, true);
	}

	static getDerivedStateFromProps(props, state) {
		if (props.componentsSchema !== null) {
			let componentsSchema = {};
			Object.keys(props.componentSchemas).forEach(schemaIndex => {
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
				componentsSchema: componentsSchema
			};
		}

		return null;
	}

	setEditingOnCanvas(isEditing) {
		this.setState({ isEditing: isEditing });
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
		this.state.elementList.forEach(item => {
			if (item.ID === id) element = item;
		});

		let newElementDataList = Object.assign({}, this.state.elementData);
		let obj = newElementDataList[id];

		if (element === null || obj === undefined) return;

		//console.log("updated element in canvas " + isResize);

		if (element.width !== -1 && element.height !== -1 && !isResize) {
			return;
		}

		// if (!isResize) {
		// 	if (element.width >= width && element.height >= height) {
		// 		return;
		// 	}
		// }

		//console.log("new dimensions " + width + " x " + height);

		element.width = width;
		element.height = height;
		obj.Width = width;
		obj.Height = height;

		let validated = this.areAllElementsValidated();
		this.props.updateElementData(newElementDataList, validated);
	}

	onImgLoad({ target: img }) {
		let oldHeight = this.state.imgHeight;
		let oldWidth = this.state.imgWidth;
		if (oldWidth !== null && oldHeight !== null) return;
		let newHeight = img.height;
		let newWidth = img.width;
		this.setState({
			imgHeight: newHeight,
			imgWidth: newWidth
		});
	}

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
			//console.log(dataLinkedFields);
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
			linkedFields: linkedFields
		});

		let validated = this.areAllElementsValidated();
		this.props.updateElementData(currentElementData, validated);
		this.props.updateLinkedFields(linkedFields);
	}

	getElementData() {
		return Object.assign({}, this.state.elementData);
	}

	dragged(e) {
		let newElementList = this.state.elementList.slice();
		newElementList[e.index].dragged = true;
		let draggedItem = newElementList[e.index];

		let newZ = 0;
		//this rectangle
		let ID = draggedItem.ID;
		let x = draggedItem.x;
		let y = draggedItem.y;
		let l1_x = x;
		let l1_y = y;
		let r1_x = x + draggedItem.width;
		let r1_y = y + draggedItem.height;

		let oldZ = draggedItem.z;

		for (let k = 0; k < this.state.elementList.length; k++) {
			//rectangles to test against
			let item = this.state.elementList[k];
			if (ID === item.ID) continue;
			let l2_x = item.x;
			let l2_y = item.y;
			let r2_x = l2_x + item.width;
			let r2_y = l2_y + item.height;

			//console.log("L1 " + l1_x + "-" + l1_y + " R1 " + r1_x + "-" + r1_y);
			//console.log("L2 " + l2_x + "-" + l2_y + " R2 " + r2_x + "-" + r2_y);

			if (l1_x > r2_x || r1_x < l2_x) {
				//console.log("Rect1 is right or left of Rect2");
				continue;
			}
			if (l1_y > r2_y || r1_y < l2_y) {
				//console.log("Rect1 is below or above of Rect2");
				continue;
			}

			if (item.z > oldZ) {
				item.z = item.z - 1;
			}
			// console.log(
			// 	"DRAGGING ID: " + ID + " COMP ID : " + item.ID + " newZ " + item.z
			// );
		}

		this.setState({
			elementList: newElementList
		});
	}

	dropped(e) {
		let sourceElement = e.dragData;
		let newElementList = this.state.elementList.slice();
		let newElementDataList = Object.assign({}, this.state.elementData);
		let newElement = null;
		let x = e.x;
		let y = e.y - 60;

		let offsetX = this.state.offsetX;
		let offsetY = this.state.offsetY;

		//console.log("SCROLL OFFSETS " + offsetX + "-" + offsetY);

		x += offsetX;
		y += offsetY;

		// if (e.y - 60 < 0) y = 60;
		// else y = e.y - 60;
		// if (x < 0) x = 0;
		// else if (x > width) x = width;
		if (sourceElement.source !== "toolbar") {
			x -= 7;
			y -= 7;
		}

		let width = 100;
		let height = 100;

		let componentsSchema = this.state.componentsSchema;

		let index = null;
		let ID = null;

		if (sourceElement.source === "toolbar") {
			let uuid = uuidv4();
			let schema_ID = sourceElement.schema_ID;
			let schema = componentsSchema[schema_ID];
			newElement = {
				//Schema is old version needs to be updated constantly
				//AKA needs to put schemas in canvas and retrieve them
				//on the fly
				ID: schema.title + "_" + uuid,
				schema_ID: schema.ID,
				validated: false,
				dragged: false,
				//x: percentX,
				x: x,
				//y: percentY,
				y: y,
				z: 0,
				width: -1,
				height: -1,
				offsetX: offsetX,
				offsetY: offsetY
			};
			newElementList.push(newElement);
			let newElementData = {
				Name: `New ${schema.title}`,
				ID: uuid,
				Tier: schema.tier,
				Schema_ID: schema.ID,
				Version: schema.version,
				//PositionX: percentX,
				PositionX: x,
				//PositionY: percentY,
				PositionY: y,
				PositionZ: 0,
				Width: -1,
				Height: -1,
				OffsetX: offsetX,
				OffsetY: offsetY
			};
			newElement.name = newElementData.Name;
			this.addComponentsIndexesIfMissing(schema, newElementData);
			newElement.obj = newElementData;
			newElementDataList[newElement.ID] = newElementData;
			index = newElementList.length - 1;
			ID = newElement.ID;
		} else {
			let item = this.state.elementList[sourceElement.index];
			let schema_ID = newElementList[sourceElement.index].schema_ID;
			let schema = componentsSchema[schema_ID];

			// newElementList[sourceElement.index].x = percentX;
			newElementList[sourceElement.index].x = x;
			// newElementList[sourceElement.index].y = percentY;
			newElementList[sourceElement.index].y = y;
			newElementList[sourceElement.index].dragged = false;
			newElementList[sourceElement.index].offsetX = offsetX;
			newElementList[sourceElement.index].offsetY = offsetY;
			//newElementDataList[item.ID].PositionX = percentX;
			newElementDataList[item.ID].PositionX = x;
			//newElementDataList[item.ID].PositionY = percentY;
			newElementDataList[item.ID].PositionY = y;
			newElementDataList[item.ID].OffsetX = offsetX;
			newElementDataList[item.ID].OffsetY = offsetY;

			this.addComponentsIndexesIfMissing(schema, newElementDataList[item.ID]);

			width = item.width;
			height = item.height;
			index = sourceElement.index;
			ID = item.ID;
		}

		let newZ = 0;
		//this rectangle
		let l1_x = x;
		let l1_y = y;
		let r1_x = x + width;
		let r1_y = y + height;

		for (let k = 0; k < this.state.elementList.length; k++) {
			//rectangles to test against
			let item = this.state.elementList[k];
			if (ID === item.ID) continue;
			let l2_x = item.x;
			let l2_y = item.y;
			let r2_x = l2_x + item.width;
			let r2_y = l2_y + item.height;

			//console.log("L1 " + l1_x + "-" + l1_y + " R1 " + r1_x + "-" + r1_y);
			//console.log("L2 " + l2_x + "-" + l2_y + " R2 " + r2_x + "-" + r2_y);

			if (l1_x > r2_x || r1_x < l2_x) {
				//console.log("Rect1 is right or left of Rect2");
				continue;
			}
			if (l1_y > r2_y || r1_y < l2_y) {
				//console.log("Rect1 is below or above of Rect2");
				continue;
			}

			if (item.z + 1 > newZ) newZ = item.z + 1;
		}

		//console.log("NEW Z : " + newZ);

		newElementList[index].z = newZ;
		newElementDataList[ID].PositionZ = newZ;

		this.setState({
			elementList: newElementList,
			elementData: newElementDataList
		});

		let validated = this.areAllElementsValidated();
		this.props.updateElementData(newElementDataList, validated);
	}

	addComponentsIndexesIfMissing(schema, newElementData) {
		Object.keys(schema.properties).forEach(key => {
			let currentNumber = currentNumberOf_identifier + key;
			let minNumber = minNumberOf_identifier + key;
			let maxNumber = maxNumberOf_identifier + key;
			if (newElementData[currentNumber] !== undefined) {
				return;
			}
			if (schema.properties[key].type === "array") {
				if (schema.required.indexOf(key) != -1) {
					newElementData[currentNumber] = 1;
					newElementData[minNumber] = 1;
					newElementData[maxNumber] = -1;
				} else {
					newElementData[currentNumber] = 0;
					newElementData[minNumber] = 0;
					newElementData[maxNumber] = -1;
				}
			} else if (schema.properties[key].type === "object") {
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

		let deletedSchema = schemaID.replace(".json", "");
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
					//console.log("should modify: " + key + " field: " + field);
					if (elementData[key] !== undefined) {
						elementData[key][field] = "Not assigned";
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
			elementData: elementData
		});

		let validated = this.areAllElementsValidated();
		this.props.updateElementData(elementData, validated);
	}

	createList() {
		let elementList = this.state.elementList;
		let elementData = this.state.elementData;

		let highestZ = 0;
		for (let k = 0; k < this.state.elementList.length; k++) {
			let item = elementList[k];
			let z = item.z;
			if (z > highestZ) highestZ = z;
		}
		//console.log("HighestZ: " + highestZ);

		const styleGrabber = {
			paddingLeft: "8px",
			fontSize: "14px",
			fontWeight: "bold"
		};
		const styleCloser = {
			paddingRight: "8px",
			border: "none",
			font: "14px",
			fontWeight: "bold",
			backgroundColor: "transparent",
			cursor: "pointer"
		};
		const styleContainer = {
			display: "flex",
			justifyContent: "space-between",
			height: "20px"
		};
		let stylesContainer = {};
		let stylesImages = {};
		elementList.map(item => {
			let x = item.x;
			let y = item.y;
			let style = {
				position: "absolute",
				left: x,
				top: y
			};
			let containerWidth = item.width;
			let containerHeight = item.height;

			if (containerWidth == -1) containerWidth = 100;
			if (containerHeight == -1) containerHeight = 100;

			if (!item.validated) {
				containerWidth += 10;
				containerHeight += 10;
			}
			stylesContainer[item.ID] = Object.assign(
				{
					width: `${containerWidth}px`,
					height: `${containerHeight + 30}px`
				},
				style
			);
			stylesImages[item.ID] = {
				width: item.width,
				height: item.height
			};
		});
		let droppableElement = [];
		let componentsSchema = this.state.componentsSchema;
		let elementByType = {};
		Object.keys(elementData).forEach(function(key) {
			let element = elementData[key];
			let schemaID = element.Schema_ID.replace(".json", "");
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
				droppableElement.push(
					<div
						style={stylesContainer[item.ID]}
						key={"draggableWrapper" + index}
					>
						<DragDropContainer
							targetKey="canvas"
							key={"draggable" + index}
							dragClone={false}
							dragData={{ source: "canvas", index: index }}
							onDragStart={this.dragged}
							dragHandleClassName="grabber"
						>
							<div style={styleContainer}>
								<div className="grabber" style={styleGrabber}>
									&#8759;
								</div>
								<CanvasElementDeleteButton
									index={index}
									onDelete={this.onDelete}
									myStyle={styleCloser}
									isViewOnly={this.props.isViewOnly}
								/>
							</div>
							<CanvasElement
								activeTier={this.props.activeTier}
								id={item.ID}
								//image={`${this.props.imagesPath}${schema.image}`}
								image={path.join(this.props.imagesPath, schema.image)}
								schema={schema}
								onConfirm={this.onCanvasElementDataSave}
								updateDimensions={this.updatedDimensions}
								overlaysContainer={this.props.overlaysContainer}
								inputData={elementData[item.ID]}
								width={stylesImages[item.ID].width}
								height={stylesImages[item.ID].height}
								validated={item.validated}
								dragged={item.dragged}
								currentChildrenComponentIdentifier={currentNumberOf_identifier}
								minChildrenComponentIdentifier={minNumberOf_identifier}
								maxChildrenComponentIdentifier={maxNumberOf_identifier}
								elementByType={elementByType}
								isViewOnly={this.props.isViewOnly}
								setEditingOnCanvas={this.setEditingOnCanvas}
							/>
							<div
								className="styleName"
								style={{
									width: stylesImages[item.ID].width,
									textAlign: "center",
									fontSize: "75%",
									paddingLeft: "10px",
									overflow: "hidden"
								}}
							>
								{item.name}
							</div>
						</DragDropContainer>
					</div>
				);
			});
		}
		return droppableElement;
	}

	render() {
		console.log("LinkedFields");
		console.log(this.state.linkedFields);

		let width = this.props.dimensions.width;
		let height = this.props.dimensions.height;
		const styleContainer = {
			borderBottom: "2px solid",
			borderTop: "2px solid",
			borderRight: "2px solid",
			color: "black",
			width: `${width}px`,
			height: `${height}px`
		};
		let innerWidth = width - 2;
		let innerHeight = height - 4;
		const dropTargetStyle = {
			width: `${innerWidth}px`,
			height: `${innerHeight}px`
		};
		let canvasContainerStyle = {
			width: "100%",
			height: "100%",
			position: "relative",
			overflow: "auto"
		};
		let canvasInnerContainerStyle = {
			width: "2377px",
			height: "969px",
			position: "absolute",
			left: 0,
			top: 0
		};
		let imageStyle = null;
		imageStyle = {
			width: "100%",
			height: "100%",
			margin: "auto"
		};
		let infoStyle = {
			position: "absolute",
			left: 0,
			top: 0
		};
		let micInfo = [];
		if (this.props.microscope !== null && this.props.microscope !== undefined) {
			if (this.props.microscope.Name) {
				micInfo.push(`Name: ${this.props.microscope.Name}`);
				micInfo.push(<br key={"newline-1"} />);
			}
			if (
				this.props.microscope.Manufacturer !== null &&
				this.props.microscope.Manufacturer !== undefined
			) {
				micInfo.push(`Manufacturer: ${this.props.microscope.Manufacturer}`);
				micInfo.push(<br key={"newline-2"} />);
			}
			if (
				this.props.microscope.Model !== null &&
				this.props.microscope.Model !== undefined
			) {
				micInfo.push(`Model: ${this.props.microscope.Model}`);
				micInfo.push(<br key={"newline-3"} />);
			}
		}

		return (
			//TODO i could use the img container with absolute position and put stuff on top of it
			//<img src={imageFilePath} alt={imageFilePath} style={style.image} />
			//TODO this should be in a scrollable pane
			//<div ref={this.ref} style={styleFullWindow}>
			<div style={styleContainer}>
				<DropTarget
					style={dropTargetStyle}
					onHit={this.dropped}
					targetKey="canvas"
				>
					<div style={canvasContainerStyle} onScroll={this.handleScroll}>
						<div style={canvasInnerContainerStyle}>
							<img
								src={this.props.backgroundImage + (this.props.backgroundImage.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "")}
								alt={this.props.backgroundImage}
								style={imageStyle}
								onLoad={this.onImgLoad}
							/>
						</div>
						<div style={infoStyle}>
							<p>{micInfo}</p>
						</div>
						{this.createList()}
					</div>
				</DropTarget>
			</div>
		);
	}
}
