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
			maxHeight: null,
			scalingFactor: props.scalingFactor || 1,
		};

		this.startWidth = null;
		this.startHeight = null;

		this.handleClick = this.handleClick.bind(this);

		this.handleConfirm = this.handleConfirm.bind(this);
		this.handleCancel = this.handleCancel.bind(this);

		this.handleResizeStart = this.handleResizeStart.bind(this);
		this.handleResize = this.handleResize.bind(this);
		this.handleResizeStop = this.handleResizeStop.bind(this);

		this.updateMinMaxDimensions = this.updateMinMaxDimensions.bind(this);

		this.counter = 0;
	}

	handleClick() {
		if (!this.props.isViewOnly) {
			this.props.setEditingOnCanvas(true);
			this.setState({ editing: true });
		}
	}

	handleConfirm(id, data, linkedFields) {
		this.setState({ editing: false });
		this.props.setEditingOnCanvas(false);
		this.props.handleConfirm(id, data, linkedFields);
	}

	handleCancel() {
		this.props.setEditingOnCanvas(false);
		this.setState({ editing: false });
	}

	handleResizeStart(e, data) {}

	handleResize(e, data) {
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
		let scalingFactor = this.state.scalingFactor;
		let scaledOriginalImgWidth = originalImgWidth * scalingFactor;
		let scaledOriginalImgHeight = originalImgHeight * scalingFactor;
		let minWidth = scaledOriginalImgWidth / 2;
		let minHeight = scaledOriginalImgHeight / 2;
		let maxWidth = scaledOriginalImgWidth * 2;
		let maxHeight = scaledOriginalImgHeight * 2;
		this.setState({
			originalWidth: scaledOriginalImgWidth,
			originalHeight: scaledOriginalImgHeight,
			minWidth: minWidth,
			minHeight: minHeight,
			maxWidth: maxWidth,
			maxHeight: maxHeight,
		});
		this.props.updateDimensions(
			id,
			scaledOriginalImgWidth,
			scaledOriginalImgHeight,
			false
		);
	}

	handleResizeStop(e, data) {}

	render() {
		if (this.state.editing) {
			return (
				<MultiTabFormWithHeader
					schema={this.props.schema}
					inputData={this.props.inputData}
					id={this.props.id}
					onConfirm={this.handleConfirm}
					onCancel={this.handleCancel}
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
				onResizeStart={this.handleResizeStart}
				onResize={this.handleResize}
				onResizeStop={this.handleResizeStop}
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
						"opacity: 1",
					]}
				>
					<button style={style} onClick={this.handleClick}>
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
