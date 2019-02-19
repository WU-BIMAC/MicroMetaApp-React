/* eslint-disable no-dupe-keys */
import React from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
const imagesPath = process.env.PUBLIC_URL + "/assets/";
var schema = require("./schema/testSchema.json");

const getDraggingStyle = (isDragging, draggableStyle) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: "none",
	// change background colour if dragging
	background: isDragging ? "lightgreen" : "white",
	// styles we need to apply on draggables
	...draggableStyle,
	border: "2px solid",
	backgroundColor: "white",
	color: "black"
});

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
		return <div>{this.props.text}</div>;
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

	//FIXME this whole method is probably going to be
	// removed once we drop in canvas
	onDragEnd(result) {
		const reorder = (list, startIndex, endIndex) => {
			const currentResults = Array.from(list);
			const [removed] = currentResults.splice(startIndex, 1);
			currentResults.splice(endIndex, 0, removed);

			return currentResults;
		};
		if (!result.destination) {
			return;
		}
		const newElementList = reorder(
			this.state.elementList,
			result.source.index,
			result.destination.index
		);
		this.setState({
			elementList: newElementList
		});
	}

	getSourceElement(index) {
		return this.state.elementList[index];
	}

	renderMyOwnPlaceholder(i) {
		let localList = this.state.elementList;
		localList[i].render();
	}

	createList() {
		let elementList = this.state.elementList;
		let droppableElement = (
			<Droppable
				droppableId={"droppableToolbar"}
				//isDropDisabled={true}
			>
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						//style={getListStyle(snapshot.isDraggingOver)}
					>
						{elementList.map((item, index) => (
							<Draggable
								key={item.id}
								draggableId={"draggable-" + item.id}
								index={index}
							>
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										style={getDraggingStyle(
											snapshot.isDragging,
											provided.draggableProps.style
										)}
									>
										{<ToolbarButton text={item.text} id={item.id} />}
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
					//{provided.placeholder ? this.renderMyOwnPlaceholder() : null}
					//
				)}
			</Droppable>
		);
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
	}

	onDragEnd(result, sourceElement) {
		//FIXME Remove if not needed anymore
		// if (!result.destination) {
		// 	return;
		// }
		let newElementList = this.state.elementList;
		let newElement = {
			text:
				sourceElement.text +
				"_" +
				sourceElement.id +
				"_" +
				newElementList.length,
			id: sourceElement.id + "_" + newElementList.length
		};
		newElementList.push(newElement);
		this.setState({
			elementList: newElementList
		});
	}

	createList() {
		let elementList = this.state.elementList;
		let droppableElement = (
			<Droppable
				droppableId={"droppableCanvas"}
				//isDropDisabled={true}
			>
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						//style={getListStyle(snapshot.isDraggingOver)}
					>
						{elementList.map((item, index) => (
							<Draggable
								key={item.id}
								draggableId={"draggable-" + item.id}
								index={index}
							>
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										style={getDraggingStyle(
											snapshot.isDragging,
											provided.draggableProps.style
										)}
									>
										{<ToolbarButton text={item.text} id={item.id} />}
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		);
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
				display: "-webkit-box", // OLD - iOS 6-, Safari 3.1-6
				display: "-moz-box", // OLD - Firefox 19- (doesn't work very well)
				display: "-ms-flexbox", // TWEENER - IE 10
				display: "-webkit-flex", // NEW - Chrome
				display: "flex", // NEW, Spec - Opera 12.1, Firefox 20+
				justifyContent: "center"
			},
			image: {
				maxHeight: "90%",
				maxWidth: "90%",
				marginLeft: "auto",
				marginRight: "auto",
				marginTop: "auto",
				marginBottom: "auto"
			}
		};
		return (
			<div style={style.container}>
				<img src={imageFilePath} alt={imageFilePath} style={style.image} />
				{this.createList()}
			</div>
		);
	}
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.onDragEnd = this.onDragEnd.bind(this);
		this.toolbarRef = React.createRef();
		this.canvasRef = React.createRef();
	}

	onDragEnd(result) {
		// eslint-disable-next-line no-console
		console.log(result);
		if (result.source.droppableId === "droppableToolbar") {
			//this.toolbarRef.current.onDragEnd(result);
			let sourceElement = this.toolbarRef.current.getSourceElement(
				result.source.index
			);
			this.canvasRef.current.onDragEnd(result, sourceElement);
		} else {
			//TODO move around
		}
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
			<DragDropContext onDragEnd={this.onDragEnd}>
				<div>
					<Header />
					<div style={style}>
						<Canvas ref={this.canvasRef} />
						<Toolbar ref={this.toolbarRef} />
					</div>
					<Footer />
				</div>
			</DragDropContext>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
