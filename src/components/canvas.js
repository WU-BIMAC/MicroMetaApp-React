import React from "react";
import { DropTarget } from "react-drag-drop-container";
import { DragDropContainer } from "react-drag-drop-container";

import CanvasElement from "./canvasElement";
import { CanvasElementDeleteButton } from "./canvasElement";

const uuidv4 = require("uuid/v4");

export default class Canvas extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			elementList: [],
			elementData: {}
		};
		this.landedOn = this.landedOn.bind(this);
		this.dropped = this.dropped.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onCanvasElementDataSave = this.onCanvasElementDataSave.bind(this);
		this.getElementData = this.getElementData.bind(this);
	}

	onCanvasElementDataSave(id, data) {
		let currentElementData = Object.assign({}, this.state.elementData);
		currentElementData[id] = data;
		this.setState({ elementData: currentElementData });
		this.props.updateElementData(currentElementData);
	}

	getElementData() {
		return Object.assign({}, this.state.elementData);
	}

	landedOn(e) {}

	dropped(e) {
		let sourceElement = e.dragData;
		let newElementList = this.state.elementList.slice();
		let newElementDataList = Object.assign({}, this.state.elementData);
		let newElement = null;

		if (sourceElement.source === "toolbar") {
			let uuid = uuidv4();
			newElement = {
				id: sourceElement.schema.title + "_" + uuid,
				schema: sourceElement.schema,
				style: {
					position: "absolute",
					top: e.y,
					left: e.x,
					width: 50,
					height: 50
				}
			};
			newElementList.push(newElement);

			let newElementData = {
				name: `New ${newElement.schema.title}`,
				id: uuid,
				tier: newElement.schema.tier,
				xPosition: e.x,
				yPosition: e.y
			};
			newElementDataList[newElement.id] = newElementData;
		} else {
			let item = this.state.elementList[sourceElement.index];
			newElement = {
				id: item.id,
				schema: item.schema,
				style: {
					position: "absolute",
					top: e.y,
					left: e.x,
					width: 50,
					height: 50
				}
			};
			newElementList[sourceElement.index] = newElement;
			newElementDataList[newElement.id].xPosition = e.x;
			newElementDataList[newElement.id].yPosition = e.y;
		}

		this.setState({
			elementList: newElementList,
			elementData: newElementDataList
		});

		this.props.updateElementData(newElementDataList);
	}

	onDelete(index) {
		let elementList = this.state.elementList.slice();
		let elementData = Object.assign({}, this.state.elementData);

		if (elementList.length === 0) return;
		if (elementData.length === 0) return;

		let id = elementList[index].id;

		let newElementList = elementList.slice();
		newElementList.splice(index, 1);

		let newElementData = Object.assign({}, elementData);
		if (elementData[id] !== undefined) {
			let indexOf = elementData.indexOf(id);
			newElementData.splice(indexOf, 1);
			this.props.updateElementData(newElementData);
		}

		this.setState({
			elementList: newElementList,
			elementData: newElementData
		});
	}

	createList() {
		let elementList = this.state.elementList;
		let elementData = this.state.elementData;
		const styleGrabber = {
			fontSize: "14px",
			fontWeight: "bold"
		};
		const styleCloser = {
			padding: "0",
			border: "none",
			font: "14px",
			color: "inherit",
			backgroundColor: "transparent",
			cursor: "pointer"
		};
		const styleContainer = {
			display: "flex",
			justifyContent: "space-between"
		};
		let droppableElement = [];
		elementList.map((item, index) =>
			droppableElement.push(
				<div style={item.style} key={"draggableWrapper" + index}>
					<DragDropContainer
						targetKey="canvas"
						key={"draggable" + index}
						dragClone={false}
						dragData={{ source: "canvas", index: index }}
						onDrop={this.landedOn}
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
							id={item.id}
							image={`${this.props.imagesPath}${item.schema.image}`}
							schema={item.schema}
							onConfirm={this.onCanvasElementDataSave}
							overlaysContainer={this.props.overlaysContainer}
							inputData={elementData[item.id]}
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
