/* eslint-disable no-dupe-keys */
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { DragDropContainer, DropTarget } from "react-drag-drop-container";
import * as serviceWorker from "./serviceWorker";

// I would maybe make this a prop to be passed into App (?) so wrapper app can define where images are stored.
const imagesPath = "./assets/";
var schema = require("./schema/testSchema.json");

// const getDraggingStyle = (isDragging, draggableStyle) => ({
// 	// some basic styles to make the items look a bit nicer
// 	userSelect: "none",
// 	// change background colour if dragging
// 	background: isDragging ? "lightgreen" : "white",
// 	// styles we need to apply on draggables
// 	...draggableStyle,
// 	border: "2px solid",
// 	backgroundColor: "white",
// 	color: "black"
// });

class Header extends React.Component {
	render() {
		const style = {
			backgroundColor: "grey",
			textAlign: "center",
			height: "4.8vh"
		};
		return <div style={style}> HEADER </div>;
	}
}

class ToolbarButton extends React.Component {
	render() {
		const style = {
			backgroundColor: "white",
			textAlign: "center",
			height: "50",
			width: "50"
		};
		return <div style={style}>{this.props.text}</div>;
	}
}

class Footer extends React.Component {
	render() {
		const style = {
			backgroundColor: "grey",
			textAlign: "center",
			height: "4.8vh"
		};
		return <div style={style}> FOOTER </div>;
	}
}

class MicroscopeComponent extends React.Component {}

class Toolbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			elementList: []
		};

		for (let i = 0; i < schema.length; i++) {
			let obj = schema[i];
			let element = {
				text: `${obj.title}`,
				id: `${i}`
			};
			this.state.elementList.push(element);
		}
	}

	landedOn(e) {
		// eslint-disable-next-line no-console
		//	console.log(e);
	}

	createList() {
		let elementList = this.state.elementList;
		let droppableElement = elementList.map((item, index) => (
			<DragDropContainer
				targetKey="dragdrop"
				key={"draggable" + item.id}
				dragClone={true}
				dragData={{ source: "toolbar", text: item.text, id: item.id }}
				onDrop={this.landedOn}
			>
				<ToolbarButton text={item.text} id={item.id} />
			</DragDropContainer>
		));
		return droppableElement;
	}

	render() {
		const style = {
			//display: "inline-block",
			backgroundColor: "grey",
			textAlign: "center",
			verticalAlign: "middle",
			height: "90vh",
			borderBottom: "2px solid",
			borderTop: "2px solid",
			//border: "3px solid",
			color: "black",
			WebkitBoxOrdinalGroup: "2", // OLD - iOS 6-, Safari 3.1-6
			MozBoxOrdinalGroup: "2", // OLD - Firefox 19-
			msFlexOrder: "2", // TWEENER - IE 10
			WebkitOrder: "2", // NEW - Chrome
			order: "2", // NEW, Spec - Opera 12.1, Firefox 20+
			WebkitBoxFlex: "1", // OLD - iOS 6-, Safari 3.1-6
			MozBoxFlex: "1", // Firefox 19-
			width: "25%", // For OLD syntax, otherwise collapses.
			msFlex: "1", // TWEENER - IE 10
			WebkitFlex: "1", // NEW - Chrome
			flex: "1" // NEW, Spec - Opera 12.1, Firefox 20+
		};
		let droppableElement = this.createList();
		return <div style={style}>{droppableElement}</div>;
	}
}

class Canvas extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			elementList: []
		};
		this.dropped = this.dropped.bind(this);
	}

	landedOn(e) {
		// eslint-disable-next-line no-console
		// console.log(e);
	}

	dropped(e) {
		let sourceElement = e.dragData;
		let newElementList = this.state.elementList;
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
		let droppableElement = elementList.map((item, i) => (
			<div style={item.style} key={"draggablec" + i}>
				<DragDropContainer
					targetKey="dragdrop"
					key={"draggable" + i}
					dragClone={false}
					dragData={{ source: "canvas", index: i }}
					onDrop={this.landedOn}
				>
					<ToolbarButton text={item.text} id={item.id} />
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
		//<img src={imageFilePath} alt={imageFilePath} style={style.image} />

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

class MicroscopyApp extends React.Component {
	constructor(props) {
		super(props);
		this.toolbarRef = React.createRef();
		this.canvasRef = React.createRef();
	}

	render() {
		const style = {
			display: "-webkit-box", // OLD - iOS 6-, Safari 3.1-6
			display: "-moz-box", // OLD - Firefox 19- (doesn't work very well)
			display: "-ms-flexbox", // TWEENER - IE 10
			display: "-webkit-flex", // NEW - Chrome
			display: "flex" // NEW, Spec - Opera 12.1, Firefox 20+
		};
		return (
			<div>
				<Header />
				<div style={style}>
					<Canvas ref={this.canvasRef} />
					<Toolbar ref={this.toolbarRef} />
				</div>
				<Footer />
			</div>
		);
	}
}

MicroscopyApp.propTypes = {
	height: PropTypes.number,
	width: PropTypes.number
};

MicroscopyApp.defaultProps = {
	height: 600,
	width: 800
};

export default MicroscopyApp;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
