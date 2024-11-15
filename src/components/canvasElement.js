import React from "react";

import { Resizable } from "react-resizable";
import { ResizableBox } from "react-resizable";

import ImageElement from "./imageElement";
import MultiTabFormWithHeaderV3 from "./multiTabFormWithHeaderV3";

const url = require("url");

import { string_copy_img } from "../constants";

export default class CanvasElement extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			editing: false,
			editForm: null,
		};

		this.handleClick = this.handleClick.bind(this);

		this.handleConfirm = this.handleConfirm.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleLoad = this.handleLoad.bind(this);

		this.handleResize = this.handleResize.bind(this);

		this.updateMinMaxDimensions = this.updateMinMaxDimensions.bind(this);

		this.counter = 0;
	}

	handleClick() {
		if (this.props.isDebug) console.log("inside of canvasElement in the function handleClick");
		if (!this.props.isViewOnly) {
			if (this.props.isDebug) console.log("INSIDE CANVASELEMENT 1");
			this.props.setEditingOnCanvas(true);
			let editForm = (
				<MultiTabFormWithHeaderV3
					// onClickSave={this.props.onClickSave}
					title={"Edit " + this.props.formTitle}
					schema={this.props.schema}
					inputData={this.props.inputData}
					id={this.props.id}
					onConfirm={this.handleConfirm}
					onCancel={this.handleCancel}
					onSave={this.handleSave}
					onLoad={this.handleLoad}
					overlaysContainer={this.props.overlaysContainer}
					currentChildrenComponentIdentifier={
						this.props.currentChildrenComponentIdentifier
					}
					minChildrenComponentIdentifier={
						this.props.minChildrenComponentIdentifier
					}
					maxChildrenComponentIdentifier={
						this.props.maxChildrenComponentIdentifier
					}
					elementByType={this.props.elementByType}
					editable={true}
					isDebug={this.props.isDebug}
				/>
			);
			this.setState({ editing: true, editForm: editForm });
		}
	}

	handleConfirm(id, data, linkedFields) {
		this.setState({ editing: false, editForm: null });
		this.props.setEditingOnCanvas(false);
		this.props.handleConfirm(id, data, linkedFields);
	}

	handleCancel() {
		if(this.props.isDebug) console.log("inside of function handleCancel in canvasElement.js");
		this.props.setEditingOnCanvas(false);
		this.setState({ editing: false, editForm: null });
	}

	handleSave(consolidatedData) {
		if(this.props.isDebug) console.log("inside of function handleSave in canvasElement.js");
		this.props.setEditingOnCanvas(false);
		this.props.onClickSave(consolidatedData);
		// this.setState({ editing: false, editForm: null });  //might have to change this line to be similar to the "handleConfirm" logic
	}

	handleLoad() {
		if(this.props.isDebug) console.log("inside of function handleLoad in canvasElement.js");
		this.props.setEditingOnCanvas(false);
		this.setState({ editing: false, editForm: null });  //might have to change this line 
	}

	handleResize(e, data) {
		let width = data.size.width;
		let height = data.size.height;
		let id = this.props.id;
		this.props.updateDimensions(id, width, height, true);
	}

	updateMinMaxDimensions(id, originalImgWidth, originalImgHeight) {
		// if (
		// 	this.state.originalWidth == originalImgWidth &&
		// 	this.state.originalHeight == originalImgHeight
		// )
		// 	return;
		// let scalingFactor = this.state.scalingFactor;
		// let scaledOriginalImgWidth = originalImgWidth * scalingFactor;
		// let scaledOriginalImgHeight = originalImgHeight * scalingFactor;
		// let minWidth = scaledOriginalImgWidth / 2;
		// let minHeight = scaledOriginalImgHeight / 2;
		// let maxWidth = scaledOriginalImgWidth * 2;
		// let maxHeight = scaledOriginalImgHeight * 2;
		// this.setState({
		// 	originalWidth: scaledOriginalImgWidth,
		// 	originalHeight: scaledOriginalImgHeight,
		// 	minWidth: minWidth,
		// 	minHeight: minHeight,
		// 	maxWidth: maxWidth,
		// 	maxHeight: maxHeight,
		// });
		// this.props.updateDimensions(
		// 	id,
		// 	scaledOriginalImgWidth,
		// 	scaledOriginalImgHeight,
		// 	false
		// );
	}

	render() {
		let style = {
			textAlign: "center",
			height: "100%",
			width: "100%",
			display: "flex",
			justifyContent: "center",
			backgroundColor: "transparent",
			padding: "0px",
			margin: "0px",
			border: "0px",
			font: "14px",
			color: "inherit",
			cursor: "pointer",
		};
		let resizableStyle = { border: "none" };
		let play = false;
		// if (!this.props.validated) {
		// 	resizableStyle = Object.assign(resizableStyle, {
		// 		border: "5px ridge red"
		// 	});
		// 	if (!this.props.dragged) {
		// 		play = true;
		// 	}
		// } else {
		// 	resizableStyle = Object.assign(resizableStyle, { border: "none" });
		// }
		let width = this.props.width;
		let height = this.props.height;

		let styleImage = {
			width: width,
			height: height,
		};

		let minWidth = this.props.minWidth;
		let minHeight = this.props.minHeight;
		let maxWidth = this.props.maxWidth;
		let maxHeight = this.props.maxHeight;
		let editForm = null;
		if (this.state.editing) {
			editForm = this.state.editForm;
		}

		return (
			<div>
				<ResizableBox
					width={width}
					height={height}
					minConstraints={[minWidth, minHeight]}
					maxConstraints={[maxWidth, maxHeight]}
					lockAspectRatio={true}
					onResizeStart={this.handleResizeStart}
					onResize={this.handleResize}
					onResizeStop={this.handleResizeStop}
					style={resizableStyle}
				>
					<button style={style} onClick={this.handleClick}>
						<ImageElement
							updateMinMaxDimensions={this.updateMinMaxDimensions}
							id={this.props.id}
							rotate={this.props.rotate}
							image={this.props.image}
							name={this.props.schema.title}
							style={styleImage}
						/>
					</button>
				</ResizableBox>
				{editForm}
			</div>
		);
	}
}

CanvasElement.defaultProps = {
	maxWidth: 200,
	maxHeight: 200,
	text: "Something",
	handleClick: function (e) {
		console.log("Clicked!", e.clientX, e.clientY);
	},
};

export class CanvasElementDeleteButton extends React.PureComponent {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		if (!this.props.isViewOnly) this.props.handleDelete(this.props.index);
	}

	render() {
		return (
			<button
				type="button"
				onClick={this.handleClick}
				style={this.props.myStyle}
			>
				x
			</button>
		);
	}
}

export class CanvasElementCopyButton extends React.PureComponent {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		if (!this.props.isViewOnly) this.props.handleCopy(this.props.index);
	}

	render() {
		let styleImage = {
			width: "12.5px",
			height: "12.5px",
		};
		let copyImg = url.resolve(this.props.imagesPath, string_copy_img);
		let copyPath =
			copyImg +
			(copyImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
		return (
			<button
				type="button"
				onClick={this.handleClick}
				style={this.props.myStyle}
			>
				<img src={copyPath} alt={copyImg} style={styleImage} />
			</button>
		);
	}
}
