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
			imagesDimension: {},
			width: null,
			height: null,
			mounted: false
			//prevParentDims: null,
			//parentDims: null
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

		this.ref = React.createRef();
	}

	componentDidMount() {
		console.log("componentDidMount");
		if (this.ref.current.clientWidth !== this.state.width) {
			let newWidth = this.ref.current.clientWidth;
			this.setState({ width: newWidth });
		}
		if (this.ref.current.clientHeight !== this.state.height) {
			let newHeight = this.ref.current.clientHeight;
			this.setState({ height: newHeight });
		}
		this.setState({ mounted: true });
	}

	componentWillUnmount() {
		console.log("componentWillUnmount");
		this.setState({ mounted: false });
	}

	static getDerivedStateFromProps(props, state) {
		console.log("getDerivedStateFromProps");
		if (!state.mounted || !this || !this.ref || !this.ref.current) return null;
		if (this.ref.current.clientWidth !== state.width) {
			let newWidth = this.ref.current.clientWidth;
			return { width: newWidth };
		}
		if (this.ref.current.clientHeight !== state.height) {
			let newHeight = this.ref.current.clientHeight;
			return { height: newHeight };
		}
		return null;
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
		let y = e.y - 60;
		if (sourceElement.source !== "toolbar") {
			x -= 7;
			y -= 7;
		}
		let width = this.state.width;
		let height = this.state.height;
		let percentX = (100 * x) / width;
		let percentY = (100 * y) / height;

		if (sourceElement.source === "toolbar") {
			let uuid = uuidv4();
			newElement = {
				id: sourceElement.schema.title + "_" + uuid,
				schema: sourceElement.schema,
				validated: false,
				dragged: false,
				style: {
					position: "absolute",
					left: `${percentX}%`,
					top: `${percentY}%`
				}
			};
			newElementList.push(newElement);

			let newElementData = {
				name: `New ${newElement.schema.title}`,
				id: uuid,
				tier: newElement.schema.tier,
				schema_id: newElement.schema.id,
				xPosition: `${percentX}%`,
				yPosition: `${percentY}%`
			};
			newElementDataList[newElement.id] = newElementData;
		} else {
			let item = this.state.elementList[sourceElement.index];
			let style = Object.assign({}, newElementList[sourceElement.index].style);
			style.left = `${percentX}%`;
			style.top = `${percentY}%`;

			newElementList[sourceElement.index].style = style;
			newElementList[sourceElement.index].dragged = false;
			newElementDataList[item.id].xPosition = `${percentX}%`;
			newElementDataList[item.id].yPosition = `${percentY}%`;
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
		let oldDims = this.state.prevParentDims;
		let newDims = this.state.parentDims;
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
		let width = this.state.width;
		let height = this.state.height;
		console.log("W: " + width + " H: " + height);
		const styleFullWindow = {
			width: `${width}px`,
			height: `${height}px`,
			position: "relative"
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
					<div ref={this.ref} style={styleFullWindow}>
						{this.createList()}
					</div>
				</DropTarget>
			</div>
		);
	}
}
