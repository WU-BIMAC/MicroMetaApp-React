import React from "react";
import { CanvasElement, CanvasElementDeleteButton } from "./canvasElement";
import { DropTarget, DragDropContainer } from "react-drag-drop-container";

export class Canvas extends React.PureComponent {
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
	}

	onCanvasElementDataSave(id, data) {
		let currentElementData = Object.assign({}, this.state.elementData);
		currentElementData[id] = data;
		this.setState({ elementData: currentElementData });
	}

	landedOn(e) {}

	dropped(e) {
		let sourceElement = e.dragData;
		let newElementList = this.state.elementList.slice(0);
		if (sourceElement.source === "toolbar") {
			let newElement = {
				id: sourceElement.id + "_" + newElementList.length,
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
		} else {
			let item = this.state.elementList[sourceElement.index];
			let newElement = {
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
		}
		this.setState({
			elementList: newElementList
		});
	}

	onDelete(index) {
		let elementList = this.state.elementList.slice();
		let elementData = Object.assign({}, this.state.elementData);

		console.log(elementList.length);
		if (elementList.length === 0) return;
		console.log(elementData.length);
		if (elementData.length === 0) return;

		console.log("elementListBeforeDelete");
		console.log(elementList);
		let newElementList = elementList.slice();
		newElementList.splice(index, 1);
		console.log("elementListAfterDelete");
		console.log(newElementList);

		let id = elementList[index].id;

		console.log("elementDataBeforeDelete");
		console.log(elementData);
		let newElementData = Object.assign({}, elementData);
		if (elementData[id] !== undefined) {
			let indexOf = elementData.indexOf(id);
			newElementData.splice(indexOf, 1);
		}
		console.log("elementDataAfterDelete");
		console.log(newElementData);

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
		let droppableElement = elementList.map((item, index) => (
			<div style={item.style} key={"draggableWrapper" + index}>
				<DragDropContainer
					targetKey="dragdrop"
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
		));
		return droppableElement;
	}

	render() {
		//FIXME this should come from props later
		const imageFilePath = `${
			this.props.imagesPath
		}Microscope_with_Knobs_BackPort_Fluorescence_Beam.png`;
		const style = {
			container: {
				borderBottom: "2px solid",
				borderTop: "2px solid",
				borderRight: "2px solid",
				color: "black",
				WebkitBoxOrdinalGroup: "1", // OLD - iOS 6-, Safari 3.1-6
				MozBoxOrdinalGroup: "1", // OLD - Firefox 19-
				msFlexOrder: "1", // TWEENER - IE 10
				WebkitOrder: "1", // NEW - Chrome
				order: "1",
				width: "75%",
				MozBoxFlex: "1",
				backgroundImage: `url(${imageFilePath})`,
				backgroundRepeat: "no-repeat",
				backgroundPosition: "50%",
				backgroundSize: "contain"
			},
			droptarget: {
				width: "100%",
				height: "100%"
			}
		};
		return (
			//TODO i could use the img container with absolute position and put stuff on top of it
			//<img src={imageFilePath} alt={imageFilePath} style={style.image} />
			//TODO this should be in a scrollable pane
			<div style={style.container}>
				<DropTarget
					style={style.droptarget}
					onHit={this.dropped}
					targetKey={"dragdrop"}
				>
					<div style={style.droptarget} />
					{this.createList()}
				</DropTarget>
			</div>
		);
	}
}
