import React from "react";
import { CanvasElement } from "./canvasElement";
import { DropTarget, DragDropContainer } from "react-drag-drop-container";

const imagesPath = process.env.PUBLIC_URL + "/assets/";

export class Canvas extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			elementList: []
		};
		this.landedOn = this.landedOn.bind(this);
		this.dropped = this.dropped.bind(this);
	}

	landedOn(e) {
		// eslint-disable-next-line no-console
		// console.log(e);
	}

	dropped(e) {
		let sourceElement = e.dragData;
		let newElementList = this.state.elementList.slice(0);
		if (sourceElement.source === "toolbar") {
			let newElement = {
				text:
					sourceElement.text +
					"_" +
					sourceElement.id +
					"_" +
					newElementList.length,
				id: sourceElement.id + "_" + newElementList.length,
				style: {
					position: "absolute",
					top: e.y,
					left: e.x,
					width: "50",
					height: "50"
				}
			};
			newElementList.push(newElement);
		} else {
			let item = this.state.elementList[sourceElement.index];
			let newElement = {
				text: item.text,
				id: item.id,
				style: {
					position: "absolute",
					top: e.y,
					left: e.x,
					width: "50",
					height: "50"
				}
			};
			newElementList[sourceElement.index] = newElement;
			// eslint-disable-next-line no-console
			console.log(item.style);
		}
		this.setState({
			elementList: newElementList
		});
	}

	createList() {
		let elementList = this.state.elementList;
		// eslint-disable-next-line no-console
		console.log("render");
		// eslint-disable-next-line no-console
		console.log(elementList);
		const style = {
			fontSize: "14px",
			fontWeight: "bold",
			paddingRight: "6px"
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
					{// eslint-disable-next-line no-console
						console.log(item)}
					<span className="grabber" style={style}>
						&#8759;
					</span>
					<CanvasElement text={item.text} id={item.id} />
				</DragDropContainer>
			</div>
		));
		return droppableElement;
	}

	render() {
		//FIXME this should come from props later
		const imageFilePath = `${imagesPath}Microscope_with_Knobs_BackPort_Fluorescence_Beam.png`;
		const style = {
			container: {
				height: "90vh",
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
				MozBoxFlex: "1", // Without this, Firefox 19- expands to widest paragraph, overrides width
				// display: "-webkit-box", // OLD - iOS 6-, Safari 3.1-6
				// display: "-moz-box", // OLD - Firefox 19- (doesn't work very well)
				// display: "-ms-flexbox", // TWEENER - IE 10
				// display: "-webkit-flex", // NEW - Chrome
				// display: "flex", // NEW, Spec - Opera 12.1, Firefox 20+
				// justifyContent: "center"
				//TODO need to find a better solution because this doesn't maintain proportion
				backgroundImage: `url(${imageFilePath})`,
				backgroundRepeat: "no-repeat",
				backgroundPosition: "50%",
				backgroundSize: "contain"
			},
			// image: {
			// 	maxHeight: "90%",
			// 	maxWidth: "90%",
			// 	marginLeft: "auto",
			// 	marginRight: "auto",
			// 	marginTop: "auto",
			// 	marginBottom: "auto"
			// },
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
