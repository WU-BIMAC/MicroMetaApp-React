import React from "react";
import { DropTarget } from "react-drag-drop-container";
import { DragDropContainer } from "react-drag-drop-container";

import CanvasElement from "./canvasElement";
import { CanvasElementDeleteButton } from "./canvasElement";

const validate = require("jsonschema").validate;
const uuidv4 = require("uuid/v4");

export default class Canvas extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			elementList: [],
			elementData: Object.assign({}, this.props.inputData),
			imagesDimension: {}
		};

		Object.keys(props.componentSchemas).forEach(schemaIndex => {
			let schema = props.componentSchemas[schemaIndex];
			let schema_id = schema.id;
			//Validate schemas using jsonschema????
			Object.keys(props.inputData).forEach(objIndex => {
				let object = props.inputData[objIndex];
				if (props.activeTier < object.tier) return;
				if (schema_id !== object.schema_id) return;
				let validation = validate(object, schema);
				let validated = validation.valid;

				let newElement = {
					id: schema.title + "_" + object.id,
					schema: schema,
					validated: validated,
					style: {
						position: "absolute",
						left: object.xPosition,
						top: object.yPosition,
						width: 50,
						height: 50
					}
				};
				this.state.elementList.push(newElement);
			});
		});

		this.dragged = this.dragged.bind(this);
		this.dropped = this.dropped.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onCanvasElementDataSave = this.onCanvasElementDataSave.bind(this);
		this.getElementData = this.getElementData.bind(this);
		this.updatedDimensions = this.updatedDimensions.bind(this);

		this.areAllElementsValidated = this.areAllElementsValidated.bind(this);

		this.props.updateElementData(this.state.elementList, true);
	}

	updatedDimensions(id, width, height, isResize) {
		let newImagesDimension = Object.assign({}, this.state.imagesDimension);
		if (newImagesDimension[id] !== undefined && !isResize) {
			if (
				newImagesDimension[id].width >= width ||
				newImagesDimension[id].height >= height
			)
				return;
		}
		newImagesDimension[id] = { width, height };
		this.setState({ imagesDimension: newImagesDimension });
		//this.imagesDimension = newImagesDimension;
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
			if (elementList[i].id === id) {
				elementList[i].validated = true;
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
		let x = e.x;
		let y = e.y;

		if (sourceElement.source === "toolbar") {
			let uuid = uuidv4();
			newElement = {
				id: sourceElement.schema.title + "_" + uuid,
				schema: sourceElement.schema,
				validated: false,
				dragged: false,
				style: {
					position: "absolute",
					top: y,
					left: x
				}
			};
			newElementList.push(newElement);

			let newElementData = {
				name: `New ${newElement.schema.title}`,
				id: uuid,
				tier: newElement.schema.tier,
				schema_id: newElement.schema.id,
				xPosition: x,
				yPosition: y
			};
			newElementDataList[newElement.id] = newElementData;
		} else {
			let item = this.state.elementList[sourceElement.index];
			let style = Object.assign({}, newElementList[sourceElement.index].style);
			x = x - 7.5;
			y = y - 7.5;
			style.top = y;
			style.left = x;
			newElementList[sourceElement.index].style = style;
			newElementList[sourceElement.index].dragged = false;
			newElementDataList[item.id].xPosition = x;
			newElementDataList[item.id].yPosition = y;
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

		let id = elementList[index].id;
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
			color: "inherit",
			backgroundColor: "transparent",
			cursor: "pointer"
		};
		const styleContainer = {
			display: "flex",
			justifyContent: "space-between",
			height: "20px"
		};
		let imagesDimension = this.state.imagesDimension;
		let stylesContainer = {};
		let stylesImages = {};
		elementList.map(item => {
			let style = item.style;
			let width =
				imagesDimension[item.id] === undefined
					? 100
					: imagesDimension[item.id].width;
			let height =
				imagesDimension[item.id] === undefined
					? 100
					: imagesDimension[item.id].height;
			stylesContainer[item.id] = Object.assign(
				{
					width: `${width}px`,
					height: `${height + 20}px`
				},
				style
			);
			stylesImages[item.id] = {
				width: width,
				height: height
			};
		});
		let droppableElement = [];
		elementList.map((item, index) =>
			droppableElement.push(
				<div style={stylesContainer[item.id]} key={"draggableWrapper" + index}>
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
							/>
						</div>
						<CanvasElement
							activeTier={this.props.activeTier}
							id={item.id}
							image={`${this.props.imagesPath}${item.schema.image}`}
							schema={item.schema}
							onConfirm={this.onCanvasElementDataSave}
							updateDimensions={this.updatedDimensions}
							overlaysContainer={this.props.overlaysContainer}
							inputData={elementData[item.id]}
							width={stylesImages[item.id].width}
							height={stylesImages[item.id].height}
							validated={item.validated}
							dragged={item.dragged}
						/>
					</DragDropContainer>
				</div>
			)
		);
		return droppableElement;
	}

	render() {
		//FIXME this should come from props later
		const styleContainer = {
			borderBottom: "2px solid",
			borderTop: "2px solid",
			borderRight: "2px solid",
			color: "black",
			width: "75%",
			backgroundImage: `url(${this.props.backgroundImage})`,
			backgroundRepeat: "no-repeat",
			backgroundPosition: "50%",
			backgroundSize: "contain"
		};
		const styleFullWindow = {
			width: "100%",
			height: "100%"
		};
		return (
			//TODO i could use the img container with absolute position and put stuff on top of it
			//<img src={imageFilePath} alt={imageFilePath} style={style.image} />
			//TODO this should be in a scrollable pane
			<div style={styleContainer}>
				<DropTarget
					style={styleFullWindow}
					onHit={this.dropped}
					targetKey="canvas"
				>
					<div style={styleFullWindow} />
					{this.createList()}
				</DropTarget>
			</div>
		);
	}
}
