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
			componentsSchema: {},
			imagesDimension: {},
			imgHeight: null,
			imgWidth: null,
			backgroundScale: null,
			offsetY: 0,
			offsetX: 0,
			scale: null
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

		this.props.updateElementData(this.state.elementList, true);
	}

	static getDerivedStateFromProps(props, state) {
		if (props.dimensions !== null) {
			let height = props.dimensions.height - 4;
			let width = props.dimensions.width - 2;
			let imgHeight = state.imgHeight;
			let imgWidth = state.imgWidth;
			if (imgHeight === null || imgWidth === null) return null;
			//console.log("####");
			//console.log("h: " + height + " w: " + width);
			//console.log("ih: " + imgHeight + " iw: " + imgWidth);
			let yOrientation = true;
			if (height > width) {
				yOrientation = false;
			}
			let yOrientationImg = true;
			if (imgHeight > imgWidth) {
				yOrientationImg = false;
			}
			if (
				(yOrientation && yOrientationImg) ||
				(!yOrientation && !yOrientationImg)
			) {
				//console.log("case 1");
				let backgroundScale = (height * 100) / (imgHeight * 100);
				let currentWidth = backgroundScale * imgWidth;
				let offsetX = (width - currentWidth) / 2;
				// console.log(
				// 	"scale: " + backgroundScale + " Off: " + offsetX + " w: " + width
				// );
				let offsetXPercent = (offsetX * 100) / width;
				if (offsetXPercent !== state.offsetX)
					return { offsetX: offsetXPercent, backgroundScale: backgroundScale };
			} else {
				//console.log("case 2");
				let backgroundScale = (width * 100) / (imgWidth * 100);
				let currentHeight = backgroundScale * imgHeight;
				let offsetY = (height - currentHeight) / 2;
				// console.log(
				// 	"scale: " + backgroundScale + " Off: " + offsetY + " h: " + height
				// );
				let offsetYPercent = (offsetY * 100) / height;
				if (offsetYPercent != state.offsetY)
					return { offsetY: offsetYPercent, backgroundScale: backgroundScale };
			}
		}
		let scale = 1;
		if (
			(state.scale === null && state.backgroundScale !== null) ||
			(state.scale !== null &&
				state.backgroundScale !== null &&
				state.scale !== state.backgroundScale)
		) {
			scale = state.backgroundScale;
		}
		if (props.scale !== null) {
			scale *= props.scale;
		}
		if (scale !== state.scale) return { scale: scale };

		if (props.componentsSchema !== null) {
			let componentsSchema = {};
			Object.keys(props.componentSchemas).forEach(schemaIndex => {
				let schema = props.componentSchemas[schemaIndex];
				let schema_id = schema.id;
				componentsSchema[schema_id] = schema;
			});
			return {
				componentsSchema: componentsSchema
			};
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
		let width = this.props.dimensions.width;
		let height = this.props.dimensions.height;
		let percentX = (100 * x) / width - this.state.offsetX;
		let percentY = (100 * y) / height - this.state.offsetY;

		let componentsSchema = this.state.componentsSchema;

		if (sourceElement.source === "toolbar") {
			let uuid = uuidv4();
			let schema_id = sourceElement.schema_id;
			let schema = componentsSchema[schema_id];
			newElement = {
				//Schema is old version needs to be updated constantly
				//AKA needs to put schemas in canvas and retrieve them
				//on the fly
				id: schema.title + "_" + uuid,
				schema_id: schema.id,
				validated: false,
				dragged: false,
				x: percentX,
				y: percentY
			};
			newElementList.push(newElement);

			let newElementData = {
				name: `New ${schema.title}`,
				id: uuid,
				tier: schema.tier,
				schema_id: schema.id,
				xPosition: percentX,
				yPosition: percentX
			};
			newElementDataList[newElement.id] = newElementData;
		} else {
			let item = this.state.elementList[sourceElement.index];
			newElementList[sourceElement.index].x = percentX;
			newElementList[sourceElement.index].y = percentY;
			newElementList[sourceElement.index].dragged = false;
			newElementDataList[item.id].xPosition = percentX;
			newElementDataList[item.id].yPosition = percentY;
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
			//console.log("####");
			//console.log("old x: " + item.x + " y: " + item.y);
			let x = item.x + offsetX;
			let y = item.y + offsetY;
			//console.log("new x: " + x + " y: " + y);
			let style = {
				position: "absolute",
				left: `${x}%`,
				top: `${y}%`
			};
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
		let componentsSchema = this.state.componentsSchema;

		elementList.map((item, index) => {
			let schema_id = item.schema_id;
			let schema = componentsSchema[schema_id];
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
							image={`${this.props.imagesPath}${schema.image}`}
							schema={schema}
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
			display: "flex",
			flexDirection: "row",
			flexWrap: "wrap",
			justifyContent: "center",
			alignItems: "middle",
			overflow: "auto"
		};
		let imageStyle = null;
		imageStyle = {
			width: "auto",
			height: "100%"
		};
		// if (height > width) {
		// 	imageStyle = {
		// 		width: "100%",
		// 		height: "auto"
		// 	};
		// } else {
		// 	imageStyle = {
		// 		width: "auto",
		// 		height: "100%"
		// 	};
		// }
		// let image = `url(${this.props.backgroundImage})`;
		// console.log(image);
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
					<div style={canvasInnerContainerStyle}>
						<img
							src={this.props.backgroundImage}
							alt={this.props.backgroundImage}
							style={imageStyle}
							onLoad={this.onImgLoad}
						/>
						{this.createList()}
					</div>
				</DropTarget>
			</div>
		);
	}
}
