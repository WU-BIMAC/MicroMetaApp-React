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
			imgHeight: null,
			imgWidth: null,
			backgroundScale: null,
			offsetY: 0,
			offsetX: 0,
			scale: null
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
				let validated = validation.valid;
				let newElement = {
					ID: schema.title + "_" + object.ID,
					schema_ID: schema_id,
					name: object.Name,
					validated: validated,
					dragged: false,
					obj: object,
					x: object.PositionX,
					y: object.PositionY,
					width: object.Width,
					height: object.Height
				};
				this.state.elementList.push(newElement);
			});
			this.state.componentsSchema[schema_id] = schema;
		});

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

	handleScroll(e) {
		console.log(e);
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

		if (!isResize) {
			if (element.width >= width && element.height >= height) {
				return;
			}
		}
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

	onCanvasElementDataSave(id, data) {
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
		this.setState({ elementData: currentElementData });

		let validated = this.areAllElementsValidated();
		this.props.updateElementData(currentElementData, validated);
	}

	getElementData() {
		return Object.assign({}, this.state.elementData);
	}

	dragged(e) {
		let newElementList = this.state.elementList.slice();
		newElementList[e.index].dragged = true;
		this.setState({
			elementList: newElementList
		});
	}

	dropped(e) {
		let sourceElement = e.dragData;
		let newElementList = this.state.elementList.slice();
		let newElementDataList = Object.assign({}, this.state.elementData);
		let newElement = null;
		let width = this.props.dimensions.width;
		let x = e.x;
		let y = e.y - 60;

		let offsetX = this.state.offsetX;
		let offsetY = this.state.offsetY;

		console.log("DROP: " + x + " - " + y);

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

		let componentsSchema = this.state.componentsSchema;

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
				width: 100,
				height: 100,
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
				Width: 100,
				Height: 100,
				OffsetX: offsetX,
				OffsetY: offsetY
			};
			newElement.name = newElementData.Name;
			Object.keys(schema.properties).forEach(key => {
				if (schema.properties[key].type === "array") {
					let currentNumber = currentNumberOf_identifier + key;
					let minNumber = minNumberOf_identifier + key;
					let maxNumber = maxNumberOf_identifier + key;
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
					let currentNumber = currentNumberOf_identifier + key;
					let minNumber = minNumberOf_identifier + key;
					let maxNumber = maxNumberOf_identifier + key;
					if (schema.required.indexOf(key) === -1) {
						newElementData[currentNumber] = 0;
						newElementData[minNumber] = 0;
						newElementData[maxNumber] = 1;
					}
				}
			});
			newElement.obj = newElementData;
			newElementDataList[newElement.ID] = newElementData;
		} else {
			let item = this.state.elementList[sourceElement.index];
			// newElementList[sourceElement.index].x = percentX;
			newElementList[sourceElement.index].x = x;
			// newElementList[sourceElement.index].y = percentY;
			newElementList[sourceElement.index].y = y;
			newElementList[sourceElement.index].dragged = false;
			//newElementDataList[item.ID].PositionX = percentX;
			newElementDataList[item.ID].PositionX = x;
			//newElementDataList[item.ID].PositionY = percentY;
			newElementDataList[item.ID].PositionY = y;
		}

		this.setState({
			elementList: newElementList,
			elementData: newElementDataList
		});

		let validated = this.areAllElementsValidated();
		this.props.updateElementData(newElementDataList, validated);
	}

	onDelete(index) {
		let elementList = this.state.elementList.slice();
		let elementData = Object.assign({}, this.state.elementData);

		if (elementList.length === 0) return;
		if (elementData.length === 0) return;

		let id = elementList[index].ID;
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
		let offsetX = this.state.offsetX;
		let offsetY = this.state.offsetY;

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
		//fontSizeAdjust: 0.58,
		// const styleName = {
		// 	textAlign: "center",
		// 	fontSize: "75%",
		// 	backgroundColor: "transparent"
		// };
		const styleContainer = {
			display: "flex",
			justifyContent: "space-between",
			height: "20px"
		};
		let stylesContainer = {};
		let stylesImages = {};
		elementList.map(item => {
			//let localOffsetX = -offsetX + item.offsetX;
			//let localOffsetY = -offsetY + item.offsetY;
			let x = item.x; //+ localOffsetX;
			let y = item.y; // + localOffsetY;
			//console.log("####");
			//console.log("new ioX: " + item.offsetX + " ioY: " + item.offsetY);
			//console.log("new loX: " + localOffsetX + " loY: " + localOffsetY);
			let style = {
				position: "absolute",
				//left: `${x}%`,
				left: x,
				//top: `${y}%`
				top: y
			};
			let containerWidth = item.width;
			let containerHeight = item.height;

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

		elementList.map((item, index) => {
			let schema_id = item.schema_ID;
			let schema = componentsSchema[schema_id];
			droppableElement.push(
				<div style={stylesContainer[item.ID]} key={"draggableWrapper" + index}>
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
						/>
						<div
							className="styleName"
							style={{ width: stylesImages[item.ID].width }}
						>
							{item.name}
						</div>
					</DragDropContainer>
				</div>
			);
		});
		return droppableElement;
	}

	render() {
		let width = this.props.dimensions.width;
		let height = this.props.dimensions.height;
		const styleContainer = {
			borderBottom: "2px solid",
			borderTop: "2px solid",
			borderRight: "2px solid",
			color: "black",
			width: `${width}px`,
			height: `${height}px`
			// backgroundImage: `url(${this.props.backgroundImage})`,
			// backgroundRepeat: "no-repeat",
			// backgroundPosition: "50%",
			// backgroundSize: "contain"
			//overflow: "auto"
		};
		let innerWidth = width - 2;
		let innerHeight = height - 4;
		const dropTargetStyle = {
			width: `${innerWidth}px`,
			height: `${innerHeight}px`
		};
		let canvasInnerContainerStyle = {
			width: `${innerWidth}px`,
			height: `${innerHeight}px`,
			position: "relative",
			overflow: "auto"
		};
		let imageStyle = null;
		// imageStyle = {
		// 	width: width * 2,
		// 	height: height * 2
		// };
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
					<div style={canvasInnerContainerStyle} onScroll={this.handleScroll}>
						<img
							src={this.props.backgroundImage}
							alt={this.props.backgroundImage}
							//style={imageStyle}
							onLoad={this.onImgLoad}
						/>
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
