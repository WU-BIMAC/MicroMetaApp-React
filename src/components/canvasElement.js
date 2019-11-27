import React from "react";

import { Resizable } from "react-resizable";
import { ResizableBox } from "react-resizable";
import { AnimateKeyframes } from "react-simple-animate";

import ImageElement from "./imageElement";
import MultiTabFormWithHeader from "./multiTabFormWithHeader";

export default class CanvasElement extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			editing: false,
			originalWidth: null,
			originalHeight: null,
			minWidth: null,
			minHeight: null,
			maxWidth: null,
			maxHeight: null
		};

		this.startWidth = null;
		this.startHeight = null;

		this.onClick = this.onClick.bind(this);

		this.onConfirm = this.onConfirm.bind(this);
		this.onCancel = this.onCancel.bind(this);

		this.onResizeStart = this.onResizeStart.bind(this);
		this.onResize = this.onResize.bind(this);
		this.onResizeStop = this.onResizeStop.bind(this);

		this.updateMinMaxDimensions = this.updateMinMaxDimensions.bind(this);

		this.counter = 0;
	}

	onClick() {
		if (!this.props.isViewOnly) {
			this.props.setEditingOnCanvas(true);
			this.setState({ editing: true });
		}
	}

	onConfirm(id, data, linkedFields) {
		this.setState({ editing: false });
		this.props.setEditingOnCanvas(false);
		this.props.onConfirm(id, data, linkedFields);
	}

	onCancel() {
		this.props.setEditingOnCanvas(false);
		this.setState({ editing: false });
	}

	onResizeStart(e, data) {}

	onResize(e, data) {
		let width = data.size.width;
		let height = data.size.height;
		let imgWidth = width;
		let imgHeight = height;
		let id = this.props.id;
		this.props.updateDimensions(id, imgWidth, imgHeight, true);
	}

	updateMinMaxDimensions(id, originalImgWidth, originalImgHeight) {
		if (
			this.state.originalWidth == originalImgWidth &&
			this.state.originalHeight == originalImgHeight
		)
			return;
		//console.log("update min max dimensions canvas");
		let minWidth = originalImgWidth / 2;
		let minHeight = originalImgHeight / 2;
		let maxWidth = originalImgWidth * 2;
		let maxHeight = originalImgHeight * 2;
		this.setState({
			originalWidth: originalImgWidth,
			originalHeight: originalImgHeight,
			minWidth: minWidth,
			minHeight: minHeight,
			maxWidth: maxWidth,
			maxHeight: maxHeight
		});
		this.props.updateDimensions(id, originalImgWidth, originalImgHeight, false);
	}

	onResizeStop(e, data) {}

	render() {
		if (this.state.editing) {
			return (
				<MultiTabFormWithHeader
					schema={this.props.schema}
					inputData={this.props.inputData}
					id={this.props.id}
					onConfirm={this.onConfirm}
					onCancel={this.onCancel}
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
				/>
			);
		}

		let style = {
			textAlign: "center",
			height: "100%",
			width: "100%",
			display: "flex", // NEW, Spec - Opera 12.1, Firefox 20+
			justifyContent: "center",
			backgroundColor: "transparent",
			padding: "0px",
			margin: "0px",
			font: "14px",
			color: "inherit",
			cursor: "pointer"
		};
		let resizableStyle = {};
		let play = false;
		if (!this.props.validated) {
			resizableStyle = Object.assign(resizableStyle, {
				border: "5px ridge red"
			});
			if (!this.props.dragged) {
				play = true;
			}
		} else {
			resizableStyle = Object.assign(resizableStyle, { border: "none" });
		}
		let width = this.props.width;
		let height = this.props.height;

		let styleImage = {
			width: width,
			height: height
		};

		// if (this.counter < 6) {
		// 	this.startWidth = width;
		// 	this.startHeight = height;
		// 	this.counter++;
		// }

		let minWidth = this.state.minWidth;
		let minHeight = this.state.minHeight;
		let maxWidth = this.state.maxWidth;
		let maxHeight = this.state.maxHeight;

		return (
			<ResizableBox
				width={width}
				height={height}
				minConstraints={[minWidth, minHeight]}
				maxConstraints={[maxWidth, maxHeight]}
				lockAspectRatio={true}
				onResizeStart={this.onResizeStart}
				onResize={this.onResize}
				onResizeStop={this.onResizeStop}
				style={resizableStyle}
			>
				<AnimateKeyframes
					key={"Animation-0"}
					play={play}
					durationSeconds={1}
					keyframes={[
						"opacity: 1",
						"opacity: 0.8",
						"opacity: 0.6",
						"opacity: 0.4",
						"opacity: 0.2",
						"opacity: 0.4",
						"opacity: 0.6",
						"opacity: 0.8",
						"opacity: 1",
						"opacity: 0.8",
						"opacity: 0.6",
						"opacity: 0.4",
						"opacity: 0.2",
						"opacity: 0.4",
						"opacity: 0.6",
						"opacity: 0.8",
						"opacity: 1"
					]}
				>
					<button style={style} onClick={this.onClick}>
						<ImageElement
							updateMinMaxDimensions={this.updateMinMaxDimensions}
							id={this.props.id}
							image={this.props.image}
							name={this.props.schema.title}
							style={styleImage}
						/>
					</button>
				</AnimateKeyframes>
			</ResizableBox>
		);
	}
}

//TODO verify if this is necessary
CanvasElement.defaultProps = {
	maxWidth: 200,
	maxHeight: 200,
	text: "Something",
	onClick: function(e) {
		// eslint-disable-next-line no-console
		console.log("Clicked!", e.clientX, e.clientY);
	}
};

export class CanvasElementDeleteButton extends React.PureComponent {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		if (!this.props.isViewOnly) this.props.onDelete(this.props.index);
	}

	render() {
		return (
			<button type="button" onClick={this.onClick} style={this.props.myStyle}>
				x
			</button>
		);
	}
}
